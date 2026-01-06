<template>
  <!-- <Header></Header> -->
  <SidebarOnline v-if="route.path !== '/onlineManage/order/summary'" ></SidebarOnline>
  <routerView />

</template>

<script>
import { useRoute } from 'vue-router';
import { useAuthStore } from '../../stores';
// import { useRouter } from 'vue-router'
import router from "../../router";
import Header from '../../components/header.vue';
import SidebarOnline from './sidebar.vue';
export default {
  components: {
    Header,
    SidebarOnline,
  },
  setup() {
    const authStore = useAuthStore();
    if (!authStore.user) {
      router.push('/');
    }
    
    const route = useRoute();
    console.log('Current route path:', route.path);

    // const authStore = useAuthStore();
    // const router = useRouter()
    // const login = (username, password) => {
    //   authStore.login(username, password);
    // };
    // const logout = () => {
    //   authStore.logout();
    //   router.push('/');
    // };
    
    return {
      route,
      // login,
      // logout,
    };
  },
};
</script>
