<template>
  <a-breadcrumb :routes="this.$store.state.menuData">
    <template slot="itemRender" slot-scope="{ route, routes, paths }">
      <span v-if="routes.indexOf(route) === routes.length - 1">
        {{ route.breadcrumbName }}
      </span>
      <router-link v-else :to="`/${paths.reverse()[0]}`">
        {{ route.breadcrumbName }}
      </router-link>
    </template>
  </a-breadcrumb>
</template>
<script>
export default {
  mounted() {
    console.log(this.$route.path);
  }
}
</script>
<style lang="less" scoped>
.ant-breadcrumb {
  line-height: none !important;
  margin-left: 5px;
}
</style>
