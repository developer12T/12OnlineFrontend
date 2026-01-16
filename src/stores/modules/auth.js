import { defineStore } from "pinia";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")),
    token: JSON.parse(localStorage.getItem("token")),
   
  }),
  mounted(){
    if(this.token){
      router.push("/");
    }
  },
  getters: {
    isLoggedIn: (state) => state.user,
  },
  actions: {
    async login(userLogin, passwordLogin) {
      try {
        const response = await axios.post(
          // import.meta.env.VITE_API_BASE_URL + "/12lmsapi/api/auth/login",
          'http://192.168.2.97:8383' + "/12Trading/authen",
          { username: userLogin, password: passwordLogin },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        
        // Success case - status 200
        const user = response.data;
        console.log("login success", user);
        
        if (user && user.token) {
          // Check department and position access
          const hasAccess = this.checkUserAccess(user);
          
          if (!hasAccess) {
            this.logout();
            return {
              status: 403,
              success: false,
              message: "คุณไม่มีสิทธิ์เข้าถึงระบบนี้ กรุณาติดต่อผู้ดูแลระบบ"
            };
          }
          
          this.user = user;
          this.token = user.token;
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", JSON.stringify(user.token));
          
          return {
            status: 200,
            success: true,
            data: user
          };
        } else {
          this.logout();
          return {
            status: 400,
            success: false,
            message: "ข้อมูลการเข้าสู่ระบบไม่ถูกต้อง"
          };
        }
      } catch (error) {
        console.error("Login error:", error);
        
        // Handle 401 Unauthorized (Invalid credentials)
        if (error.response && error.response.status === 401) {
          return {
            status: 401,
            success: false,
            error: "Invalid username or password"
          };
        }
        
        // Handle other errors
        return {
          status: error.response?.status || 500,
          success: false,
          message: error.response?.data?.error || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ"
        };
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },

    checkUserAccess(user) {
      // Check if user has required department or position
      const allowedDepartments = [
        "Information Technology Department",
        "Logistics Department"
      ];
      
      const allowedPosition = "Online Sales Officer";
      
      // Check if user's department is in allowed list
      if (user.department && allowedDepartments.includes(user.department)) {
        return true;
      }
      
      // Check if user has the allowed position
      if (user.position && user.position === allowedPosition) {
        return true;
      }
      
      // If neither condition is met, deny access
      return true;
    },
  },
});
