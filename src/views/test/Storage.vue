<template>
    <div>
        <el-row>
            <el-col>
                <el-button @click="setLocalStorage">设置local缓存</el-button>
                <el-button @click="getLocalStorage">获取local缓存</el-button>
            </el-col>
            <el-col style="margin-top:20px">
                <el-button @click="setSessionStorage">设置session缓存</el-button>
                <el-button @click="getSessionStorage">获取session缓存</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-divider>分割</el-divider>
            <Test></Test>
        </el-row>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {};
    },
    computed: {},
    created() {},
    methods: {
        getSessionStorage() {
            this.$message.success("值：" + this.$storage.session.get("abc"));
        },
        setSessionStorage() {
            this.$storage.session.set("abc", "123");
            this.$message.success("设置成功");
        },
        getLocalStorage() {
            let val1 = this.$storage.local.get("key1");
            let val2 = this.$storage.local.get("key2");
            this.$message.success("值：val1:" + val1 + "---val2:" + val2);
        },
        setLocalStorage() {
            this.$storage.local.set("key1", "val1", 1);
            this.$storage.local.set("key2", "val2");
            this.$message.success("设置成功");
        },
    },
};
</script>

<style lang="scss" scoped>
</style>