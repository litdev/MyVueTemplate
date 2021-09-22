<template>
  <div>
    <el-tag type="success">参数：{{ paramVal }}</el-tag>
    <br/>
    <br>
    <el-button @click="useApi">访问接口</el-button>
  </div>
</template>

<script>

export default {
    components: {
        
    },
    data() {
        return {
            paramVal:"",
        };
    },
    computed: {
    
    },
    created() {
      this.paramVal = this.$route.query.val;
    },
    methods: {
      useApi(){
        this.$apiGetUserInfo().then(res=>{
          console.log(res);
        }).catch(error=>{
          // console.log(error);
        });
      },
    },
}
</script>

<style lang="scss" scoped>

</style>