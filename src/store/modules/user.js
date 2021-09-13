import { getToken,setToken,removeToken } from "@/utils/common";


const getDefaultState = () => {
    return {
        token: getToken(),
        currentUserInfo: {},
    }
}

const state = getDefaultState()

const mutations = {
    RESET_STATE: (state) => { //重置
        Object.assign(state, getDefaultState())
    },
    SET_TOKEN: (state, token) => { //设置token
        state.token = token
    },
    SET_CURRENTUSERINFO: (state, userInfo) => { //设置上下文用户信息
        state.currentUserInfo = userInfo
    },
}

// this.$store.dispatch('user/test','ab53');
const actions = {
    //测试
    test({ commit }, val) {
        commit('SET_TOKEN', val);
        console.log('设置完毕');
    },
    // 用户登录
    login({ commit }, userInfo) {
        const { username, password } = userInfo
        return new Promise((resolve, reject) => {
            login({ username: username.trim(), password: password }).then(response => {
                const { data } = response
                commit('SET_TOKEN', data.token)
                setToken(data.token) //保存到cookie中
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 获取用户信息
    getUsertInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getUserInfo().then(res => {
                const { BasicInfo } = res.data
                commit('SET_CURRENTUSERINFO', BasicInfo)
                resolve(BasicInfo)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            removeToken() // 删除cookie中的token
            commit('RESET_STATE')
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}