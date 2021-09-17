<template>
    <div>
        工具测试
        <span v-hasLogin>登录可见</span>
        <el-divider></el-divider>
        <!-- 背景图 v-lazy:background-image = "" -->
        <img v-lazy="testImage" :key="testImage" style="width:30px;height:30px;" alt="图片">
        <el-divider></el-divider>
        <el-empty description="找不到相关数据"></el-empty>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            testImage: "https://www.baidu.com/img/flexible/logo/pc/result2.png",
        };
    },
    computed: {},
    mounted() {
        this.$hotkeys("enter", (e) => {
            //阻止窗体自带事件
            e.preventDefault();
            this.test();
        });
    },
    created() {
        console.log("参数：" + this.$route.query.ids);
        console.log("是否登录：" + this.$func.checkIsLogin());
        let base64 = this.$base64.encode("abc");
        console.log("base64：", base64, "，源：", this.$base64.decode(base64));
        // console.log(this.$math.add(4.2555,1,3));
        // console.log(this.$func.formatNumber('23.2555'));
        // console.log(this.$func.formatNoSepDate('20210201'));
        // console.log(this.$func.diffDateTime('2021/09/13 12:10:00','2021/09/13 12:20:00','am'));
        // console.log(this.$func.formatDate('2021/09/13 12:10:00','yyyy-MM-dd EE HH:mm:ss'));
        // console.log(this.$func.formatMoney(5255.511,2));
    },
    methods: {
        test() {},
    },
};
</script>

<style lang="less" scoped>
</style>