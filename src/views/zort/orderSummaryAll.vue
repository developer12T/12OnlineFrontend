<template>
    <div class="a4-pages font-sarabun">
        <div class="print-icon-container">
            <Icon @click="printPage" icon="noto-v1:printer" height="30" width="30" />
        </div>
        <div v-for="(pageItems, pageIndex) in paginatedSummaryData" :key="pageIndex" class="a4-page">
            <div class="header">
                <h1>(ใบรวมสินค้า)</h1>
            </div>
            <table class="order-table mt-4">
                <thead>
                    <tr>
                        <th>รหัสสินค้า</th>
                        <th>รายการ</th>
                        <th>หีบ</th>
                        <th>แพ็ค</th>
                        <th>ชิ้น</th>
                    </tr>
                </thead>
                <tbody>

                    <tr v-for="item in pageItems" :key="item.id">
                        <td>{{ item.id }}</td>
                        <td class="wrap-text">{{ item.name }}</td>
                        <td>{{ item.convertedUnits.large.qty }}</td>
                        <td>{{ item.convertedUnits.medium.qty }}</td>
                        <td>{{ item.convertedUnits.small.qty }}</td>
                    </tr>

                    <tr v-for="i in emptyRows(pageIndex)" :key="'empty-' + i">
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>

                    <tr v-if="isLastPage(pageIndex)">
                        <td colspan="2" class="text-center font-bold">รวมทั้งหมด</td>
                        <td>{{ totalUnits.large }}</td>
                        <td>{{ totalUnits.medium }}</td>
                        <td>{{ totalUnits.small }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { Icon } from "@iconify/vue";

const summaryData = ref([]);

const itemsPerPage = 20;

const paginatedSummaryData = computed(() => {
    const chunks = [];
    for (let i = 0; i < summaryData.value.length; i += itemsPerPage) {
        chunks.push(summaryData.value.slice(i, i + itemsPerPage));
    }
    return chunks;
});

const isLastPage = (pageIndex) => {
    return pageIndex === paginatedSummaryData.value.length - 1;
};

const emptyRows = (pageIndex) => {
    if (isLastPage(pageIndex)) {
        const currentItems = paginatedSummaryData.value[pageIndex].length;
        return Math.max(itemsPerPage - currentItems - 1, 0);
    }
    return Math.max(itemsPerPage - paginatedSummaryData.value[pageIndex].length, 0);
};

onMounted(() => {
    try {
        const data = JSON.parse(localStorage.getItem("summaryData"));
        if (data) {
            console.log("Loaded data:", data);
            summaryData.value = processSummaryData(data);
            console.log("Processed data:", summaryData.value);
        } else {
            console.warn("ไม่มีข้อมูลใน localStorage");
        }
    } catch (error) {
        console.error("Error loading summary data:", error);
    }
});

function processSummaryData(data) {
    const result = [];
    const unitMapping = {
        CTN: "large",
        BAG: "medium",
        PAC: "medium",
        CRT: "medium",
        PCS: "small",
        BOT: "small",
    };

    const grouped = {};

    data.forEach((order) => {
        if (order.item && Array.isArray(order.item)) {
            order.item
                .filter((product) => !product.sku.startsWith("ZNS"))
                .forEach((product) => {
                    const productId = product.sku;
                    if (!grouped[productId]) {
                        grouped[productId] = {
                            id: product.sku,
                            name: product.name,
                            convertedUnits: {
                                large: { qty: 0 },
                                medium: { qty: 0 },
                                small: { qty: 0 },
                            },
                        };
                    }
                    const unitType = unitMapping[product.unit] || "small";
                    grouped[productId].convertedUnits[unitType].qty += product.number;
                });
        }
    });

    for (const id in grouped) {
        result.push(grouped[id]);
    }

    result.sort((a, b) => {
        return a.id.localeCompare(b.id);
    });

    return result;
}

const totalUnits = computed(() => {
    return summaryData.value.reduce(
        (totals, item) => {
            totals.large += item.convertedUnits.large.qty;
            totals.medium += item.convertedUnits.medium.qty;
            totals.small += item.convertedUnits.small.qty;
            return totals;
        },
        { large: 0, medium: 0, small: 0 }
    );
});

const printPage = () => {
    window.print();
};
</script>


<style scoped>
.a4-pages {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.wrap-text {
  white-space: normal;
  word-wrap: break-word;
}

.a4-page {
    width: 210mm;
    height: 297mm;
    padding: 15mm 20mm;
    background-color: white;
    /* box-shadow: 0 0 5mm rgba(0, 0, 0, 0.1); */
    margin-bottom: 5mm;
    display: flex;
    flex-direction: column;
    gap: 5mm;
    page-break-after: always;
}

.header {
    text-align: center;
    margin-bottom: 1mm;
}

.header h1 {
    font-size: 20px;
    font-weight: bold;
    margin: 0;
    text-transform: uppercase;
    color: #333;
}

.order-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1px;
}

.order-table th,
.order-table td {
    border: 1px solid #000;
    padding: 8px 12px;
    text-align: left;
    font-size: 14px;
    line-height: 1.5;
}

.order-table th {
    background-color: #f5f5f5;
}

.order-table td {
    background-color: #fff;
}

.print-icon-container {
    position: fixed;
    top: 70px;
    right: 15px;
    z-index: 1000;
    padding: 5px;
    /* border-radius: 5px; */
}

@media print {
    aside,
    nav {
        display: none !important;
    }

    .print-icon-container {
        display: none;
    }

    @page {
        margin: 0;
    }

    body {
        margin: 0;
        padding: 0;
        background: white !important;
    }

    .a4-pages {
        display: flex;
        margin: 0 auto;
        width: auto;
        height: auto;
        padding: 15mm;
        background: white;
        box-shadow: none;
    }

    .a4-page {
        page-break-after: always;
        width: 100%;
        height: auto;
        padding: 0;
        margin: 0;
    }
}
</style>