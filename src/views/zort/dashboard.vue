<template>
  <div :class="[
    'p-4 transition-all duration-100 ease-in-out bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen',
    isCollapsed ? 'ml-20' : 'ml-64'
  ]">
    <div class="pt-1 pb-4 px-4 overflow-y-auto" >
      <!-- Header Section -->
      <div class="mb-2">
        <p class="text-slate-600 text-2xl font-bold">ภาพรวมระบบจัดการออนไลน์</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        <!-- Invoice Latest Card -->
        <div v-if="loadingState" class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-slate-100 overflow-hidden">
          <div class="p-6">
            <div class="flex items-start justify-between">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium text-slate-600 mb-1">Invoice ล่าสุด</p>
                <div class="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- CO Latest Card -->
        <div v-if="loadingState" class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-slate-100 overflow-hidden">
          <div class="p-6">
            <div class="flex items-start justify-between">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium text-slate-600 mb-1">Co ล่าสุด</p>
                <div class="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Latest Customer Card -->
        <div v-if="loadingState" class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-slate-100 overflow-hidden">
          <div class="p-6">
            <div class="flex items-start justify-between">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium text-slate-600 mb-1">ลูกค้าล่าสุด</p>
                <div class="space-y-1 flex flex-row items-end gap-2 justify-between">
                  <div>
                    <div class="h-4 w-16 bg-gray-200 rounded animate-pulse mb-1"></div>
                    <div class="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div>
                    <div class="h-4 w-16 bg-gray-200 rounded animate-pulse mb-1"></div>
                    <div class="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                  </div>        
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Total Orders Card -->
        <div v-if="loadingState" class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-slate-100 overflow-hidden">
          <div class="p-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-slate-600">ออเดอร์ทั้งหมด</p>
                  <div class="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Wait Print Card -->
        <div v-if="loadingState" class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-slate-100 overflow-hidden">
          <div class="p-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-slate-600">รอปริ้นใบเสร็จ</p>
                  <div class="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Success Print Card -->
        <div v-if="loadingState" class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-slate-100 overflow-hidden">
          <div class="p-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-slate-600">ปริ้นสำเร็จ</p>
                  <div class="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Real Data Cards (when not loading) -->
        <!-- Invoice Latest Card -->
        <div v-if="!loadingState" class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-slate-100 overflow-hidden">
          <div class="p-6">
            <div class="flex items-start justify-between">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium text-slate-600 mb-1">Invoice ล่าสุด</p>
                <p class="text-2xl font-bold text-slate-800">{{ dashboardData.InvLastno }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- CO Latest Card -->
        <div v-if="!loadingState" class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-slate-100 overflow-hidden">
          <div class="p-6">
            <div class="flex items-start justify-between">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium text-slate-600 mb-1">Co ล่าสุด</p>
                <p class="text-2xl font-bold text-slate-800">{{ dashboardData.conoLastno }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Latest Customer Card -->
        <div v-if="!loadingState" class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-slate-100 overflow-hidden">
          <div class="p-6">
            <div class="flex items-start justify-between">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium text-slate-600 mb-1">ลูกค้าล่าสุด</p>
                <div class="space-y-1 flex flex-row items-end gap-2 justify-between">
                  <div>
                    <p class="text-xs font-semibold text-slate-800">Shopee: {{ dashboardData.cuscodeOlazLastno }}</p>
                    <p class="text-xs font-semibold text-slate-800">Lazada: {{ dashboardData.cuscodeOspeLastno }}</p>
                  </div>
                  <div>
                    <p class="text-xs font-semibold text-slate-800">Amaze: -</p>
                    <p class="text-xs font-semibold text-slate-800">Makro: -</p>
                  </div>        
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Total Orders Card -->
        <div v-if="!loadingState" class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-slate-100 overflow-hidden">
          <div class="p-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-slate-600">ออเดอร์ทั้งหมด</p>
                  <p class="text-2xl font-bold text-slate-800">{{ dashboardData.CountOrderAll }} รายการ</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Wait Print Card -->
        <div v-if="!loadingState" class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-slate-100 overflow-hidden">
          <div class="p-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-slate-600">รอปริ้นใบเสร็จ</p>
                  <p class="text-2xl font-bold text-slate-800">{{ dashboardData.CountOrderWaitPrint }} รายการ</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Success Print Card -->
        <div v-if="!loadingState" class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-slate-100 overflow-hidden">
          <div class="p-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-slate-600">ปริ้นสำเร็จ</p>
                  <p class="text-2xl font-bold text-slate-800">{{ dashboardData.CountOrderSuccessPrint }} รายการ</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Zort Stock Card -->
        <!-- <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-slate-100 overflow-hidden">
          <div class="p-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-slate-600">สต็อก Zort</p>
                  <p class="text-2xl font-bold text-slate-800">{{ dashboardData.StockZort }} ชิ้น</p>
                </div>
              </div>
            </div>
            
          </div>
        </div> -->

        <!-- ERP Stock Card -->
        <!-- <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-slate-100 overflow-hidden">
          <div class="p-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-slate-600">สต็อก ERP</p>
                  <p class="text-2xl font-bold text-slate-800">{{ dashboardData.StockM3 }} ชิ้น</p>
                </div>
              </div>
            </div>
            
          </div>
        </div> -->
      </div>

      <!-- Summary Section -->
      <div class="mt-2 shadow-lg rounded-2xl">

        <!-- Sales Data by Channel and Year -->
        <div class="bg-white rounded-2xl shadow-lg p-2 pt-4 border border-slate-100">
          <h3 class="text-lg font-semibold text-slate-800 mb-6 flex items-center">
            <svg class="w-5 h-5 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
            </svg>
            ข้อมูลการขายตามช่องทาง (จำนวนรายการ) ที่เข้าระบบ ERP
          </h3>
          
          <!-- Loading State for Summary Section -->
          <div v-if="loadingState" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Shopee Skeleton -->
            <div class="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border border-orange-100">
              <div class="flex items-center mb-3">
                <div class="w-6 h-6 bg-gray-200 rounded animate-pulse mr-2"></div>
                <div class="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div class="space-y-2">
                <div class="flex justify-between items-center">
                  <div class="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                  <div class="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div class="flex justify-between items-center">
                  <div class="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                  <div class="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div class="flex justify-between items-center">
                  <div class="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                  <div class="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div class="border-t border-orange-200 pt-2 mt-2">
                  <div class="flex justify-between items-center">
                    <div class="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                    <div class="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Lazada Skeleton -->
            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
              <div class="flex items-center mb-3">
                <div class="w-6 h-6 bg-gray-200 rounded animate-pulse mr-2"></div>
                <div class="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div class="space-y-2">
                <div class="flex justify-between items-center">
                  <div class="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                  <div class="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div class="flex justify-between items-center">
                  <div class="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                  <div class="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div class="flex justify-between items-center">
                  <div class="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                  <div class="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div class="border-t border-blue-200 pt-2 mt-2">
                  <div class="flex justify-between items-center">
                    <div class="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                    <div class="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Amaze Skeleton -->
            <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
              <div class="flex items-center mb-3">
                <div class="w-6 h-6 bg-gray-200 rounded animate-pulse mr-2"></div>
                <div class="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div class="space-y-2">
                <div class="flex justify-between items-center">
                  <div class="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                  <div class="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div class="flex justify-between items-center">
                  <div class="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                  <div class="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div class="flex justify-between items-center">
                  <div class="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                  <div class="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div class="border-t border-purple-200 pt-2 mt-2">
                  <div class="flex justify-between items-center">
                    <div class="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                    <div class="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Makro Skeleton -->
            <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
              <div class="flex items-center mb-3">
                <div class="w-6 h-6 bg-gray-200 rounded animate-pulse mr-2"></div>
                <div class="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div class="space-y-2">
                <div class="flex justify-between items-center">
                  <div class="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                  <div class="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div class="flex justify-between items-center">
                  <div class="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                  <div class="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div class="flex justify-between items-center">
                  <div class="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                  <div class="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div class="border-t border-green-200 pt-2 mt-2">
                  <div class="flex justify-between items-center">
                    <div class="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                    <div class="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Real Data for Summary Section -->
          <div v-if="!loadingState && dashboardData.CountByYear" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Shopee -->
            <div class="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border border-orange-100">
              <div class="flex items-center mb-3">
                <img src="/shopee-icon.png" alt="Shopee" class="w-6 h-6 mr-2">
                <h4 class="font-semibold text-slate-800">Shopee</h4>
              </div>
              <div class="space-y-2">
                <div v-for="yearData in dashboardData.CountByYear" :key="yearData.yearOrder" class="flex justify-between items-center">
                  <span class="text-sm text-slate-600">{{ yearData.yearOrder }}</span>
                  <span class="font-semibold text-slate-800">{{ yearData.countShopee.toLocaleString() }}</span>
                </div>
                <div class="border-t border-orange-200 pt-2 mt-2">
                  <div class="flex justify-between items-center">
                    <span class="text-sm font-medium text-slate-700">รวม</span>
                    <span class="font-bold text-orange-600">{{ getTotalCount('countShopee').toLocaleString() }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Lazada -->
            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
              <div class="flex items-center mb-3">
                <img src="/lazada-icon.png" alt="Lazada" class="w-6 h-6 mr-2">
                <h4 class="font-semibold text-slate-800">Lazada</h4>
              </div>
              <div class="space-y-2">
                <div v-for="yearData in dashboardData.CountByYear" :key="yearData.yearOrder" class="flex justify-between items-center">
                  <span class="text-sm text-slate-600">{{ yearData.yearOrder }}</span>
                  <span class="font-semibold text-slate-800">{{ yearData.countLazada.toLocaleString() }}</span>
                </div>
                <div class="border-t border-blue-200 pt-2 mt-2">
                  <div class="flex justify-between items-center">
                    <span class="text-sm font-medium text-slate-700">รวม</span>
                    <span class="font-bold text-blue-600">{{ getTotalCount('countLazada').toLocaleString() }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Amaze -->
            <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
              <div class="flex items-center mb-3">
                <img src="/amaze.png" alt="Amaze" class="w-6 h-6 mr-2">
                <h4 class="font-semibold text-slate-800">Amaze</h4>
              </div>
              <div class="space-y-2">
                <div v-for="yearData in dashboardData.CountByYear" :key="yearData.yearOrder" class="flex justify-between items-center">
                  <span class="text-sm text-slate-600">{{ yearData.yearOrder }}</span>
                  <span class="font-semibold text-slate-800">{{ yearData.countAmaze.toLocaleString() }}</span>
                </div>
                <div class="border-t border-purple-200 pt-2 mt-2">
                  <div class="flex justify-between items-center">
                    <span class="text-sm font-medium text-slate-700">รวม</span>
                    <span class="font-bold text-purple-600">{{ getTotalCount('countAmaze').toLocaleString() }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Makro -->
            <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
              <div class="flex items-center mb-3">
                <img src="/makro.png" alt="Makro" class="w-6 h-6 mr-2">
                <h4 class="font-semibold text-slate-800">Makro</h4>
              </div>
              <div class="space-y-2">
                <div v-for="yearData in dashboardData.CountByYear" :key="yearData.yearOrder" class="flex justify-between items-center">
                  <span class="text-sm text-slate-600">{{ yearData.yearOrder }}</span>
                  <span class="font-semibold text-slate-800">{{ yearData.countMakro.toLocaleString() }}</span>
                </div>
                <div class="border-t border-green-200 pt-2 mt-2">
                  <div class="flex justify-between items-center">
                    <span class="text-sm font-medium text-slate-700">รวม</span>
                    <span class="font-bold text-green-600">{{ getTotalCount('countMakro').toLocaleString() }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Total Summary Skeleton -->
          <div v-if="loadingState" class="mt-2 p-2 px-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border border-slate-200">
            <div class="flex items-center justify-between">
              <div class="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
              <div class="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          <!-- Real Total Summary -->
          <div v-if="!loadingState && dashboardData.CountByYear" class="mt-2 p-2 px-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border border-slate-200">
            <div class="flex items-center justify-between">
              <h4 class="font-semibold text-slate-800">จำนวนรายการทั้งหมด</h4>
              <span class="text-xl font-bold text-slate-800">{{ getGrandTotal().toLocaleString() }} รายการ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, computed, ref } from "vue";
import { useDashboardStore } from "../../stores";

export default {
  setup() {
    const store = useDashboardStore();
    const isCollapsed = ref(true);
    const loadingState = ref(true);

    const dashboardData = computed(() => {
      return store.zortDashboard;
    });

    // Listen for sidebar collapse state changes
    const checkSidebarState = () => {
      // Check if sidebar is collapsed by looking for the collapsed class
      const sidebar = document.querySelector('[class*="w-18"]');
      if (sidebar) {
        isCollapsed.value = true;
      } else {
        isCollapsed.value = false;
      }
    };

    onMounted(async () => {
      try {
        loadingState.value = true;
        await store.getDashboard();
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        loadingState.value = false;
      }
      
      // Check initial state
      checkSidebarState();
      
      // Listen for changes in sidebar state
      const observer = new MutationObserver(checkSidebarState);
      observer.observe(document.body, {
        attributes: true,
        subtree: true,
        attributeFilter: ['class']
      });
    });

    const getTotalCount = (key) => {
      let total = 0;
      if (dashboardData.value.CountByYear) {
        dashboardData.value.CountByYear.forEach(item => {
          total += item[key];
        });
      }
      return total;
    };

    const getGrandTotal = () => {
      let grandTotal = 0;
      if (dashboardData.value.CountByYear) {
        grandTotal = dashboardData.value.CountByYear.reduce((sum, item) => {
          return sum + item.countShopee + item.countLazada + item.countAmaze + item.countMakro;
        }, 0);
      }
      return grandTotal;
    };

    return {
      dashboardData,
      isCollapsed,
      loadingState,
      getTotalCount,
      getGrandTotal
    };
  },
};
</script>
