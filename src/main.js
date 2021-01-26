import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import '@/mock/mock'
import axios from "axios";
Vue.prototype.axios = axios

// 权限组件
import Authorized from '@/components/Authorized.vue'
Vue.component('Authorized',Authorized)

// ant design vue 
import { Button,Checkbox, Icon, Layout, Menu, Space, Table, Input, Form, Tree, Switch, Modal, FormModel, Row, Col, Popconfirm, Avatar, Breadcrumb } from 'ant-design-vue'
Vue.use(Button)
Vue.use(Icon)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Space)
Vue.use(Table)
Vue.use(Input)
Vue.use(Form)
Vue.use(Tree)
Vue.use(Switch)
Vue.use(Modal)
Vue.use(FormModel)
Vue.use(Row)
Vue.use(Col)
Vue.use(Popconfirm)
Vue.use(Avatar)
Vue.use(Breadcrumb)
Vue.use(Checkbox)



Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
