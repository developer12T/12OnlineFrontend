<script setup>   
import { useAuthStore } from './stores'

const authStore = useAuthStore();
</script>

<template>
    <div :class="authStore.user">
        <routerView />
    </div>
</template>
<style>
@media print {
  aside,
  nav {
    display: none !important;
  }
}
</style>