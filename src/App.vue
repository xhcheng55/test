<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row">
        <!-- 导航栏+搜索栏 -->
        <div class="nav-search">
          <!-- 导航 -->
          <!-- <div class="navigator">
            <div class="navigator-top">
              <ul>
                <router-link :to="{name:'indexLink'}"><li>首页</li></router-link>
                <li>登录</li>
                <li>注册</li>
                <li>联系我们</li>
              </ul>
            </div>
          </div> -->
          <navigator v-bind:user="user" v-on:changeStatus="changeStatus($event)"></navigator>
          <!-- 搜索 -->
          <search></search>
          <router-view v-if="isRouterAlive" v-on:login="userLogin($event)" v-bind:status="status"></router-view>
          <footer>
            ©2019 Juyiqi Xhcheng. All rights reserved.
          </footer>
        </div>  
      </div>
    </div>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld"
import Search from "./components/Search"
import Index from "./components/Index"
import Navigator from "./components/Navigator"
import SinglePage from "./components/SinglePage"


export default {
  name: 'App',
  provide(){
    return{
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true,
      user:{
        login:"登录",
        register:"注册"
      },
      status:''
    }
  },
  computed: {
    
  },
  // 添加新的组件要配置一下
  components:{
    "navigator":Navigator,
    "helloworld":HelloWorld,
    "search":Search
  },
  methods:{
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(function(){
        this.isRouterAlive = true;
      })
    },
    userLogin(obj){
      this.user = {
        login: obj.extraName,
        register: "注销"
      }
      if(typeof obj == "string"){
        this.$set(this.user, "login", obj);
        this.$set(this.user, "register", "注销");
        // console.log(obj)
        // console.log(typeof obj)
      }
      else{
        this.$set(this.user, "login", obj.extraName);
        this.$set(this.user, "register", "注销");
        this.status = "已登录";
      }
    },
    changeStatus(state){
      if(state=="注销"){
        
        this.user = {
          login: "登录",
          register: "注册"
        }
        this.$set(this.user, "login", "登录")
        this.$set(this.user, "register", "注册")
        
        this.status = "";
      }
      else{
        this.user = {
          login: 'state',
          register: "注册"
        }
        this.$set(this.user, "login", $.cookie('extraName'))
        this.$set(this.user, "register", "注销")
        // console.log(this.user)
        // console.log(this.user)
      }
      
    }
  }
  
}
</script>

<style>
*{
  padding:0;
  margin:0;
  text-decoration: none;
  list-style: none;
}
.router-link-active{
  text-decoration: none;
}
body{
  background: #fff;
}
.navigator{
  width: 100%;
}
.nav-search{
  height: 33px;
  border-bottom: 1px solid #ddd;
}
.nav-search::after{
  clear: both;
  display: block;
  height: 0;
  content: ''
}
.nav-search .navigator{
  width: 87%;
  margin: 0 auto;
}
.nav-search .navigator::after{
  content:'';
  height: 0;
  clear: both;
  display: block;
}
.navigator-top{
  width: 100%;
}
.navigator-top ul{
  float: right;
  width: 250px;
  
}
.navigator-top ul li{
  float: left;
  margin-left: 25px;
  line-height: 33px;
  color: #444;
}
.navigator-top ul li:hover{
  cursor: pointer;
  text-decoration: none;
  color: rgba(33, 173, 216, 0.952);
}
.navigator-top ul li router-link{
  color:black;
}


footer{
  text-align: center;
  padding: 20px;
  background: #ddd;
  margin-top: 20px;
}
</style>
