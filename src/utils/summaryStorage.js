// ใบรวม (orderSummaryAll.vue) ใช้แค่ item[].sku / nameM3Full / unit / number
// เก็บเฉพาะฟิลด์นี้ลง localStorage เพื่อไม่ให้เกินโควตา (~5MB) ตอนเลือกหลายร้อยออเดอร์
const slimOrders = (orders) =>
  orders.map((o) => ({
    item: Array.isArray(o.item)
      ? o.item.map(({ sku, nameM3Full, unit, number }) => ({ sku, nameM3Full, unit, number }))
      : [],
  }));

export const saveSummaryData = (orders) => {
  const payload = JSON.stringify(slimOrders(orders));
  try {
    localStorage.setItem("summaryData", payload);
    return true;
  } catch (e) {
    // พื้นที่เต็มจากแคชอื่น ลบแคชรายการ reprint (โหลดใหม่จาก API ได้) แล้วลองอีกครั้ง
    try {
      localStorage.removeItem("summaryData");
      localStorage.removeItem("reprintOrders");
      localStorage.setItem("summaryData", payload);
      return true;
    } catch (err) {
      console.error("saveSummaryData failed:", err);
      return false;
    }
  }
};
