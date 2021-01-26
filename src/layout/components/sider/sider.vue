<template>
  <a-layout-sider class="layout-sider" v-model="collapsed" collapsible>
    <div class="logo" :class="{ justifyContent: collapsed }">
      <span v-if="!collapsed">绩效考核</span>
      <span class="toggleIcon" @click="toggleCollapsed">
        <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
      </span>
    </div>
    <a-menu
      class="siderBackground"
      theme="dark"
      :default-selected-keys="defaultSelectedKeys"
      :default-open-keys="defaultOpenKeys"
      mode="inline"
      @click="onClick"
    >
      <template v-for="item in menuList">
        <a-menu-item v-if="!item.children" :key="item.key">
          <router-link :to='item.path'><a-icon :type="item.icon" />
          <span>{{ item.title }}</span></router-link>
        </a-menu-item>
        <sub-menu v-else :key="item.key" :menu-info="item" />
      </template>

    </a-menu>
  </a-layout-sider>
</template>

<script>
import eventBus from "@/bus/bus.js";
// import menuList from "@/router/route.js";
import { Menu } from 'ant-design-vue';
const SubMenu = {
  template: `
      <a-sub-menu :key="menuInfo.key" class="siderBackground" v-bind="$props" v-on="$listeners">
        <span slot="title">
          <a-icon :type="menuInfo.icon" /><span>{{ menuInfo.title }}</span>
        </span>
        <template v-for="item in menuInfo.children">
          <a-menu-item v-if="!item.children" :key="item.key">
            <router-link :to='item.path'><a-icon :type="item.icon" />
            <span>{{ item.title }}</span></router-link>
          </a-menu-item>
          <sub-menu v-else :key="item.key" :menu-info="item" />
        </template>
      </a-sub-menu>
    `,
  name: 'SubMenu',
  // must add isSubMenu: true
  isSubMenu: true,
  props: {
    ...Menu.SubMenu.props,
    // Cannot overlap with properties within Menu.SubMenu.props
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
  },
};
export default {
  components: {
    'sub-menu': SubMenu,
  },
  data() {
    return {
      collapsed: false,
      menuList: [],
      defaultSelectedKeys: [],
      defaultOpenKeys: [],
    };
  },
  created() {
    this.getSiderSelect();
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    // 传给面包屑当前导航, 将导航存入缓存
    onClick(item) {
      eventBus.$emit("switchMenu", item);
      sessionStorage.setItem("selected", item.keyPath);
    },
    // 获取导航信息
    getSiderSelect() {
      this.menuList = this.$store.state.menuList
      const selected = sessionStorage.getItem("selected");
      if (selected) {
        this.defaultSelectedKeys = selected.split(",");
        this.defaultOpenKeys = selected.split(",");
      } else {
        this.defaultSelectedKeys = ["指标管理", "指标体系"];
        this.defaultOpenKeys = ["指标管理"];
      }
    },
  },
};
</script>

<style lang='less' scoped>
@siderColor: #1890ff;
@siderBackground: .siderBackground;
@{siderBackground}{
    background: @siderColor;
}
.layout-sider {
  background: @siderColor;
  overflow-y: auto;
  height: 100vh;
  .justifyContent {
    justify-content: center !important;
  }
  .logo {
    height: 32px;
    /* background: rgba(255, 255, 255, 0.2); */
    margin: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      font-size: 18px;
      color: #fff;
    }
    .toggleIcon {
      cursor: pointer;
    }
  }
}

::-webkit-scrollbar {
  width: 3px;
  background: #000;
}
::-webkit-scrollbar-thumb {
  width: 2px;
  height: 10px;
  background: #fff;
  border-radius: 2px;
}
</style>
<style lang='less'>
.ant-menu-dark .ant-menu-inline.ant-menu-sub {
  background: #1890ff !important;
  box-shadow: none !important;
}
.ant-layout-sider-trigger {
  display: none;
}
</style>