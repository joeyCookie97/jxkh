<template>
  <div>
    <a-layout id="components-layout-demo-custom-trigger">
      <a-layout-sider
        :style="{ 'overflow-y': 'auto', height: '100vh' }"
        v-model="collapsed"
        width="256px"
        style="background-color: #1890ff"
        theme="light"
        :trigger="null"
        collapsible
      >
        <div class="logo" />
        <SiderMenu />
      </a-layout-sider>
      <a-layout>
        <a-layout-header
          style="
            background: #fff;
            padding: 0 16px;
            display: flex;
            justify-content: space-between;
          "
        >
          <div class="header-left">
            <a-icon
              class="trigger"
              :type="collapsed ? 'menu-unfold' : 'menu-fold'"
              @click="() => (collapsed = !collapsed)"
            />
            <Breadcrumb />
          </div>

          <UserInfo />
        </a-layout-header>
        <a-layout-content
          :style="{
            margin: '24px 16px',
            padding: '24px',
            background: '#fff',
            minHeight: '280px',
          }"
        >
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Breadcrumb from "./Breadcrumb";
import UserInfo from "./UserInfo";
import Footer from "./Footer";
import SiderMenu from "./SiderMenu";
export default {
  data() {
    return {
      collapsed: false,
    };
  },
  components: {
    Breadcrumb,
    Footer,
    UserInfo,
    SiderMenu,
  },
};
</script>
<style scoped>
#components-layout-demo-custom-trigger {
  height: 100vh;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.header-left {
  display: flex;
  align-items: center;
  font-size: 16px;
}
</style>