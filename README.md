# 前端Vue项目开发模板

### 项目目录

```bash
src
	api --接口目录
		user --模块
			index.js --模块下的接口分类
		index.js  ---接口批量挂载
    assets ---资源目录
        images --图片
    components --组件存放目录
        index.js --组件批量挂载
    directive --自定义指令存放目录
	layout --布局页面存放目录
	router ---路由目录
	store  --Vuex
	styles --样式存放目录
		index.scss --全局样式
		test.scss --样式各个模块，在index.scss.导入
	utils  --工具目录
	views  --视图页面存放目录
```

### 开发规范

- 变量名称规范

  1. 小驼峰格式
  2. 严禁直接使用data、datas、total、value、show、test、这类通用、易混淆的当变量名称，变量名称应遵循明确、可读理念，不明确的英文使用翻译后的，不能随心所欲的命名。

- 样式问题

  对于重复两次及以上的样式， 应在`styles`目录下对应新建模块的`scss`文件里，模块样式文件命名准确，比如要重写全局的按钮样式，则新建个`btn.scss`文件，能让人一眼看出这个`scss`文件是哪个模块的公用样式

- api接口

  接口文件根据建对应的文件夹，不能将所有的`api`都写在同一个`js`文件中

  假设操作的对象名称为：`inquiry`

  - 获取分页列表的方法名称格式为：`GetInquiryPageList`，不分页则为：`GetInquiryList`
  - 更新数据名称格式：`ModifyInquiry` 或者：`AddInquiry`
  - 删除数据名称格式：`DeleteInquiry` 

  接口调用格式如下：

  ```js
  this.$apiGetInquiryPageList(postData).then(res=>{
  	console.log(res);
  }).catch(error=>{
  	// console.log(error);
  });
  ```

  `.then`的js代码块如下：

  ```
  "Api接口接下来的Then操作": {
  	"prefix": ".then",
  	"body": [
  		".then((res) => { ",
  		"    $1" ,
  		"}).catch((error) => {",
  		"    $2",
  		"});"
  	],
  	"description": "接口then下面的操作"
  },
  ```

  #### img图片标签

  所有页面中的<img>标签，全部使用自定义指令`v-lazy`

  ```vue
  <template>
  	<div>
  		<img v-lazy="testImage" :key="testImage" alt="图片"> <!-- :key不可缺少 -->
  	</div>
  </template>
  <script>
  	...
  	data() {
          return {
              testImage: "https://www.baidu.com/img/flexible/logo/pc/result2.png",
          };
      },
  </script>
  
  ```

  > 使用自定义指令目的一是图片懒加载，二是处理了图片加载失败的情况下显示默认图片

  

  #### VS Code新建Vue页面的代码片段

  ```json
  {
  	// Place your snippets for vue here. Each snippet is defined under a snippet name and has a prefix, body and 
  	// description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
  	// $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the 
  	// same ids are connected.
  	// Example:
  	// "Print to console": {
  	// 	"prefix": "log",
  	// 	"body": [
  	// 		"console.log('$1');",
  	// 		"$2"
  	// 	],
  	// 	"description": "Log output to console"
  	// }
  	"Vue Page Template":{
  		"prefix": "vue",
  		"body": [
  			"<template>",
  			"  <div>",
  			"      $1",
  			"  </div>",
  			"</template>",
  			"",
  			"<script>",
  			"",
  			"export default {",
  			"    components: {",
  			"        ",
  			"    },",
  			"    data() {",
  			"        return {",
  			"            ",
  			"        };",
  			"    },",
  			"    computed: {",
  			"    ",
  			"    },",
  			"    created() {",
  			"",
  			"    },",
  			"    methods: {",
  			"",
  			"    },",
  			"}",
  			"</script>",
  			"",
  			"<style lang=\"scss\" scoped>",
  			"",
  			"</style>",
  		],
  		"description": "Vue页面基本模板"
  	},
  	"Vue Components Template":{
  		"prefix": "vuec",
  		"body": [
  			"<template>",
  			"  <div>",
  			"      ",
  			"  </div>",
  			"</template>",
  			"",
  			"<script>",
  			"",
  			"export default {",
  			"    name: \"$1\",",
  			"    props: {",
  			"        demoPropsList: {",
  			"            type: Array,",
  			"            default() {",
  			"                return [];",
  			"            },",
  			"        },",
  			"        demoNumber: { type: Number, default: 2 },",
  			"        demoString: { type: String, default: \"abc\" },",
  			"        ",
  			"    },",
  			"    data() {",
  			"        return {",
  			"            ",
  			"        };",
  			"    },",
  			"    computed: {",
  			"    ",
  			"    },",
  			"    created() {",
  			"",
  			"    },",
  			"    methods: {",
  			"",
  			"    },",
  			"}",
  			"</script>",
  			"",
  			"<style lang=\"scss\" scoped>",
  			"",
  			"</style>",
  		],
  		"description": "Vue组件页面基本模板"
  	},
  }
  ```

  > 这样新建vue页面的时候快速生成基本页面框架

## 部署路由问题
因为这里使用了History方式的模式，所以在生产环境下，页面刷新会直接报错404,[官方说明文档](https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E5%90%8E%E7%AB%AF%E9%85%8D%E7%BD%AE%E4%BE%8B%E5%AD%90)

如果是IIS部署，则需要安装 [IIS UrlRewrite模块](https://www.iis.net/downloads/microsoft/url-rewrite)

然后在建个`web.config`，内容如下：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="Handle History Mode and custom 404/500" stopProcessing="true">
          <match url="(.*)" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="/" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
```

