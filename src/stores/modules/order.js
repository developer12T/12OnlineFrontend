import { defineStore } from "pinia";
import axios from "axios";

export const useOrderStore = defineStore("order", {
  state: () => ({
    zortOrder: [],
    zortOrderHis: [],
    totalHis: '',
    totalPages: 0,
    currentPage: 0,
    tabName: "wait-tab",
    optionHis: [],
    orderSummaryAll: {
      list: [],
      totalList: {}
    },
    summaryAll: localStorage.getItem('summaryAll'),
  }),
  getter: {
    getZortOrder: (state) => state.zortOrder,
    gettabName: (state) => state.tabName,
  },
  actions: {
    async setTab(tabName) {
      this.tabName = tabName;
      await this.getOrderZort(); 
    },
    async getOrderZort() {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const pageName = localStorage.getItem("orderPage");
        const tabName = this.tabName;
        const reponse = await axios.post(
          import.meta.env.VITE_API_BASE_URL +
            "/zort/rest12Tzort/12Trading/getOrder",
          {
            page: pageName,
            tab: tabName,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const result = reponse.data;
        this.zortOrder = result;
        // localStorage.setItem('zortOrder', JSON.stringify(result));
        console.log("orderzort", this.zortOrder);
        console.log("orderpage", pageName);
        console.log("orderpage", tabName);
      } catch (error) {
        console.error(error);
      }
    },
    async getOrderZortHistory(page,month,year,search = '') {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const reponse = await axios.post(
          import.meta.env.VITE_API_BASE_URL +
            "/zort/rest12Tzort/12Trading/getOrderHistory",
          {
            month: month,
            year: year,
            page: page,
            search: search,
            limit: 200,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const result = reponse.data
        this.zortOrderHis = result.orders
        this.totalHis = result.total
        this.totalPages = result.totalPages
        this.currentPage = result.currentPage
        // localStorage.setItem('zortOrder', JSON.stringify(result));
        console.log("orderzortHis", result);
      } catch (error) {
        console.error(error);
      }
    },
    async getOrderHisOption() {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const reponse = await axios.post(
          import.meta.env.VITE_API_BASE_URL +
            "/zort/rest12Tzort/12Trading/getOrderOptions",
          {

          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const result = reponse.data
        this.optionHis = result
        // localStorage.setItem('zortOrder', JSON.stringify(result));
        console.log("optionHis", result);
      } catch (error) {
        console.error(error);
      }
    },
    async addOrderErp() {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const reponse = await axios.post(
          import.meta.env.VITE_API_BASE_URL +
            "/M3API/OrderManage/order/addOrderM3",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const result = reponse.data;
        this.zortOrder = result;
        console.log("orderm3", this.zortOrder);
      } catch (error) {
        console.error(error);
      }
    },
    async addDataOrderLog(order) {
      try {
        const token = JSON.parse(localStorage.getItem("token"));     
        if (order && order.length > 0) {
          // สร้างตัวแปรใหม่ที่เก็บข้อมูล 4 ฟิลด์
          const orderData = order.map(item => ({
            cono: item.cono,
            invno: item.invno,
            number: item.number,
            customerid: item.customerid
          }));
          console.log("orderData", orderData); 
          
        }
      } catch (error) {
        console.error(error);
      }
    },
    async summaryOrderAll(order) {
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
    },
  },
});
