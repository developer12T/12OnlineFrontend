<template>
  <div :class="[
    'p-4 transition-all duration-100 ease-in-out',
    isCollapsed ? 'ml-20' : 'ml-64',
  ]">
    <div class="p-4">
      <!-- Header Section -->
      <div class="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
        <h1 class="text-2xl font-bold text-gray-900 bg-gray-500 text-white p-2 rounded ml-4">แก้ไขที่อยู่จัดส่ง</h1>
        
        <!-- Search and Buttons -->
        <div class="flex gap-2 flex-wrap justify-end">
          <input
            v-model="searchOrderNumber"
            @keyup.enter="searchOrder"
            type="text"
            placeholder="ค้นหาหมายเลขออเดอร์..."
            class="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <button
            @click="searchOrder"
            :disabled="loading"
            class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors disabled:bg-gray-400"
          >
            {{ loading ? 'กำลังค้นหา...' : 'ค้นหา' }}
          </button>
          <button
            @click="refreshSearch"
            :disabled="loading || !searchOrderNumber"
            class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors disabled:bg-gray-400"
            title="โหลดข้อมูลใหม่"
          >
            🔄 รีโหลด
          </button>
          <button
            @click="resetSearch"
            class="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            ล้าง
          </button>
        </div>
      </div>

      <p v-if="error" class="text-red-600 mb-4 text-sm">{{ error }}</p>

      <!-- Success Message -->
      <p v-if="successMessage" class="text-green-600 mb-4 text-sm font-medium">{{ successMessage }}</p>

      <!-- Info Box -->
      <div v-if="filteredOrders.length > 0 && searchOrderNumber" class="mb-4">
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div class="flex items-center flex-wrap gap-2">
            <span class="text-gray-700 font-medium">
              ผลการค้นหา: <span class="font-bold text-green-600">{{ filteredOrders.length }}</span> รายการ
            </span>
          </div>
        </div>
      </div>

      <!-- Table Container -->
      <div
        class="relative flex justify-center m-2 mt-0 overflow-y-scroll shadow-md sm:rounded-lg bg-white"
        style="height: calc(100vh - 280px)"
      >
        <!-- Loading Overlay -->
        <div v-if="loading" class="absolute inset-0 bg-white flex items-center justify-center z-50">
          <div class="flex flex-col items-center space-y-4">
            <div class="animate-spin">
              <svg class="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
            </div>
            <div class="text-lg font-semibold text-gray-700">กำลังโหลดข้อมูล...</div>
          </div>
        </div>

        <!-- Table -->
        <div v-else-if="displayedOrders.length > 0" class="w-full">
          <table class="w-full border-collapse">
            <thead class="sticky top-0 bg-gray-100 border-b">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-900">หมายเลขออเดอร์</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-900">ชื่อผู้รับ</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-900">เบอร์โทร</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-900">ที่อยู่</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-900">สถานะ</th>
                <th class="px-4 py-3 text-center text-xs font-semibold text-gray-900">ดำเนินการ</th>
              </tr>
            </thead>
            <tbody class="bg-white">
              <tr 
                v-for="order in displayedOrders" 
                :key="order.orderNumber"
                class="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td class="px-4 py-3 text-sm text-gray-900">{{ order.orderNumber }}</td>
                <td class="px-4 py-3 text-sm text-gray-900">{{ order.customerName }}</td>
                <td class="px-4 py-3 text-sm text-gray-900">{{ order.phone }}</td>
                <td class="px-4 py-3 text-sm text-gray-600 truncate">{{ order.address }}</td>
                <td class="px-4 py-3 text-sm">
                  <span :class="getStatusClass(order.status)">
                    {{ order.status }}
                  </span>
                </td>
                <td class="px-4 py-3 text-center">
                  <button
                    @click="selectOrder(order)"
                    class="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-sm font-medium transition-colors"
                  >
                    แก้ไข
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- No Results -->
        <div v-else class="absolute inset-0 flex items-center justify-center">
          <div class="text-center">
            <p class="text-gray-500 text-lg font-medium">{{ 
              searchOrderNumber ? 'ไม่พบออเดอร์ที่ค้นหา' : 'กรุณากรอกหมายเลขออเดอร์เพื่อค้นหา'
            }}</p>
          </div>
        </div>
      </div>

    </div>

    <!-- Edit Modal -->
    <div v-if="selectedOrder" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="bg-gray-100 px-6 py-4 border-b flex justify-between items-center sticky top-0">
          <h3 class="text-xl font-semibold text-gray-900">แก้ไขข้อมูลออเดอร์</h3>
          <button
            @click="selectedOrder = null"
            class="text-gray-500 hover:text-gray-700 text-2xl leading-none"
          >
            ✕
          </button>
        </div>

        <div class="p-6">
          <!-- Order Number Display -->
          <div class="mb-4 p-4 bg-gray-50 rounded">
            <p class="text-sm text-gray-600">หมายเลขออเดอร์</p>
            <p class="text-lg font-semibold text-gray-900">{{ selectedOrder.orderNumber }}</p>
          </div>

          <!-- Form Fields -->
          <div class="space-y-4">
            <!-- Customer Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">ชื่อผู้รับ</label>
              <input
                v-model="editForm.customerName"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <!-- Phone -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">เบอร์โทรศัพท์</label>
              <input
                v-model="editForm.phone"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <!-- Address -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">ที่อยู่</label>
              <textarea
                v-model="editForm.address"
                rows="3"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <!-- Province -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">จังหวัด</label>
              <input
                v-model="editForm.province"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <!-- District -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">อำเภอ</label>
              <input
                v-model="editForm.district"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <!-- Postal Code -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">รหัสไปรษณีย์</label>
              <input
                v-model="editForm.postalCode"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="mt-6 flex justify-end gap-3">
            <button
              @click="selectedOrder = null"
              class="px-4 py-2 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition-all duration-200"
            >
              ยกเลิก
            </button>
            <button
              @click="updateOrder"
              :disabled="savingOrder"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 disabled:bg-gray-400"
            >
              {{ savingOrder ? 'กำลังบันทึก...' : 'บันทึก' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
  name: 'AdminPanel',
  setup() {
    const router = useRouter()
    const searchOrderNumber = ref('')
    const loading = ref(false)
    const error = ref('')
    const successMessage = ref('')
    const allOrders = ref([])
    const filteredOrders = ref([])
    const selectedOrder = ref(null)
    const editForm = ref({})
    const savingOrder = ref(false)
    const isCollapsed = ref(true)

    // Listen for collapse changes from sidebar
    onMounted(() => {
      const updateCollapseState = () => {
        const sidebar = document.querySelector('nav[class*="fixed"]')
        if (sidebar) {
          isCollapsed.value = sidebar.classList.contains('w-18')
        }
      }

      // Check initial state
      updateCollapseState()

      // Listen for changes
      const observer = new MutationObserver(updateCollapseState)
      observer.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['class'] })

      return () => observer.disconnect()
    })



    // Search order from MongoDB
    const searchOrder = async () => {
      if (!searchOrderNumber.value.trim()) {
        filteredOrders.value = []
        error.value = ''
        successMessage.value = ''
        return
      }

      try {
        loading.value = true
        error.value = ''
        successMessage.value = ''
        
        // Search from MongoDB via API
        const response = await axios.post(
          import.meta.env.VITE_API_BASE_URL + '/online/api/order/search',
          {
            number: searchOrderNumber.value
          },
          {
            headers: {
              'x-channel': 'uat'
            }
          }
        )

        const results = response.data || []

        if (results.length === 0) {
          error.value = 'ไม่พบออเดอร์ที่ค้นหา'
        }

        filteredOrders.value = results
      } catch (err) {
        error.value = 'เกิดข้อผิดพลาดในการค้นหา'
        console.error(err)
      } finally {
        loading.value = false
      }
    }

    // Refresh search - reload data
    const refreshSearch = async () => {
      successMessage.value = ''
      await searchOrder()
    }

    // Reset search
    const resetSearch = () => {
      searchOrderNumber.value = ''
      filteredOrders.value = []
      error.value = ''
      successMessage.value = ''
    }

    // Select order for editing
    const selectOrder = (order) => {
      selectedOrder.value = order
      editForm.value = {
        customerName: order.customerName || '',
        phone: order.phone || '',
        address: order.address || '',
        province: order.province || '',
        district: order.district || '',
        postalCode: order.postalCode || ''
      }
    }

    // Update order
    const updateOrder = async () => {
      try {
        savingOrder.value = true
        const token = JSON.parse(localStorage.getItem('token'))

        // Call API to update order
        await axios.put(
          import.meta.env.VITE_API_BASE_URL + '/online/api/order/update/' + selectedOrder.value.orderNumber,
          editForm.value,
          {
            headers: {
              'x-channel': 'uat'
            }
          }
        )

        // Close the modal
        selectedOrder.value = null
        
        // Show success message
        successMessage.value = '✓ บันทึกข้อมูลสำเร็จ'
        error.value = ''
        
        // Auto clear success message after 3 seconds
        setTimeout(() => {
          successMessage.value = ''
        }, 3000)

        // Refresh the data by searching again
        await searchOrder()
      } catch (err) {
        console.error(err)
        error.value = '❌ เกิดข้อผิดพลาดในการบันทึก'
        successMessage.value = ''
      } finally {
        savingOrder.value = false
      }
    }

    // Get status class
    const getStatusClass = (status) => {
      const classes = 'px-2 py-1 rounded text-xs font-medium'
      if (status === 'Success') return classes + ' bg-green-100 text-green-800'
      if (status === 'Pending') return classes + ' bg-blue-100 text-blue-800'
      if (status === 'Voided') return classes + ' bg-red-100 text-red-800'
      if (status === 'Waiting') return classes + ' bg-yellow-100 text-yellow-800'
      if (status === 'Shipped') return classes + ' bg-purple-100 text-purple-800'
      return classes + ' bg-gray-100 text-gray-800'
    }

    // Computed displayed orders (only from search)
    const displayedOrders = computed(() => {
      return filteredOrders.value
    })

    return {
      searchOrderNumber,
      loading,
      error,
      successMessage,
      filteredOrders,
      selectedOrder,
      editForm,
      savingOrder,
      isCollapsed,
      searchOrder,
      refreshSearch,
      resetSearch,
      selectOrder,
      updateOrder,
      getStatusClass,
      displayedOrders
    }
  }
}
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
