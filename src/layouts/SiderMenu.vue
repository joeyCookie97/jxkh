<template>
  <div style="width: 256px">
    <a-menu
      :selected-keys="selectedKeys"
      :open-keys.sync="openKeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
      class="siderBackground"
      @click="onClick"
    >
      <template v-for="item in menuData">
        <a-menu-item
          v-if="!item.children"
          :key="item.path"
          @click="()=> $router.push({path: item.path})"
        >
          <a-icon :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu
          v-else
          :key="item.path"
          :menu-info="item"
        />
      </template>
    </a-menu>
  </div>
</template>

<script>
import eventBus from '@/bus/bus.js'
import { Menu } from 'ant-design-vue';
import { check } from '@/utils/auth.js'
const SubMenu = {
  template: `
      <a-sub-menu :key="menuInfo.path" class="siderBackground" v-bind="$props" v-on="$listeners">
        <span slot="title">
          <a-icon type="mail" /><span>{{ menuInfo.meta.title }}</span>
        </span>
        <template v-for="item in menuInfo.children">
          <a-menu-item v-if="!item.children" :key="item.path" @click="()=> $router.push({path: item.path})">
            <a-icon :type="item.meta.icon" />
            <span>{{ item.meta.title }}</span>
          </a-menu-item>
          <sub-menu v-else :key="item.path" :menu-info="item" />
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
    // 存放所有的菜单选中数据
    this.selectedKeysMap = {}
    // 存放所有的菜单打开数据,例如：当前页面为'/dashboard',从openKeysMap找到这项并拿到所有打开的菜单的key
    this.openKeysMap = {}
    // 拿到处理好格式的路由菜单
    const menuData = this.getMenuData(this.$router.options.routes)
    this.$store.commit('SET_MENU',menuData)
    return {
      // 菜单折叠
      collapsed: false,
      // 路由菜单
      menuData,
      // 当前选中的菜单项 key 数组
      selectedKeys: this.selectedKeysMap[this.$route.path],
      // 当前展开的 SubMenu 菜单项 key 数组
      openKeys: this.collapsed ? [] : this.openKeysMap[this.$route.path]
    };
  },
  watch: {
    '$route.path': function(val) {
      this.selectedKeys = this.selectedKeysMap[val]
      this.openKeys = this.collapsed ? [] : this.openKeysMap[val]
    }
  },
  methods: {
    // 传给面包屑当前导航
    onClick(item) {
      console.log(item);
      eventBus.$emit("switchMenu", item);
    },
    // 导航折叠、展开
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    getMenuData(routes = [], parentKeys = [], selectedKey) {
      const menuData = []
      for (let item of routes) {
        if(item.meta && item.meta.authority && !check(item.meta.authority)) {
          break;
        }

        if(item.name && !item.hideInMenu) {

          this.openKeysMap[item.path] = parentKeys
          this.selectedKeysMap[item.path] = [item.path || selectedKey]

          const newItem = {...item}
          delete newItem.children
          if(item.children && !item.hideChildrenInMenu) {
            newItem.children = this.getMenuData(item.children, [...parentKeys, item.path])
          } else {
            this.getMenuData(
              item.children, 
              selectedKey ? parentKeys : [...parentKeys, item.path],
              selectedKey || item.path 
            )
          }
          menuData.push(newItem)
        }else if(
          !item.hideInMenu &&
          !item.hideChildrenInMenu &&
          item.children
        ) {
          menuData.push(...this.getMenuData(item.children,[...parentKeys, item.path]))
        }
      }
      return menuData
    }
  },
};
</script>
<style lang='less' scoped>
.siderBackground{
    background: #1890ff;
}

</style>
<style lang='less'>
.ant-menu-dark .ant-menu-inline.ant-menu-sub {
    background: #1890ff !important;
    box-shadow: none !important;
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