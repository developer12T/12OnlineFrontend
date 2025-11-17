<template>
  <div>
    <div class="flex items-center gap-1">
      <!-- All Orders -->
      <div v-if="isLoading" class="flex items-center bg-white rounded-lg p-2 shadow-md">
        <img src="/all.png" width="30" class="mr-2 rounded-lg opacity-50" />
        <div class="flex items-center">
          <div class="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2"></div>
        </div>
      </div>
      <div v-else class="flex items-center bg-white rounded-lg p-2 shadow-md">
        <img src="/all.png" width="30" class="mr-2 rounded-lg" />
        <span class="text-md font-normal text-gray-500">{{ total }} รายการ</span>
      </div>

      <!-- Shopee -->
      <div v-if="isLoading" class="flex items-center bg-white rounded-lg p-2 shadow-md">
        <img src="/shopee-icon.png" width="30" class="mr-2 opacity-50" />
        <div class="flex items-center">
          <div class="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mr-2"></div>
        </div>
      </div>
      <div v-else class="flex items-center bg-white rounded-lg p-2 shadow-md">
        <img src="/shopee-icon.png" width="30" class="mr-2" />
        <span class="text-md font-normal text-gray-500">{{ shopee }} รายการ</span>
      </div>

      <!-- Lazada -->
      <div v-if="isLoading" class="flex items-center bg-white rounded-lg p-2 shadow-md">
        <img src="/lazada-icon.png" width="30" class="mr-2 opacity-50" />
        <div class="flex items-center">
          <div class="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
        </div>
      </div>
      <div v-else class="flex items-center bg-white rounded-lg p-2 shadow-md">
        <img src="/lazada-icon.png" width="30" class="mr-2" />
        <span class="text-md font-normal text-gray-500">{{ lazada }} รายการ</span>
      </div>

      <!-- Makro -->
      <div v-if="isLoading" class="flex items-center bg-white rounded-lg p-2 shadow-md">
        <img src="/makro.png" width="30" class="mr-2 rounded-lg opacity-50" />
        <div class="flex items-center">
          <div class="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin mr-2"></div>
        </div>
      </div>
      <div v-else class="flex items-center bg-white rounded-lg p-2 shadow-md">
        <img src="/makro.png" width="30" class="mr-2 rounded-lg" />
        <span class="text-md font-normal text-gray-500">{{ makro }} รายการ</span>
      </div>

      <!-- Amazon -->
      <div v-if="isLoading" class="flex items-center bg-white rounded-lg p-2 shadow-md">
        <img src="/amaze.png" width="30" class="mr-2 opacity-50" />
        <div class="flex items-center">
          <div class="w-6 h-6 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin mr-2"></div>
        </div>
      </div>
      <div v-else class="flex items-center bg-white rounded-lg p-2 shadow-md">
        <img src="/amaze.png" width="30" class="mr-2" />
        <span class="text-md font-normal text-gray-500">{{ amaze }} รายการ</span>
      </div>

       <!-- Tiktok -->
       <div v-if="isLoading" class="flex items-center bg-white rounded-lg p-2 shadow-md">
        <img src="/tiktok.png" width="30" class="mr-2 opacity-50" />
        <div class="flex items-center">
          <div class="w-6 h-6 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin mr-2"></div>
        </div>
      </div>
      <div v-else class="flex items-center bg-white rounded-lg p-2 shadow-md">
        <img src="/tiktok.png" width="30" class="mr-2" />
        <span class="text-md font-normal text-gray-500">{{ tiktok }} รายการ</span>
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from "vue";

export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    isLoading: Boolean,
  },
  setup(props) {

    const total = computed(() => {
      return props.data.length;
    });

    const shopee = computed(() => {
      return props.data.filter((item) => item.saleschannel === "Shopee").length;
    });

    const lazada = computed(() => {
      return props.data.filter((item) => item.saleschannel === "Lazada").length;
    });

    const makro = computed(() => {
      return props.data.filter((item) => item.saleschannel === "Makro").length;
    });

    const amaze = computed(() => {
      return props.data.filter((item) => item.saleschannel === "Amaze").length;
    });

    const tiktok = computed(() => {
      return props.data.filter((item) => item.saleschannel === "TIKTOK").length;
    });

    return {
      shopee,
      lazada,
      makro,
      amaze,
      tiktok,
      total
    };
  },
};
</script>
<style scoped>
.w-30 {
  width: 30px;
}

.h-8 {
  height: 8px;
}
</style>