import { defineStore } from "pinia";
import axios from "axios";

export const useItemStore = defineStore("item", {
  state: () => ({
    zortItem: [],
    erpItem: [],
  }),
  getter: {
    getItemZort: (state) => state.zortItem,
    getItemERP: (state) => state.erpItem,
  },
  actions: {
    async getProductZort() {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const reponse = await axios.post(
          import.meta.env.VITE_API_BASE_URL +
            "/zort/product/ProductManage/getProduct",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const result = reponse.data;
        this.zortItem = result;
        // localStorage.setItem('zortItem', JSON.stringify(result));
        console.log("itemzort", this.zortItem);
      } catch (error) {
        console.error(error);
      }
    },
    async getProductERP() {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const reponse = await axios.post(
          import.meta.env.VITE_API_BASE_URL +
            "/M3API/StockManage/Stock/getStock",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const result = reponse.data;
        this.erpItem = result;
        // localStorage.setItem('zortItem', JSON.stringify(result));
        console.log("itemerp", this.erpItem);
      } catch (error) {
        console.error(error);
      }
    },
    async updateErpStock() {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const response = await axios.put(
          import.meta.env.VITE_API_BASE_URL +
            "/zort/product/ProductManage/updateStock12T",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const result = response.data;
        this.erpItem = result
        console.log("stock",this.erpItem);
        return this.erpItem;
      } catch (error) {
        console.error(error);
      }
    },
    async updateZortStock() {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const response = await axios.put(
          import.meta.env.VITE_API_BASE_URL +
            "/zort/product/ProductManage/addProduct",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const result = response.data;
        this.erpItem = result
        console.log("stock",this.erpItem);
        return this.erpItem;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
