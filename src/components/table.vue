<template>
  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead
      class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
    >
      <tr>
        <th
          v-for="col in columns"
          :key="col.id"
          scope="col"
          class="px-6 py-3 text-center"
        >
          {{ col.title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="row in data"
        :key="row"
        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
      >
        <td v-for="col in columns" :key="col.id" class="px-6 py-4">
          <div class="text-center">
            <slot :name="col.id" :row="row">{{ row[col.id] }}</slot>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
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
  },
};
</script>
