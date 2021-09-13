<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/test/vuex">Vuex</router-link> | 
      <router-link to="/test/storage">本地缓存</router-link> | 
      <router-link to="/test/tools?ids=abc">工具类</router-link> | 
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
        return {
          
        };
    },
    computed: {
    
    },
    mounted(){
      
    },
    created() {
      console.log(this.$route.query.val);
      console.debug("环境名称:"+ process.env.NODE_ENV);
      console.debug("站点根路径："+ process.env.BASE_URL);
      console.debug("接口基本地址："+process.env.VUE_APP_BASE_API);
    },
    methods: {
      
    },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

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
