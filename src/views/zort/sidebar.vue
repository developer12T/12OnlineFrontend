<template>
  <!-- Collapsible Sidebar -->
  <div :class="[
    'fixed top-0 left-0 z-40 h-screen transition-all duration-1000 ease-in-out flex flex-col bg-sky-700 text-white transform',
    isCollapsed ? 'w-18 translate-x-0' : 'w-64 translate-x-0'
  ]">
    <!-- Header with Logo -->
    <div class="p-4 border-b border-sky-800 flex-shrink-0">
      <div class="flex items-center justify-between">
        <div v-if="!isCollapsed" class="flex items-center space-x-3 transition-all duration-500 ease-in-out transform"
          :class="isCollapsed ? 'opacity-0 scale-95 -translate-x-4' : 'opacity-100 scale-100 translate-x-0'">
          <img src="/logo-onetwo.png" alt="Company Logo" class="h-8 w-auto transition-all duration-500 ease-in-out" />
          <h5 class="text-sm font-semibold transition-all duration-500 ease-in-out">Online Management</h5>
        </div>
        <button @click="toggleCollapse"
          class="p-2 px-4 rounded-lg hover:bg-sky-600 transition-all duration-200 ease-in-out transform hover:scale-105">
          <svg class="w-5 h-5 transition-transform duration-500 ease-in-out" :class="isCollapsed ? 'rotate-180' : ''"
            fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Navigation - Scrollable -->
    <nav class="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar-sidebar">
      <div class="p-3">
        <ul class="space-y-1">
          <!-- Dashboard -->
          <li>
            <router-link :to="isCollapsed ? undefined : '/onlineManage/dashboard'"
              @click.prevent="isCollapsed ? showPopup($event, 'dashboard') : null"
              class="flex items-center p-3 text-white rounded-lg hover:bg-sky-600 transition-all duration-200 ease-in-out group transform hover:scale-105">
              <svg v-if="!isCollapsed"
                class="w-5 h-5 text-gray-300 group-hover:text-white transition-all duration-200 ease-in-out"
                fill="currentColor" viewBox="0 0 22 21">
                <path
                  d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                <path
                  d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
              </svg>
              <span v-if="!isCollapsed"
                class="ml-3 text-sm font-medium transition-all duration-500 ease-in-out transform"
                :class="isCollapsed ? 'opacity-0 -translate-x-4' : 'opacity-100 translate-x-0'">หน้าแรก</span>
              <span v-else
                class="text-xs text-center flex items-center flex-col transition-all duration-500 ease-in-out transform"
                :class="isCollapsed ? 'opacity-100 scale-100' : 'opacity-0 scale-95'"> <svg
                  class="w-5 h-5 text-gray-300 group-hover:text-white transition-all duration-200 ease-in-out"
                  fill="currentColor" viewBox="0 0 22 21">
                  <path
                    d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path
                    d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg><span class="text-[10px]">หน้าแรก</span></span>
            </router-link>
          </li>

          <!-- Orders Dropdown -->
          <li>
            <button type="button" @click="isCollapsed ? showPopup($event, 'orders') : toggleOrderMenu()"
              class="flex items-center w-full p-3 text-left hover:bg-sky-600 transition-all duration-200 ease-in-out rounded-lg group transform hover:scale-105"
              :class="isCollapsed ? 'justify-center' : 'justify-between'">
              <div class="flex items-center" :class="isCollapsed ? 'flex-col justify-center' : 'flex-row space-x-3'">
                <svg class="w-5 h-5 text-gray-300 group-hover:text-white transition-all duration-200 ease-in-out"
                  fill="currentColor" viewBox="0 0 18 21">
                  <path
                    d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                </svg>
                <span v-if="!isCollapsed" class="text-sm font-medium transition-all duration-500 ease-in-out transform"
                  :class="isCollapsed ? 'opacity-0 -translate-x-4' : 'opacity-100 translate-x-0'">รายการขาย</span>
                <span v-else class="text-[10px] text-center transition-all duration-500 ease-in-out transform"
                  :class="isCollapsed ? 'opacity-100 scale-100' : 'opacity-0 scale-95'">ขาย</span>
              </div>
              <svg v-if="!isCollapsed" class="w-4 h-4 transition-all duration-500 ease-in-out transform"
                :class="[orderMenuOpen ? 'rotate-180' : '', isCollapsed ? 'opacity-0 scale-95' : 'opacity-100 scale-100']"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            <!-- Order Submenu -->
            <ul v-if="orderMenuOpen && !isCollapsed"
              class="ml-4 border-l border-sky-800 space-y-1 transition-all duration-500 ease-in-out transform"
              :class="orderMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'">
              <li>
                <router-link to="/onlineManage/order/reciept" @click="setPage('receipt')"
                  class="flex items-center w-full p-2 text-gray-200 hover:text-white hover:bg-sky-600 transition-all duration-200 ease-in-out rounded text-sm transform hover:scale-105">
                  <span class="ml-4">พิมพ์ใบเสร็จ</span>
                </router-link>
              </li>
              <li>
                <router-link to="/onlineManage/order/erp" @click="setPage('preparem3')"
                  class="flex items-center w-full p-2 text-gray-200 hover:text-white hover:bg-sky-600 transition-all duration-200 ease-in-out rounded text-sm transform hover:scale-105">
                  <span class="ml-4">รอนำเข้า ERP</span>
                </router-link>
              </li>
              <li>
                <router-link to="/onlineManage/order/reprint" @click="setPage('reprint')"
                  class="flex items-center w-full p-2 text-gray-200 hover:text-white hover:bg-sky-600 transition-all duration-200 ease-in-out rounded text-sm transform hover:scale-105">
                  <span class="ml-4">รีปริ้นส์</span>
                </router-link>
              </li>
            </ul>
          </li>

          <!-- QrCode -->
          <li>
            <a href="https://main.onetwotrading.co.th/12Trading/12Tools/index.php" target="_blank"
              class="flex items-center p-3 text-white rounded-lg hover:bg-sky-600 transition-all duration-200 ease-in-out group transform hover:scale-105">
              <svg v-if="!isCollapsed" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor"
                  d="M3 11h8V3H3zm2-6h4v4H5zM3 21h8v-8H3zm2-6h4v4H5zm8-12v8h8V3zm6 6h-4V5h4zm-5.99 4h2v2h-2zm2 2h2v2h-2zm-2 2h2v2h-2zm4 0h2v2h-2zm2 2h2v2h-2zm-4 0h2v2h-2zm2-6h2v2h-2zm2 2h2v2h-2z" />
              </svg>
              <span v-if="!isCollapsed"
                class="ml-3 text-sm font-medium transition-all duration-500 ease-in-out transform"
                :class="isCollapsed ? 'opacity-0 -translate-x-4' : 'opacity-100 translate-x-0'">QrCode</span>
              <span v-else
                class="text-xs text-center flex items-center flex-col transition-all duration-500 ease-in-out transform"
                :class="isCollapsed ? 'opacity-100 scale-100' : 'opacity-0 scale-95'"> <svg
                  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="currentColor"
                    d="M3 11h8V3H3zm2-6h4v4H5zM3 21h8v-8H3zm2-6h4v4H5zm8-12v8h8V3zm6 6h-4V5h4zm-5.99 4h2v2h-2zm2 2h2v2h-2zm-2 2h2v2h-2zm4 0h2v2h-2zm2 2h2v2h-2zm-4 0h2v2h-2zm2-6h2v2h-2zm2 2h2v2h-2z" />
                </svg><span class="text-[10px]">QrCode</span>
              </span>
            </a>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Footer -->
    <div class="p-4 border-t border-sky-800 flex-shrink-0">
      <!-- User Info Section -->
      <div v-if="!isCollapsed" class="mb-3 transition-all duration-500 ease-in-out transform"
        :class="isCollapsed ? 'opacity-0 scale-95 -translate-x-4' : 'opacity-100 scale-100 translate-x-0'">
        <div
          class="flex items-center space-x-3 p-2 bg-sky-800 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105">
          <div
            class="w-8 h-8 bg-sky-600 rounded-full flex items-center justify-center transition-all duration-200 ease-in-out">
            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-white truncate transition-all duration-500 ease-in-out">{{
              userInfo.fullname || userInfo.name || 'ผู้ใช้งาน' }}</p>
            <p class="text-xs text-gray-300 truncate transition-all duration-500 ease-in-out">{{
              userInfo.departmentDescrip || userInfo.email || 'user@example.com' }}</p>
          </div>
        </div>
      </div>

      <!-- User Info Collapsed -->
      <div v-else class="mb-3 flex justify-center transition-all duration-500 ease-in-out transform"
        :class="isCollapsed ? 'opacity-100 scale-100' : 'opacity-0 scale-95'">
        <div
          class="w-8 h-8 bg-sky-600 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-110"
          @click="showUserInfoPopup($event)">
          <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>

      <!-- Logout Button -->
      <button @click="confirmLogout"
        class="w-full flex items-center space-x-3 px-2 py-2 hover:bg-sky-600 rounded transition-all duration-200 ease-in-out text-sm transform hover:scale-105"
        :class="isCollapsed ? 'justify-center flex-col items-center space-y-1' : ''">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <g fill="none">
            <path fill="#e94e4e" fill-rule="evenodd"
              d="M10.138 1.815A3 3 0 0 1 14 4.688v14.624a3 3 0 0 1-3.862 2.873l-6-1.8A3 3 0 0 1 2 17.512V6.488a3 3 0 0 1 2.138-2.873zM15 4a1 1 0 0 1 1-1h3a3 3 0 0 1 3 3v1a1 1 0 1 1-2 0V6a1 1 0 0 0-1-1h-3a1 1 0 0 1-1-1m6 12a1 1 0 0 1 1 1v1a3 3 0 0 1-3 3h-3a1 1 0 1 1 0-2h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1M9 11a1 1 0 1 0 0 2h.001a1 1 0 1 0 0-2z"
              clip-rule="evenodd" />
            <path stroke="#e94e4e" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M16 12h5m0 0l-2-2m2 2l-2 2" />
          </g>
        </svg>
        <span v-if="!isCollapsed" class="text-red-400 text-sm transition-all duration-500 ease-in-out transform"
          :class="isCollapsed ? 'opacity-0 -translate-x-4' : 'opacity-100 translate-x-0'">ออกจากระบบ</span>
      </button>


    </div>
  </div>


  <!-- User Info Popup for Collapsed Sidebar -->
  <div v-if="showUserPopup && isCollapsed"
    class="fixed z-50 bg-slate-800 rounded-lg shadow-xl border border-slate-700 transition-all duration-300 ease-in-out transform"
    :class="showUserPopup ? 'scale-100 opacity-100' : 'scale-95 opacity-0'" :style="userPopupStyle" data-user-popup>
    <div class="p-3 border-b border-slate-700 flex-shrink-0">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <svg class="w-5 h-5 text-sky-500 transition-all duration-200 ease-in-out" fill="currentColor"
            viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
          </svg>
          <span class="font-semibold text-white text-sm transition-all duration-200 ease-in-out">ข้อมูลผู้ใช้</span>
        </div>
        <button @click="hideUserPopup"
          class="p-1 hover:bg-slate-600 rounded transition-all duration-200 ease-in-out transform hover:scale-110">
          <svg class="w-4 h-4 text-gray-400 hover:text-white transition-all duration-200 ease-in-out" fill="none"
            stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>

    <div class="p-3">
      <div class="flex items-center space-x-3 mb-3">
        <div
          class="w-10 h-10 bg-sky-600 rounded-full flex items-center justify-center transition-all duration-200 ease-in-out transform hover:scale-110">
          <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
          </svg>
        </div>
        <div>
          <p class="text-sm font-medium text-white transition-all duration-200 ease-in-out">{{ userInfo.name }}</p>
          <p class="text-xs text-gray-300 transition-all duration-200 ease-in-out">{{ userInfo.email }}</p>
        </div>
      </div>

      <div class="space-y-1">
        <!-- <div v-if="userInfo.department" class="text-xs text-gray-400 transition-all duration-200 ease-in-out">
          <span>แผนก:</span>
          <span class="text-white ml-1">{{ userInfo.department }}</span>
        </div>
        <div v-if="userInfo.departmentDescrip" class="text-xs text-gray-400 transition-all duration-200 ease-in-out">
          <span>รายละเอียดแผนก:</span>
          <span class="text-white ml-1">{{ userInfo.departmentDescrip }}</span>
        </div> -->
        <!-- <div class="text-xs text-gray-400 transition-all duration-200 ease-in-out">
          <span>สิทธิ์:</span>
          <span class="text-white ml-1">{{ userInfo.role }}</span>
        </div> -->
        <!-- <div class="text-xs text-gray-400 transition-all duration-200 ease-in-out">
          <span>เข้าสู่ระบบ:</span>
          <span class="text-white ml-1">{{ userInfo.lastLogin }}</span>
        </div> -->
      </div>
    </div>
  </div>

  <!-- Logout Confirmation Modal -->
  <div v-if="showLogoutModal"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 transition-all duration-300 ease-in-out">
    <div
      class="bg-white rounded-lg shadow-xl w-full max-w-xs p-6 relative transition-all duration-300 ease-in-out transform"
      :class="showLogoutModal ? 'scale-100 opacity-100' : 'scale-95 opacity-0'">
      <div class="flex items-center justify-center mb-4">
        <svg class="w-12 h-12 text-red-500 transition-all duration-300 ease-in-out transform hover:scale-110"
          fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      </div>

      <h3 class="text-lg font-semibold text-gray-900 mb-2 text-center transition-all duration-200 ease-in-out">
        ยืนยันการออกจากระบบ</h3>
      <p class="text-center text-gray-500 mb-6 transition-all duration-200 ease-in-out">คุณต้องการออกจากระบบใช่หรือไม่?
      </p>

      <div class="flex space-x-3">
        <button @click="cancelLogout"
          class="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200 ease-in-out transform hover:scale-105">
          ยกเลิก
        </button>
        <button @click="proceedLogout"
          class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 ease-in-out transform hover:scale-105">
          ออกจากระบบ
        </button>
      </div>
    </div>
  </div>

  <!-- Popup Menu for Collapsed Sidebar -->
  <div v-if="showPopupMenu && isCollapsed"
    class="fixed z-50 bg-slate-800 rounded-lg shadow-xl border border-slate-700 max-h-[80vh] overflow-y-auto transition-all duration-300 ease-in-out transform"
    :class="showPopupMenu ? 'scale-100 opacity-100' : 'scale-95 opacity-0'" :style="popupStyle" data-popup>
    <div class="p-3 border-b border-slate-700 flex-shrink-0">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <svg v-if="activePopup === 'dashboard'" class="w-5 h-5 text-sky-500 transition-all duration-200 ease-in-out"
            fill="currentColor" viewBox="0 0 22 21">
            <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
            <path
              d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
          </svg>
          <svg v-else-if="activePopup === 'orders'" class="w-5 h-5 text-sky-500 transition-all duration-200 ease-in-out"
            fill="currentColor" viewBox="0 0 18 21">
            <path
              d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
          </svg>
          <span class="font-semibold text-white text-sm transition-all duration-200 ease-in-out">
            {{ activePopup === 'dashboard' ? 'หน้าแรก' : 'รายการขาย' }}
          </span>
        </div>
        <button @click="hidePopup"
          class="p-1 hover:bg-slate-600 rounded transition-all duration-200 ease-in-out transform hover:scale-110">
          <svg class="w-4 h-4 text-gray-400 hover:text-white transition-all duration-200 ease-in-out" fill="none"
            stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
    
    <div class="p-2">
      <!-- Dashboard Menu -->
      <div v-if="activePopup === 'dashboard'">
        <router-link to="/onlineManage/dashboard"
          class="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-sky-600 rounded transition-all duration-200 ease-in-out transform hover:scale-105">
          <div class="flex items-center space-x-2">
            <svg class="w-4 h-4 transition-all duration-200 ease-in-out" fill="currentColor" viewBox="0 0 22 21">
              <path
                d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
              <path
                d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
            </svg>
            <span class="transition-all duration-200 ease-in-out">หน้าแรก</span>
          </div>
        </router-link>
      </div>

      <!-- Orders Menu -->
      <div v-if="activePopup === 'orders'">
        <!-- พิมพ์ใบเสร็จ -->
        <router-link to="/onlineManage/order/reciept" @click="setPage('receipt'); hidePopup()"
          class="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-sky-600 rounded transition-all duration-200 ease-in-out transform hover:scale-105">
          <div class="flex items-center space-x-2">
            <svg class="w-4 h-4 transition-all duration-200 ease-in-out" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fill-rule="evenodd"
                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                clip-rule="evenodd" />
            </svg>
            <span class="transition-all duration-200 ease-in-out">พิมพ์ใบเสร็จ</span>
          </div>
        </router-link>

        <!-- รอนำเข้า ERP -->
        <router-link to="/onlineManage/order/erp" @click="setPage('preparem3'); hidePopup()"
          class="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-sky-600 rounded transition-all duration-200 ease-in-out transform hover:scale-105">
          <div class="flex items-center space-x-2">
            <svg class="w-4 h-4 transition-all duration-200 ease-in-out" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd" />
            </svg>
            <span class="transition-all duration-200 ease-in-out">รอนำเข้า ERP</span>
          </div>
        </router-link>

        <!-- พิมพ์ใบเสร็จย้อนหลัง -->
        <router-link to="/onlineManage/order/reprint" @click="setPage('summary'); hidePopup()"
          class="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-sky-600 rounded transition-all duration-200 ease-in-out transform hover:scale-105">
          <div class="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 transition-all duration-200 ease-in-out"
              viewBox="0 0 50 50">
              <path fill="currentColor"
                d="M25 38c-7.2 0-13-5.8-13-13s5.8-13 13-13c5.4 0 10.1 3.4 11.9 8.7l-1.9.7c-1.5-4.6-5.4-7.4-10-7.4c-6.1 0-11 4.9-11 11s4.9 11 11 11c4.3 0 8.2-2.5 10-6.4l1.8.8C34.7 35 30.1 38 25 38" />
              <path fill="currentColor" d="M38 22h-8v-2h6v-6h2z" />
            </svg>
            <span class="transition-all duration-200 ease-in-out">พิมพ์ใบเสร็จย้อนหลัง</span>
          </div>
        </router-link>
      </div>
    </div>

  </div>

  <!-- Overlay to close popup when clicking outside -->
  <div v-if="showPopupMenu && isCollapsed" @click="hidePopup"
    class="fixed inset-0 z-40 bg-transparent transition-all duration-300 ease-in-out"></div>

  <!-- Footer -->
  <div
    class="flex z-50 fixed bottom-0 w-full items-center justify-start  mt-3 transition-all duration-500 ease-in-out transform"
    :class="isCollapsed ? 'ml-24 mb-2' : 'ml-72 mb-2'">
    <img src="/logo-fplus.png" alt="logo" class="h-4 object-contain transition-all duration-500 ease-in-out" />
    <span class="text-xs text-gray-500 ml-2 transition-all duration-500 ease-in-out">
      Copyright © 2025 One Two Trading Co., Ltd. All rights reserved.
    </span>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import { initCollapses, initDrawers } from "flowbite";
import Swal from "sweetalert2";
export default {
  setup() {
    const isCollapsed = ref(true);
    const orderMenuOpen = ref(false);
    const showPopupMenu = ref(false);
    const activePopup = ref('');
    const popupStyle = ref({});
    const showUserPopup = ref(false);
    const userPopupStyle = ref({});
    const showLogoutModal = ref(false);

    const userData = JSON.parse(localStorage.getItem('user'));
    console.log(userData.user.company);

    const userInfo = ref({
      name: userData.user.fullNameThai,
      email: userData.user.email,
      company: userData.user.company,
      // fullname: userData.fullname || '',
      // department: userData.department || '',
      // departmentDescrip: userData.departmentDescrip || '',
      // role: localStorage.getItem('userRole'),
      // lastLogin: localStorage.getItem('lastLogin')
    });

    console.log(userInfo.value);

    function toggleCollapse() {
      isCollapsed.value = !isCollapsed.value;
      if (!isCollapsed.value) {
        hidePopup();
      }
    }

    function toggleOrderMenu() {
      if (!isCollapsed.value) {
        orderMenuOpen.value = !orderMenuOpen.value;
      }
    }

    function showPopup(event, menuType) {
      event.preventDefault();
      event.stopPropagation();

      const rect = event.currentTarget.getBoundingClientRect();
      activePopup.value = menuType;
      showPopupMenu.value = true;

      // Position popup to the right of the collapsed sidebar
      popupStyle.value = {
        left: '72px', // 18 * 4 = 72px (w-18)
        top: `${rect.top}px`,
        minWidth: '200px',
        maxWidth: '250px'
      };

      // Add click outside listener
      setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
      }, 100);
    }

    function showUserInfoPopup(event) {
      event.preventDefault();
      event.stopPropagation();

      const rect = event.currentTarget.getBoundingClientRect();
      showUserPopup.value = true;

      // Position user popup to the right of the collapsed sidebar
      userPopupStyle.value = {
        left: '72px', // 18 * 4 = 72px (w-18)
        top: `${rect.top - 100}px`, // Position above the button
        minWidth: '250px',
        maxWidth: '300px'
      };

      // Add click outside listener
      setTimeout(() => {
        document.addEventListener('click', handleUserPopupClickOutside);
      }, 100);
    }

    function hidePopup() {
      showPopupMenu.value = false;
      activePopup.value = '';
      document.removeEventListener('click', handleClickOutside);
    }

    function hideUserPopup() {
      showUserPopup.value = false;
      document.removeEventListener('click', handleUserPopupClickOutside);
    }

    function handleClickOutside(event) {
      const popup = document.querySelector('[data-popup]');
      if (popup && !popup.contains(event.target)) {
        hidePopup();
      }
    }

    function handleUserPopupClickOutside(event) {
      const userPopup = document.querySelector('[data-user-popup]');
      if (userPopup && !userPopup.contains(event.target)) {
        hideUserPopup();
      }
    }

    function setPage(pageName) {
      localStorage.setItem("orderPage", pageName);
    }

    function confirmLogout() {
      showLogoutModal.value = true;
    }

    function cancelLogout() {
      showLogoutModal.value = false;
    }

    function proceedLogout() {
      // Clear all user data from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('orderPage');

      // Close all modals
      showLogoutModal.value = false;
      showPopupMenu.value = false;
      showUserPopup.value = false;
      // Show SweetAlert2 loading dialog
      if (typeof Swal !== 'undefined') {
        Swal.fire({
          title: 'กำลังออกจากระบบ...',
          text: 'กรุณารอสักครู่',
          allowOutsideClick: false,
          allowEscapeKey: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });
      }
      setTimeout(() => {
        // Redirect to login page
        window.location.href = '/login';
      }, 1000);
    }

    // Load user info from localStorage on mount
    onMounted(() => {
      initCollapses();
      initDrawers();

      // Load user info
      userInfo.value = {
        name: userData.user.fullNameThai,
        email: userData.user.email,
        company: userData.user.company,
      };
    });

    onUnmounted(() => {
      // Clean up event listeners
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('click', handleUserPopupClickOutside);
    });

    return {
      isCollapsed,
      orderMenuOpen,
      showPopupMenu,
      activePopup,
      popupStyle,
      showUserPopup,
      userPopupStyle,
      showLogoutModal,
      userInfo,
      toggleCollapse,
      toggleOrderMenu,
      showPopup,
      hidePopup,
      showUserInfoPopup,
      hideUserPopup,
      setPage,
      confirmLogout,
      cancelLogout,
      proceedLogout
    };
  },
};
</script>

<style scoped>
/* Custom scrollbar for the navigation */
nav::-webkit-scrollbar {
  width: 4px;
}

nav::-webkit-scrollbar-track {
  background: transparent;
}

nav::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
}

nav::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Popup animations */
.popup-enter-active,
.popup-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.popup-enter-from,
.popup-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>
