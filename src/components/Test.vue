<template>
  <div>
      测试组件 - {{ this.$const.MyConst }}
  </div>
</template>

<script>

export default {
    name: "Test",
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

<style lang="less" scoped>

</style>