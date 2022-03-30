import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

//修改const体现封装思想
const user = {
    state: {
        token: getToken(),
        name: '',
        avatar: '',
        roles: []
    },



    mutations: {
        // RESET_STATE: (state) => {
        //   Object.assign(state, getDefaultState())
        // },
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        }
    },

    actions: {
        // 登录
        Login({ commit }, userInfo) {
            const username = userInfo.username.trim()
            return new Promise((resolve, reject) => {
                login(username, userInfo.password).then(response => {
                    const data = response.data
                    const tokenStr = data.tokenHead + data.token
                    setToken(tokenStr)
                    commit('SET_TOKEN', tokenStr)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        //  获取用户信息
        GetInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                getInfo(state.token).then(response => {
                    const data = response.data //后端获取数据
                    if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
                        commit('SET_ROLES', data.roles)
                    } else {
                        reject('认证失败，请重新登录!')
                    }
                    commit('SET_NAME', data.username) //要需改的地方
                    commit('SET_AVATAR', data.userface) //要需改的地方
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 登出，添加了role，换了一种方式清空数据
        logout({ commit, state }) {
            return new Promise((resolve, reject) => {
                logout(state.token).then(() => {
                    commit('SET_TOKEN', '')
                    commit('SET_ROLES', [])
                    removeToken()
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 前端 登出
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                removeToken()
                resolve()
            })
        }
        // // remove token
        // resetToken({ commit }) {
        //   return new Promise(resolve => {
        //     removeToken() // must remove  token  first
        //     commit('RESET_STATE')
        //     resolve()
        //   })
        // }
    }

}

export default user