import { defineStore } from "pinia";
import axios from "axios";
import { ErrorHandler } from "../../utils/errorHandler.js";

export const useDashboardStore = defineStore("dashboard", {
  state: () => ({
    zortDashboard: [],
  }),
  getter: {
    getDashboardZort: (state) => state.zortDashboard,
  },
  actions: {
    async getDashboard() {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const response = await axios.post(
          import.meta.env.VITE_API_BASE_URL + "/online/api/order/getDashboardData",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "x-channel": "uat"        // 👈 header ตัวใหม่
            },
          }
        );
        const result = response.data[0];
        this.zortDashboard = result;
        console.log("dashboard", this.zortDashboard);
      } catch (error) {
        console.error(error);

        // Use centralized error handler
        ErrorHandler.handleApiError(error);
      }
    },
  },
});