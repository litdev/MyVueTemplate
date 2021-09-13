import Vue from 'vue';
const allComponents = require.context('./', true, /\.vue$/)

// 批量挂载自定义组件
const install = allComponents.keys().map(path => {
    const component = allComponents(path).default;
    Vue.component(component.name, component);
})

export default install;