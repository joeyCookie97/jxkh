import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Home from '@/layout'

// 解决重复点击导航出现的错误
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

// 静态路由
export const constantRouterMap = [
    {
        path: '/login',
        component: () => import('@/views/login/login.vue')
    },
    {
        path: '/404',
        component: () => import('@/views/404/404.vue')
    }
]

// 动态路由
export const asyncRouterMap = [
    {
        path: '/',
        meta: {
            title: '首页'
        },
        component: Home,
        redirect: '/dashboard',
        children: [
            {
                path: '/dashboard',
                component: () => import('@/views/dashboard/dashboard.vue'),
                meta: {
                    icon: 'bar-chart',
                    title: "首页"
                }
            },
            {
                path: '/targetManagement/targetSystem',
                component: () => import('@/views/targetManagement/targetSystem/targetSystem.vue'),
                meta: {
                    parent: {
                        name: '指标管理'
                    },
                    icon: 'bar-chart',
                    title: "指标体系"
                }
            },
            {
                path: '/test/test',
                component: () => import('@/views/modelManagement/dataSource/dataSource.vue'),
                meta: {
                    parent: {
                        name: 'test',
                        parent: {
                            name: '指标管理'
                        }
                    },
                    icon: 'bar-chart',
                    title: "test"
                }
            },
            {
                path: '/targetManagement/targetMetadata',
                component: () => import('@/views/targetManagement/targetMetaData/targetMetaData.vue'),
                meta: {
                    parent: {
                        name: '指标管理'
                    },
                    icon: 'bar-chart',
                    title: "指标元数据"
                }
            },
            {
                path: '/modelManagement/dataSource',
                component: () => import('@/views/modelManagement/dataSource/dataSource.vue'),
                meta: {
                    parent: {
                        name: '考核模型管理'
                    },
                    icon: 'bar-chart',
                    title: '数据源管理'
                },
            },
            {
                path: '/modelManagement/modeFrmulation',
                component: () => import('@/views/modelManagement/modeFrmulation/modeFrmulation.vue'),
                meta: {
                    parent: {
                        name: '考核模型管理'
                    },
                    icon: 'bar-chart',
                    title: '模型制定'
                },
            }
        ]
    },
]

export const subMenuList = [
    {
        title: '首页',
        key: '首页',
        icon: 'home',
        permission: ['dashboard']
    },
    {
        title: '指标管理',
        key: '指标管理',
        icon: 'bar-chart',
        permission: ['admin']
    },
    {
        title: '考核模型管理',
        key: '考核模型管理',
        icon: 'bar-chart',
        permission: ['admin']
    },
    {
        title: '板块管理',
        key: '板块管理',
        icon: 'bar-chart',
        permission: ['admin']
    },
    {
        title: '考核可视化',
        key: '考核可视化',
        icon: 'bar-chart',
        permission: ['admin']
    },
]


const router = new VueRouter({
    mode: 'history',
    routes: constantRouterMap // 返回静态路由
})

// router.beforeEach((to, from, next) => {
//     if (to.meta && to.meta.title) {
//         document.title = "绩效考核-" + to.meta.title
//         const div = document.createElement('div')
//         div.className = 'loading-bar'
//         document.body.append(div)
//         // setTimeout(()=>{
//         next()
//         // },1000)
//     }
// })

// router.afterEach(() => {
//     const div = document.querySelector('.loading-bar')
//     document.body.removeChild(div)
// })


export default router