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
        <button @click="printOriginal()"
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
        <button @click="printOriginalAndCopy()"
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

        <button @click="downloadSummaryExcel(selected)"
          class="bg-[#4CAF50] shadow-md flex items-center hover:bg-green-600 text-white border border-[#007BFF] hover:border-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 gap-2 font-medium rounded-md text-sm px-5 py-2 text-center mb-2 sm:mb-0 dark:bg-green-600 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-700 dark:focus:ring-green-800 sm:ml-4"
          :class="{ 'pointer-events-none': !isItemSelected }">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M9 18q-.825 0-1.412-.587T7 16V4q0-.825.588-1.412T9 2h9q.825 0 1.413.588T20 4v12q0 .825-.587 1.413T18 18zm0-2h9V4H9zM4 8q-.425 0-.712-.288T3 7t.288-.712T4 6t.713.288T5 7t-.288.713T4 8m0 3.5q-.425 0-.712-.288T3 10.5t.288-.712T4 9.5t.713.288T5 10.5t-.288.713T4 11.5M4 15q-.425 0-.712-.288T3 14t.288-.712T4 13t.713.288T5 14t-.288.713T4 15m0 3.5q-.425 0-.712-.288T3 17.5t.288-.712T4 16.5t.713.288T5 17.5t-.288.713T4 18.5M4 22q-.425 0-.712-.288T3 21t.288-.712T4 20t.713.288T5 21t-.288.713T4 22m3.5 0q-.425 0-.712-.288T6.5 21t.288-.712T7.5 20t.713.288T8.5 21t-.288.713T7.5 22m3.5 0q-.425 0-.712-.288T10 21t.288-.712T11 20t.713.288T12 21t-.288.713T11 22m3.5 0q-.425 0-.712-.288T13.5 21t.288-.712T14.5 20t.713.288t.287.712t-.288.713T14.5 22" />
          </svg>
          Export Excel
          {{ selected.length > 0 ? selected.length + " รายการ" : "" }}
        </button>
      </div>
      <div class="flex items-center rounded-lg p-2" v-else-if="this.tabs === 'success-tab'">
        <button @click="printOriginalAndCopy()"
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
        <button @click="printCopy()"
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

        <button @click="printDeliveyMackro()"
          class="bg-[#007BFF] shadow-md flex items-center hover:bg-green-600 text-white border border-[#007BFF] hover:border-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 gap-2 font-medium rounded-md text-sm px-5 py-2 text-center mb-2 sm:mb-0 dark:bg-green-600 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-700 dark:focus:ring-green-800 sm:ml-4"
          :class="{ 'pointer-events-none': !isItemSelected }">
          <img src="/makro.png" width="25" class="mr-1" />

          Delivery Mackro
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

        <button @click="downloadSummaryExcel(selected)"
          class="bg-[#4CAF50] shadow-md flex items-center hover:bg-green-600 text-white border border-[#007BFF] hover:border-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 gap-2 font-medium rounded-md text-sm px-5 py-2 text-center mb-2 sm:mb-0 dark:bg-green-600 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-700 dark:focus:ring-green-800 sm:ml-4"
          :class="{ 'pointer-events-none': !isItemSelected }">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M9 18q-.825 0-1.412-.587T7 16V4q0-.825.588-1.412T9 2h9q.825 0 1.413.588T20 4v12q0 .825-.587 1.413T18 18zm0-2h9V4H9zM4 8q-.425 0-.712-.288T3 7t.288-.712T4 6t.713.288T5 7t-.288.713T4 8m0 3.5q-.425 0-.712-.288T3 10.5t.288-.712T4 9.5t.713.288T5 10.5t-.288.713T4 11.5M4 15q-.425 0-.712-.288T3 14t.288-.712T4 13t.713.288T5 14t-.288.713T4 15m0 3.5q-.425 0-.712-.288T3 17.5t.288-.712T4 16.5t.713.288T5 17.5t-.288.713T4 18.5M4 22q-.425 0-.712-.288T3 21t.288-.712T4 20t.713.288T5 21t-.288.713T4 22m3.5 0q-.425 0-.712-.288T6.5 21t.288-.712T7.5 20t.713.288T8.5 21t-.288.713T7.5 22m3.5 0q-.425 0-.712-.288T10 21t.288-.712T11 20t.713.288T12 21t-.288.713T11 22m3.5 0q-.425 0-.712-.288T13.5 21t.288-.712T14.5 20t.713.288t.287.712t-.288.713T14.5 22" />
          </svg>
          Export Excel
          {{ selected.length > 0 ? selected.length + " รายการ" : "" }}
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

          <li class="mr-2">
            <a href="#" @click="handleTabs('cancelled-tab')" :class="{
              'inline-block p-3 text-[#0369A1] border-b-2 border-[#0369A1] rounded-t-lg  dark:text-[#0369A1] dark:border-[#0369A1]':
                tabs === 'cancelled-tab',
              'inline-block p-3 border-b-2 border-transparent rounded-t-lg hover:text-[#0369A1]/60 hover:border-[#0369A1]/60 dark:hover:text-gray-300':
                tabs !== 'cancelled-tab',
            }">Order ที่ยกเลิก</a>
          </li>
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
        <div class="flex justify-center mt-0 overflow-y-scroll shadow-md sm:rounded-lg custom-scrollbar"
          style="height: 500px">
          <table class="w-full bg-white text-sm text-left rounded-lg text-gray-500 dark:text-gray-400">
            <TableOrder :columns="tableSuccess" :data="filteredItems" :selected="selected" :isLoading="isLoading"
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
      <div v-else-if="tabs === 'wait-tab'">
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
      <div v-else-if="tabs === 'cancelled-tab'">
        <div class="flex justify-center mt-0 overflow-y-scroll shadow-md sm:rounded-lg custom-scrollbar"
          style="height: 500px">
          <table class="w-full bg-white text-sm text-left rounded-lg text-gray-500 dark:text-gray-400">
            <TableOrder :columns="tableSuccessCancelled" :data="filteredItems" :selected="selected"
              :isLoading="isLoading" @update:selected="onSelectedUpdate">
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
                <div class="flex items-center justify-center" v-if="row.statusText !== 'พบข้อผิดพลาด'">
                  <span v-if="row.status === 'Success'"
                    class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                    {{ row.statusText }}
                  </span>
                  <span v-if="row.status === 'Pending'"
                    class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                    {{ row.statusText }}
                  </span>
                  <span v-if="row.status === 'Cancelled'"
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
    </div>
  </div>
</template>


<script>
import { onMounted, computed, ref, watch, nextTick } from "vue";
import { useAuthStore, useOrderStore, useUtilityStore } from "../../stores";
import Swal from "sweetalert2";
import router from "../../router";
import CountOrder from "./orderCount.vue";
import SearchOrder from "../../components/searchbar.vue";
import TableOrder from "../../components/tableCheckbox.vue";
import axios from "axios";
import { saveAs } from "file-saver";

export default {
  components: { CountOrder, SearchOrder, TableOrder },

  setup() {
    /* ===============================
     AUTH / SIDEBAR
    ============================== */
    const authStore = useAuthStore();
    if (!authStore.user) router.push("/");

    const isCollapsed = ref(true);

    const checkSidebarState = () => {
      isCollapsed.value = !!document.querySelector('[class*="w-18"]');
    };

    /* ===============================
     STORE & DATA
    ============================== */
    const store = useOrderStore();
    const orders = computed(() => store.zortOrder);
    const isLoading = ref(true);

    const loadTabData = async () => {
      isLoading.value = true;
      await store.getOrderZort();
      isLoading.value = false;
    };

    /* ===============================
     TABLE CONFIG
    ============================== */
    const baseColumns = [
      { id: "createdatetime", title: "วันที่ออเดอร์" },
      { id: "printdatetime", title: "วันที่พิมพ์" },
      { id: "number", title: "รายการ" },
      { id: "customer", title: "ลูกค้า" },
      { id: "amount", title: "มูลค่า" },
      { id: "status", title: "สถานะ" },
      { id: "saleschannel", title: "ช่องทาง" },
      { id: "totalprint", title: "printcount" },
    ];

    const baseColumns2 = [
      { id: "number", title: "รายการ" },
      { id: "customer", title: "ลูกค้า" },
      { id: "amount", title: "มูลค่า" },
      { id: "status", title: "สถานะ" },
      { id: "saleschannel", title: "ช่องทาง" },
      { id: "totalprint", title: "printcount" },
    ];


    const tableColumns = computed(() => [
      ...baseColumns.slice(0, 6),
      { id: "paymentstatus", title: "ชำระเงิน" },
      ...baseColumns.slice(6),
    ]);

    const tableSuccess = computed(() => [
      ...baseColumns.slice(0, 3),
      { id: "cono", title: "co" },
      { id: "invno", title: "inv" },
      ...baseColumns.slice(3),
    ]);

    const tableSuccessCancelled = computed(() => [
      ...baseColumns.slice(0, 6),
    ]);


    /* ===============================
     TAB CONTROL
    ============================== */
    const tabs = ref("wait-tab");

    const handleTabs = async (tab) => {
      tabs.value = tab;
      await store.setTab(tab);
      clearCheckbox();
      await loadTabData();
    };

    watch(tabs, loadTabData);

    /* ===============================
     SEARCH
    ============================== */
    const textInput = ref("");

    const filteredItems = computed(() => {
      if (!textInput.value) return orders.value;
      const k = textInput.value.toLowerCase();
      return orders.value.filter(i =>
        [i.number, i.customer, i.printdatetime, i.saleschannel, i.status]
          .some(v => v?.toLowerCase().includes(k))
      );
    });

    const handleSearch = (v) => (textInput.value = v);

    /* ===============================
     CHECKBOX
    ============================== */
    const checkbox = useUtilityStore();
    const selected = ref([]);
    const isItemSelected = ref(false);

    const clearCheckbox = () => checkbox.updateSelectedCheckboxes([]);

    const onSelectedUpdate = (val) => {
      selected.value = val;
      isItemSelected.value = val.length > 0;

      if (!val.length) {
        localStorage.removeItem("summaryData");
        return;
      }

      const data = orders.value.filter(o => val.includes(o.id));
      localStorage.setItem("summaryData", JSON.stringify(data));
    };

    /* ===============================
     PRINT (IFRAME – DRY)
    ============================== */
    const showIframe = ref(false);

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

    const printOriginal = () => submitPrintForm("/online/print/original");
    const printOriginalAndCopy = () => submitPrintForm("/online/print/originalandcopy");
    const printCopy = () => submitPrintForm("/online/print/copy");

    const closeIframe = () => (showIframe.value = false);

    /* ===============================
     SUMMARY
    ============================== */
    const printSummary = () => {

      const data = orders.value.filter(o => selected.value.includes(o.id));
      localStorage.setItem("summaryData", JSON.stringify(data));
      window.open(import.meta.env.BASE_URL + "onlineManage/order/summary", "_blank");

    };



    /* ===============================
     MAKRO DELIVERY
    ============================== */

    let lastMakroPdfUrl = null
    const printDeliveyMackro = async () => {

      if (lastMakroPdfUrl) {
        window.open(lastMakroPdfUrl, '_blank')
        return
      }
      if (!selected.value.length) return;

      try {
        Swal.fire({
          title: "กำลังเตรียมเอกสาร Makro",
          text: `ทั้งหมด ${selected.value.length} ใบ`,
          allowOutsideClick: false,
          showConfirmButton: false,
          didOpen: () => Swal.showLoading()
        });

        const res = await axios.post(
          import.meta.env.VITE_API_BASE_URL +
          "/online/api/order/printDeliveyMackro",
          {
            orderIds: selected.value
          }
        );



        Swal.close();

        // ✅ ใช้ pdfUrl จาก backend
        if (!res.data?.pdfUrl) {
          throw new Error("No pdfUrl returned");

        }
        // console.log('http://localhost:5173/12Online' + res.data.pdfUrl)

        // ✅ เปิดผ่าน HTTP (browser อนุญาต)
        lastMakroPdfUrl = import.meta.env.VITE_API_BASE_URL + res.data.pdfUrl
        window.open(lastMakroPdfUrl, '_blank')


        Swal.fire("สำเร็จ", "เปิดไฟล์ Delivery Makro แล้ว", "success");
      } catch (err) {
        console.error(err);
        Swal.fire("ผิดพลาด", "ไม่สามารถสร้างไฟล์ Delivery Makro ได้", "error");
      }
    };

    const downloadSummaryExcel = async () => {
      if (!selected.value.length) {
        alert("กรุณาเลือก Order ก่อน");
        return;
      }

      const res = await axios.post(
        import.meta.env.VITE_API_BASE_URL +
        "/online/api/order/export-summary",
        { orderIds: selected.value },
        { responseType: "blob" }
      );

      saveAs(res.data, "summary_order.xlsx");
    };

    /* ===============================
     UTIL
    ============================== */
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

    /* ===============================
     MOUNT
    ============================== */
    onMounted(async () => {
      await loadTabData();
      checkSidebarState();

      new MutationObserver(checkSidebarState).observe(document.body, {
        attributes: true,
        subtree: true,
        attributeFilter: ["class"],
      });
    });

    return {
      isCollapsed,
      tableColumns,
      tableSuccess,
      filteredItems,
      textInput,
      tableSuccessCancelled,
      handleSearch,
      selected,
      isItemSelected,
      onSelectedUpdate,
      tabs,
      handleTabs,
      isLoading,
      showIframe,
      closeIframe,
      printOriginal,
      printOriginalAndCopy,
      printCopy,
      printSummary,
      printDeliveyMackro,
      formatDateTime,
      downloadSummaryExcel
    };
  },
};
</script>
