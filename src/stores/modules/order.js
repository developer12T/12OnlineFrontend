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

      const BATCH_SIZE = 50
      // const BLOCK_ITEM = '10013601003'

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

      function formatDateYYYYMMDD (dateStr) {
        const d = new Date(dateStr)
        const y = d.getFullYear()
        const m = String(d.getMonth() + 1).padStart(2, '0')
        const day = String(d.getDate()).padStart(2, '0')
        return `${y}${m}${day}`
      }

      function mapOrderToERP (order) {
        const orderDate = formatDateYYYYMMDD(order.printdatetimeString)
        const requestDate = formatDateYYYYMMDD(new Date())

        const items = order.item.map(it => {
          const qty = Number(it.number) || 0
          const discount = Number(it.discount) || 0
          const discountPerUnit =
            qty > 0 ? Number((discount / qty).toFixed(2)) : 0

          return {
            discount: discountPerUnit,
            itemCode: it.sku,
            netPrice: it.pricepernumber,
            price: it.pricepernumberOri,
            promotionCode: it.procode,
            qty,
            total: it.totalprice,
            unit: it.unit
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
          note: '',
          orderDate,
          orderNo: order.cono,
          invoice: order.invno,
          orderStatusHigh: 22,
          orderStatusLow: 22,
          orderType: '071',
          payer: 'O00000001',
          ref: `${order.number}`,
          requestDate,
          total,
          totalNet: order.amount,
          warehouse: '108',
          item: items
        }
      }

      try {
        // ===============================
        // 1. ตัด order ที่มี BLOCK_ITEM
        // ===============================
        // const filteredOrders = orders.filter(order => {
        //   const hasBlockedItem = order.item?.some(
        //     it => String(it.sku).trim() === BLOCK_ITEM
        //   )

        //   if (hasBlockedItem) {
        //     console.log(`⛔ Skip order ${order.number} (found ${BLOCK_ITEM})`)
        //   }

        //   return !hasBlockedItem
        // })

        const filteredOrders = orders

        if (!filteredOrders.length) {
          return {
            message: 'No valid orders',
            successfulOrders: [],
            failedOrders: []
          }
        }

        // ===============================
        // 2. แบ่ง batch
        // ===============================
        const batches = chunkArray(filteredOrders, BATCH_SIZE)

        const allSuccessful = []
        const allFailed = []

        // ===============================
        // 3. ส่งทีละ batch
        // ===============================
        for (let i = 0; i < batches.length; i++) {
          const batch = batches[i]
          const payload = batch.map(mapOrderToERP)

          console.log(
            `🚀 Send batch ${i + 1}/${batches.length}`,
            payload.length
          )

          try {
            const res = await axios.post(ERP_URL + '/erp/order/insert', payload)

            const successfulOrders = res.data?.successfulOrders ?? []
            const failedOrders = res.data?.failedOrders ?? []

            allSuccessful.push(...successfulOrders)
            allFailed.push(...failedOrders)

            // update Mongo เฉพาะที่เข้า ERP จริง
            if (successfulOrders.length > 0) {
              await axios.post(
                BASE_URL + '/online/api/order/m3/update-status-success',
                { successfulOrders },
                { headers: { 'x-channel': CHANNEL } }
              )
            }
          } catch (err) {
            console.error(`❌ Batch ${i + 1} failed`, err)

            // ถ้า batch ล้มทั้งก้อน → mark เป็น failed
            batch.forEach(o => {
              allFailed.push({
                orderNo: o.cono,
                error:
                  err?.response?.data?.message || err.message || 'ERP error'
              })
            })
          }

          // หน่วงนิดหน่อยกัน ERP rate limit
          await sleep(1500)
        }

        // ===============================
        // 4. return ก้อนเดียว (สำคัญ)
        // ===============================
        return {
          message: `ส่งเข้า ERP แล้ว ${allSuccessful.length} รายการ จากทั้งหมด ${filteredOrders.length}`,
          successfulOrders: allSuccessful,
          failedOrders: allFailed
        }
      } catch (error) {
        console.error(error)
        return {
          message: 'Unexpected error',
          successfulOrders: [],
          failedOrders: orders.map(o => ({
            orderNo: o.cono,
            error: error.message
          }))
        }
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
