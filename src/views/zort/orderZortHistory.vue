// components/OrderHistory.vue
<template>
  <div
    :class="[
      'p-4 transition-all duration-100 ease-in-out',
      isCollapsed ? 'ml-20' : 'ml-64',
    ]"
  >
    <div class="p-4">
      <div class="flex flex-col-reverse sm:flex-row justify-end items-center mb-4">
        <div class="mr-auto flex items-center space-x-3 ml-2">
          <div class="relative">
            <button
              id="dropdownYearButton"
              data-dropdown-toggle="dropdownYear"
              class="text-white bg-gradient-to-r from-[#0369A1] to-[#0369A1] hover:from-[#0369A1] hover:to-[#0369A1] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 group"
              type="button"
              @click="toggleDropdown('dropdownYear')"
              :class="{ 'ring-2 ring-blue-300 shadow-2xl scale-105': isYearDropdownOpen }"
            >
              <div class="flex items-center">
                <svg
                  class="w-3.5 h-3.5 mr-1.5 group-hover:rotate-12 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                <span class="font-medium text-sm">{{ selectedYear }}</span>
                <svg
                  class="w-3.5 h-3.5 ml-1.5 transition-transform duration-300"
                  :class="{ 'rotate-180': isYearDropdownOpen }"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </div>
            </button>
            <div
              id="dropdownYear"
              class="absolute top-full left-0 mt-1.5 z-50 bg-white/95 backdrop-blur-sm divide-y divide-gray-100 rounded-xl shadow-2xl w-24 dark:bg-gray-800/95 border border-gray-200/50 dark:border-gray-600/50 transition-all duration-300 ease-out"
              :class="{
                'opacity-100 visible transform translate-y-0 scale-100': isYearDropdownOpen,
                'opacity-0 invisible transform -translate-y-4 scale-95': !isYearDropdownOpen,
              }"
            >
              <div class="px-2 py-1.5 border-b border-gray-100 dark:border-gray-600">
                <h3
                  class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide"
                >
                  เลือกปี
                </h3>
              </div>
              <ul
                class="py-2 text-sm text-gray-700 dark:text-gray-200 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                aria-labelledby="dropdownYearButton"
              >
                <li
                  v-for="year in years"
                  :key="year"
                  @click="selectYear(year)"
                  class="px-1.5"
                >
                  <a
                    href="#"
                    class="block px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300 focus:bg-blue-50 font-medium group/item"
                    :class="{
                      'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 dark:from-blue-600 dark:to-blue-700 dark:text-white shadow-md':
                        selectedYear === year,
                    }"
                    @keydown.enter="selectYear(year)"
                    @keydown.space="selectYear(year)"
                    tabindex="0"
                  >
                    <div class="flex items-center justify-between">
                      <span class="text-sm">{{ year }}</span>
                      <svg
                        v-if="selectedYear === year"
                        class="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <!-- Dropdown Month -->
          <div class="relative">
            <button
              id="dropdownMonthButton"
              data-dropdown-toggle="dropdownMonth"
              class="text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 group"
              type="button"
              @click="toggleDropdown('dropdownMonth')"
              :class="{
                'ring-2 ring-indigo-300 shadow-2xl scale-105': isMonthDropdownOpen,
              }"
            >
              <div class="flex items-center">
                <svg
                  class="w-3.5 h-3.5 mr-1.5 group-hover:rotate-12 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  ></path>
                </svg>
                <span class="font-medium text-sm">{{ selectedMonthText }}</span>
                <svg
                  class="w-3.5 h-3.5 ml-1.5 transition-transform duration-300"
                  :class="{ 'rotate-180': isMonthDropdownOpen }"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </div>
            </button>
            <div
              id="dropdownMonth"
              class="absolute top-full left-0 mt-1.5 z-50 bg-white/95 backdrop-blur-sm divide-y divide-gray-100 rounded-xl shadow-2xl w-32 dark:bg-gray-800/95 border border-gray-200/50 dark:border-gray-600/50 transition-all duration-300 ease-out"
              :class="{
                'opacity-100 visible transform translate-y-0 scale-100': isMonthDropdownOpen,
                'opacity-0 invisible transform -translate-y-4 scale-95': !isMonthDropdownOpen,
              }"
            >
              <div class="px-2 py-1.5 border-b border-gray-100 dark:border-gray-600">
                <h3
                  class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide"
                >
                  เลือกเดือน
                </h3>
              </div>
              <ul
                class="py-2 text-sm text-gray-700 dark:text-gray-200 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                aria-labelledby="dropdownMonthButton"
              >
                <li
                  v-for="month in months"
                  :key="month.num"
                  @click="selectMonth(month)"
                  class="px-1.5"
                >
                  <a
                    href="#"
                    class="block px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-indigo-50 hover:to-indigo-100 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:bg-indigo-50 font-medium group/item"
                    :class="{
                      'bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-700 dark:from-indigo-600 dark:to-indigo-700 dark:text-white shadow-md':
                        selectedMonth === month.num,
                    }"
                    @keydown.enter="selectMonth(month)"
                    @keydown.space="selectMonth(month)"
                    tabindex="0"
                  >
                    <div class="flex items-center justify-between">
                      <span class="text-sm">{{ month.text }}</span>
                      <svg
                        v-if="selectedMonth === month.num"
                        class="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="flex items-center sm:order-1 mb-4 sm:mb-0 ml-4">
          <SearchOrder :searchBar="textInput" @search="handleSearch" />
        </div>
        <a
          @click="printReceipt()"
          :href="
            'http://58.181.206.156:8080/12Trading/zort_pdf/printReceiptRepair.php?checklist=' +
            selected
          "
          target="_blank"
          class="bg-green-500 shadow-lg hover:bg-green-600 text-white border border-green-500 hover:border-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-md text-sm px-5 py-2 text-center mb-2 sm:mb-0 dark:bg-green-600 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-700 dark:focus:ring-green-800 sm:ml-4"
          :class="{ 'pointer-events-none': !isItemSelected }"
        >
          สลิปเก่า
          {{ selected.length > 0 ? selected.length + " ใบ" : "" }}
        </a>
        <!-- <a
          @click="printReceipt()"
          :href="
            'http://58.181.206.156:8080/12Trading/zort_pdf/printReceiptCopyERP.php?checklist=' +
            selected
          "
          target="_blank"
          class="bg-green-500 hover:bg-green-600 text-white shadow-lg border border-green-500 hover:border-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-md text-sm px-5 py-2 text-center mb-2 sm:mb-0 dark:bg-green-600 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-700 dark:focus:ring-green-800 sm:ml-4"
          :class="{ 'pointer-events-none': !isItemSelected }"
        > -->
        <a
          @click.prevent="printReceipt"
          target="_blank"
          class="bg-green-500 hover:bg-green-600 text-white shadow-lg border border-green-500 hover:border-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-md text-sm px-5 py-2 text-center mb-2 sm:mb-0 dark:bg-green-600 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-700 dark:focus:ring-green-800 sm:ml-4"
          :class="{ 'pointer-events-none opacity-50': !isItemSelected }"
        >
          พิมพ์สำเนา test
          {{ selected.length > 0 ? selected.length + " ใบ" : "" }}
        </a>
      </div>
      <div
        class="relative flex justify-center m-2 mt-0 md:h-[470px] lg:h-[650px] overflow-y-scroll shadow-md sm:rounded-lg"
        style="height: calc(100vh - 165px)"
      >
        <!-- Loading Overlay -->
        <div
          v-if="isLoading"
          class="absolute inset-0 bg-white flex items-center justify-center z-50"
        >
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
                    <div
                      class="absolute top-1 left-2 w-3 h-2 bg-blue-200 rounded-sm"
                    ></div>
                    <div
                      class="absolute top-1 right-2 w-3 h-2 bg-blue-200 rounded-sm"
                    ></div>
                    <!-- Car Lights -->
                    <div
                      class="absolute top-1 left-1 w-1 h-1 bg-yellow-300 rounded-full"
                    ></div>
                    <div
                      class="absolute top-1 right-1 w-1 h-1 bg-yellow-300 rounded-full"
                    ></div>
                  </div>
                  <!-- Car Wheels -->
                  <div
                    class="absolute -bottom-1 left-1 w-3 h-3 bg-gray-800 rounded-full border-2 border-gray-600"
                  ></div>
                  <div
                    class="absolute -bottom-1 right-1 w-3 h-3 bg-gray-800 rounded-full border-2 border-gray-600"
                  ></div>
                  <!-- Wheel Spokes -->
                  <div
                    class="absolute -bottom-1 left-1 w-3 h-3 flex items-center justify-center"
                  >
                    <div class="w-1 h-1 bg-gray-400 rounded-full"></div>
                  </div>
                  <div
                    class="absolute -bottom-1 right-1 w-3 h-3 flex items-center justify-center"
                  >
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
              <div
                class="w-2 h-2 bg-[#0369A1] rounded-full animate-pulse"
                style="animation-delay: 0.2s"
              ></div>
              <div
                class="w-2 h-2 bg-[#0369A1] rounded-full animate-pulse"
                style="animation-delay: 0.4s"
              ></div>
            </div>
          </div>
        </div>

        <!-- Data Table -->
        <table
          v-if="!isLoading && filteredItems.length > 0"
          class="w-full bg-white text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <TableOrder
            :columns="tableColumns"
            :data="filteredItems"
            :selected="selected"
            :isLoading="isLoading"
            @update:selected="onSelectedUpdate"
          >
            <template v-slot:number="{ row }">
              <div class="flex items-center justify-center">
                <span>
                  {{ row.number }}

                  <div
                    v-if="row.invstatus !== ''"
                    class="text-blue-800 text-xs font-medium ml-0 px-1 py-0.5 rounded-full dark:text-blue-300"
                  >
                    <svg
                      class="w-3 h-3 text-gray-800 dark:text-white mr-1 inline-flex"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 19 18"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13.583 5.445h.01M8.86 16.71l-6.573-6.63a.993.993 0 0 1 0-1.4l7.329-7.394A.98.98 0 0 1 10.31 1l5.734.007A1.968 1.968 0 0 1 18 2.983v5.5a.994.994 0 0 1-.316.727l-7.439 7.5a.975.975 0 0 1-1.385.001Z"
                      />
                    </svg>
                    {{ row.invstatus }}
                  </div>
                </span>
              </div>
            </template>
            <template v-slot:status="{ row }">
              <div class="flex items-center justify-center">
                <span
                  v-if="row.status === 'Success'"
                  class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"
                >
                  {{ row.statusText }}
                </span>
                <span
                  v-if="row.status === 'Pending'"
                  class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300"
                >
                  {{ row.statusText }}
                </span>
                <span
                  v-if="row.status === 'Voided'"
                  class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300"
                >
                  {{ row.statusText }}
                </span>
                <span
                  v-if="row.status === 'Waiting'"
                  class="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300"
                >
                  {{ row.statusText }}
                </span>
              </div>
            </template>
            <template v-slot:paymentstatus="{ row }">
              <div class="flex items-center justify-center">
                <span
                  v-if="row.paymentstatus === 'Paid'"
                  class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"
                >
                  {{ row.paymentstatusText }}
                </span>
                <span
                  v-if="row.paymentstatus === 'Pending'"
                  class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300"
                >
                  {{ row.paymentstatusText }}
                </span>
                <span
                  v-if="row.paymentstatus === 'Voided'"
                  class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300"
                >
                  {{ row.paymentstatusText }}
                </span>
              </div>
            </template>
            <template v-slot:saleschannel="{ row }">
              <div class="flex items-center justify-center">
                <img
                  v-if="row.saleschannel === 'Shopee'"
                  src="/shopee-icon.png"
                  width="25"
                  class="mr-1"
                />
                <img
                  v-if="row.saleschannel === 'Makro'"
                  src="/makro.png"
                  width="25"
                  class="mr-1"
                />
                <img
                  v-else-if="row.saleschannel === 'Lazada'"
                  src="/lazada-icon.png"
                  width="25"
                  class="mr-1"
                />
                <img
                  v-else-if="row.saleschannel === 'TIKTOK'"
                  src="/tiktok.png"
                  width="25"
                  class="mr-1"
                />
                <img
                  v-if="row.saleschannel === 'Amaze'"
                  src="/amaze.png"
                  width="15"
                  class="mr-1"
                />
                <span :title="row.saleschannel"></span>
              </div>
            </template>
            <template v-slot:download="{ row }">
              <div class="flex items-center justify-center">
                <img
                  v-if="row.download === 'Shopee'"
                  src="/shopee-icon.png"
                  width="25"
                  class="mr-1"
                />
                <img
                  v-if="row.download === 'Makro'"
                  src="/makro.png"
                  width="25"
                  class="mr-1"
                />
                <img
                  v-else-if="row.download === 'Lazada'"
                  src="/lazada-icon.png"
                  width="25"
                  class="mr-1"
                />
                <img
                  v-else-if="row.saleschannel === 'TIKTOK'"
                  src="/tiktok.png"
                  width="25"
                  class="mr-1"
                />
                <img
                  v-if="row.saleschannel === 'Amaze'"
                  src="/amaze.png"
                  width="15"
                  class="mr-1"
                />
                <span :title="row.download"></span>
              </div>
            </template>
          </TableOrder>
        </table>

        <!-- Empty State -->
        <div
          v-else-if="!isLoading && filteredItems.length === 0"
          class="flex flex-col justify-center items-center h-full w-full"
        >
          <div class="text-center">
            <!-- Empty State Icon -->
            <div class="mb-4">
              <svg
                class="mx-auto h-16 w-16 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <!-- Empty State Text -->
            <h3 class="text-lg font-medium text-gray-900 mb-2">
              ไม่มีข้อมูลประวัติการสั่งซื้อ
            </h3>
            <p class="text-gray-500 text-sm mb-4">
              ไม่พบรายการในเดือน {{ selectedMonthText }} ปี {{ selectedYear }}
            </p>
            <!-- Action Button -->
            <button
              @click="handleYearMonthChange"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg
                class="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              รีเฟรชข้อมูล
            </button>
          </div>
        </div>
      </div>
      <div class="flex justify-center mt-4">
        <nav aria-label="Page navigation example">
          <ul class="inline-flex items-center -space-x-px">
            <li>
              <button
                @click="prevPage"
                :disabled="currentPage === 1"
                class="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
              >
                ย้อนกลับ
              </button>
            </li>
            <li v-for="page in totalPages" :key="page">
              <button
                @click="changePage(page)"
                :class="{
                  'bg-[#0369A1] text-white': currentPage === page,
                  'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700':
                    currentPage !== page,
                }"
                class="px-3 py-2 leading-tight"
              >
                {{ page }}
              </button>
            </li>
            <li>
              <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
              >
                ถัดไป
              </button>
            </li>
          </ul>
        </nav>
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
    const isCollapsed = ref(true);
    const store = useOrderStore();
    const orders = computed(() => store.zortOrderHis);
    const tableColumns = computed(() => [
      { id: "orderdate", title: "วันที่ออเดอร์" },
      { id: "printdate", title: "วันที่พิมพ์" },
      { id: "number", title: "รายการ" },
      { id: "customer", title: "ลูกค้า" },
      { id: "amount", title: "มูลค่า" },
      { id: "status", title: "สถานะ" },
      { id: "paymentstatus", title: "ชำระเงิน" },
      { id: "saleschannel", title: "ช่องทาง" },
      { id: "totalprint", title: "printcount" },
      { id: "download", title: "Download" },
    ]);

    const selectedYear = ref("");
    const selectedMonth = ref("");
    const selectedMonthText = ref("");
    const isYearDropdownOpen = ref(false);
    const isMonthDropdownOpen = ref(false);

    // สร้างปีจากปีปัจจุบันย้อนหลัง 5 ปี
    const years = computed(() => {
      const currentYear = new Date().getFullYear();
      const yearList = [];
      for (let i = 0; i < 5; i++) {
        yearList.push((currentYear - i).toString());
      }
      return yearList;
    });

    // สร้างเดือนทั้ง 12 เดือน
    const months = computed(() => [
      { num: "01", text: "มกราคม" },
      { num: "02", text: "กุมภาพันธ์" },
      { num: "03", text: "มีนาคม" },
      { num: "04", text: "เมษายน" },
      { num: "05", text: "พฤษภาคม" },
      { num: "06", text: "มิถุนายน" },
      { num: "07", text: "กรกฎาคม" },
      { num: "08", text: "สิงหาคม" },
      { num: "09", text: "กันยายน" },
      { num: "10", text: "ตุลาคม" },
      { num: "11", text: "พฤศจิกายน" },
      { num: "12", text: "ธันวาคม" },
    ]);

    const isLoading = ref(true);
    const textInput = ref("");

    const checkSidebarState = () => {
      // Check if sidebar is collapsed by looking for the collapsed class
      const sidebar = document.querySelector('[class*="w-18"]');
      if (sidebar) {
        isCollapsed.value = true;
      } else {
        isCollapsed.value = false;
      }
    };

    const handleYearMonthChange = async () => {
      try {
        isLoading.value = true;
        await store.getOrderZortHistory(
          1,
          selectedMonth.value,
          selectedYear.value,
          textInput.value
        );
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        isLoading.value = false;
      }
    };

    const selectYear = (year) => {
      selectedYear.value = year;
      isYearDropdownOpen.value = false;
    };

    const selectMonth = (month) => {
      selectedMonth.value = month.num;
      selectedMonthText.value = month.text;
      isMonthDropdownOpen.value = false;
    };

    const toggleDropdown = (dropdownId) => {
      if (dropdownId === "dropdownYear") {
        isYearDropdownOpen.value = !isYearDropdownOpen.value;
        isMonthDropdownOpen.value = false; // Close other dropdown
        // Focus management
        if (isYearDropdownOpen.value) {
          nextTick(() => {
            const firstYearItem = document.querySelector(
              "#dropdownYear li:first-child a"
            );
            if (firstYearItem) {
              firstYearItem.focus();
            }
          });
        }
      } else if (dropdownId === "dropdownMonth") {
        isMonthDropdownOpen.value = !isMonthDropdownOpen.value;
        isYearDropdownOpen.value = false; // Close other dropdown
        // Focus management
        if (isMonthDropdownOpen.value) {
          nextTick(() => {
            const firstMonthItem = document.querySelector(
              "#dropdownMonth li:first-child a"
            );
            if (firstMonthItem) {
              firstMonthItem.focus();
            }
          });
        }
      }
    };

    const closeDropdown = (dropdownId) => {
      if (dropdownId === "dropdownYear") {
        isYearDropdownOpen.value = false;
      } else if (dropdownId === "dropdownMonth") {
        isMonthDropdownOpen.value = false;
      }
    };

    const closeAllDropdowns = () => {
      isYearDropdownOpen.value = false;
      isMonthDropdownOpen.value = false;
    };

    const prevPage = async () => {
      if (store.currentPage > 1) {
        try {
          isLoading.value = true;
          await store.getOrderZortHistory(
            store.currentPage - 1,
            selectedMonth.value,
            selectedYear.value,
            textInput.value
          );
        } catch (error) {
          console.error("Error loading previous page:", error);
        } finally {
          isLoading.value = false;
        }
      }
    };

    const nextPage = async () => {
      if (store.currentPage < store.totalPages) {
        try {
          isLoading.value = true;
          await store.getOrderZortHistory(
            store.currentPage + 1,
            selectedMonth.value,
            selectedYear.value,
            textInput.value
          );
        } catch (error) {
          console.error("Error loading next page:", error);
        } finally {
          isLoading.value = false;
        }
      }
    };

    const changePage = async (page) => {
      try {
        isLoading.value = true;
        await store.getOrderZortHistory(
          page,
          selectedMonth.value,
          selectedYear.value,
          textInput.value
        );
      } catch (error) {
        console.error("Error loading page:", error);
      } finally {
        isLoading.value = false;
      }
    };

    const selected = ref([]);
    const isItemSelected = ref(false);
    const onSelectedUpdate = (newValue) => {
      selected.value = newValue;
      isItemSelected.value = selected.value.length > 0;
    };

    const filteredItems = computed(() => {
      if (!textInput.value) {
        return orders.value;
      }
      const keyword = textInput.value.toLowerCase();
      return orders.value.filter(
        (item) =>
          item.number.toLowerCase().includes(keyword) ||
          item.customer.toLowerCase().includes(keyword) ||
          item.printdate.toLowerCase().includes(keyword) ||
          item.saleschannel.toLowerCase().includes(keyword) ||
          item.status.toLowerCase().includes(keyword)
        // item.orderdate.toLowerCase().includes(keyword)
      );
    });

    // const filteredItems = computed(() => {
    //   if (!textInput.value) {
    //     return orders.value;
    //   }

    //   const keyword = textInput.value.toLowerCase();

    //   return orders.value.filter(
    //     (item) =>
    //       (item.number ?? "").toLowerCase().includes(keyword) ||
    //       (item.customer ?? "").toLowerCase().includes(keyword) ||
    //       (item.printdate ?? "").toLowerCase().includes(keyword) ||
    //       (item.saleschannel ?? "").toLowerCase().includes(keyword) ||
    //       (item.status ?? "").toLowerCase().includes(keyword) ||
    //       String(item.orderdate ?? "")
    //         .toLowerCase()
    //         .includes(keyword) // Ensure orderdate is a string
    //   );
    // });

    const handleSearch = async (searchText) => {
      textInput.value = searchText;
      console.log(searchText);
      await handleYearMonthChange();
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
        const idString = Array.isArray(selected.value)
          ? selected.value.join(",")
          : selected.value;

        // await store.zortOrderHis();
        // ✅ สร้าง form ชั่วคราว
        const form = document.createElement("form");
        form.method = "POST";
        form.action =
          "http://58.181.206.156:8080/12Trading/zort_pdf/printReceiptCopyERP.php";
        form.target = "_blank"; // เปิดแท็บใหม่

        const textarea = document.createElement("textarea");
        textarea.name = "checklist";
        textarea.value = idString;
        form.appendChild(textarea);

        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
        Swal.fire({
          icon: "success",
          title: "สำเร็จ!",
          text: "พิมพ์สำเร็จ",
        });
      } catch (error) {
        console.error("Error during print:", error);
        Swal.hideLoading();
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด!",
          text: "ไม่สามารถพิมพ์ได้",
        });
      }
    };

    onMounted(async () => {
      try {
        isLoading.value = true;
        checkSidebarState();

        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();
        selectedYear.value = currentYear.toString();
        selectedMonth.value = currentMonth < 10 ? `0${currentMonth}` : `${currentMonth}`;
        selectedMonthText.value = months.value.find(
          (month) => month.num === selectedMonth.value
        ).text;

        // Load initial data
        await store.getOrderZortHistory(
          1,
          selectedMonth.value,
          selectedYear.value,
          textInput.value
        );

        // Listen for changes in sidebar state
        const observer = new MutationObserver(checkSidebarState);
        observer.observe(document.body, {
          attributes: true,
          subtree: true,
          attributeFilter: ["class"],
        });

        // Add click outside listener
        const handleClickOutside = (event) => {
          const yearDropdown = document.getElementById("dropdownYear");
          const monthDropdown = document.getElementById("dropdownMonth");
          const yearButton = document.getElementById("dropdownYearButton");
          const monthButton = document.getElementById("dropdownMonthButton");

          if (
            !yearDropdown?.contains(event.target) &&
            !yearButton?.contains(event.target)
          ) {
            isYearDropdownOpen.value = false;
          }
          if (
            !monthDropdown?.contains(event.target) &&
            !monthButton?.contains(event.target)
          ) {
            isMonthDropdownOpen.value = false;
          }
        };

        // Add keyboard navigation
        const handleKeydown = (event) => {
          if (event.key === "Escape") {
            closeAllDropdowns();
          }
        };

        document.addEventListener("click", handleClickOutside);
        document.addEventListener("keydown", handleKeydown);

        // Store cleanup functions for onUnmounted
        window.dropdownCleanup = () => {
          document.removeEventListener("click", handleClickOutside);
          document.removeEventListener("keydown", handleKeydown);
        };
      } catch (error) {
        console.error("Error loading initial data:", error);
      } finally {
        isLoading.value = false;
      }
    });

    onUnmounted(() => {
      if (window.dropdownCleanup) {
        window.dropdownCleanup();
        delete window.dropdownCleanup;
      }
    });

    watch([selectedYear, selectedMonth, textInput], async () => {
      // Only trigger if we have both year and month selected
      if (selectedYear.value && selectedMonth.value) {
        await handleYearMonthChange();
      }
    });

    return {
      tableColumns,
      orders,
      textInput,
      filteredItems,
      handleSearch,
      selected,
      isItemSelected,
      onSelectedUpdate,
      printReceipt,
      years,
      months,
      selectedYear,
      selectedMonth,
      selectedMonthText,
      selectYear,
      selectMonth,
      prevPage,
      nextPage,
      changePage,
      currentPage: computed(() => store.currentPage),
      totalPages: computed(() => store.totalPages),
      isLoading,
      toggleDropdown,
      isCollapsed,
      isYearDropdownOpen,
      isMonthDropdownOpen,
      closeAllDropdowns,
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
