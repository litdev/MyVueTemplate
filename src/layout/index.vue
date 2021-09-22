<template>
    <div>
        <app-header></app-header>

        <app-main></app-main>

        <app-footer></app-footer>
    </div>
</template>

<script>
import appHeader from "@/layout/components/header";
import appMain from "@/layout/components/main";
import appFooter from "@/layout/components/footer";
export default {
    components: {
        appHeader,
        appFooter,
        appMain,
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
</style>