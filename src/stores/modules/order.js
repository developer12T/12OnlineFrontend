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
        const reponse = await axios.post(
          import.meta.env.VITE_API_BASE_URL + '/online/api/order/all',
          {
            page: pageName,
            tab: tabName
          },
          {
            headers: {
              'x-channel': 'uat'
            }
          }
        )
        const result = reponse.data
        this.zortOrder = result
        // localStorage.setItem('zortOrder', JSON.stringify(result));
        console.log('orderzort', this.zortOrder)
        console.log('orderpage', pageName)
        console.log('orderpage', tabName)
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

    async addOrderErp (orders) {
      function formatDateYYYYMMDD (dateStr) {
        const d = new Date(dateStr)
        const y = d.getFullYear()
        const m = String(d.getMonth() + 1).padStart(2, '0')
        const day = String(d.getDate()).padStart(2, '0')
        return `${y}${m}${day}`
      }

      function mapOrderToERP (order) {
        const orderDate = formatDateYYYYMMDD(order.orderdate)
        const requestDate = formatDateYYYYMMDD(new Date())

        const items = order.item.map(it => ({
          discount: it.discount || 0,
          itemCode: it.sku,
          netPrice: it.pricepernumber,
          price: it.pricepernumber,
          promotionCode: '',
          qty: it.number,
          total: it.totalprice,
          unit: it.unit
        }))

        const total = items.reduce((sum, i) => sum + i.total, 0)

        return {
          Hcase: 1,
          OAFRE1: 'YSEND',
          addressID: 'INVTSP',
          customerNo: 'OLAZ000000',
          note: '',
          orderDate,
          orderNo: order.cono,
          invoice: order.invno,
          orderStatusHigh: 22,
          orderStatusLow: 22,
          orderType: '071',
          payer: 'OLAZ000000',
          ref: `${order.number}`,
          requestDate,
          total,
          totalNet: total,
          warehouse: '107',
          item: items
        }
      }

      try {
        const payload = orders.map(mapOrderToERP)
        const response = await axios.post(
          import.meta.env.VITE_API_ERP_URL + '/erp/order/insert',
          payload
        )

        // 2️⃣ ถ้ามี successfulOrders → ยิงกลับมา update Mongo
        const successfulOrders = response.data?.successfulOrders

        if (Array.isArray(successfulOrders) && successfulOrders.length > 0) {
          await axios.post(
            import.meta.env.VITE_API_BASE_URL +
              '/online/api/order/m3/update-status-success',
            {
              successfulOrders
            },
            {
              headers: {
                'x-channel': 'uat' // หรือ channel ที่คุณใช้จริง
              }
            }
          )
        }

        return response.data
      } catch (error) {
        console.error(error)
      }
    },
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
