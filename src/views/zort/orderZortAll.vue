<template>
  <div class="p-4 sm:ml-64">
    <div class="p-4 mt-14">
      <div class="flex justify-between flex-col mb-2 sm:flex-row sm:items-center">
        <CountOrderAll :data="filteredItems"></CountOrderAll>
        <SearchOrderAll :searchBar="textInput" @search="handleSearch" />
      </div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <TableOrderAll :columns="tableColumns" :data="paginatedData">
          <template v-slot:status="{ row }">
            <div class="flex items-center justify-center">
              <span
                v-if="row.status === 'Success'"
                class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"
              >
                {{ row.status }}
              </span>
              <span
                v-if="row.status === 'Pending'"
                class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300"
              >
                {{ row.status }}
              </span>
              <span
                v-if="row.status === 'Voided'"
                class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-blue-300"
              >
                {{ row.status }}
              </span>
              <span
                v-if="row.status === 'Waiting'"
                class="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300"
              >
                {{ row.status }}
              </span>
            </div>
          </template>
          <template v-slot:paymentstatus="{ row }">
            <div class="flex items-center justify-center">
              <span
                v-if="row.paymentstatus === 'Paid'"
                class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"
              >
                {{ row.paymentstatus }}
              </span>
              <span
                v-if="row.paymentstatus === 'Pending'"
                class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300"
              >
                {{ row.paymentstatus }}
              </span>
              <span
                v-if="row.paymentstatus === 'Voided'"
                class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-blue-300"
              >
                {{ row.paymentstatus }}
              </span>
            </div>
          </template>
          <template v-slot:saleschannel="{ row }">
            <div class="flex items-center justify-center">
              <img
                v-if="row.saleschannel === 'Shopee'"
                src="/shopee-icon.png"
                width="15"
                class="mr-1"
              />
              <img
                v-if="row.saleschannel === 'Makro'"
                src="/makro.png"
                width="15"
                class="mr-1"
              />
              <img
                v-if="row.saleschannel === 'Amaze'"
                src="/amaze.png"
                width="15"
                class="mr-1"
              />
              <img
                v-else-if="row.saleschannel === 'Lazada'"
                src="/lazada-icon.png"
                width="15"
                class="mr-1"
              />
              <img
                v-else-if="row.saleschannel === 'TIKTOK'"
                src="/tiktok.png"
                width="25"
                class="mr-1"
              />
              <span :title="row.saleschannel">{{ row.saleschannel }}</span>
            </div>
          </template>
        </TableOrderAll>
      </div>
    </div>
    <PaginateOrderAll
      :currentPage="currentPage"
      :totalPages="totalPages"
      :itemsPerPage="itemsPerPage"
      @page-changed="onPageChange"
    />
  </div>
</template>

<script>
import { onMounted, computed, ref } from "vue";
import { useAuthStore, useOrderStore, useUtilityStore } from "../../stores";
import SearchOrderAll from "../../components/searchbar.vue";
import CountOrderAll from "./orderCount.vue";
import TableOrderAll from "../../components/table.vue";
import PaginateOrderAll from "../../components/pagination.vue";
export default {
  components: {
    SearchOrderAll,
    CountOrderAll,
    TableOrderAll,
    PaginateOrderAll,
  },
  setup() {
    const tableColumns = computed(() => {
      return [
        { id: "createdatetime", title: "orderdate" },
        { id: "number", title: "number" },
        { id: "customer", title: "customername" },
        { id: "amount", title: "amount" },
        { id: "status", title: "status" },
        { id: "paymentstatus", title: "paymentstatus" },
        { id: "saleschannel", title: "channel" },
      ];
    });

    const store = useOrderStore();
    const orders = computed(() => {
      return store.zortOrder;
    });

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
    // search bar end

    // pagination start
    let currentPage = ref(1);
    const onPageChange = (pageNumber) => {
      currentPage.value = pageNumber;
    };

    let itemsPerPage = ref(150);
    const totalPages = computed(() => {
      if (filteredItems.value && filteredItems.value.length) {
        return Math.ceil(filteredItems.value.length / itemsPerPage.value);
      } else {
        return 0;
      }
    });

    const paginatedData = computed(() => {
      if (filteredItems.value && filteredItems.value.length > 0) {
        const startIndex = (currentPage.value - 1) * itemsPerPage.value;
        const endIndex = startIndex + itemsPerPage.value;
        return filteredItems.value.slice(startIndex, endIndex);
      } else {
        return [];
      }
    });
    // pagination end

    onMounted(() => {
      store.getOrderZort();
    });

    return {
      tableColumns,
      orders,
      textInput,
      filteredItems,
      handleSearch,
      currentPage,
      itemsPerPage,
      totalPages,
      paginatedData,
      onPageChange,
    };
  },
};
</script>
