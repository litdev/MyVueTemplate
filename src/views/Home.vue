<template>
    <div class="home">
        <img alt="Vue logo" v-lazy="testBackgroundImage">
        <!-- 测试背景图懒加载 -->
        <div class="myapp" v-lazy:background-image="testBackgroundImage"></div>
        <HelloWorld msg="Welcome to Your Vue.js App">TTTTT</HelloWorld>
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
    name: "Home",
    data() {
        return {
            //测试背景图懒加载
            testBackgroundImage: require("@/assets/images/logo.png"),
        };
    },
    components: {
        HelloWorld,
    },
};
</script>

<style lang="scss" scoped>
.myapp {
    height: 200px;
    // background-image: url("~@/assets/images/app-icon.png");
    background-repeat: no-repeat;
    background-position: 50%;
}
</style>
