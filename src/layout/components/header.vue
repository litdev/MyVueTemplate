<template>
    <el-header>
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link> |
            <router-link to="/test/vuex">Vuex</router-link> |
            <router-link to="/test/storage">本地缓存</router-link> |
            <router-link to="/test/tools?ids=abc">工具类</router-link> |
        </div>
    </el-header>
</template>

<script>
export default {
    name: "app-header",
    props: {
        demoPropsList: {
            type: Array,
            default() {
                return [];
            },
        },
        demoNumber: { type: Number, default: 2 },
        demoString: { type: String, default: "abc" },
    },
    data() {
        return {};
    },
    computed: {},
    created() {},
    methods: {},
};
</script>

<style lang="scss" scoped>
#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>