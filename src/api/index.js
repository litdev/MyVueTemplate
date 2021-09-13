import Vue from 'vue';
const allApi = require.context('./', true, /\.js$/)

// 全局批量挂载接口，使用方式：this.$api接口名
const install = allApi.keys().map(item => {
    Object.keys(allApi(item)).forEach(key => {
        Vue.prototype["$api" + key] = allApi(item)[key];
    })
})

export default install