<template>
    <div class="home">
        <img alt="Vue logo" src="@/assets/logo.png">
        <div class="myapp">哈哈</div>
        <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
    name: "Home",
    components: {
        HelloWorld,
    },
};
</script>

<style lang="scss" scoped>
.myapp {
  min-height: 100px;
  background-image: url("~@/assets/app-icon.png");
  // background-repeat: no-repeat;
}
</style>
