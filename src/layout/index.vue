<template>
  <a-layout style="min-height: 100vh">
    <Sider />
    <a-layout>
      <!-- <a-layout-header style="background: #fff; padding: 0" /> -->
      <a-layout-content style="margin: 0 16px">
        <Breadcrumb />
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2020 Created by hhc
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import Sider from "./components/sider/sider.vue";
import Breadcrumb from "./components/breadcrumb/breadcrumb.vue";
export default {
  components: {
    Sider,
    Breadcrumb,
  },
};
</script>