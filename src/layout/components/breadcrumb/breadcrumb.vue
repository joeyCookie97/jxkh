<template>
  <div class="breadcrumb">
    <a-breadcrumb>
      <a-breadcrumb-item v-for="(item, index) in menuList" :key="index">
        <span>{{ item }}</span>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>
<script>
import eventBus from "@/bus/bus.js";
export default {
  data() {
    return {
      menuList: ["指标管理", "指标体系"],
    };
  },
  mounted() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      if (sessionStorage.getItem("selected")) {
        this.menuList = sessionStorage.getItem("selected").split(",");
      }
      eventBus.$on(
        "switchMenu",
        (item) => (this.menuList = item.keyPath.reverse())
      );
    },
  },
};
</script>
<style lan='less' scoped>
.breadcrumb {
  margin: 16px 0;
}
</style>