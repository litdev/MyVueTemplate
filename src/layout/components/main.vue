<template>
  <el-main>
      <router-view />
  </el-main>
</template>

<script>

export default {
    name: "app-main",
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
        return {
            
        };
    },
    computed: {
    
    },
    created() {

    },
    methods: {

    },
}
</script>

<style lang="scss" scoped>

</style>