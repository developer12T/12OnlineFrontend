<template>
  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
      <tr>
        <th class="px-6 py-3">
          <input type="checkbox" :checked="selectAll" @change="setSelectAll($event.target.checked)"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
        </th>
        <th v-for="col in columns" :key="col.id" scope="col" class="px-6 py-3 text-center">
          {{ col.title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <!-- Loading State -->
      <tr v-if="isLoading" class="bg-white border-b">
        <td colspan="100%" style="height:calc(100vh - 208px)" class="px-6 py-12">
          <div class="flex flex-col items-center justify-center space-y-6">
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
                  <div class="absolute -bottom-1 left-1 w-3 h-3 bg-gray-800 rounded-full border-2 border-gray-600"></div>
                  <div class="absolute -bottom-1 right-1 w-3 h-3 bg-gray-800 rounded-full border-2 border-gray-600"></div>
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
            <!-- Loading Text -->
            <!-- <div class="text-sm text-gray-600 font-medium">กำลังโหลดข้อมูล...</div> -->
            <!-- Pulse Dots -->
            <div class="flex space-x-1">
              <div class="w-2 h-2 bg-[#0369A1] rounded-full animate-pulse"></div>
              <div class="w-2 h-2 bg-[#0369A1] rounded-full animate-pulse" style="animation-delay: 0.2s;"></div>
              <div class="w-2 h-2 bg-[#0369A1] rounded-full animate-pulse" style="animation-delay: 0.4s;"></div>
            </div>
          </div>
        </td>
      </tr>
      <!-- Empty State -->
      <tr v-else-if="!isLoading && (!data || data.length === 0)" class="bg-white border-b">
        <td colspan="100%" style="height:calc(100vh - 208px)" class="px-6 py-12">
          <div class="flex flex-col items-center justify-center space-y-6">
            <!-- Empty State Icon -->
            <div class="mb-4 relative">
              <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <svg class="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <!-- Decorative dots -->
              <div class="absolute -top-2 -right-2 w-4 h-4 bg-blue-100 rounded-full"></div>
              <div class="absolute -bottom-2 -left-2 w-3 h-3 bg-indigo-100 rounded-full"></div>
            </div>
            <!-- Empty State Text -->
            <div class="text-center max-w-md">
              <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ emptyStateTitle || 'ไม่มีข้อมูล' }}</h3>
              <p class="text-gray-500 text-sm leading-relaxed">{{ emptyStateMessage || 'ไม่พบรายการข้อมูลที่ต้องการ' }}</p>
            </div>
            <!-- Optional Action Button -->
            <div v-if="$slots.emptyAction" class="mt-6">
              <slot name="emptyAction"></slot>
            </div>
            <!-- Decorative elements -->
            <div class="flex space-x-2 mt-8">
              <div class="w-2 h-2 bg-gray-200 rounded-full animate-pulse"></div>
              <div class="w-2 h-2 bg-gray-200 rounded-full animate-pulse" style="animation-delay: 0.2s;"></div>
              <div class="w-2 h-2 bg-gray-200 rounded-full animate-pulse" style="animation-delay: 0.4s;"></div>
            </div>
          </div>
        </td>
      </tr>
      <!-- Data Rows -->
      <tr v-else v-for="row in data" :key="row"
        class="bg-white border-b hover:bg-gray-50">
        <td class="px-6 py-5">
          <input type="checkbox" v-model="selected" :value="row.id"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
        </td>
        <td v-for="col in columns" :key="col.id" class="px-1 py-1">
          <div class="text-center">
            <slot :name="col.id" :row="row">{{ row[col.id] }}</slot>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { useUtilityStore } from "../stores";
import { computed, watch } from "vue";
export default {
  props: {
    columns: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    selected: {
      type: Array,
      required: true,
    },
    isLoading: Boolean,
    emptyStateTitle: {
      type: String,
      default: 'ไม่มีข้อมูล',
    },
    emptyStateMessage: {
      type: String,
      default: 'ไม่พบรายการข้อมูลที่ต้องการ',
    },
  },
  setup(props, { emit }) {
    // checkbox start
    const checkboxStore = useUtilityStore();
    const selected = computed({
      get: () => checkboxStore.selectedCheckboxes,
      set: (value) => checkboxStore.updateSelectedCheckboxes(value),
    });

    const selectAll = computed(() => {
      return props.data
        ? selected.length === props.data.length
        : false;
    });

    const setSelectAll = (value) => {
      const selectedId = value ? props.data.map(item => item.id) : [];
      selected.value = selectedId;
    };

    watch(selected, (newValue) => {
      emit("update:selected", newValue);
      emit("selected-update", newValue);
    });
    // checkbox end

    return {
      selected,
      selectAll,
      setSelectAll,
    }
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
