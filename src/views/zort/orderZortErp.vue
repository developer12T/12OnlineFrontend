<template>
  <div :class="[
    'p-4 transition-all duration-100 ease-in-out',
    isCollapsed ? 'ml-20' : 'ml-64'
  ]">
    <div class="p-4">
      <div class="flex flex-col-reverse sm:flex-row justify-end items-center mb-2">
        <div class="mr-auto">
          <CountOrderErp :data="filteredItems" :isLoading="isLoading" />
        </div>
        <button v-if="tabs === 'wait-tab'" :class="{ 'opacity-50 cursor-not-allowed': isLoading }" @click="addOrder()"
          type="button"
          class="bg-[#C81E1E] hover:bg-[#C81E1E]/80 text-white border border-[#C81E1E] shadow-md hover:border-[#C81E1E]/80 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 text-center mb-2 sm:mb-0 dark:bg-green-600 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-700 dark:focus:ring-green-800 sm:ml-4 inline-flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M12 16c.41 0 .81-.03 1.21-.06c.19-.76.51-1.48.95-2.11c-.69.11-1.42.17-2.16.17c-2.42 0-4.7-.6-6-1.55V9.64c1.47.83 3.61 1.36 6 1.36s4.53-.53 6-1.36v1.55c.5-.12 1-.19 1.55-.19c.15 0 .3 0 .45.03V7c0-2.21-3.58-4-8-4S4 4.79 4 7v10c0 2.21 3.59 4 8 4c.66 0 1.31-.04 1.92-.12c-.35-.59-.61-1.24-.76-1.94c-.37.06-.75.06-1.16.06c-3.87 0-6-1.5-6-2v-2.23c1.61.78 3.72 1.23 6 1.23m0-11c3.87 0 6 1.5 6 2s-2.13 2-6 2s-6-1.5-6-2s2.13-2 6-2m11 12.5c0 .82-.25 1.58-.67 2.21l-1.09-1.09c.17-.34.26-.72.26-1.12A2.5 2.5 0 0 0 19 15v1.5l-2.25-2.25L19 12v1.5c2.21 0 4 1.79 4 4m-4 1l2.25 2.25L19 23v-1.5c-2.21 0-4-1.79-4-4c0-.82.25-1.58.67-2.21l1.09 1.09c-.17.34-.26.72-.26 1.12A2.5 2.5 0 0 0 19 20z" />
          </svg>
          นำเข้าระบบ
        </button>

        <button v-if="tabs === 'success-tab'" @click="printOriginal()"
          class="bg-[#4CAF50] flex items-center hover:bg-green-600 text-white border border-green-500 hover:border-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 gap-2 font-medium rounded-md text-sm px-5 py-2 text-center mb-2 sm:mb-0 dark:bg-green-600 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-700 dark:focus:ring-green-800 mr-1"
          :class="{ 'pointer-events-none': !isItemSelected }">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
            <path fill="#424242" d="M9 11h30v3H9z" />
            <path fill="#616161" d="M4 25h40v-7c0-2.2-1.8-4-4-4H8c-2.2 0-4 1.8-4 4z" />
            <path fill="#424242" d="M8 36h32c2.2 0 4-1.8 4-4v-8H4v8c0 2.2 1.8 4 4 4" />
            <circle cx="40" cy="18" r="1" fill="#00e676" />
            <path fill="#90caf9" d="M11 4h26v10H11z" />
            <path fill="#242424"
              d="M37.5 31h-27c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h27c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5" />
            <path fill="#90caf9" d="M11 31h26v11H11z" />
            <path fill="#42a5f5" d="M11 29h26v2H11z" />
            <path fill="#1976d2" d="M16 33h17v2H16zm0 4h13v2H16z" />
          </svg>
          พิมพ์ต้นฉบับ
          {{ selected.length > 0 ? selected.length + " ใบ" : "" }}
        </button>
        <button v-if="tabs === 'success-tab'" @click="printOriginalAndCopy()"
          class="bg-[#4CAF50] flex items-center hover:bg-green-600 text-white border border-green-500 hover:border-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 gap-2 font-medium rounded-md text-sm px-5 py-2 text-center mb-2 sm:mb-0 dark:bg-green-600 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-700 dark:focus:ring-green-800 mr-1"
          :class="{ 'pointer-events-none': !isItemSelected }">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
            <path fill="#424242" d="M9 11h30v3H9z" />
            <path fill="#616161" d="M4 25h40v-7c0-2.2-1.8-4-4-4H8c-2.2 0-4 1.8-4 4z" />
            <path fill="#424242" d="M8 36h32c2.2 0 4-1.8 4-4v-8H4v8c0 2.2 1.8 4 4 4" />
            <circle cx="40" cy="18" r="1" fill="#00e676" />
            <path fill="#90caf9" d="M11 4h26v10H11z" />
            <path fill="#242424"
              d="M37.5 31h-27c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h27c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5" />
            <path fill="#90caf9" d="M11 31h26v11H11z" />
            <path fill="#42a5f5" d="M11 29h26v2H11z" />
            <path fill="#1976d2" d="M16 33h17v2H16zm0 4h13v2H16z" />
          </svg>
          พิมพ์ต้นฉบับและสำเนา
          {{ selected.length > 0 ? selected.length + " ใบ" : "" }}

        </button>
        <div class="flex items-center sm:order-2 mb-4 sm:mb-0 ml-4">
          <SearchBar :searchBar="textInput" @search="handleSearch" />
        </div>
      </div>

      <div
        class="text-sm flex items-center justify-between font-medium text-center mb-1 text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 bg-white rounded-lg">
        <ul class="flex w-1/3 flex-wrap -mb-px">
          <li class="mr-2">
            <a @click="handleTabs('wait-tab')" :class="{
              'inline-flex items-center p-3 text-[#0369A1] border-b-2 border-[#0369A1] rounded-t-lg active dark:text-blue-500 dark:border-blue-500 cursor-pointer':
                tabs === 'wait-tab',
              'inline-flex items-center p-3 border-b-2 border-transparent rounded-t-lg hover:text-[#0369A1] hover:border-[#0369A1] dark:hover:text-gray-300 cursor-pointer':
                tabs !== 'wait-tab',
            }" aria-current="page">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              รอนำเข้าระบบ
            </a>
          </li>
          <li class="mr-2">
            <a @click="handleTabs('success-tab')" :class="{
              'inline-flex items-center p-3 text-[#0369A1] border-b-2 border-[#0369A1] rounded-t-lg  dark:text-blue-500 dark:border-blue-500 cursor-pointer':
                tabs === 'success-tab',
              'inline-flex items-center p-3 border-b-2 border-transparent rounded-t-lg hover:text-[#0369A1] hover:border-[#0369A1] dark:hover:text-gray-300 cursor-pointer':
                tabs !== 'success-tab',
            }">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              นำเข้าระบบสำเร็จ
            </a>
          </li>
        </ul>
        <div class="flex items-center w-2/3 justify-end">
          <div
            class="flex items-center bg-gradient-to-r from-red-100 to-red-200 text-red-800 rounded-md px-4 mr-2 shadow-md font-medium">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span class="text-sm">Inv ล่าสุด:</span>
            <span class="text-lg font-bold ml-1">{{ inv.InvLastno }}</span>
          </div>
        </div>

      </div>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg" style="height: calc(100vh - 165px);">
        <!-- Loading Overlay -->
        <div v-if="isLoading" class="absolute inset-0 bg-white flex items-center justify-center z-50">
          <div class="flex flex-col items-center space-y-6">
            <!-- Running Car Animation -->
            <div class="relative w-64 h-16 overflow-hidden">
              <!-- Road -->
              <div class="absolute bottom-0 w-full h-2 bg-gray-400 rounded-full"></div>
              <!-- Car -->
              <div class="absolute bottom-2 animate-car">
                <div class="relative">
                  <!-- Car Body -->
                  <div class="w-16 h-8 bg-[#0369A1] rounded-lg relative">
                    <!-- Car Windows -->
                    <div class="absolute top-1 left-2 w-3 h-2 bg-blue-200 rounded-sm"></div>
                    <div class="absolute top-1 right-2 w-3 h-2 bg-blue-200 rounded-sm"></div>
                    <!-- Car Lights -->
                    <div class="absolute top-1 left-1 w-1 h-1 bg-yellow-300 rounded-full"></div>
                    <div class="absolute top-1 right-1 w-1 h-1 bg-yellow-300 rounded-full"></div>
                  </div>
                  <!-- Car Wheels -->
                  <div class="absolute -bottom-1 left-1 w-3 h-3 bg-gray-800 rounded-full border-2 border-gray-600">
                  </div>
                  <div class="absolute -bottom-1 right-1 w-3 h-3 bg-gray-800 rounded-full border-2 border-gray-600">
                  </div>
                  <!-- Wheel Spokes -->
                  <div class="absolute -bottom-1 left-1 w-3 h-3 flex items-center justify-center">
                    <div class="w-1 h-1 bg-gray-400 rounded-full"></div>
                  </div>
                  <div class="absolute -bottom-1 right-1 w-3 h-3 flex items-center justify-center">
                    <div class="w-1 h-1 bg-gray-400 rounded-full"></div>
                  </div>
                </div>
              </div>
              <!-- Dust Trail -->
              <div class="absolute bottom-1 left-0 w-full h-1">
                <div class="animate-dust">
                  <div class="w-2 h-2 bg-gray-300 rounded-full opacity-60"></div>
                </div>
              </div>
            </div>
            <!-- Pulse Dots -->
            <div class="flex space-x-1">
              <div class="w-2 h-2 bg-[#0369A1] rounded-full animate-pulse"></div>
              <div class="w-2 h-2 bg-[#0369A1] rounded-full animate-pulse" style="animation-delay: 0.2s;"></div>
              <div class="w-2 h-2 bg-[#0369A1] rounded-full animate-pulse" style="animation-delay: 0.4s;"></div>
            </div>
          </div>
        </div>
        <div v-if="tabs === 'wait-tab'">
          <Table :columns="tableColumns" :data="filteredItems" v-if="filteredItems.length > 0">
            <template v-slot:createdatetime="{ row }">
              {{ formatDateTime(row.createdatetime) }}
            </template>
            <template v-slot:status="{ row }">

              <div class="flex items-center justify-center">
                <span v-if="row.status === 'Success'"
                  class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                  {{ row.status }}
                </span>
                <span v-if="row.status === 'Pending'"
                  class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  {{ row.status }}
                </span>
                <span v-if="row.status === 'Voided'"
                  class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                  {{ row.status }}
                </span>
                <span v-if="row.status === 'Waiting'"
                  class="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
                  {{ row.status }}
                </span>
              </div>
            </template>
            <template v-slot:paymentstatus="{ row }">

              <div class="flex items-center justify-center">
                <span v-if="row.paymentstatus === 'Paid'"
                  class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                  {{ row.paymentstatus }}
                </span>
                <span v-if="row.paymentstatus === 'Pending'"
                  class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  {{ row.paymentstatus }}
                </span>
                <span v-if="row.paymentstatus === 'Voided'"
                  class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                  {{ row.paymentstatus }}
                </span>
              </div>
            </template>
            <template v-slot:saleschannel="{ row }">
              <div class="flex items-center justify-center">
                <img v-if="row.saleschannel === 'Shopee'" src="/shopee-icon.png" width="25" class="mr-1" />
                <img v-if="row.saleschannel === 'Makro'" src="/makro.png" width="25" class="mr-1" />
                <img v-else-if="row.saleschannel === 'Lazada'" src="/lazada-icon.png" width="25" class="mr-1" />
                <img v-else-if="row.saleschannel === 'TIKTOK'" src="/tiktok.png" width="25" class="mr-1" />
                <img v-else-if="row.saleschannel === 'Amaze'" src="/amaze.png" width="25" class="mr-1" />

              </div>
            </template>
          </Table>
          <div v-else class="flex flex-col justify-center items-center h-full">
            <div class="text-center">
              <!-- Empty State Icon -->
              <div class="mb-4">
                <svg class="mx-auto h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <!-- Empty State Text -->
              <h3 class="text-lg font-medium text-gray-900 mb-2">ไม่มีข้อมูลรอนำเข้าระบบ</h3>
              <p class="text-gray-500 text-sm mb-4">ยังไม่มีรายการที่รอการนำเข้าระบบ ERP</p>
              <!-- Action Button -->
              <button @click="refreshData"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                รีเฟรชข้อมูล
              </button>
            </div>
          </div>
        </div>
        <div v-if="tabs === 'success-tab'">
          <TableOrder :columns="tableColumns" :selected="selected" :data="filteredItems" v-if="filteredItems.length > 0"
            @update:selected="onSelectedUpdate">
            <template v-slot:createdatetime="{ row }">
              {{ formatDateTime(row.createdatetime) }}
            </template>
            <template v-slot:status="{ row }">

              <div class="flex items-center justify-center">
                <span v-if="row.status === 'Success'"
                  class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                  {{ row.status }}
                </span>
                <span v-if="row.status === 'Pending'"
                  class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  {{ row.status }}
                </span>
                <span v-if="row.status === 'Voided'"
                  class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                  {{ row.status }}
                </span>
                <span v-if="row.status === 'Waiting'"
                  class="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
                  {{ row.status }}
                </span>
              </div>
            </template>
            <template v-slot:paymentstatus="{ row }">

              <div class="flex items-center justify-center">
                <span v-if="row.paymentstatus === 'Paid'"
                  class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                  {{ row.paymentstatus }}
                </span>
                <span v-if="row.paymentstatus === 'Pending'"
                  class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  {{ row.paymentstatus }}
                </span>
                <span v-if="row.paymentstatus === 'Voided'"
                  class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                  {{ row.paymentstatus }}
                </span>
              </div>
            </template>
            <template v-slot:saleschannel="{ row }">
              <div class="flex items-center justify-center">
                <img v-if="row.saleschannel === 'Shopee'" src="/shopee-icon.png" width="25" class="mr-1" />
                <img v-if="row.saleschannel === 'Makro'" src="/makro.png" width="25" class="mr-1" />
                <img v-else-if="row.saleschannel === 'Lazada'" src="/lazada-icon.png" width="25" class="mr-1" />
                <img v-else-if="row.saleschannel === 'TIKTOK'" src="/tiktok.png" width="25" class="mr-1" />
                <img v-else-if="row.saleschannel === 'Amaze'" src="/amaze.png" width="25" class="mr-1" />

              </div>
            </template>
          </TableOrder>
        </div>



      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed, ref,nextTick  } from "vue";
import { useAuthStore, useOrderStore, useDashboardStore } from "../../stores";
import Swal from "sweetalert2";
import SearchBar from "../../components/searchbar.vue";
import Table from "../../components/table.vue";
import TableOrder from "../../components/tableCheckbox.vue";
import CountOrderErp from "./orderCount.vue";
export default {
  components: {
    SearchBar,
    Table,
    CountOrderErp,
    TableOrder
  },
  setup() {

    const showIframe = ref(false);
    const printOriginal = () => submitPrintForm("/online/print/original");
    const printOriginalAndCopy = () => submitPrintForm("/online/print/originalandcopy");
    const printCopy = () => submitPrintForm("/online/print/copy");

    const submitPrintForm = async (endpoint) => {
      if (!selected.value.length) return;

      showIframe.value = true;
      await nextTick();

      const form = document.createElement("form");
      form.method = "POST";
      form.action = import.meta.env.VITE_API_BASE_URL + endpoint;
      form.target = "printIframe";

      const input = document.createElement("input");
      input.type = "hidden";
      input.name = "checklist";
      input.value = JSON.stringify(selected.value);

      form.appendChild(input);
      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
    };

    const tableColumns = computed(() => {
      return [
        { id: "createdatetime", title: "วันที่" },
        { id: "cono", title: "CO" },
        { id: "invno", title: "INV" },
        { id: "number", title: "รายการ" },
        { id: "customer", title: "ลูกค้า" },
        { id: "amount", title: "มูลค่า" },
        { id: "status", title: "สถานะ" },
        { id: "saleschannel", title: "ช่องทาง" },
      ];
    });
    const isCollapsed = ref(true);
    const store = useOrderStore();

    const orders = computed(() => {
      return store.zortOrder;
    });

    const storeDb = useDashboardStore();
    const inv = computed(() => {
      return storeDb.zortDashboard;
    });


    const addOrder = async () => {
      const result = await Swal.fire({
        title: 'ยืนยันการนำเข้าระบบ',
        text: 'คุณต้องการนำข้อมูลเข้าสู่ระบบ ERP หรือไม่?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#C81E1E',
        cancelButtonColor: '#6B7280',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก',
        reverseButtons: true
      })

      if (!result.isConfirmed) return

      try {
        Swal.fire({
          icon: 'info',
          title: 'กำลังนำเข้าระบบ',
          text: 'กรุณารอสักครู่...',
          showConfirmButton: false,
          allowOutsideClick: false
        })

        console.log(filteredItems.value)

        // ✅ ต้องให้ store.addOrderErp return response.data
        const erpRes = await store.addOrderErp(filteredItems.value)

        Swal.close()

        const successfulOrders = erpRes?.successfulOrders ?? []
        const failedOrders = erpRes?.failedOrders ?? []
        const message = erpRes?.message ?? ''

        const successListHtml = successfulOrders.length
          ? `
        <div style="text-align:left;margin-top:8px">
          <div style="font-weight:700;margin-bottom:6px">✅ เข้าระบบแล้ว (${successfulOrders.length})</div>
          <ul style="margin:0;padding-left:18px">
            ${successfulOrders
            .map(o => `<li><b>${o.orderNo}</b> <span style="color:#16a34a">(${o.status || 'success'})</span></li>`)
            .join('')}
          </ul>
        </div>
      `
          : `<div style="text-align:left;margin-top:8px"><b>✅ เข้าระบบแล้ว:</b> ไม่มี</div>`

        const failedListHtml = failedOrders.length
          ? `
        <div style="text-align:left;margin-top:12px">
          <div style="font-weight:700;margin-bottom:6px">❌ เข้าไม่ได้ (${failedOrders.length})</div>
          <ul style="margin:0;padding-left:18px">
            ${failedOrders
            .map(
              o =>
                `<li>
                    <b>${o.orderNo}</b>
                    <div style="color:#dc2626;white-space:pre-wrap;font-size:12px;margin-top:2px">
                      ${String(o.error || '').replaceAll('<', '&lt;').replaceAll('>', '&gt;')}
                    </div>
                  </li>`
            )
            .join('')}
          </ul>
        </div>
      `
          : `<div style="text-align:left;margin-top:12px"><b>❌ เข้าไม่ได้:</b> ไม่มี</div>`

        // เลือก icon ตามผลลัพธ์
        const icon =
          failedOrders.length > 0 && successfulOrders.length > 0
            ? 'warning'
            : failedOrders.length > 0
              ? 'error'
              : 'success'

        const title =
          failedOrders.length > 0 && successfulOrders.length > 0
            ? 'นำเข้าสำเร็จบางส่วน'
            : failedOrders.length > 0
              ? 'นำเข้าไม่สำเร็จ'
              : 'นำเข้าสำเร็จ'

        await Swal.fire({
          icon,
          title,
          html: `
        <div style="margin-bottom:6px;color:#374151">${message}</div>
        ${successListHtml}
        ${failedListHtml}
      `,
          confirmButtonText: 'ปิด'
        })

        // ถ้าต้องการ refresh หลังทำเสร็จ
        // await afterAdded()

      } catch (error) {
        console.log(error)
        Swal.close()
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด!',
          text: 'ไม่สามารถนำเข้าระบบได้'
        })
      }
    }


    const selected = ref([]);
    const isItemSelected = ref(false);
    const onSelectedUpdate = (newValue) => {
      selected.value = newValue;
      isItemSelected.value = selected.value.length > 0;
    };

    const checkSidebarState = () => {
      // Check if sidebar is collapsed by looking for the collapsed class
      const sidebar = document.querySelector('[class*="w-18"]');
      if (sidebar) {
        isCollapsed.value = true;
      } else {
        isCollapsed.value = false;
      }
    };

    const tabs = ref("wait-tab");
    const isLoading = ref(false);

    const handleTabs = async (tabName) => {
      try {
        isLoading.value = true;
        tabs.value = tabName;
        console.log("tabs value after click:", tabs.value);
        await store.setTab(tabs.value);
      } catch (error) {
        console.error('Error loading tab data:', error);
      } finally {
        isLoading.value = false;
      }
    };

    const afterAdded = async () => {
      await handleTabs('success-tab');
    };

    // search bar start
    const textInput = ref("");
    const filteredItems = computed(() => {
      if (!textInput.value) {
        return orders.value;
      }
      const keyword = textInput.value.toLowerCase();
      return orders.value.filter(
        (item) =>
          item.number.toLowerCase().includes(keyword) ||
          item.customer.toLowerCase().includes(keyword) ||
          item.orderdateString.toLowerCase().includes(keyword) ||
          item.saleschannel.toLowerCase().includes(keyword)
      );
    });

    const handleSearch = (searchText) => {
      textInput.value = searchText;
    };

    const refreshData = async () => {
      try {
        isLoading.value = true;
        await store.getOrderZort();
        await storeDb.getDashboard();
      } catch (error) {
        console.error('Error refreshing data:', error);
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(async () => {
      isLoading.value = true;
      try {
        await store.getOrderZort();
        await storeDb.getDashboard();
      } catch (error) {
        console.error('Error loading initial data:', error);
      } finally {
        isLoading.value = false;
      }
      checkSidebarState();
      // Listen for changes in sidebar state
      const observer = new MutationObserver(checkSidebarState);
      observer.observe(document.body, {
        attributes: true,
        subtree: true,
        attributeFilter: ['class']
      });
    });

    const formatDateTime = (iso) => {
      if (!iso) return "-";
      const d = new Date(iso);
      return d.toLocaleString("th-TH", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    return {
      tableColumns,
      addOrder,
      printCopy,
      printOriginal,
      printOriginalAndCopy,
      formatDateTime,
      orders,
      textInput,
      filteredItems,
      handleSearch,
      selected,
      isItemSelected,
      onSelectedUpdate,
      handleTabs,
      tabs,
      afterAdded,
      inv,
      isCollapsed,
      refreshData,
      isLoading,
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
</style>
