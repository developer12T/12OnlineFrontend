<template>
  <div class="p-4 sm:ml-64">
    <div class="p-4 mt-14">
      <div
        class="flex flex-col-reverse sm:flex-row justify-end items-center mb-4"
      >
        <div class="flex items-center mr-4 space-x-2 sm:order-2">
          <button
            @click="updateStockErp"
            type="button"
            class="bg-red-500 hover:bg-red-600 text-white border border-red-500 hover:border-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2 text-center mb-0 dark:bg-red-600 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            นำเข้าจาก Erp
          </button>
          <button
            @click="updateStockZort"
            type="button"
            class="bg-blue-500 hover:bg-blue-600 text-white border border-blue-500 hover:border-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center mb-0 dark:bg-blue-600 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            นำเข้าจาก Zort
          </button>
        </div>
        <div class="flex items-center sm:order-3 mb-4 sm:mb-0">
          <SearchBar :searchBar="textInput" @search="handleSearch" />
        </div>
        <div
          class="flex items-center sm:order-1 w-full sm:w-auto sm:justify-start justify-center mr-auto"
        >
          <Count :data="filteredItems"/>
        </div>
      </div>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <Table :columns="tableColumns" :data="paginatedData">
          <template v-slot:name="{ row }">
            <div class="flex items-center justify-start">
              {{ row.name }}
            </div>
          </template>
          <template v-slot:availablestock="{ row }">
            <div class="flex items-center justify-center">
              <span
                v-if="row.availablestock > 0"
                class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"
              >
                {{ row.availablestock }}
              </span>
              <span
                v-if="row.availablestock <= 0"
                class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-blue-300"
              >
                {{ row.availablestock }}
              </span>
            </div>
          </template>
        </Table>
      </div>
    </div>
    <Pagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      :itemsPerPage="itemsPerPage"
      @page-changed="onPageChange"
    />
  </div>
</template>

<script>
import { onMounted, computed, ref } from "vue";
import { useAuthStore, useItemStore } from "../../stores";
import Swal from "sweetalert2";
import Count from "./stockCount.vue";
import SearchBar from "../../components/searchbar.vue";
import Table from "../../components/table.vue";
import Pagination from "../../components/pagination.vue";
export default {
  components: {
    Count,
    SearchBar,
    Table,
    Pagination,
  },
  setup() {

    const tableColumns = computed(() => {
      return [
        { id: "name", title: "Name" },
        { id: "sku", title: "SKU" },
        { id: "sellprice", title: "Price" },
        { id: "stock", title: "Stock" },
        { id: "availablestock", title: "Available" },
      ];
    });

    const store = useItemStore();
    const items = computed(() => {
      return store.zortItem;
    });

    const updateStockErp = async () => {
      try {
        Swal.fire({
          icon: "info",
          title: "กำลังอัปเดตสต็อก",
          text: "กรุณารอสักครู่...",
          showConfirmButton: false,
          allowOutsideClick: false,
        });
        await store.updateErpStock();
        Swal.fire({
          icon: "success",
          title: "สำเร็จ!",
          text: "อัปเดตสต็อกสินค้าสำเร็จ",
        });
        await store.getProductZort();
      } catch (error) {
        Swal.hideLoading();
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด!",
          text: "ไม่สามารถอัปเดตสต็อกสินค้าได้",
        });
      }
    };

    const updateStockZort = async () => {
      try {
        Swal.fire({
          icon: "info",
          title: "กำลังอัปเดตสต็อก",
          text: "กรุณารอสักครู่...",
          showConfirmButton: false,
          allowOutsideClick: false,
        });
        await store.updateZortStock();
        Swal.fire({
          icon: "success",
          title: "สำเร็จ!",
          text: "อัปเดตสต็อกสินค้าสำเร็จ",
        });
        await store.getProductZort();
      } catch (error) {
        Swal.hideLoading();
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด!",
          text: "ไม่สามารถอัปเดตสต็อกสินค้าได้",
        });
      }
    };

    const textInput = ref("");
    const filteredItems = computed(() => {
      if (!textInput.value) {
        return items.value;
      }
      const keyword = textInput.value.toLowerCase();
      return items.value.filter(
        (item) =>
          item.name.toLowerCase().includes(keyword) ||
          item.sku.toLowerCase().includes(keyword)
      );
    });

    const handleSearch = (searchText) => {
      textInput.value = searchText;
    };

    let currentPage = ref(1);
    const onPageChange = (pageNumber) => {
      currentPage.value = pageNumber;
    };

    let itemsPerPage = ref(10);
    const totalPages = computed(() => {
      return Math.ceil(filteredItems.value.length / itemsPerPage.value);
    });

    const paginatedData = computed(() => {
      const startIndex = (currentPage.value - 1) * itemsPerPage.value;
      const endIndex = startIndex + itemsPerPage.value;
      return filteredItems.value.slice(startIndex, endIndex);
    });

    onMounted(() => {
      store.getProductZort();
    });

    return {
      items,
      textInput,
      filteredItems,
      handleSearch,
      tableColumns,
      tbHeader: [
        { title: "Name" },
        { title: "SKU" },
        { title: "Price" },
        { title: "Stock" },
        { title: "Available" },
      ],
      currentPage,
      itemsPerPage,
      totalPages,
      paginatedData,
      onPageChange,
      updateStockErp,
      updateStockZort,
    };
  },
};
</script>
