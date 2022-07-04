import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/activity',
    component: Layout,
    redirect: '/activity/activity-list',
    name: 'activity',
    meta: {
      title: '活动',
      icon: 'table',
      permissionType: '11'
      // roles: ['管理员', '普通扫码操作员', '可新增活动的操作员']
    },
    children: [
      {
        path: 'activity-list',
        component: () => import('@/views/activity/activity-list'),
        name: 'activityList',
        meta: {
          title: '活动列表',
          permissionType: '11' }
      },
      {
        path: 'activity-edit/:id',
        component: () => import('@/views/activity/activity-edit'),
        name: 'activityEdit',
        meta: { title: '活动编辑', keepAlive: false, permissionType: '12' },
        hidden: true
      },
      {
        path: 'activity-add',
        component: () => import('@/views/activity/activity-add'),
        name: 'activityAdd',
        meta: { title: '活动添加', keepAlive: false, permissionType: '9' },
        hidden: true
      },
      {
        path: 'activity-details/:id',
        component: () => import('@/views/activity/activity-details'),
        name: 'activityDetails',
        meta: { title: '活动详情', keepAlive: false, permissionType: '11' },
        hidden: true
      },
      {
        path: 'scanCodePage/:id',
        component: () => import('@/views/activity/scanCodePage'),
        name: 'ScanCodePage',
        meta: { title: '二维码扫码', keepAlive: false },
        hidden: true
      }

    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/user-list',
    name: 'user',
    meta: {
      title: '人员',
      icon: 'user', permissionType: '3'
      // roles: ['管理员']
    },
    children: [
      {
        path: 'user-list',
        component: () => import('@/views/user/user-list'),
        name: 'userList',
        meta: { title: '人员列表', permissionType: '3' }
      },
      {
        path: 'user-edit/:id',
        component: () => import('@/views/user/user-edit'),
        name: 'userEdit',
        meta: { title: '人员编辑', keepAlive: false, permissionType: '4' },
        hidden: true
      },
      {
        path: 'user-add',
        component: () => import('@/views/user/user-add'),
        name: 'userAdd',
        meta: { title: '人员添加', keepAlive: false, permissionType: '1' },
        hidden: true
      },
      {
        path: 'user-details/:id',
        component: () => import('@/views/user/user-details'),
        name: 'userDetails',
        meta: { title: '人员详情', keepAlive: false, permissionType: '3' },
        hidden: true
      }
    ]
  },
  {
    path: '/department',
    component: Layout,
    redirect: '/department/department-list',
    name: 'department',
    meta: {
      title: '部门',
      icon: 'tree', permissionType: '7'
      // roles: ['管理员']
    },
    children: [
      {
        path: 'department-list',
        component: () => import('@/views/department/department-list'),
        name: 'departmentList',
        meta: { title: '部门列表', permissionType: '7' }
      },
      {
        path: 'department-edit/:id',
        component: () => import('@/views/department/department-edit'),
        name: 'departmentEdit',
        meta: { title: '部门编辑', keepAlive: false, permissionType: '8' },
        hidden: true
      },
      {
        path: 'department-add',
        component: () => import('@/views/department/department-add'),
        name: 'departmentAdd',
        meta: { title: '部门添加', keepAlive: false, permissionType: '5' },
        hidden: true
      },
      {
        path: 'department-details/:id',
        component: () => import('@/views/department/department-details'),
        name: 'departmentDetails',
        meta: { title: '部门详情', keepAlive: false, permissionType: '8' },
        hidden: true
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/activity/activity-list',
    // children: [{
    //   path: 'dashboard',
    //   name: 'Dashboard',
    //   component: () => import('@/views/dashboard/index'),
    //   meta: { title: 'Dashboard', icon: 'dashboard' },
    //   hidden: true
    // }]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    hidden: true,
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    hidden: true,
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        hidden: true,
        meta: { title: 'menu2' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
