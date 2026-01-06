<template>
  <div>
    <div class="flex items-center">
      <span class="text-xl font-medium"
        >จำนวน {{ countStock }} รายการ</span
      >
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
  },
  setup(props) {
    const countStock = computed(() => {
      return props.data.filter((item) => item).length;
    });

    return {
      countStock,
    };
  },
};
</script>
