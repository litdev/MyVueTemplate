import Vue from 'vue';
const allDirective = require.context('./', false, /\.js$/)

// 批量注册自定义指令
const install = allDirective.keys().map(item => {
    Object.keys(allDirective(item)).forEach(key => {
        Vue.directive(key, allDirective(item)[key]);
    })
})

export default install