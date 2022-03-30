import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'//

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist
    //获取用户信息
router.beforeEach(async(to, from, next) => {
    // start progress bar
    NProgress.start()

    // set page title
    // document.title = getPageTitle(to.meta.title)

    // determine whether the user has logged in
    const hasToken = getToken()

    if (hasToken) {
        if (to.path === '/login') {
            // if is logged in, redirect to the home page
            next({ path: '/' })
            NProgress.done() //如果当前页面为空，每个钩子后仪表板都不会触发，所以手动处理它
        } else {
            // const hasGetUserInfo = store.getters.name
            if (store.getters.roles.length === 0) {
                store.dispatch('GetInfo').then(res => { // 拉取用户信息方法在store中
                    let menus = res.data.menus; //从后端获取资源
                    let username = res.data.username;
                    store.dispatch('GenerateRoutes', { menus, username }).then(() => { // 生成可访问的路由表
                        router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
                        next({...to, replace: true })
                    })
                }).catch((err) => {
                    store.dispatch('FedLogOut').then(() => {
                        Message.error(err || '认证失败，请从新登录！')
                        next({ path: '/' })
                    })
                })
            } else {
                // try {
                //     // get user info
                //     await store.dispatch('user/getInfo')

                //     next()
                // } catch (error) {
                //     // remove token and go to login page to re-login
                //     await store.dispatch('user/resetToken')
                //     Message.error(error || 'Has Error')
                //     next(`/login?redirect=${to.path}`)
                //     NProgress.done()
                // }
                next()
            }
        }
    } else {
        /* has no token*/

        if (whiteList.indexOf(to.path) !== -1) {
            // 在免费登录白名单中，直接进入
            next()
        } else {
            // 其他没有访问权限的页面将重定向到登录页面。
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})