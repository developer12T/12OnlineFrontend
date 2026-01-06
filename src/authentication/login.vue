<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#0d75ad] via-blue-700 to-[#0369a1] relative overflow-hidden">
    <!-- Background decorative elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-white opacity-10 rounded-full"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-white opacity-10 rounded-full"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white opacity-5 rounded-full"></div>
    </div>

    <div class="max-w-md w-full space-y-6 relative z-10">
      <!-- Logo and Title Section -->
      <div class="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-2xl">
        <!-- Main Logo -->
        <div class="mb-2">
          <img src="/logo-onetwo.png" alt="Logo" class="mx-auto h-16 w-auto drop-shadow-lg" />
        </div>
        
        <!-- Platform Icons Grid -->
        <div class="grid grid-cols-4 gap-6 mb-2 max-w-xs mx-auto">
          <div class="bg-white/20 backdrop-blur-sm rounded-xl p-2 flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-200">
            <img src="/shopee-icon.png" alt="Shopee" class="h-8 w-8 object-contain" />
          </div>
          <div class="bg-white/20 backdrop-blur-sm rounded-xl p-2 flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-200">
            <img src="/lazada-icon.png" alt="Lazada" class="h-8 w-8 object-contain" />
          </div>
          <div class="bg-white/20 backdrop-blur-sm rounded-xl p-2 flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-200">
            <img src="/makro.png" alt="Makro" class="h-8 w-8 object-contain rounded-full" />
          </div>
          <div class="bg-white/20 backdrop-blur-sm rounded-xl p-2 flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-200">
            <img src="/amaze.png" alt="Amaze" class="h-8 w-8 object-contain rounded-full" />
          </div>
        </div>

        <!-- Title and Subtitle -->
        <div class="space-y-2">
          <h2 class="text-xl font-bold text-white drop-shadow-lg">เข้าสู่ระบบ</h2>
          <p class="text-blue-100 text-sm font-medium">ระบบจัดการขายออนไลน์</p>
        </div>
      </div>

      <!-- Login Form -->
      <div class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-4">
        <form @submit.prevent="SignIn" class="space-y-6">
          <!-- Username Field -->
          <div class="space-y-2">
            <label for="username" class="block text-sm font-semibold text-gray-700">
              ชื่อผู้ใช้
            </label>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <input
                id="username"
                v-model="userLogin"
                type="text"
                required
                :disabled="loading"
                class="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-sm transition-all duration-200 shadow-sm hover:shadow-md"
                placeholder="กรอกชื่อผู้ใช้"
              />
            </div>
          </div>

          <!-- Password Field -->
          <div class="space-y-2">
            <label for="password" class="block text-sm font-semibold text-gray-700">
              รหัสผ่าน
            </label>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <input
                id="password"
                v-model="passwordLogin"
                :type="showPassword ? 'text' : 'password'"
                required
                :disabled="loading"
                class="block w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-sm transition-all duration-200 shadow-sm hover:shadow-md"
                placeholder="กรอกรหัสผ่าน"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-4 flex items-center hover:text-gray-600 transition-colors"
              >
                <svg v-if="showPassword" class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                </svg>
                <svg v-else class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="bg-red-50 border border-red-200 rounded-xl p-4 shadow-sm">
            <div class="flex items-center">
              <svg class="h-5 w-5 text-red-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p class="text-sm text-red-700 font-medium">{{ error }}</p>
            </div>
          </div>

          <!-- Login Button -->
          <button
            type="submit"
            :disabled="loading || !userLogin || !passwordLogin"
            class="w-full flex justify-center py-3 px-4 border border-transparent items-center rounded-xl shadow-lg text-sm font-semibold text-white bg-[#00569D] hover:bg-[#00569D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:transform-none"
          >
            <svg v-if="loading" class="animate-spin h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            <svg v-else class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
            </svg>
            {{ loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ' }}
          </button>
        </form>

        <!-- Detail Credentials -->
        <div class="mt-4 p-3 bg-gray-50 rounded-lg">
          <div class="flex items-center mb-2">
            <h4 class="text-xs font-medium text-gray-700">ข้อมูลเข้าสู่ระบบ:</h4>
          </div>
          <div class="text-xs text-gray-600 space-y-0.5">
            <p><strong>Username:</strong> ชื่อภาษาอังกฤษ.(3 ตัวอักษรแรกของนามสกุลผู้ใช้)</p>
            <p><strong>Password:</strong> รหัสผ่านเดียวกับเข้าสู่ระบบคอมพิวเตอร์</p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="text-center">
        <div class="flex items-center justify-center text-blue-100 text-xs">
          <img src="/logo-fplus.png" alt="Logo" class="h-4 w-auto mr-2" />
          Copyright One Two Trading Co., Ltd. All rights reserved.
        </div>
      </div>
    </div>

    <!-- Change Password Modal -->
    <div v-if="showChangePassword" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-xs p-6 relative">
        <h3 class="text-lg font-semibold mb-4 text-center">รหัสผ่านหมดอายุ</h3>
        <form @submit.prevent="submitChangePassword" class="space-y-3">
          <div>
            <label class="block text-xs mb-1">รหัสผ่านเก่า</label>
            <input v-model="changeForm.oldPassword" type="password" class="block w-full border rounded px-3 py-2 text-sm" required />
          </div>
          <div>
            <label class="block text-xs mb-1">รหัสผ่านใหม่</label>
            <input v-model="changeForm.newPassword" type="password" class="block w-full border rounded px-3 py-2 text-sm" required />
          </div>
          <div>
            <label class="block text-xs mb-1">ยืนยันรหัสผ่านใหม่</label>
            <input v-model="changeForm.confirmPassword" type="password" class="block w-full border rounded px-3 py-2 text-sm" required />
          </div>
          <div v-if="changeError" class="text-xs text-red-500">{{ changeError }}</div>
          <div class="flex justify-end space-x-2 mt-2">
            <button type="button" @click="showChangePassword = false" class="px-3 py-1 rounded bg-gray-200 text-gray-700">ยกเลิก</button>
            <button type="submit" class="px-3 py-1 rounded bg-[#00569D] text-white">เปลี่ยนรหัสผ่าน</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "../stores";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      userLogin: "",
      passwordLogin: "",
      showPassword: false,
      loading: false,
      error: "",
      showChangePassword: false,
      changeForm: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      },
      changeError: ""
    };
  },
  methods: {
    async SignIn() {
      if (!this.userLogin || !this.passwordLogin) {
        this.error = "กรุณากรอกข้อมูลให้ครบถ้วน";
        return;
      }

      this.loading = true;
      this.error = "";

      try {
        const authStore = useAuthStore();

        await new Promise(resolve => setTimeout(resolve, 2000));
        const result = await authStore.login(this.userLogin, this.passwordLogin);
        
        // Check for successful login (status 200)
        if (result && result.status === 200) {
          this.userLogin = "";
          this.passwordLogin = "";
          this.$router.push("/onlineManage");
        } 
        // Check for access denied (status 403)
        else if (result && result.status === 403) {
          this.error = result.message || "คุณไม่มีสิทธิ์เข้าถึงระบบนี้ กรุณาติดต่อผู้ดูแลระบบ";
        }
        // Check for password expired
        else if (result && (result.code === 'PASSWORD_EXPIRED' || result.error === 'PASSWORD_EXPIRED')) {
          // Show change password modal
          this.showChangePassword = true;
          this.changeForm.oldPassword = this.passwordLogin;
          this.changeForm.newPassword = "";
          this.changeForm.confirmPassword = "";
          this.changeError = "";
        } 
        // Check for invalid credentials (status 401)
        else if (result && result.status === 401) {
          this.error = "รหัสผ่านผิด";
        }
        // Other error cases
        else {
          this.error = result?.error || result?.message || "เข้าสู่ระบบไม่สำเร็จ";
        }
      } catch (error) {
        this.error = "เกิดข้อผิดพลาดในการเข้าสู่ระบบ";
        console.error("Login error:", error);
      } finally {
        this.loading = false;
      }
    },

    async submitChangePassword() {
      this.changeError = "";
      
      if (!this.changeForm.oldPassword || !this.changeForm.newPassword || !this.changeForm.confirmPassword) {
        this.changeError = "กรุณากรอกข้อมูลให้ครบถ้วน";
        return;
      }
      
      if (this.changeForm.newPassword !== this.changeForm.confirmPassword) {
        this.changeError = "รหัสผ่านใหม่ไม่ตรงกัน";
        return;
      }
      
      if (this.changeForm.newPassword.length < 6) {
        this.changeError = "รหัสผ่านใหม่ต้องมีอย่างน้อย 6 ตัวอักษร";
        return;
      }

      try {
        // Here you would call your API to change password
        // For now, we'll just show a success message
        await Swal.fire({
          title: "สำเร็จ",
          text: "เปลี่ยนรหัสผ่านสำเร็จ กรุณาเข้าสู่ระบบใหม่",
          icon: "success",
          confirmButtonText: "ตกลง"
        });
        
        this.showChangePassword = false;
        this.passwordLogin = "";
      } catch (error) {
        this.changeError = error.message || "เกิดข้อผิดพลาด";
      }
    }
  }
};
</script>

<style scoped>
/* Custom animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.min-h-screen {
  animation: fadeIn 0.6s ease-out;
}

/* Custom focus styles */
input:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Loading animation */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
