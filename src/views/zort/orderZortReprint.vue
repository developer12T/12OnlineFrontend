<template>
  <div :class="[
    'p-4 transition-all duration-100 ease-in-out',
    isCollapsed ? 'ml-20' : 'ml-64',
  ]">
    <div class="p-4">
      <div class="flex flex-col-reverse sm:flex-row justify-end items-center mb-4">
        <div class="mr-auto flex items-center space-x-3 ml-2">
          <!-- Date Range Inputs -->
          <div class="flex items-center space-x-2 bg-white rounded-lg p-2 shadow-md">
            <div class="flex items-center space-x-2">
              <label class="text-sm font-medium text-gray-700">วันที่เริ่มต้น:</label>
              <input v-model="startDate" type="text" placeholder="YYYY-MM-DD"
                class="px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" />
            </div>
            <div class="flex items-center space-x-2">
              <label class="text-sm font-medium text-gray-700">วันที่สิ้นสุด:</label>
              <input v-model="endDate" type="text" placeholder="YYYY-MM-DD"
                class="px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" />
            </div>
            <button @click="searchDate"
              class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded text-sm font-medium transition-colors">
              ค้นหา
            </button>
            <button @click="clearDateFilter"
              class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 rounded text-sm font-medium transition-colors">
              ล้าง
            </button>
          </div>
        </div>

        <!-- Search Bar -->
        <div class="flex items-center sm:order-1 mb-4 sm:mb-0 ml-4">
          <SearchOrder :searchBar="textInput" @search="handleSearch" />
        </div>

        <!-- Print Buttons -->
        <div class="flex items-center space-x-2">
          <button @click="printCopy"
            class="bg-green-500 hover:bg-green-600 text-white shadow-lg border border-green-500 hover:border-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-md text-sm px-5 py-2 text-center mb-2 sm:mb-0 dark:bg-green-600 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-700 dark:focus:ring-green-800"
            :class="{ 'pointer-events-none opacity-50': !isItemSelected }">
            พิมพ์สำเนา
            {{ selected.length > 0 ? selected.length + " ใบ" : "" }}
          </button>
          <button @click="printAll"
            class="bg-blue-500 hover:bg-blue-600 text-white shadow-lg border border-blue-500 hover:border-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2 text-center mb-2 sm:mb-0 dark:bg-blue-600 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            พิมพ์ทั้งหมด
            {{ filteredItems.length > 0 ? filteredItems.length + " ใบ" : "" }}
          </button>
          <button @click="printSummary(selected)"
            class="bg-[#007BFF] shadow-md flex items-center hover:bg-green-600 text-white border border-[#007BFF] hover:border-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 gap-2 font-medium rounded-md text-sm px-5 py-2 text-center mb-2 sm:mb-0 dark:bg-green-600 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-700 dark:focus:ring-green-800 sm:ml-4"
            :class="{ 'pointer-events-none': !isItemSelected }">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor"
                d="M9 18q-.825 0-1.412-.587T7 16V4q0-.825.588-1.412T9 2h9q.825 0 1.413.588T20 4v12q0 .825-.587 1.413T18 18zm0-2h9V4H9zM4 8q-.425 0-.712-.288T3 7t.288-.712T4 6t.713.288T5 7t-.288.713T4 8m0 3.5q-.425 0-.712-.288T3 10.5t.288-.712T4 9.5t.713.288T5 10.5t-.288.713T4 11.5M4 15q-.425 0-.712-.288T3 14t.288-.712T4 13t.713.288T5 14t-.288.713T4 15m0 3.5q-.425 0-.712-.288T3 17.5t.288-.712T4 16.5t.713.288T5 17.5t-.288.713T4 18.5M4 22q-.425 0-.712-.288T3 21t.288-.712T4 20t.713.288T5 21t-.288.713T4 22m3.5 0q-.425 0-.712-.288T6.5 21t.288-.712T7.5 20t.713.288T8.5 21t-.288.713T7.5 22m3.5 0q-.425 0-.712-.288T10 21t.288-.712T11 20t.713.288T12 21t-.288.713T11 22m3.5 0q-.425 0-.712-.288T13.5 21t.288-.712T14.5 20t.713.288t.287.712t-.288.713T14.5 22" />
            </svg>
            ใบรวม
            {{ selected.length > 0 ? selected.length + " รายการ" : "" }}
          </button>
        </div>
      </div>

      <!-- Count Display -->
      <div class="mb-4">
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div class="flex items-center flex-wrap gap-2">
            <!-- <svg class="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg> -->

            <!-- Date Range Badge -->
            <!-- <div v-if="startDate || endDate" class="flex items-center space-x-2">
            <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {{ getDateRangeText() }}
            </span>
            <span class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {{ filteredItems.length }} รายการ
            </span>
          </div> -->

            <!-- Date-wise Badges -->
            <div v-if="dateWiseCounts.length > 0" class="flex items-center space-x-2 flex-wrap">
              <span v-for="dateCount in dateWiseCounts" :key="dateCount.date"
                class="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {{ dateCount.date }} : {{ dateCount.count }} รายการ
              </span>
            </div>

            <!-- Total Count -->
            <!-- <span class="text-blue-700 font-medium">
            พบรายการทั้งหมด: <span class="font-bold">{{ filteredItems.length }}</span> รายการ
          </span> -->

            <!-- Selected Count -->
            <span v-if="selected.length > 0" class="ml-4 text-green-700 font-medium">
              เลือกแล้ว: <span class="font-bold">{{ selected.length }}</span> รายการ
            </span>
          </div>
        </div>
      </div>

      <!-- Table Container -->
      <div
        class="relative flex justify-center m-2 mt-0 md:h-[470px] lg:h-[650px] overflow-y-scroll shadow-md sm:rounded-lg"
        style="height: calc(100vh - 280px)">
        <!-- Loading Overlay -->
        <div v-if="isLoading" class="absolute inset-0 bg-white flex items-center justify-center z-50">
          <div class="flex flex-col items-center space-y-6">
            <!-- Loading Animation -->
            <div class="relative w-64 h-16 overflow-hidden">
              <div class="absolute bottom-0 w-full h-2 bg-gray-400 rounded-full"></div>
              <div class="absolute bottom-2 animate-car">
                <div class="relative">
                  <div class="w-16 h-8 bg-[#0369A1] rounded-lg relative">
                    <div class="absolute top-1 left-2 w-3 h-2 bg-blue-200 rounded-sm"></div>
                    <div class="absolute top-1 right-2 w-3 h-2 bg-blue-200 rounded-sm"></div>
                    <div class="absolute top-1 left-1 w-1 h-1 bg-yellow-300 rounded-full"></div>
                    <div class="absolute top-1 right-1 w-1 h-1 bg-yellow-300 rounded-full"></div>
                  </div>
                  <div class="absolute -bottom-1 left-1 w-3 h-3 bg-gray-800 rounded-full border-2 border-gray-600">
                  </div>
                  <div class="absolute -bottom-1 right-1 w-3 h-3 bg-gray-800 rounded-full border-2 border-gray-600">
                  </div>
                </div>
              </div>
            </div>
            <div class="text-center">
              <div class="text-lg font-semibold text-gray-700 mb-2">
                กำลังโหลดข้อมูล...
              </div>
              <div class="text-sm text-gray-500">กรุณารอสักครู่</div>
            </div>
          </div>
        </div>

        <!-- Table -->
        <div v-else class="w-full">
          <TableOrder :data="filteredItems" :columns="tableColumns" :selected="selected"
            @selected-update="onSelectedUpdate" :isLoading="isLoading" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed, ref, watch, onUnmounted, nextTick } from "vue";
import { useAuthStore, useOrderStore, useUtilityStore } from "../../stores";
import Swal from "sweetalert2";
import SearchOrder from "../../components/searchbar.vue";
import TableOrder from "../../components/tableCheckbox.vue";

export default {
  components: {
    SearchOrder,
    TableOrder,
  },
  setup() {
    const ordersRe = computed(() => {
      return store.zortOrder;
    });

    const isCollapsed = ref(true);
    const store = useOrderStore();
    const orders = ref([]);

    const tableColumns = computed(() => [
      { id: "updatedAt", title: "วันที่อัปเดต" },
      { id: "number", title: "หมายเลขออเดอร์" },
      { id: "id", title: "ID" },
      { id: "saleschannel", title: "ช่องทางขาย" },
      { id: "invno", title: "invno" },
      { id: "cono", title: "cono" },
    ]);

    // Date range filter
    const startDate = ref("");
    const endDate = ref("");

    // Search and filter
    const isLoading = ref(false);
    const textInput = ref("");

    // Selection
    const selected = ref([]);
    const isItemSelected = ref(false);

    const checkSidebarState = () => {
      const sidebar = document.querySelector('[class*="w-18"]');
      if (sidebar) {
        isCollapsed.value = true;
      } else {
        isCollapsed.value = false;
      }
    };

    const formatThaiDate = (dateString) => {
      if (!dateString) return "";

      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear() + 543; // แปลงเป็น พ.ศ.

      const thaiMonths = [
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฎาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤศจิกายน",
        "ธันวาคม",
      ];

      return `${day} ${thaiMonths[month]} ${year}`;
    };

    const searchDate = () => {
      // บันทึกค่าที่กรอกไว้ใน localStorage
      if (startDate.value) {
        localStorage.setItem("reprintStartDate", startDate.value);
        console.log("Saved startDate:", startDate.value);
      }
      if (endDate.value) {
        localStorage.setItem("reprintEndDate", endDate.value);
        console.log("Saved endDate:", endDate.value);
      }

      // โหลดข้อมูล
      loadData();
    };

    const getDateRange = () => {
      return {
        dateStart: startDate.value || null,
        dateEnd: endDate.value || null,
      };
    };

    const getDateRangeText = () => {
      if (startDate.value && endDate.value) {
        return `${startDate.value} - ${endDate.value}`;
      } else if (startDate.value) {
        return `ตั้งแต่ ${startDate.value}`;
      } else if (endDate.value) {
        return `ถึง ${endDate.value}`;
      } else {
        return "ทั้งหมด";
      }
    };

    const clearDateFilter = () => {
      startDate.value = "";
      endDate.value = "";

      // ลบค่าที่บันทึกไว้ใน localStorage
      localStorage.removeItem("reprintStartDate");
      localStorage.removeItem("reprintEndDate");

      loadData();
    };

    const loadData = async () => {
      try {
        isLoading.value = true;
        const token = JSON.parse(localStorage.getItem("token"));
        // เรียก API เพื่อโหลดข้อมูลตาม date range
        const response = await fetch(
          import.meta.env.VITE_API_BASE_URL + '/online/api/order/all',
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              "x-channel": "uat"
            },
            body: JSON.stringify({
              page: "reprint",
              startDate: startDate.value || "",
              endDate: endDate.value || "",
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);

        // อัปเดตข้อมูลใน state
        if (data && Array.isArray(data)) {
          // เก็บข้อมูลใน localStorage
          localStorage.setItem("reprintOrders", JSON.stringify(data));
          // อัปเดต orders state
          orders.value = data;
        } else {
          orders.value = [];
        }
      } catch (error) {
        console.error("Error loading data:", error);
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด!",
          text: "ไม่สามารถโหลดข้อมูลได้",
        });
      } finally {
        isLoading.value = false;
      }
    };

    const filteredItems = computed(() => {
      let filtered = orders.value;

      // Filter by date range
      if (startDate.value || endDate.value) {
        filtered = filtered.filter((item) => {
          const itemDate = new Date(item.updatedAt)
          const start = startDate.value ? new Date(startDate.value) : null
          const end = endDate.value ? new Date(endDate.value) : null


          if (end) {
            end.setHours(23, 59, 59, 999)
          }

          if (start && end) {
            return itemDate >= start && itemDate <= end
          } else if (start) {
            return itemDate >= start;
          } else if (end) {
            return itemDate <= end;
          }
          return true;
        });
      }

      // Filter by search text
      if (textInput.value) {
        const keyword = textInput.value.toLowerCase();
        filtered = filtered.filter(
          (item) =>
            (item.number || "").toLowerCase().includes(keyword) ||
            (item.id || "").toString().toLowerCase().includes(keyword) ||
            (item.updatedatetime || "").toLowerCase().includes(keyword) ||
            (item.saleschannel || "").toLowerCase().includes(keyword) ||
            (item.invno || "").toLowerCase().includes(keyword) ||
            (item.cono || "").toString().toLowerCase().includes(keyword)
        );
      }

      return filtered;
    });

    const dateWiseCounts = computed(() => {
      const counts = {};

      // นับรายการตามวันที่
      filteredItems.value.forEach((item) => {
        const date = item.updatedatetime;
        if (date) {
          counts[date] = (counts[date] || 0) + 1;
        }
      });

      // แปลงเป็น array และเรียงตามวันที่
      return Object.entries(counts)
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    });

    const handleSearch = async (searchText) => {
      textInput.value = searchText;
      await loadData();
    };

    const onSelectedUpdate = (newValue) => {
      console.log("onSelectedUpdate called with:", newValue);
      selected.value = newValue;
      isItemSelected.value = selected.value.length > 0;
      console.log("selected.value after update:", selected.value);
    };

    const printCopy = async () => {
      if (!selected.value.length) {
        Swal.fire({
          icon: "warning",
          title: "กรุณาเลือกรายการ",
          text: "โปรดเลือกรายการที่ต้องการพิมพ์สำเนา",
        });
        return;
      }

      // 🔔 loading
      Swal.fire({
        icon: "info",
        title: "กำลังเปิดหน้าพิมพ์",
        text: `กำลังพิมพ์ ${selected.value.length} ใบ...`,
        showConfirmButton: false,
        allowOutsideClick: false,
      });

      const PRINT_API =
        import.meta.env.VITE_API_BASE_URL + "/online/print/copy";

      // สร้าง form ยิง POST ไปแท็บใหม่
      const form = document.createElement("form");
      form.method = "POST";
      form.action = PRINT_API;
      form.target = "_blank"; // ✅ เปิด new tab

      const input = document.createElement("input");
      input.type = "hidden";
      input.name = "checklist";
      input.value = JSON.stringify(selected.value);

      form.appendChild(input);
      document.body.appendChild(form);

      // submit
      form.submit();
      document.body.removeChild(form);

      // ปิด loading หลังยิงเสร็จ (ไม่ต้องรอ response)
      setTimeout(() => {
        Swal.close();
      }, 500);
    };

    const printSummary = () => {
      const selectedOrders = orders.value.filter((order) =>
        selected.value.includes(order.id)
      );
      console.log("print", selectedOrders);
      localStorage.setItem("summaryData", JSON.stringify(selectedOrders));
      window.open("/onlineManage/order/summary", "_blank");
    };

    const printAll = async () => {
      if (!filteredItems.value.length) {
        Swal.fire({
          icon: "warning",
          title: "ไม่มีข้อมูล",
          text: "ไม่พบรายการที่สามารถพิมพ์ได้",
        });
        return;
      }

      // 🔔 loading
      Swal.fire({
        icon: "info",
        title: "กำลังเปิดหน้าพิมพ์",
        text: `กำลังพิมพ์ ${filteredItems.value.length} ใบ...`,
        showConfirmButton: false,
        allowOutsideClick: false,
      });

      const PRINT_API =
        import.meta.env.VITE_API_BASE_URL + "/online/print/copy";

      // สร้าง form ยิง POST ไปแท็บใหม่
      const form = document.createElement("form");
      form.method = "POST";
      form.action = PRINT_API;
      form.target = "_blank"; // ✅ new tab

      const input = document.createElement("input");
      input.type = "hidden";
      input.name = "checklist";
      input.value = JSON.stringify(filteredItems.value.map(item => item.id));// 🔥 ต่างจาก printCopy แค่นี้

      form.appendChild(input);
      document.body.appendChild(form);

      // submit
      form.submit();
      document.body.removeChild(form);

      // ปิด loading
      setTimeout(() => {
        Swal.close();
      }, 500);
    };


    function formatLocalDate(date) {
      const y = date.getFullYear()
      const m = String(date.getMonth() + 1).padStart(2, "0")
      const d = String(date.getDate()).padStart(2, "0")
      return `${y}-${m}-${d}`
    }

    onMounted(async () => {
      try {
        checkSidebarState();

        // Load saved date values from localStorage
        const savedStartDate = localStorage.getItem("reprintStartDate");
        const savedEndDate = localStorage.getItem("reprintEndDate");

        if (savedStartDate && savedEndDate) {
          startDate.value = savedStartDate;
          endDate.value = savedEndDate;
        } else {
          // Set default date range to current day if no saved values
          const now = new Date()

          // 🔥 วันแรกของเดือน
          const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
          const start = firstDayOfMonth.toISOString().split("T")[0]

          // 🔥 วันนี้
          const end = now.toISOString().split("T")[0]

          startDate.value = formatLocalDate(firstDayOfMonth)
          endDate.value = formatLocalDate(now)


          localStorage.setItem("reprintStartDate", start)
          localStorage.setItem("reprintEndDate", end)
        }

        // โหลดข้อมูลจาก localStorage ก่อน
        const reprintOrders = localStorage.getItem("reprintOrders");
        if (reprintOrders) {
          try {
            orders.value = JSON.parse(reprintOrders);
          } catch (error) {
            console.error("Error parsing reprint orders:", error);
            orders.value = [];
          }
        }

        await loadData();

        // Listen for changes in sidebar state
        const observer = new MutationObserver(checkSidebarState);
        observer.observe(document.body, {
          attributes: true,
          subtree: true,
          attributeFilter: ["class"],
        });

        onUnmounted(() => {
          observer.disconnect();
        });
      } catch (error) {
        console.error("Error in onMounted:", error);
      }
    });

    return {
      isCollapsed,
      orders,
      tableColumns,
      startDate,
      endDate,
      isLoading,
      textInput,
      selected,
      isItemSelected,
      filteredItems,
      dateWiseCounts,
      clearDateFilter,
      getDateRange,
      getDateRangeText,
      searchDate,
      handleSearch,
      onSelectedUpdate,
      printCopy,
      printAll,
      printSummary,
    };
  },
};
</script>

<style scoped>
/* Car Animation */
@keyframes carMove {
  0% {
    transform: translateX(-100%);
  }

  50% {
    transform: translateX(250%);
  }

  100% {
    transform: translateX(-100%);
  }
}

@keyframes dustEffect {
  0% {
    transform: translateX(0) scale(0);
    opacity: 0;
  }

  50% {
    opacity: 0.6;
  }

  100% {
    transform: translateX(60px) scale(1);
    opacity: 0;
  }
}

.animate-car {
  animation: carMove 4s ease-in-out infinite;
}

.animate-dust {
  animation: dustEffect 1s ease-out infinite;
  animation-delay: 0.5s;
}

/* Wheel rotation effect */
.animate-car .absolute.-bottom-1 {
  animation: spin 0.5s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

/* Custom Scrollbar */
.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
  transition: background 0.2s ease;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Dropdown Enhancements */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

/* Glassmorphism effect */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* Enhanced shadows */
.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Smooth transitions */
* {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover effects */
.hover\:scale-105:hover {
  transform: scale(1.05);
}

.hover\:shadow-xl:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
</style>
