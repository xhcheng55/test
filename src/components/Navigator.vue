<template>
  <!-- 暂时不用 -->
  <div id="navigator">
    <div class="navigator-top">
      <ul>
        <li @click="pageReload($event)">首页</li>
        <li @click="judgeLogOrReg('log')">{{user.login}}</li>
        <router-link :to="{name:'indexLink'}" ><li @click="judgeLogOrReg('register')">{{user.register}}</li></router-link>
        <router-link :to="{name:'indexLink'}" @click="pageReload($event)"><li>联系我们</li></router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  inject: ['reload'],
  name: 'Navigator',
  props:["user"],
  data () {
    return {
      user:{
        login:'',
        register:''
      }
    }
  },
  methods:{
    // 跳转到person
    toPerson(user){
      var session = window.sessionStorage;
      session.setItem('user', user);
      this.reload()
    },
    pageReload(e){
      if(this.user.login != "登录"){
        this.$set(this.user, "login", $.cookie('extraName'));
        this.$set(this.user, "register", "注销");
        // this.$emit("changeStatus", $.cookie('extraName'));
        $('#index .right > .login').hide();
        $('#index .right > .register').hide();
        $('#index .right > .login-status').show();
      }
      else{
        this.$set(this.user, "login", "登录")
        this.$set(this.user, "register", "注册")
        $('#index .right > .login').show();
        $('#index .right > .register').hide();
        $('#index .right > .login-status').hide();
      }
      this.$router.push({name:'indexLink'});
    },
    judgeLogOrReg(com){
      if(com == 'log'){
        // var status = $('.navigator-top > ul > li')[1].innerText;
        var status = this.user.login;
        if(status =="登录"){
          this.$router.push({name:'indexLink'});
          this.$set(this.user, "login", "登录")
          this.$set(this.user, "register", "注册")
          $('#index .right > .login').show();
          $('#index .right > .register').hide();
          $('#index .right > .login-status').hide();
        }
        else{
          var username = $.cookie('username')
          this.$router.push({name:'personLink'});
          this.toPerson(username)
          this.reload();
        }
        
      }
      if(com == 'register'){
        if(this.user.register == "注册"){
          this.$set(this.user, "login", "登录")
          this.$set(this.user, "register", "注册")
          $('#index .right > .login').hide();
          $('#index .right > .register').show();
          $('#index .right > .login-status').hide();
          $('#index .right .login  .input-group  input.form-control')[0].value = "";
          $('#index .right .login  .input-group  input.form-control')[1].value = "";
        }
        else{
          $.cookie("username", "", { expires: 100, path: '/' });
          $.cookie("extraName", "", { expires: 100, path: '/' });
          this.$set(this.user, "login", "登录")
          this.$set(this.user, "register", "注册")
          this.$emit("changeStatus","注销")
          $('#index .right > .login').show();
          $('#index .right > .register').hide();
          $('#index .right > .login-status').hide();
          // $('#index .right .login  .input-group  input.form-control')[0].value = "";
          // $('#index .right .login  .input-group  input.form-control')[1].value = "";
          
          
        }
        
      }

    }
  },
  created() {
    
    var extraName = $.cookie('extraName')
    if(extraName){
      this.$set(this.user, "login", extraName)
      this.$set(this.user, "register", "注销")
    }else{
      this.$set(this.user, "login", "登录")
      this.$set(this.user, "register", "注册")
    }
  },
  
}


</script>


<style scoped>
#navigator{
  width: 90%;
  margin: 0 auto;
  
}
#navigator::after{
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
  width: 340px;
}
.navigator-top > ul > li{
  float: left;
  margin-left: 25px;
  line-height: 33px;
  color: #444;
  font-size: 14px;
  /* display: inline-block;
  max-width: 120px;
  white-space:nowrap;       
  overflow: hidden;             
  text-overflow: ellipsis; */
}
.navigator-top > ul > li:hover{
  cursor: pointer;
  text-decoration: none;
  color: rgba(33, 173, 216, 0.952);
}
.navigator-top >  ul >  li router-link{
  color:black;
}

</style>
