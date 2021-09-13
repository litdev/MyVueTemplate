<template>
    <div>
        <el-row>
            <el-col>
                <el-button @click="setToken">设置token</el-button>
                <el-button @click="getToken">获取token</el-button>
                <br>
                <span> state方式： {{ $store.state.user.token }} </span>
                <br>
                <span> getter方式： {{ $store.getters.token }} </span>
                <br>
                <span> ...mapState方式： {{ getTokenFromMapState }} </span>
                <br>
                <span> ...mapGetter方式： {{ getTokenFromMapGetters }} </span>

            </el-col>
            <el-col>
                <el-divider>分割</el-divider>
                <el-button @click="setUserInfo">设置用户信息</el-button>
                <el-button @click="getUserInfo">获取用户信息</el-button>
            </el-col>
            <el-col>
                <el-divider>分割</el-divider>
                <el-button @click="dispatchTest">dispatch方式</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
    components: {},
    data() {
        return {};
    },
    computed: {
        ...mapState({
            getTokenFromMapState: (state) => state.user.token,
        }),

        ...mapGetters({
            getTokenFromMapGetters: "token", //等同：this.$store.getters.token
        }),
        // ...mapGetters([
        //     "token", //等同：this.$store.getters.token
        // ]),
    },
    created() {},
    methods: {
        dispatchTest() {
            this.$store.dispatch("user/test", "abcx5335453453");
        },
        setUserInfo() {
            this.$store.commit("user/SET_CURRENTUSERINFO", { id: 12, name: "张三" });
            this.$message.success("设置成功");
        },
        getUserInfo() {
            this.$message.success("值：" + JSON.stringify(this.$store.getters.currentUserInfo));
        },
        getToken() {
            this.$message.success("值：" + this.$store.getters.token);
        },
        setToken() {
            this.$store.commit("user/SET_TOKEN", "abc");
            this.$message.success("设置成功");
        },
    },
};
</script>

<style lang="less" scoped>
</style>