<template>
  <div :class="[
    'p-4 transition-all duration-100 ease-in-out',
    isCollapsed ? 'ml-20' : 'ml-64',
  ]">
    <div class="p-2">
      <div class="flex flex-col-reverse sm:flex-row justify-end items-center mb-2">
        <div class="mr-auto">
          <CountOrder :data="filteredItems" :isLoading="isLoading" />
        </div>
        <div class="flex items-center sm:order-1 mb-4 sm:mb-0 ml-4 bg-white rounded-lg p-2 shadow-md">
          <SearchOrder :searchBar="textInput" @search="handleSearch" />
        </div>
      </div>
      <div class="flex items-center rounded-lg p-2" v-if="this.tabs === 'wait-tab' || this.tabs === 'payment-tab'">
        <button @click="showPrintIframe()"
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
        <button @click="showPrintIframeAndCopy()"
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
      <div class="flex items-center rounded-lg p-2" v-else-if="this.tabs === 'success-tab'">
        <button @click="showPrintIframeAndCopy()"
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
        <button @click="showPrintIframeCopy()"
          class="bg-[#007BFF] shadow-md flex items-center hover:bg-green-600 text-white border border-[#007BFF] hover:border-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 gap-2 font-medium rounded-md text-sm px-5 py-2 text-center mb-2 sm:mb-0 dark:bg-green-600 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-700 dark:focus:ring-green-800 sm:ml-4"
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
          พิมพ์สำเนา
          {{ selected.length > 0 ? selected.length + " ใบ" : "" }}
        </button>
      </div>

      <div
        class="text-sm font-medium text-center mb-1 text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 bg-white rounded-lg">
        <ul class="flex flex-wrap -mb-px">
          <li class="mr-2">
            <a href="#" @click="handleTabs('wait-tab')" :class="{
              'inline-block p-3 text-[#0369A1] border-b-2 border-[#0369A1] rounded-t-lg active dark:text-[#0369A1] dark:border-[#0369A1]':
                tabs === 'wait-tab',
              'inline-block p-3 border-b-2 border-transparent rounded-t-lg hover:text-[#0369A1]/60 hover:border-[#0369A1]/60 dark:hover:text-gray-300':
                tabs !== 'wait-tab',
            }" aria-current="page">รอพิมพ์</a>
          </li>
          <li class="mr-2">
            <a href="#" @click="handleTabs('success-tab')" :class="{
              'inline-block p-3 text-[#0369A1] border-b-2 border-[#0369A1] rounded-t-lg  dark:text-[#0369A1] dark:border-[#0369A1]':
                tabs === 'success-tab',
              'inline-block p-3 border-b-2 border-transparent rounded-t-lg hover:text-[#0369A1]/60 hover:border-[#0369A1]/60 dark:hover:text-gray-300':
                tabs !== 'success-tab',
            }">พิมพ์สำเร็จ</a>
          </li>

          <!-- <li class="mr-2">
            <a href="#" @click="handleTabs('payment-tab')" :class="{
              'inline-block p-3 text-[#0369A1] border-b-2 border-[#0369A1] rounded-t-lg  dark:text-[#0369A1] dark:border-[#0369A1]':
                tabs === 'payment-tab',
              'inline-block p-3 border-b-2 border-transparent rounded-t-lg hover:text-[#0369A1]/60 hover:border-[#0369A1]/60 dark:hover:text-gray-300':
                tabs !== 'payment-tab',
            }">รอชำระ</a>
          </li> -->
        </ul>
      </div>
      <!-- Print Iframe Modal -->
      <div v-if="showIframe" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-xl w-full max-w-[98vw] h-full max-h-[98vh] flex flex-col">
          <div class="flex justify-between items-center p-1 pl-6 border-b">
            <span class="text-md font-medium text-gray-900">พิมพ์เอกสาร {{ selected.length > 0 ? selected.length + " ใบ"
              : "" }}</span>
            <button @click="closeIframe" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div class="flex-1 p-2">
            <!-- <iframe :src="iframeSrc" class="w-full h-full border-0" frameborder="0" allowfullscreen></iframe> -->
            <iframe name="printIframe" class="w-full h-full border-0" frameborder="0"></iframe>

          </div>
        </div>
      </div>

      <div v-if="tabs === 'success-tab'">
        <div class="flex justify-center mt-0 overflow-y-scroll shadow-md sm:rounded-lg"
          style="height: calc(100vh - 165px)">
          <table class="w-full bg-white text-sm text-left rounded-lg text-gray-500 dark:text-gray-400">
            <TableOrder :columns="tableSuccess" :data="filteredItems" :selected="selected" :isLoading="isLoading"
              @update:selected="onSelectedUpdate">
              <template v-slot:number="{ row }">
                <div class="flex items-center justify-center">
                  <span>
                    {{ row.number }}

                    <div v-if="row.invstatus !== ''"
                      class="text-blue-800 text-xs font-medium ml-0 px-1 py-0.5 rounded-full dark:text-blue-300">
                      <svg class="w-3 h-3 text-gray-800 dark:text-white mr-1 inline-flex" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 19 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M13.583 5.445h.01M8.86 16.71l-6.573-6.63a.993.993 0 0 1 0-1.4l7.329-7.394A.98.98 0 0 1 10.31 1l5.734.007A1.968 1.968 0 0 1 18 2.983v5.5a.994.994 0 0 1-.316.727l-7.439 7.5a.975.975 0 0 1-1.385.001Z" />
                      </svg>
                      {{ row.invstatus }}
                    </div>
                  </span>
                </div>
              </template>
              <template v-slot:status="{ row }">
                <div class="flex items-center justify-center" v-if="row.statusText !== 'พบข้อผิดพลาด'">
                  <span v-if="row.status === 'Success'"
                    class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                    {{ row.statusText }}
                  </span>
                  <span v-if="row.status === 'Pending'"
                    class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                    {{ row.statusText }}
                  </span>
                  <span v-if="row.status === 'Voided'"
                    class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                    {{ row.statusText }}
                  </span>
                  <span v-if="row.status === 'Shipped'"
                    class="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
                    {{ row.statusText }}
                  </span>
                </div>
                <div class="flex items-center justify-center" v-else>-</div>
              </template>
              <template v-slot:saleschannel="{ row }">
                <div class="flex items-center justify-center">
                  <img v-if="row.saleschannel === 'Shopee'" src="/shopee-icon.png" width="25" class="mr-1" />
                  <img v-if="row.saleschannel === 'Makro'" src="/makro.png" width="25" class="mr-1" />
                  <img v-else-if="row.saleschannel === 'Lazada'" src="/lazada-icon.png" width="25" class="mr-1" />
                  <img v-else-if="row.saleschannel === 'TIKTOK'" src="/tiktok.png" width="25" class="mr-1" />
                  <img v-else-if="row.saleschannel === 'Amaze'" src="/amaze.png" width="25" class="mr-1" />
                  <span :title="row.saleschannel"></span>
                </div>
              </template>
            </TableOrder>
          </table>
        </div>
      </div>
      <div v-else>
        <div class="flex justify-center mt-0 overflow-y-scroll shadow-md sm:rounded-lg custom-scrollbar"
          style="height: 500px">
          <table class="w-full bg-white text-sm text-left rounded-lg text-gray-500 dark:text-gray-400">
            <TableOrder :columns="tableColumns" :data="filteredItems" :selected="selected" :isLoading="isLoading"
              @update:selected="onSelectedUpdate">
              <template v-slot:createdatetime="{ row }">
                {{ formatDateTime(row.createdatetime) }}
              </template>
              <template v-slot:printdatetime="{ row }">
                {{ formatDateTime(row.printdatetime) }}
              </template>
              <template v-slot:number="{ row }">
                <div class="flex items-center justify-center">
                  <span>
                    {{ row.number }}

                    <div v-if="row.invstatus !== ''"
                      class="text-blue-800 text-xs font-medium ml-0 px-1 py-0.5 rounded-full dark:text-blue-300">
                      <svg class="w-3 h-3 text-gray-800 dark:text-white mr-1 inline-flex" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 19 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M13.583 5.445h.01M8.86 16.71l-6.573-6.63a.993.993 0 0 1 0-1.4l7.329-7.394A.98.98 0 0 1 10.31 1l5.734.007A1.968 1.968 0 0 1 18 2.983v5.5a.994.994 0 0 1-.316.727l-7.439 7.5a.975.975 0 0 1-1.385.001Z" />
                      </svg>
                      {{ row.invstatus }}
                    </div>
                  </span>
                </div>
              </template>
              <template v-slot:status="{ row }">
                <div class="flex items-center justify-center">
                  <span v-if="row.status === 'Success'"
                    class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                    {{ row.statusText }}
                  </span>
                  <span v-if="row.status === 'Pending'"
                    class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                    {{ row.statusText }}
                  </span>
                  <span v-if="row.status === 'Voided'"
                    class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                    {{ row.statusText }}
                  </span>

                </div>
              </template>
              <template v-slot:paymentstatus="{ row }">
                <div class="flex items-center justify-center">
                  <span v-if="row.paymentstatus === 'Paid'"
                    class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                    {{ row.paymentstatusText }}
                  </span>
                  <span v-if="row.paymentstatus === 'Pending'"
                    class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                    {{ row.paymentstatusText }}
                  </span>
                  <span v-if="row.paymentstatus === 'Voided'"
                    class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                    {{ row.paymentstatusText }}
                  </span>

                </div>
              </template>
              <template v-slot:saleschannel="{ row }">
                <div class="flex items-center justify-center">
                  <img v-if="row.saleschannel === 'Shopee'" src="/shopee-icon.png" width="25" class="mr-1" />
                  <img v-else-if="row.saleschannel === 'Lazada'" src="/lazada-icon.png" width="25" class="mr-1" />
                  <img v-else-if="row.saleschannel === 'TIKTOK'" src="/tiktok.png" width="25" class="mr-1" />
                  <img v-else-if="row.saleschannel === 'Amaze'" src="/amaze.png" width="25" class="mr-1" />
                  <img v-if="row.saleschannel === 'Makro'" src="/makro.png" width="25" class="mr-1" />

                  <span :title="row.saleschannel"></span>
                </div>
              </template>
            </TableOrder>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  onMounted, computed, ref, watch, nextTick
} from "vue";
import { useAuthStore, useOrderStore, useUtilityStore } from "../../stores";
import Swal from "sweetalert2";
import router from "../../router";
import CountOrder from "./orderCount.vue";
import SearchOrder from "../../components/searchbar.vue";
import TableOrder from "../../components/tableCheckbox.vue";




export default {
  components: {
    CountOrder,
    SearchOrder,
    TableOrder,
  },
  setup() {
    const authStore = useAuthStore();
    const isCollapsed = ref(true);
    if (!authStore.user) {
      router.push("/");
    }

    const tableColumns = computed(() => {
      return [
        { id: "createdatetime", title: "วันที่ออเดอร์" },
        { id: "printdatetime", title: "วันที่พิมพ์" },
        { id: "number", title: "รายการ" },
        { id: "customer", title: "ลูกค้า" },
        { id: "amount", title: "มูลค่า" },
        { id: "status", title: "สถานะ" },
        { id: "paymentstatus", title: "ชำระเงิน" },
        { id: "saleschannel", title: "ช่องทาง" },
        { id: "totalprint", title: "printcount" },
      ];
    });

    const tableSuccess = computed(() => {
      return [
        { id: "createdatetime", title: "วันที่ออเดอร์" },
        { id: "printdatetime", title: "วันที่พิมพ์" },
        { id: "number", title: "รายการ" },
        { id: "cono", title: "co" },
        { id: "invno", title: "inv" },
        { id: "customer", title: "ลูกค้า" },
        { id: "amount", title: "มูลค่า" },
        { id: "status", title: "สถานะ" },
        { id: "saleschannel", title: "ช่องทาง" },
        { id: "totalprint", title: "printcount" },
      ];
    });

    const store = useOrderStore();

    const orders = computed(() => {
      return store.zortOrder;
    });

    const isLoading = ref(true);
    const showIframe = ref(false);
    const iframeSrc = ref("");

    const showPrintIframe = async () => {
      if (selected.value.length === 0) return;

      // 1️⃣ เปิด modal ก่อน
      showIframe.value = true;

      // 2️⃣ รอให้ iframe ถูก render ลง DOM
      await nextTick();

      const PRINT_API =
        import.meta.env.VITE_API_BASE_URL + "/online/print/original";

      const form = document.createElement("form");
      form.method = "POST";
      form.action = PRINT_API;
      form.target = "printIframe";

      const input = document.createElement("input");
      input.type = "hidden";
      input.name = "checklist";
      input.value = JSON.stringify(selected.value);

      form.appendChild(input);
      document.body.appendChild(form);

      // 3️⃣ submit หลัง iframe มีจริงแล้ว
      form.submit();
      document.body.removeChild(form);
    };

    const showPrintIframeAndCopy = async () => {
      if (selected.value.length === 0) return;

      // 1️⃣ เปิด modal ก่อน
      showIframe.value = true;

      // 2️⃣ รอให้ iframe ถูก render ลง DOM
      await nextTick();

      const PRINT_API =
        import.meta.env.VITE_API_BASE_URL + "/online/print/originalandcopy";

      const form = document.createElement("form");
      form.method = "POST";
      form.action = PRINT_API;
      form.target = "printIframe";

      const input = document.createElement("input");
      input.type = "hidden";
      input.name = "checklist";
      input.value = JSON.stringify(selected.value);

      form.appendChild(input);
      document.body.appendChild(form);

      // 3️⃣ submit หลัง iframe มีจริงแล้ว
      form.submit();
      document.body.removeChild(form);
    };



    const showPrintIframeCopy = async () => {
      if (selected.value.length === 0) return;

      // 1️⃣ เปิด modal ก่อน
      showIframe.value = true;

      // 2️⃣ รอให้ iframe ถูก render ลง DOM
      await nextTick();

      const PRINT_API =
        import.meta.env.VITE_API_BASE_URL + "/online/print/copy";

      const form = document.createElement("form");
      form.method = "POST";
      form.action = PRINT_API;
      form.target = "printIframe";

      const input = document.createElement("input");
      input.type = "hidden";
      input.name = "checklist";
      input.value = JSON.stringify(selected.value);

      form.appendChild(input);
      document.body.appendChild(form);

      // 3️⃣ submit หลัง iframe มีจริงแล้ว
      form.submit();
      document.body.removeChild(form);
    };

    const closeIframe = () => {
      showIframe.value = false;
      iframeSrc.value = "";
    };

    const printReceipt = async () => {
      try {
        Swal.fire({
          icon: "info",
          title: "กำลังพิมพ์",
          text: "กรุณารอสักครู่...",
          showConfirmButton: false,
          allowOutsideClick: false,
        });
        await store.getOrderZort();
        await afterPrint();
        Swal.fire({
          icon: "success",
          title: "สำเร็จ!",
          text: "พิมพ์สำเร็จ",
        });
      } catch (error) {
        Swal.hideLoading();
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด!",
          text: "ไม่สามารถพิมพ์ได้",
        });
      }
    };

    const selected = ref([]);
    const isItemSelected = ref(false);
    // const onSelectedUpdate = (newValue) => {
    //   selected.value = newValue;
    //   isItemSelected.value = selected.value.length > 0;
    // };

    const onSelectedUpdate = (newValue) => {
      selected.value = newValue;
      isItemSelected.value = selected.value.length > 0;

      if (selected.value.length === 0) {
        localStorage.removeItem("summaryData");
        console.log("LocalStorage cleared");
      } else {
        const selectedOrders = orders.value.filter((order) =>
          selected.value.includes(order.id)
        );
        localStorage.setItem("summaryData", JSON.stringify(selectedOrders));
        console.log("Updated LocalStorage with selected orders:", selectedOrders);
      }
    };
    const printSummary = () => {
      const selectedOrders = orders.value.filter((order) =>
        selected.value.includes(order.id)
      );
      console.log("print", selectedOrders);
      localStorage.setItem("summaryData", JSON.stringify(selectedOrders));
      // window.open("/onlineManage/order/summary", "_blank");
      window.open(
        import.meta.env.BASE_URL + 'onlineManage/order/summary',
        '_blank'
      );
    };

    const tabs = ref("wait-tab");
    const handleTabs = async (tabName) => {
      tabs.value = tabName;
      await store.setTab(tabs.value);
      await clearCheckbox();
      await loadTabData();
    };

    const loadTabData = async () => {
      isLoading.value = true;
      await store.getOrderZort();
      isLoading.value = false;
    };

    const afterPrint = async () => {
      isLoading.value = true;
      await store.getOrderZort();
      await handleTabs("success-tab");
      isLoading.value = false;
    };

    const checkbox = useUtilityStore();
    const clearCheckbox = async () => {
      checkbox.updateSelectedCheckboxes([]);
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
          item.printdatetime.toLowerCase().includes(keyword) ||
          item.saleschannel.toLowerCase().includes(keyword) ||
          item.status.toLowerCase().includes(keyword)
        // item.orderdate.toLowerCase().includes(keyword)
      );
    });

    const handleSearch = (searchText) => {
      textInput.value = searchText;
    };

    watch(tabs, async () => {
      await loadTabData();
    });

    const checkSidebarState = () => {
      // Check if sidebar is collapsed by looking for the collapsed class
      const sidebar = document.querySelector('[class*="w-18"]');
      if (sidebar) {
        isCollapsed.value = true;
      } else {
        isCollapsed.value = false;
      }
    };


    const formatDateTime = (iso) => {
      if (!iso) return '-'

      const d = new Date(iso)
      const pad = (n) => String(n).padStart(2, '0')

      return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`
    }

    onMounted(async () => {
      isLoading.value = true;
      await store.getOrderZort();

      isLoading.value = false;
      checkSidebarState();

      // Listen for changes in sidebar state
      const observer = new MutationObserver(checkSidebarState);
      observer.observe(document.body, {
        attributes: true,
        subtree: true,
        attributeFilter: ["class"],
      });
    });

    return {
      formatDateTime,
      tableColumns,
      tableSuccess,
      orders,
      textInput,
      filteredItems,
      handleSearch,
      selected,
      isItemSelected,
      onSelectedUpdate,
      handleTabs,
      tabs,
      printReceipt,
      clearCheckbox,
      afterPrint,
      isLoading,
      printSummary,
      isCollapsed,
      showIframe,
      iframeSrc,
      showPrintIframe,
      showPrintIframeAndCopy,
      showPrintIframeCopy,
      closeIframe,
    };
  },
};
</script>
