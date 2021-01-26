import Vue from "vue";
import VueRouter from "vue-router";

import NProgress from "nprogress";
import "nprogress/nprogress.css";

import findLast from 'lodash/findLast'

import { check, isLogin } from "@/utils/auth.js";

import NotFound from "../views/NotFound/404.vue";
import Forbidden from "../views/Forbidden/403.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: '/user',
    hideInMenu: true,
    component: () =>
      import(/* webpackChunkName: "UserLayout" */ "@/layouts/UserLayout.vue"),
    children: [
      {
        path: '/user',
        redirect: '/user/login'
      },
      {
        path: '/user/login',
        name: 'login',
        component: () =>
          import(/* webpackChunkName: "login" */ "@/views/User/login.vue")
      },
      {
        path: '/user/register',
        name: 'register',
        component: () =>
          import(/* webpackChunkName: "register" */ "@/views/User/register.vue")
      }
    ]
  },


  {
    path: '/',
    meta: { authority: ['user', 'admin'] },
    component: () =>
      import(/* webpackChunkName: "BasicLayout" */ "@/layouts/BasicLayout.vue"),
    children: [
      {
        path: '/',
        redirect: '/dashboard/index'
      },
      {
        path: '/dashboard',
        name: '首页',
        breadcrumbName : '首页',
        meta: {
          icon: 'dashboard',
          title: '首页'
        },
        component: { render: h => h('router-view') },
        children: [
          {
            path: '/dashboard/index',
            name: 'index',
            breadcrumbName : '首页',
            meta: { icon: 'dashboard', title: '首页' },
            component: () =>
              import(/* webpackChunkName: "index" */ "@/views/dashboard/index.vue"),
          }
        ]
      },
      {
        path: '/zbgl',
        name: '指标管理',
        breadcrumbName : '指标管理',
        meta: {
          icon: 'pie-chart',
          title: '指标管理',
          authority: ['admin']
        },
        component: { render: h => h('router-view') },
        children: [
          {
            path: '/zbgl/zbtx',
            name: '指标体系',
            breadcrumbName : '指标体系',
            meta: { icon: 'pie-chart', title: '指标体系' },
            component: () =>
              import(/* webpackChunkName: "zbtx" */ "@/views/zbgl/zbtx/zbtx.vue")
          },
          {
            path: '/zbgl/zbysj',
            name: '指标元数据',
            breadcrumbName : '指标元数据',
            meta: { icon: 'pie-chart', title: '指标元数据' },
            component: () =>
              import(/* webpackChunkName: "zbtx" */ "@/views/zbgl/zbysj/zbysj.vue")
          }
        ]
      },
      {
        path: '/khmxgl',
        name: '考核模型管理',
        breadcrumbName : '考核模型管理',
        meta: {
          icon: 'pie-chart',
          title: '考核模型管理',
          authority: ['admin']
        },
        component: { render: h => h('router-view') },
        children: [
          {
            path: '/khmxgl/sjygl',
            name: '数据源管理',
            breadcrumbName : '数据源管理',
            meta: { icon: 'pie-chart', title: '数据源管理' },
            component: () =>
              import(/* webpackChunkName: "sjygl" */ "@/views/khmxgl/sjygl/sjygl.vue")
          },
          {
            path: '/khmxgl/mxzd',
            name: '模型制定',
            breadcrumbName : '模型制定',
            meta: { icon: 'pie-chart', title: '模型制定' },
            component: () =>
              import(/* webpackChunkName: "mxzd" */ "@/views/khmxgl/mxzd/mxzd.vue")
          },
          {
            path: '/khmxgl/mxgl',
            name: '模型管理',
            breadcrumbName : '模型管理',
            meta: { icon: 'pie-chart', title: '模型管理' },
            component: () =>
              import(/* webpackChunkName: "mxgl" */ "@/views/khmxgl/mxgl/mxgl.vue")
          }
        ]
      },
      {
        path: '/bkgl',
        name: '板块管理',
        breadcrumbName : '板块管理',
        meta: {
          icon: 'pie-chart',
          title: '板块管理',
          authority: ['admin']
        },
        component: { render: h => h('router-view') },
        children: [
          {
            path: '/bkgl/zsgl',
            name: '展示管理',
            breadcrumbName : '展示管理',
            meta: { icon: 'pie-chart', title: '展示管理' },
            component: () =>
              import(/* webpackChunkName: "zsgl" */ "@/views/bkgl/zsgl/zsgl.vue")
          },
          {
            path: '/bkgl/qxgl',
            name: '权限管理',
            breadcrumbName : '权限管理',
            meta: { icon: 'pie-chart', title: '权限管理' },
            component: () =>
              import(/* webpackChunkName: "qxgl" */ "@/views/bkgl/qxgl/qxgl.vue")
          }
        ]
      },
      {
        path: '/khksh',
        name: '考核可视化',
        breadcrumbName : '考核可视化',
        meta: {
          icon: 'pie-chart',
          title: '考核可视化',
          authority: ['admin']
        },
        component: { render: h => h('router-view') },
        children: [
          {
            path: '/khksh/khtb',
            name: '考核填报',
            breadcrumbName : '考核填报',
            meta: { icon: 'pie-chart', title: '考核填报' },
            component: () =>
              import(/* webpackChunkName: "khtb" */ "@/views/khksh/khtb/khtb.vue")
          },
          {
            path: '/khksh/jckh',
            name: '基础考核',
            breadcrumbName : '基础考核',
            meta: { icon: 'pie-chart', title: '基础考核' },
            component: () =>
              import(/* webpackChunkName: "jckh" */ "@/views/khksh/jckh/jckh.vue")
          }
        ]
      }
    ]
  },
  {
    path: "/403",
    name: "403",
    hideInMenu: true,
    component: Forbidden
  },
  {
    path: "*",
    name: "404",
    hideInMenu: true,
    component: NotFound
  }
];

const router = new VueRouter({
  routes
});


router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start()
  }
  const record = findLast(to.matched, record => record.meta.authority)
  if (record && !check(record.meta.authority)) {
    if (!isLogin() && to.path !== '/user/login') {
      next({
        path: '/user/login'
      })
    } else if (to.path !== '403') {
      next({
        path: '/403'
      })
    }
    NProgress.done()
  }

  next()
})

router.afterEach(() => {
  NProgress.done()
})

// 解决重复点击导航出现的错误
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router;
