<template>
    <div id="app">
        <router-view v-if="isRouterAlive" />
    </div>
</template>

<script>
export default {
    name: "App",
    provide() {
        //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
        return {
            reloadView: this.reloadView,
        };
    },
    data() {
        return {
            isRouterAlive: true, //控制视图是否显示的变量
        };
    },
    computed: {},
    mounted() {},
    created() {
        console.log(this.$route.query.val);
        console.debug("环境名称:" + process.env.NODE_ENV);
        console.debug("站点根路径：" + process.env.BASE_URL);
        console.debug("接口基本地址：" + process.env.VUE_APP_BASE_API);
    },
    methods: {
        reloadView() {
            this.isRouterAlive = false; //先关闭，
            this.$nextTick(function () {
                this.isRouterAlive = true; //再打开
            });
        },
    },
};
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
