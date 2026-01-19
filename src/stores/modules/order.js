import { defineStore } from 'pinia'
import axios from 'axios'

export const useOrderStore = defineStore('order', {
  state: () => ({
    zortOrder: [],
    zortOrderHis: [],
    totalHis: '',
    totalPages: 0,
    currentPage: 0,
    tabName: 'wait-tab',
    optionHis: [],
    orderSummaryAll: {
      list: [],
      totalList: {}
    },
    summaryAll: localStorage.getItem('summaryAll')
  }),
  getter: {
    getZortOrder: state => state.zortOrder,
    gettabName: state => state.tabName
  },
  actions: {
    async setTab (tabName) {
      this.tabName = tabName
      await this.getOrderZort()
    },
    async getOrderZort () {
      try {
        const token = JSON.parse(localStorage.getItem('token'))
        const pageName = localStorage.getItem('orderPage')
        const tabName = this.tabName
        const today = new Date()
        const date = today.toISOString().slice(0, 10) // YYYY-MM-DD

        const reponse = await axios.post(
          import.meta.env.VITE_API_BASE_URL + '/online/api/order/all',
          {
            page: pageName,
            tab: tabName,
            date: date
          },
          {
            headers: {
              'x-channel': 'uat'
            }
          }
        )
        const result = reponse.data
        this.zortOrder = result
        localStorage.setItem('zortOrder', JSON.stringify(result))
        console.log('orderzort', this.zortOrder)
        console.log('orderpage', pageName)
        // console.log('orderpage', tabName)
      } catch (error) {
        console.error(error)
      }
    },
    async getOrderZortHistory (page, month, year, search = '') {
      try {
        const token = JSON.parse(localStorage.getItem('token'))
        const reponse = await axios.post(
          import.meta.env.VITE_API_BASE_URL +
            '/zort/rest12Tzort/12Trading/getOrderHistory',
          {
            month: month,
            year: year,
            page: page,
            search: search,
            limit: 200
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        const result = reponse.data
        this.zortOrderHis = result.orders
        this.totalHis = result.total
        this.totalPages = result.totalPages
        this.currentPage = result.currentPage
        // localStorage.setItem('zortOrder', JSON.stringify(result));
        console.log('orderzortHis', result)
      } catch (error) {
        console.error(error)
      }
    },
    async getOrderHisOption () {
      try {
        const token = JSON.parse(localStorage.getItem('token'))
        const reponse = await axios.post(
          import.meta.env.VITE_API_BASE_URL +
            '/zort/rest12Tzort/12Trading/getOrderOptions',
          {},
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        const result = reponse.data
        this.optionHis = result
        // localStorage.setItem('zortOrder', JSON.stringify(result));
        console.log('optionHis', result)
      } catch (error) {
        console.error(error)
      }
    },

    async addOrderErp (orders = []) {
      const ERP_URL = import.meta.env.VITE_API_ERP_URL
      const BASE_URL = import.meta.env.VITE_API_BASE_URL
      const CHANNEL = 'uat'
      const BLOCK_ITEM = '10013601003'
      const MAX_RETRY = 2
      const BATCH_SIZE = 50
      const BATCH_DELAY = 4000 // เว้น 4 วิ ต่อ batch

      // ===============================
      // Utils
      // ===============================
      const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

      const chunkArray = (arr = [], size = 50) => {
        const result = []
        for (let i = 0; i < arr.length; i += size) {
          result.push(arr.slice(i, i + size))
        }
        return result
      }

      const formatDateYYYYMMDD = date => {
        const d = new Date(date)
        if (isNaN(d)) return ''
        return [
          d.getFullYear(),
          String(d.getMonth() + 1).padStart(2, '0'),
          String(d.getDate()).padStart(2, '0')
        ].join('')
      }

      const mapOrderToERP = order => {
        const orderDate = formatDateYYYYMMDD(order.updatedAt)
        const requestDate = formatDateYYYYMMDD(new Date())

        const items = order.item.map(it => {
          const qty = Number(it.number) || 0
          const discount = Number(it.discount) || 0

          return {
            itemCode: it.sku,
            qty,
            unit: it.unit,
            price: it.pricepernumberOri,
            netPrice: it.pricepernumber,
            discount: qty > 0 ? Number((discount / qty).toFixed(2)) : 0,
            total: it.totalprice,
            promotionCode: it.procode || ''
          }
        })

        const total = items
          .filter(i => i.itemCode !== 'DISONLINE')
          .reduce((sum, i) => sum + Number(i.total), 0)

        return {
          Hcase: 1,
          OAFRE1: 'YSEND',
          addressID: 'SHIP1',
          customerNo: order.customercode,
          payer: order.customercode,
          warehouse: '108',
          orderType: '071',
          orderStatusHigh: 22,
          orderStatusLow: 22,
          orderDate,
          requestDate,
          orderNo: order.cono,
          invoice: order.invno,
          ref: String(order.number),
          note: '',
          total,
          totalNet: order.amount,
          item: items
        }
      }

      // ===============================
      // STEP 1: filter BLOCK_ITEM
      // ===============================
      const validOrders = orders.filter(order => {
        const hasBlocked = order.item?.some(
          it => String(it.sku).trim() === BLOCK_ITEM
        )

        if (hasBlocked) {
          console.warn(`⛔ Skip order ${order.number} (BLOCK_ITEM)`)
        }
        return !hasBlocked
      })

      if (!validOrders.length) {
        console.log('⚠️ No valid orders to send ERP')
        return { success: true, message: 'No valid orders' }
      }

      // ===============================
      // STEP 2: split เป็น batch ละ 50
      // ===============================
      const batches = chunkArray(validOrders, BATCH_SIZE)

      const successOrders = []
      const failedOrders = []

      // ===============================
      // STEP 3: ส่งทีละ batch
      // ===============================
      for (let i = 0; i < batches.length; i++) {
        const batch = batches[i]
        const payloads = batch.map(mapOrderToERP)

        let attempt = 0
        let success = false

        while (attempt <= MAX_RETRY && !success) {
          try {
            attempt++

            console.log(
              `🚚 Send batch ${i + 1}/${batches.length} (${
                batch.length
              } orders)`
            )

            await axios.post(`${ERP_URL}/erp/order/insert`, payloads, {
              timeout: 30000
            })

            successOrders.push(...batch.map(o => o.number))
            console.log(`✅ ERP OK batch ${i + 1}`)
            success = true
          } catch (err) {
            console.error(
              `❌ ERP FAIL batch ${i + 1} (attempt ${attempt})`,
              err?.response?.data || err.message
            )

            if (err.response?.status === 429) {
              console.warn('⏳ 429 Too Many Requests → wait longer')
              await sleep(6000)
            } else if (attempt <= MAX_RETRY) {
              await sleep(2000 * attempt)
            } else {
              batch.forEach(o =>
                failedOrders.push({
                  orderNo: o.number,
                  reason: err?.response?.data || err.message
                })
              )
            }
          }
        }

        // 🔒 คุม rate ต่อ batch
        await sleep(BATCH_DELAY)
      }

      // ===============================
      // STEP 4: update Mongo เฉพาะที่เข้า ERP
      // ===============================
      if (successOrders.length) {
        try {
          await axios.post(
            `${BASE_URL}/online/api/order/m3/update-status-success`,
            { successfulOrders: successOrders },
            { headers: { 'x-channel': CHANNEL } }
          )
        } catch (err) {
          console.error('⚠️ Update Mongo failed', err.message)
        }
      }

      // ===============================
      // RESULT
      // ===============================
      return {
        success: true,
        summary: {
          total: validOrders.length,
          batch: batches.length,
          success: successOrders.length,
          failed: failedOrders.length
        },
        successOrders,
        failedOrders
      }
    },

    // async addOrderErp (orders) {
    //   function formatDateYYYYMMDD (dateStr) {
    //     const d = new Date(dateStr)
    //     const y = d.getFullYear()
    //     const m = String(d.getMonth() + 1).padStart(2, '0')
    //     const day = String(d.getDate()).padStart(2, '0')
    //     return `${y}${m}${day}`
    //   }

    //   function mapOrderToERP (order) {
    //     const orderDate = formatDateYYYYMMDD(order.updatedAt)
    //     const requestDate = formatDateYYYYMMDD(new Date())

    //     const items = order.item.map(it => {
    //       const qty = Number(it.number) || 0
    //       const discount = Number(it.discount) || 0

    //       const discountPerUnit =
    //         qty > 0 ? Number((discount / qty).toFixed(2)) : 0

    //       return {
    //         discount: discountPerUnit,
    //         itemCode: it.sku,
    //         // itemCode: it.itemCode,
    //         netPrice: it.pricepernumber,
    //         price: it.pricepernumberOri,
    //         promotionCode: it.procode,
    //         qty,
    //         total: it.totalprice,
    //         unit: it.unit
    //       }
    //     })

    //     const total = items
    //       .filter(i => i.itemCode !== 'DISONLINE')
    //       .reduce((sum, i) => sum + Number(i.total), 0)

    //     return {
    //       Hcase: 1,
    //       OAFRE1: 'YSEND',
    //       addressID: 'SHIP1',
    //       customerNo: order.customercode,
    //       note: '',
    //       orderDate,
    //       orderNo: order.cono,
    //       invoice: order.invno,
    //       orderStatusHigh: 22,
    //       orderStatusLow: 22,
    //       orderType: '071',
    //       payer: order.customercode,
    //       ref: `${order.number}`,
    //       requestDate,
    //       total,
    //       totalNet: order.amount,
    //       warehouse: '108',
    //       item: items
    //     }
    //   }

    //   try {
    //     const BLOCK_ITEM = '10013601003'
    //     // 🔴 STEP สำคัญ: ตัด order ที่มี BLOCK_ITEM ทิ้งทั้งก้อน
    //     const filteredOrders = orders.filter(order => {
    //       const hasBlockedItem = order.item?.some(
    //         it => String(it.sku).trim() === BLOCK_ITEM
    //       )

    //       if (hasBlockedItem) {
    //         console.log(`⛔ Skip order ${order.number} (found ${BLOCK_ITEM})`)
    //       }

    //       return !hasBlockedItem
    //     })

    //     // กัน edge case: ถ้าไม่เหลือ order เลย
    //     if (filteredOrders.length === 0) {
    //       console.log('⚠️ No orders to send to ERP')
    //       return { success: true, message: 'No valid orders' }
    //     }

    //     const payload = filteredOrders.map(mapOrderToERP)
    //     console.log('payload', payload)

    //     const response = await axios.post(
    //       import.meta.env.VITE_API_ERP_URL + '/erp/order/insert',
    //       payload
    //     )

    //     // 2️⃣ update Mongo เฉพาะ order ที่เข้า ERP จริง
    //     const successfulOrders = response.data?.successfulOrders

    //     if (Array.isArray(successfulOrders) && successfulOrders.length > 0) {
    //       await axios.post(
    //         import.meta.env.VITE_API_BASE_URL +
    //           '/online/api/order/m3/update-status-success',
    //         { successfulOrders },
    //         {
    //           headers: { 'x-channel': 'uat' }
    //         }
    //       )
    //     }

    //     return response.data
    //   } catch (error) {
    //     console.error(error)
    //   }
    // },

    async addDataOrderLog (order) {
      try {
        const token = JSON.parse(localStorage.getItem('token'))
        if (order && order.length > 0) {
          // สร้างตัวแปรใหม่ที่เก็บข้อมูล 4 ฟิลด์
          const orderData = order.map(item => ({
            cono: item.cono,
            invno: item.invno,
            number: item.number,
            customerid: item.customerid
          }))
          console.log('orderData', orderData)
        }
      } catch (error) {
        console.error(error)
      }
    },
    async summaryOrderAll (order) {
      try {
        const response = await axios.post(
          import.meta.env.VITE_API_BASE_URL + '/sale/summaryAll',
          order
        )
        this.orderSummaryAll = response.data
        console.log('summaryAll', response.data)
        console.log('summaryAll2', this.orderSummaryAll)
      } catch (error) {
        this.error = error.message || 'Error fetching orders'
        console.error(error)
      }
    }
  }
})
