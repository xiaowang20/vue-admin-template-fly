import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [{
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },
    {
        path: '/404',
        component: () =>
            import ('@/views/404'),
        hidden: true
    },
    {
        path: '',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'dashboard',
            component: () =>
                import ('@/views/dashboard/index'),
            meta: { title: '飞往', icon: 'home' }
        }]
    }
]
export const asyncRouterMap = [

    //员工资料
    {
        path: '/emp',
        component: Layout,
        redirect: '/employee',
        name: '员工资料',
        meta: { title: '员工资料', icon: 'product' },
        children: [{
                path: 'basic',
                name: '基本资料',
                component: () =>
                    import ('@/views/employee/basic/index'),
                meta: { title: '基本资料', icon: 'product-list' }
            },
            {
                path: 'addEmpolyee',
                name: 'addEmployee',
                component: () =>
                    import ('@/views/employee/basic/add'),
                meta: { title: '添加员工', icon: 'product-list' },
                hidden: true
            },
            {
                path: 'updateEmpolyee',
                name: 'updateEmployee',
                component: () =>
                    import ('@/views/employee/basic/update'),
                meta: { title: '修改员工', icon: 'product-list' },
                hidden: true
            },
            {
                path: 'adv',
                name: '高级资料',
                component: () =>
                    import ('@/views/employee/advanced/index'),
                meta: { title: '高级资料', icon: 'product-list' }
            }

        ]
    },
    //人事管理
    {
        path: '/per',
        component: Layout,
        redirect: '/personnel',
        name: '人事管理',
        meta: { title: '人事管理', icon: 'product' },
        children: [{
                path: 'emp',
                name: '人事员工资料',
                component: () =>
                    import ('@/views/personnel/emp'),
                meta: { title: '人事员工资料', icon: 'product-list' }
            },
            {
                path: 'ec',
                name: '员工奖惩',
                component: () =>
                    import ('@/views/personnel/ec'),
                meta: { title: '员工奖惩', icon: 'product-list' }
            },
            {
                path: 'train',
                name: '员工培训',
                component: () =>
                    import ('@/views/personnel/train'),
                meta: { title: '员工培训', icon: 'product-list' }
            },
            {
                path: 'salary',
                name: '员工调薪',
                component: () =>
                    import ('@/views/personnel/salary'),
                meta: { title: '员工调薪', icon: 'product-list' }
            },
            {
                path: 'remove',
                name: '员工调动',
                component: () =>
                    import ('@/views/personnel/remove'),
                meta: { title: '员工调动', icon: 'product-list' }
            },
        ]
    },
    //薪资管理
    {
        path: '/salary',
        component: Layout,
        redirect: '/salary',
        name: '薪资管理',
        meta: { title: '薪资管理', icon: 'product' },
        children: [{
                path: 'sob',
                name: '工资账套管理',
                component: () =>
                    import ('@/views/salary/sob'),
                meta: { title: '工资账套管理', icon: 'product-list' }
            },
            {
                path: 'sobcfg',
                name: '员工账套设置',
                component: () =>
                    import ('@/views/salary/sobcfg'),
                meta: { title: '员工账套设置', icon: 'product-list' }
            },
            {
                path: 'table',
                name: '工资表管理',
                component: () =>
                    import ('@/views//salary/table'),
                meta: { title: '工资表管理', icon: 'product-list' }
            },
            {
                path: 'month',
                name: '月末处理',
                component: () =>
                    import ('@/views/salary/month'),
                meta: { title: '月末处理', icon: 'product-list' }
            },
            {
                path: 'search',
                name: '工资表查询',
                component: () =>
                    import ('@/views/salary/search'),
                meta: { title: '工资表查询', icon: 'product-list' }
            },
        ]
    },
    //统计管理
    {
        path: '/statistics',
        component: Layout,
        redirect: '/statistics',
        name: '统计管理',
        meta: { title: '统计管理', icon: 'product' },
        children: [{
                path: 'all',
                name: '综合信息统计',
                component: () =>
                    import ('@/views/statistics/all'),
                meta: { title: '综合信息统计', icon: 'product-list' }
            },
            {
                path: 'score',
                name: '员工积分统计',
                component: () =>
                    import ('@/views/statistics/score'),
                meta: { title: '员工积分统计', icon: 'product-list' }
            },
            {
                path: 'personnel',
                name: '人事信息统计',
                component: () =>
                    import ('@/views/statistics/personnel'),
                meta: { title: '人事信息统计', icon: 'product-list' }
            },
            {
                path: 'recored',
                name: '人事记录统计',
                component: () =>
                    import ('@/views/statistics/recored'),
                meta: { title: '人事记录统计', icon: 'product-list' }
            },
        ]
    },
    //系统管理
    {
        path: '/system',
        component: Layout,
        redirect: '/system',
        name: '系统管理',
        meta: { title: '系统管理', icon: 'product' },
        children: [{
                path: 'adminManage',
                name: 'admin',
                component: () =>
                    import ('@/views/system/admin/index'),
                meta: { title: '用户管理', icon: 'product-list' }
            },
            {
                path: 'roleManage',
                name: 'role',
                component: () =>
                    import ('@/views/system/role/index'),
                meta: { title: '角色管理', icon: 'product-list' }
            },
            // {
            //     path: 'allocMenu',
            //     name: 'allocMenu',
            //     component: () =>
            //         import ('@/views/system/role/allocMenu'),
            //     meta: { title: '分配菜单', icon: 'product-list' },
            //     hidden:true
            // },
            {
                path: 'menuManage',
                name: 'menu',
                component: () =>
                    import ('@/views/system/menu/index'),
                meta: { title: '菜单管理', icon: 'product-list' }
            },
            {
                path: 'addMenu',
                name: 'addMenu',
                component: () =>
                    import ('@/views/system/menu/add'),
                meta: { title: '添加菜单', icon: 'product-list' },
                hidden: true
            },
            {
                path: 'updateMenu',
                name: 'updateMenu',
                component: () =>
                    import ('@/views/system/menu/update'),
                meta: { title: '编辑菜单', icon: 'product-list' },
                hidden: true
            },
            {
                path: 'basic',
                name: '基础信息设置',
                component: () =>
                    import ('@/views/system/basic'),
                meta: { title: '基础信息设置', icon: 'product-list' }
            },
            {
                path: 'cfg',
                name: '系统配置管理',
                component: () =>
                    import ('@/views/system/cfg'),
                meta: { title: '系统配置管理', icon: 'product-list' }
            },
            {
                path: 'log',
                name: '操作日志管理',
                component: () =>
                    import ('@/views/system/log'),
                meta: { title: '操作日志管理', icon: 'product-list' }
            },
            {
                path: 'hr',
                name: '操作员管理',
                component: () =>
                    import ('@/views/system/hr'),
                meta: { title: '操作员管理', icon: 'product-list' }
            },
            {
                path: 'data',
                name: '备份恢复数据库',
                component: () =>
                    import ('@/views/system/data'),
                meta: { title: '备份恢复数据库', icon: 'product-list' }
            },
            {
                path: 'init',
                name: '初始化数据库',
                component: () =>
                    import ('@/views/system/init'),
                meta: { title: '初始化数据库', icon: 'product-list' }
            },
        ]
    },

    { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})