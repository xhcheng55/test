<template>
  <div id="index">
    <!-- 分类选项卡 -->
    <div class="left-sort">
      <ul>
        <li class="active">推荐</li>
        <li v-for="(provincename, index) in province_u" :key="index.value" @mouseenter="universityShow($event)" >
          {{provincename.name}}
        </li>
      </ul>
      
    </div>
    <div class="showUniversity">
      <ul>
          <li v-for="(value, index) in u" :key="index.value" @click="toSinglePage(value,'')"><router-link :to="{name:'singlePageLink'}" >{{value}}</router-link></li>
      </ul>
    </div>
  
    <div class="middle clearfix">
      <!-- 新闻推荐 -->
      <div class="introduce-news">
        <div class="carousel-wrapper">
          <div id="carousel-example-generic" class="carousel slide" data-ride="carousel" dir="ltr" data-interval="4000">
            <ol class="carousel-indicators">
              <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
              <li data-target="#carousel-example-generic" data-slide-to="1"></li>
              <li data-target="#carousel-example-generic" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner" role="listbox">
              <div class="item active">
                <router-link :to="{name:'articleLink'}" @click="toArticle(introNews[0].newsTitle,introNews[0].userName,introNews[0].newsBelong)"><img :src="introNews[0].imgSrc" alt="..." @click="toArticle(introNews[0].newsTitle,introNews[0].userName,introNews[0].newsBelong)"></router-link>
              </div>
              <div class="item">
                <router-link :to="{name:'articleLink'}" @click="toArticle(introNews[1].newsTitle,introNews[1].userName,introNews[1].newsBelong)"><img :src="introNews[1].imgSrc" alt="..." @click="toArticle(introNews[1].newsTitle,introNews[1].userName,introNews[1].newsBelong)"></router-link>
              </div>
              <div class="item">
                <router-link :to="{name:'articleLink'}" @click="toArticle(introNews[2].newsTitle,introNews[2].userName,introNews[2].newsBelong)"><img :src="introNews[2].imgSrc" alt="..." @click="toArticle(introNews[2].newsTitle,introNews[2].userName,introNews[2].newsBelong)"></router-link>
              </div>
            </div>
            <!-- <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
              <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
            </a>
            <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
              <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
            </a> -->
          
          </div>
        </div>
        <div class="pic">
          <router-link :to="{name:'articleLink'}" @click="toArticle(introNews[3].newsTitle,introNews[3].userName,introNews[3].newsBelong)"><img :src="introNews[3].imgSrc" alt="news1" @click="toArticle(introNews[3].newsTitle,introNews[3].userName,introNews[3].newsBelong)"></router-link>
          <router-link :to="{name:'articleLink'}" @click="toArticle(introNews[4].newsTitle,introNews[4].userName,introNews[4].newsBelong)"><img class="bottom" :src="introNews[4].imgSrc" alt="news2" @click="toArticle(introNews[4].newsTitle,introNews[4].userName,introNews[4].newsBelong)"></router-link>
        </div>
      </div>
      <!-- 火热新闻 -->
      <div class="hot-news">
        <div class="update" @click="pageReload()">刷新</div>
        <ul>
          <li v-for="(item, index) in hotNews" :key="index">
            <div class="item clearfix">
              <img :src="item.imgSrc" alt="pic1">
              <div class="name">
                <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
                <router-link :to="{name:'personLink'}" @click="toPerson(item.userName)"><span class="content" @click="toPerson(item.userName)">{{item.extraName}}</span></router-link>
              </div>
              <router-link :to="{name:'articleLink'}" @click="toArticle(item.newsTitle, item.userName, item.newsBelong)"><p class="title" @click="toArticle(item.newsTitle, item.userName, item.newsBelong)">{{item.newsTitle}}</p></router-link>
              <p class="summary">{{item.newsSummary}}</p>
               <router-link :to="{name: 'singlePageLink'}" @click="toSinglePage(item.newsBelong,'')"><span class="belong" @click="toSinglePage(item.newsBelong,'')">{{item.newsBelong}}</span></router-link>
              <span class="time">{{item.newsUpdateTime}}</span>
              <span class="comments">评论数 : {{item.newsComments}}</span>
            </div>
          </li>
        </ul>
        
        
      </div>
    </div>

    <div class="right">
      <!-- 登录 -->
      <div class="login">
        <div class="title">
          用户登录
        </div>
        <div class="input-group">
          <div class="input-group-addon"><span class="glyphicon glyphicon-user" aria-hidden="true"></span></div>
          <input type="text" class="form-control" id="exampleInputAmount" placeholder="用户名">
        </div>
        <div class="input-group">
          <div class="input-group-addon"><span class="glyphicon glyphicon-comment" aria-hidden="true"></span></div>
          <input type="text" class="form-control" id="exampleInputAmount" placeholder="密码">
        </div>
        <div class="function">
          <span class="register" @click="register()">新用户注册</span>
          <span class="forget">忘记密码</span>
        </div>
        <button type="button" class="btn btn-primary" @click="checkLogin($event)">登录</button>
      </div>

      <!-- 用户注册 -->
      <div class="register">
        <div class="title">
          用户注册
        </div>
        <div class="input-group">
          <div class="input-group-addon"><span class="glyphicon glyphicon-user" aria-hidden="true"></span></div>
          <input type="text" class="form-control" id="exampleInputAmount" placeholder="用户名6-15位小写英文字母数字">
        </div>
        <div class="input-group">
          <div class="input-group-addon"><span class="glyphicon glyphicon-comment" aria-hidden="true"></span></div>
          <input type="text" class="form-control" id="exampleInputAmount" placeholder="密码6-15位小写英文字母数字">
        </div>
        <div class="input-group">
          <div class="input-group-addon"><span class="glyphicon glyphicon-comment" aria-hidden="true"></span></div>
          <input type="text" class="form-control" id="exampleInputAmount" placeholder="邮箱">
        </div>
        <div class="input-group">
          <input type="text" class="form-control check" id="exampleInputAmount" placeholder="验证码" >
          <button type="button" class="btn btn-default check" @click="getCheck($event)">{{getCheckInfo}}</button>
        </div>
        <div class="function">
          <!-- <span class="register">新用户注册</span>
          <span class="forget">忘记密码</span> -->
        </div>
        <button type="button" class="btn btn-primary" @click="checkAndRegister($event)">注册</button>
      </div>

      <!-- 已登录状态 -->
      <div class="login-status">
          <div class="title">我的账号信息</div>
          <div class="base-infor">
            <img :src="myInfo.imgSrc" alt="head-sculpture头像">
            <span class="name">昵称：</span>
            <p class="name">{{myInfo.extraName}}</p>
            <!-- <a href="#" class="change-infor">[ 修改个人资料 ]</a> -->
            <router-link :to="{name:'personLink'}" @click="toPerson(myInfo.name)">[ 修改个人资料 ]</router-link>
            
          </div>
          <router-link :to="{name:'personLink'}" @click="toPerson(myInfo.name)"><button class="btn btn-default personal"  @click="toPerson(myInfo.name)">个人中心</button></router-link>
          <router-link :to="{name:'personLink'}" @click="toPerson(myInfo.name)"><button class="btn btn-default article"  @click="toPerson(myInfo.name)">我的文章：{{myInfo.article}}</button></router-link>
      </div>


      <!-- 热评榜单 -->
      <div class="ranking-list">
        <div class="title">
          论坛热议榜
        </div>
        <ul>
          <li v-for="(value, index) in rankingList" :key="index">
            <span class="active rank">{{index + 1}}</span>
            <router-link :to="{name:'articleLink'}" @click="toArticle(value.title,value.userName,value.newsBelong)"><span class="content" @click="toArticle(value.title,value.userName,value.newsBelong)">{{value.title}}</span></router-link>
            <span class="comments">{{value.comments}}</span>
          </li>
        </ul>
      </div>

      <!-- 论坛娱乐 -->
      <div class="entertain">
        <div class="title">论坛娱乐<span>合作沟通</span></div>
        <router-link :to="{name:'articleLink'}" @click="toArticle(entertainNewsPic.title,entertainNewsPic.userName,entertainNewsPic.newsBelong)"><img :src="entertainNewsPic.imgSrc" alt="entertain" @click="toArticle(entertainNewsPic.title,entertainNewsPic.userName,entertainNewsPic.newsBelong)"></router-link>
        <ul>
          <li v-for="(item, index) in entertainNews" :key="index" @click="toArticle(item.title,item.userName,item.newsBelong)">
            <router-link :to="{name:'articleLink'}" @click="toArticle(item.title,item.userName,item.newsBelong)">{{item.title}}</router-link>
          </li>
        </ul>
      </div>

      <!-- 推荐社区 -->
      <div class="area-introduce">
        <div class="title">
          推荐关注
          <!-- <span class="left-arrow carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
            &lt;
          </span>
          <span class="right-arrow carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
            &gt;
          </span> -->
          <span class="focus">关注</span>
        </div>
        <div class="carousel-wrapper">  
          <div id="carousel-example-generic" class="carousel slide" data-ride="carousel" dir="ltr" data-interval="2000">
            <div class="carousel-inner" role="listbox">
              <div class="item active">
                <router-link :to="{name:'articleLink'}" @click="toArticle(introFocus[0].title,introFocus[0].userName,introFocus[0].newsBelong)"><img :src="introFocus[0].imgSrc" alt="..." @click="toArticle(introFocus[0].title,introFocus[0].userName,introFocus[0].newsBelong)"></router-link>
              </div>
              <div class="item">
                <router-link :to="{name:'articleLink'}" @click="toArticle(introFocus[1].title,introFocus[1].userName,introFocus[1].newsBelong)"><img :src="introFocus[1].imgSrc" alt="..." @click="toArticle(introFocus[1].title,introFocus[1].userName,introFocus[1].newsBelong)"></router-link>
              </div>
              <div class="item">
                <router-link :to="{name:'articleLink'}" @click="toArticle(introFocus[2].title,introFocus[2].userName,introFocus[2].newsBelong)"><img :src="introFocus[2].imgSrc" alt="..." @click="toArticle(introFocus[2].title,introFocus[2].userName,introFocus[2].newsBelong)"></router-link>
              </div>
            </div>
            <!-- <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
              <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
            </a> -->
          
          </div>

        </div>
      </div>
      
    </div>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  inject: ['reload'],
  props:['status'],
  name: 'Index',
  data () {
    return {
      // 左侧栏选择学校
      province_u:[
        {name:"北京",   university:['北京大学','清华大学','首都经济贸易大学']},
        {name:"上海",   university:['上海交通大学','华东师范大学','复旦大学']},
        {name:"重庆",   university:['重庆大学','重庆医科大学','重庆邮电大学']},
        {name:"河北",   university:['河北大学','河北农业大学','河北师范大学']},
        {name:"山西",   university:['重庆大学','重庆医科大学','重庆邮电大学']},
        {name:"辽宁",   university:['辽宁大学','东北大学','大连理工大学']},
        {name:"吉林",   university:['吉林大学','东北师范大学','长春理工大学']},
        {name:"黑龙江",   university:['哈尔滨工业大学','哈尔滨工程大学','黑龙江大学']},
        {name:"江苏",   university:['南京大学','东南大学','河海大学']},
        {name:"浙江",   university:['浙江师范大学','浙江大学','杭州电子科技大学']},
        {name:"安徽",   university:['安徽大学','安徽师范大学','安徽农业大学']},
        {name:"福建",   university:['厦门大学','福州大学','华侨大学']},
        {name:"江西",   university:['江西师范大学','江西财经大学','江西农业大学']},
        {name:"山东",   university:['中国海洋大学','山东师范大学','山东大学']},
        {name:"河南",   university:['河南农业大学','河南师范大学','河南科技大学']},
        {name:"湖北",   university:['武汉大学','武汉师范大学','武汉科技大学']},
        {name:"湖南",   university:['湖南师范大学','中南大学','湖南大学']},
        {name:"广东",   university:['华南师范大学','广州大学','中山大学']},
        {name:"海南",   university:['海南师范大学','海南医学院','海南大学']},
        {name:"四川",   university:['西南交通大学','西南财经大学','四川大学']},
        {name:"贵州",   university:['贵州师范大学','贵州民族大学','贵州大学']},
        {name:"云南",   university:['云南师范大学','云南民族大学','云南大学']},
        {name:"陕西",   university:['西安交通大学','西北工业大学','西安电子科技大学']},
        {name:"甘肃",   university:['兰州交通大学','兰州理工大学','兰州大学']},
        {name:"青海",   university:['青海大学','青海师范大学','青海民族大学']},
        {name:"台湾",   university:['国立台湾大学','国立政治大学','国立交通大学']},
        {name:"内蒙古",   university:['内蒙古农业大学','内蒙古师范大学','内蒙古大学']},
        {name:"广西",   university:['广西大学','广西师范大学','广西民族大学']},
        {name:"西藏",   university:['西藏大学','西藏民族大学','西藏农牧学院']},
        {name:"宁夏",   university:['宁夏大学','宁夏医科大学','北方民族大学']},
        {name:"新疆",   university:['新疆大学','新疆农业大学','新疆师范大学']},
        {name:"香港",   university:['香港大学','香港中文大学','香港科技大学']},
        {name:"澳门",   university:['澳门大学','澳门科技大学','澳门城市大学']},

      ],
      // 用来装学校名称放在ul li中的数组
      u:[],
      hotNews: [],
      // hotNews: [],
      introNews: [
        {
          imgSrc: '',
        },
        {
          imgSrc: '',
        },
        {
          imgSrc: '',
        },
        {
          imgSrc: '',
        },
        {
          imgSrc: '',
        },
      ],
      rankingList: [
        
        // {
        //   title: 'Python 正式登顶世界第一编程语言',
        //   comments: 122122
        // }
      ],
      // rankingList:[],
      entertainNews: [
        {
          id: 0,
          title: ''
        },
        {
          id: 0,
          title: ''
        },
        {
          id: 0,
          title: ''
        }
      ],
      // entertainNews: [],
      entertainNewsPic:{
        imgSrc: '',
        title:'',
        userName:'',
        newsBelong:''
      },
      // entertainNewsPic: {},
      introFocus: [
        {
          imgSrc: '',
        },
        {
          imgSrc: '',
        },
        {
          imgSrc: '',
        },
      ],
      // 登录后的个人信息
      myInfo: {
        imgSrc: '',
        name: '',
        article: '',
        extraName: ''
      },
      // 左侧栏被点击选中的学校
      universityChosen: '',
      // 登录时记录下来的用户名和密码
      loginInfo: {
        user: '',
        password: ''
      },
      // 注册时记录下来的用户名和密码以及邮箱
      registerInfo: {
        user: '',
        password: '',
        mail:'',
        checkStr: '',
        isEmailExist: false,
        isUserExist: false
      },
      getCheckInfo:'获取验证码'
      
    }
  },
  methods: {
    init(){
      
    },
    
    pageReload(){
      this.reload();
    },
    // 悬停在左侧栏选择学校
    universityShow(e){
      this.u = [];
      var event = e || window.event;
      var target = event.target|| event.srcElement;
      var name = target.innerText;
      var left = target.parentNode.offsetLeft + e.target.offsetWidth + 'px';
      var top = target.offsetTop + 'px';
      var content = $(this).text();
      $('#index .showUniversity').css({
        'top': top,
        'left': left,
        'display': 'block'
      })
      for(var pro of this.province_u){
        if(pro.name == name){
          for(var index in pro.university){
            this.$set(this.u, index, pro.university[index]);
          }
        }
      }
      if(this.u[0] == ''){
        this.u[0] = '暂无';
      }
    },
    // 点击选择学校
    chooseUniversity(e){
      var event = e || window.event;
      var target = event.target|| event.srcElement;
      this.universityChosen = $(target).text()
      
    },
    // 发送邮件验证码
    getCheck(e){
      var event = e || window.event;
      var target = event.target|| event.srcElement;
      var email = $(target.parentNode.parentNode.children[3].children[1]).val();
      var glo = this;
      // axios.get('http://119.3.90.180/static/checkuser.php')
      //   .then(res=>{
      //       console.log(res);
      //       })
      //   .catch(error=>{
      //       console.log(error);
      // });

      var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if(reg.test(email)){
        var sql = `SELECT email FROM user WHERE email="${email}"`;
        axios.post(`http://119.3.90.180/static/visitdatabase.php`,`sql=${sql}`)
          .then(res=>{
              // console.log(res.data);
              // for(var item of res.data){
              //   console.log(JSON.parse(item))
              // }
              if(res.data.length == 0){
                this.registerInfo.isEmailExist = false;
              }else{
                this.registerInfo.isEmailExist = true;
              }
              {
                if(this.registerInfo.isEmailExist){
                  alert("该邮箱已经被注册使用，请更换")
                }else{
                  // 发送邮件
                  axios.post(`http://119.3.90.180/static/sendmail.php`,`to=${email}`)
                    .then(res=>{
                        this.registerInfo.checkStr = res.data;
                        var sum = 60;
                        $(target).attr("disabled",true);
                        var timer = setInterval(function(){
                          if(sum>=0){
                            glo.getCheckInfo = `${sum} 秒后重新发送`;
                            sum--;
                            
                          }
                          else{
                            clearInterval(timer);
                            glo.getCheckInfo = `获取验证码`;
                            $(target).attr("disabled",false);
                          }
                        },1000)
                      })
                    .catch(error=>{
                        // console.log(error);
                  });
                }
              }
          })
          .catch(error=>{
              // console.log(error);
          });
        
        
        
      }else{
        alert("邮箱格式不正确");
      }
    },
    // 注册检验
    checkAndRegister(e){
      var event = e || window.event;
      var target = event.target|| event.srcElement;
      var user = $(target.parentNode.children[1].children[1]).val();
      var password = $(target.parentNode.children[2].children[1]).val();
      var email = $(target.parentNode.children[3].children[1]).val();
      var checkStr = $(target.parentNode.children[4].children[0]).val();
      this.registerInfo.user = user;
      this.registerInfo.password = password;
      this.registerInfo.mail = email;
      if(user.length <6 || user.length >15){
        alert('用户名过长或过短,长度应为6-15位');
      }else if(password.length <6 || password.length >15){
        alert('密码过长或过短，长度应为6-15位');
      }else if(checkStr != this.registerInfo.checkStr || checkStr==''){
        alert('验证码不正确，请重新输入');
      }else{
        var sql = `SELECT name FROM user WHERE name="${user}"`;
        axios.post(`http://119.3.90.180/static/visitdatabase.php`,`sql=${sql}`)
          .then(res=>{
              // console.log(res.data);
              // for(var item of res.data){
              //   console.log(JSON.parse(item))
              // }
              if(res.data.length == 0){
                this.registerInfo.isUserExist = false;
                var sql = `insert into user (name, password, email, imgSrc) values ("${user}", "${password}", "${email}", "../../static/img/carousel1.jpg")`;
                  axios.post(`http://119.3.90.180/static/visitdatabase.php`,`sql=${sql}`)
                    .then(res=>{
                        // console.log(res);
                        })
                    .catch(error=>{
                        // console.log(error);
                  });
                var sql = `insert into allarticles (title, author, imgSrc, content, belong, time, comment, type, itemOrder) values ("欢迎注册","${user}", "../../static/img/carousel1.jpg", "这是第一篇文章", "浙江师范大学", "20:44", "200", "原创", "0")`;
                axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
                  .then(res=>{
                      // console.log(res);
                      })
                  .catch(error=>{
                      // console.log(error);
                });
                var timer = setTimeout(function(){
                  alert('注册成功');
                  clearTimeout(timer);
                },500);
                this.reload()
              }else{
                this.registerInfo.isUserExist = true;
                alert('该用户名已经存在，请重新输入')
              }
          })
          .catch(error=>{
              // console.log(error);
          });
      }
    },
    // 登录检验
    checkLogin(e){
      var glo = this;
      var event = e || window.event;
      var target = event.target|| event.srcElement;
      var user = $(target.parentNode.children[1].children[1]).val();
      var password = $(target.parentNode.children[2].children[1]).val();
      let sql = `SELECT user.imgSrc, user.extraName, user.name, user.password, count(*) as count FROM user, allarticles WHERE user.name = "${user}" and user.name = allarticles.author and allarticles.type = "原创" limit 1`;
      axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
        .then(res=>{
          for(var item of res.data){
            var newObj = {
              imgSrc: item.imgSrc,
              name: item.name,
              password: item.password,
              article: item.count,
              extraName: item.extraName
            }
            this.myInfo = newObj;
          }
          if(this.myInfo.password ==password){
            // 成功
            alert("登录成功");
            var date = new Date();
            // 一个小时
            date.setTime(date.getTime()+ 60*1000*60);
            $.cookie("user", "true", { expires: date }); 
            $.cookie("username", this.myInfo.name, { expires: date, path: '/' });
            $.cookie("extraName", this.myInfo.extraName, { expires: date, path: '/' });
            // 展示数据
            this.$emit("login",{extraName: this.myInfo.extraName})
            $('#index .right .login  .input-group  input.form-control')[0].value = "";
            $('#index .right .login  .input-group  input.form-control')[1].value = "";
            $('#index .right > .login').hide();
            $('#index .right > .register').hide();
            $('#index .right > .login-status').show();
            
          }
          else{
            // 失败
            alert("用户名或密码错误，请重新输入");
            $('#index .right .login  .input-group  input.form-control')[0].value = "";
            $('#index .right .login  .input-group  input.form-control')[1].value = "";
          }
        })
        .catch(error=>{
            console.log(error);
        });
      
    },
    // 注册
    register(){
      $('#index .right > .login').hide();
      $('#index .right > .register').show();
      $('#index .right > .login-status').hide();
    },
    // 跳转到singlePage
    toSinglePage(str,key){
      var session = window.sessionStorage;
      session.setItem('university', str);
      session.setItem('keyWord', key);
      this.reload()
    },
    // 跳转到article
    toArticle(title,name,uni){
      var session = window.sessionStorage;
      session.setItem('title', title);
      session.setItem('name', name);
      session.setItem('uni',uni);
      let sql = `SELECT * FROM allarticles WHERE type = "原创" and title = "${title}" and author = "${name}" limit 1`;
      axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
        .then(res=>{
          var readTimes;
          for(var item of res.data){
            readTimes = item.readTimes;
          }
          
          let sql = `UPDATE allarticles set readTimes = ${parseInt(readTimes) + 1} WHERE type = "原创" and title = "${title}" and author = "${name}" limit 1`;
          axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
            .then(res=>{
              this.reload()
            })
            .catch(error=>{
            });
        })
        .catch(error=>{
            // console.log(error);
        });
      
    },
    // 跳转到person
    toPerson(user){
      console.log(user)
      var session = window.sessionStorage;
      session.setItem('user', user);
      this.reload()
    },
  },    
  beforeCreate() {
    // 只用于异步请求数据的初始化
    
    var username = $.cookie('username');
    
    if(username){
      let sql = `SELECT user.imgSrc, user.extraName, user.name, user.password, count(*) as count FROM user, allarticles WHERE user.name = "${username}" and user.name = allarticles.author and allarticles.type = "原创" limit 1`;
        axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
          .then(res=>{
            // console.log("comein")
            for(var item of res.data){
              var newObj = {
                imgSrc: item.imgSrc,
                name: item.name,
                password: item.password,
                article: item.count,
                extraName: item.extraName
              }
              this.myInfo = newObj;
            }
            
            this.$emit("login",{extraName: this.myInfo.extraName});
            $('#index .right > .login').hide();
            $('#index .right > .register').hide();
            $('#index .right > .login-status').show();
            
          })
          .catch(error=>{
              console.log(error);
          });
    }else{
      $('#index .right > .login').show();
      $('#index .right > .register').hide();
      $('#index .right > .login-status').hide();
    }
 
    // 加载火热新闻
    {
      let sql = `SELECT allarticles.author as author, allarticles.imgSrc as imgSrc, allarticles.title as title, allarticles.content as content, allarticles.belong as belong, allarticles.id as id, allarticles.time as time, user.extraName as extraName, allarticles.comment as comment FROM allarticles, user WHERE user.name = allarticles.author and allarticles.type = "原创"  limit 10`;
      axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
        .then(res=>{
          
          var news = [];
          for(var item of res.data){
            var newsObj = {
              imgSrc: item.imgSrc,
              userName: item.author,
              newsTitle: item.title,
              newsSummary: item.content,
              newsBelong: item.belong,
              newsUpdateTime: item.time,
              newsComments: item.comment,
              newsId: item.id,
              extraName: item.extraName
            }
            news.push(newsObj);
          }
          this.hotNews = news;
          
        })
        .catch(error=>{
            // console.log(error);
        });
    }
    // 加载推荐新闻
    {
      let sql = `SELECT * FROM allarticles WHERE type = "原创" order by comment desc limit 5`;
      axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
        .then(res=>{
          // console.log(res.data);
          var news = [];
          // console.log(res.data);
          for(var item of res.data){
            
            var newsObj = {
              imgSrc: item.imgSrc,
              userName: item.author,
              newsTitle: item.title,
              newsSummary: item.content,
              newsBelong: item.belong,
              newsUpdateTime: item.time,
              newsComments: item.comment,
              newsId: item.id
            }
            
            
            news.push(newsObj);
          }
          this.introNews = news;
        })
        .catch(error=>{
            // console.log(error);
        });
    }
    // 加载榜单 
    {
      let sql = `SELECT * FROM allarticles WHERE type = "原创" order by comment desc limit 10`;
      axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
        .then(res=>{
          // console.log(res.data);
          var news = [];
          for(var item of res.data){
            
            var newsObj = {
              imgSrc: item.imgSrc,
              userName: item.author,
              title: item.title,
              newsSummary: item.content,
              newsBelong: item.belong,
              newsUpdateTime: item.time,
              comments: item.comment,
              newsId: item.id
            }
            
            
            news.push(newsObj);
          }
          this.rankingList = news;
        })
        .catch(error=>{
            // console.log(error);
        });
    }
    // 加载娱乐新闻
    {
      let sql = `SELECT * FROM allarticles WHERE type = "原创" order by comment desc limit 3`;
      axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
        .then(res=>{
          // console.log(res.data);
          var news = [];
          for(var item of res.data){
            
            var newsObj = {
              imgSrc: item.imgSrc,
              userName: item.author,
              title: item.title,
              newsSummary: item.content,
              newsBelong: item.belong,
              newsUpdateTime: item.time,
              comments: item.comment,
              newsId: item.id
            }
            
            
            news.push(newsObj);
          }
          this.entertainNews = news;
        })
        .catch(error=>{
            // console.log(error);
        });
    }
    // 加载娱乐新闻图
    {
      let sql = `SELECT * FROM allarticles WHERE type = "原创" order by comment desc limit 1`;
      axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
        .then(res=>{
          // console.log(res.data);
          for(var item of res.data){
            var newsObj = {
              imgSrc: item.imgSrc,
              userName: item.author,
              title: item.title,
              newsSummary: item.content,
              newsBelong: item.belong,
              newsUpdateTime: item.time,
              comments: item.comment,
              newsId: item.id
            }
            this.entertainNewsPic = newsObj;
          }
          
        })
        .catch(error=>{
            // console.log(error);
        });
    }
    // 加载推荐关注
    {
      let sql = `SELECT * FROM allarticles WHERE type = "原创" order by comment desc limit 3`;
      axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
        .then(res=>{
          
          var news = [];
          for(var item of res.data){
            
            var newsObj = {
              imgSrc: item.imgSrc,
              userName: item.author,
              title: item.title,
              newsSummary: item.content,
              newsBelong: item.belong,
              newsUpdateTime: item.time,
              comments: item.comment,
              newsId: item.id
            }
            
            
            news.push(newsObj);
          }
          this.introFocus = news;
        })
        .catch(error=>{
            // console.log(error);
        });
    }

  },
  created() {
    $(document).on('click',function(e){
        $('#index .showUniversity').hide();
    })
    
    if(!$.cookie('username')){
      $('#index .right > .login').show();
      $('#index .right > .register').hide();
      $('#index .right > .login-status').hide();
    }
    else{
      $('#index .right > .login').hide();
      $('#index .right > .register').hide();
      $('#index .right > .login-status').show();
      
      this.$emit("login",{extraName: this.myInfo.extraName});
    }
  },
}
</script>


<style scoped>
a{

  color: #333;
}
a:hover{
  color: rgb(21, 125, 156)
}
#index{
  width:80%;
  display: flex;
  margin: 20px auto;
}
#index::after{
  height: 0;
  content: '';
  clear: both;
  display: block;
}
/* 左侧 */
#index .left-sort{
  height: 1240px;
  width:106px;
  background: rgb(246, 250, 246);
  border: 1px solid #ddd;
  margin-right: 10px;
}
#index .left-sort::after{
  clear: both;
  display: block;
  content: '';
  height: 0;
}
#index  .showUniversity{
  width: 200px;
  height: auto;
  min-height: 100px;
  background: rgb(246, 250, 246);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  border: 1px solid #ccc;
  display: none;
  color: #333;
  padding: 5px;
}
#index  .showUniversity ul{
  margin: 0 auto;
  width: 100%;

  text-align: center;
}
#index  .showUniversity > ul  li{
  padding: 3px 0px;
  line-height: 20px;
  font-size: 13px;
}
#index  .showUniversity > ul  li:hover{
  background: rgb(94, 188, 216);
  cursor: pointer;
  color: #fff;
  text-decoration: none;
}

/* #index  .showUniversity{
  width: 200px;
  height: auto;
  background: rgb(246, 250, 246);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  border: 1px solid #ccc;
  display: none;
  color: #333;
  padding: 5px;
}
#index .left-sort ul li.hover .showUniversity{
  display: block;
}
#index .left-sort .showUniversity ul{
  margin: 0 auto;
  width: 100%;

  text-align: center;
}
#index  .showUniversity > ul > li{
  padding: 3px 0px;
  line-height: 20px;
  font-size: 13px;
}
#index  .showUniversity > ul > li:hover{
  background: rgb(94, 188, 216)
} */











#index .left-sort > ul{
  width:100%;
  text-align: center;
  height: auto;
}
#index .left-sort>  ul > li{
  width:100%;
  float: left;
  height: 34px;
  line-height: 34px;
  margin-bottom: 1px;
}
#index .left-sort> ul> li:hover{
  cursor: pointer;
  background:rgba(33, 173, 216, 0.952);
  color: white;
}
#index .left-sort >ul> li.active{
  background:rgba(33, 173, 216, 0.952);
  color: white;
}


/* 中间 */
#index .middle{
  height: auto;
  width: 780px;
  margin-left: 10px;
  margin-right: 10px;
  /*  */
  margin-bottom: 20px;        
  /* 这一句开发完可以去掉 -------------------------------------------------------------------*/
}
#index .middle .introduce-news{
  width: 100%;
  height: 200px;
}
#index .middle .introduce-news .carousel-wrapper{
  width: 522px;
  height: 200px;
  float: left;
  background: burlywood;
}
#index .middle .introduce-news .carousel-wrapper:hover{
  cursor: pointer;
}
#index .middle .introduce-news .carousel-wrapper #carousel-example-generic .right{
  display: inline-block;
  height: 100%;
  width: 12%;
}
#index .middle .introduce-news .carousel-wrapper #carousel-example-generic ol li{
  margin-left: 9px;
  margin-bottom: 5px
}
#index .middle .introduce-news .carousel-wrapper #carousel-example-generic ol li.active{
  background:rgba(250,250,250,0.5);
}
#index .middle .introduce-news .carousel-wrapper #carousel-example-generic .carousel-inner{
  height: 100%;
}
#index .middle .introduce-news .carousel-wrapper #carousel-example-generic .carousel-inner .item{
  width: 522px;
  height: 200px;
}
#index .middle .introduce-news .carousel-wrapper #carousel-example-generic .carousel-inner .item img{
  width: 100%;
  height: 100%;
}
#index .middle .introduce-news .pic{
  width: 32.7%;
  height: 49.5%;
  float: left;
  margin-left: 2px;
}
#index .middle .introduce-news .pic img{
  width:100%;
  height: 100%;
}
#index .middle .introduce-news .pic img:hover{
  cursor: pointer;
}
#index .middle .introduce-news .pic img.bottom{
  margin-top: 2px;
}



#index .middle .hot-news{
  width: 100%;
  height: auto;
  margin-top: 10px;
}
#index .middle .hot-news .item{
  width: 100%;
  height: 150px;
  
  border: 1px solid #eee;
  border-top: 1px solid #fff;
}
#index .middle .hot-news .item img{
  width: 30%;
  float: left;
  display: block;
  margin-top: 9px;
}
#index .middle .hot-news .item .name{
  margin-top: 10px;
  font-size: 15px;
  height: 20px;
  margin-left: 245px;
  margin-bottom: 10px;
  color: #555;
  white-space:nowrap;       
  overflow: hidden;             
  text-overflow: ellipsis;
}
#index .middle .hot-news .item .name span.content{
  color: #555;
}
#index .middle .hot-news .item .name span.content:hover{
  cursor: pointer;
  color: rgba(33, 173, 216, 0.952);
}
#index .middle .hot-news .item p{
  margin-left: 245px;
}
#index .middle .hot-news .item .title:hover{
  cursor: pointer;
  color: rgba(20, 120, 150, 0.952);
  text-decoration: none;
}
#index .middle .hot-news .item .title{
  font-size: 20px;
  font-weight: bold;
  height: 25px;
  white-space:nowrap;       
  overflow: hidden;             
  text-overflow: ellipsis;
  width: 63%;
  color: #444;
}
#index .middle .hot-news .item .summary{
  font-size: 13px;
  color: #888;
  white-space:nowrap;       
  overflow: hidden;             
  text-overflow: ellipsis;
  width: 63%;
}
#index .middle .hot-news .item .belong{
  margin-left: 15px;
  margin-top: 15px;
  font-size: 12px;
  color: #888;
  display: inline-block;
}
#index .middle .hot-news .item .time{
  margin-left: 15px;
  margin-top: 15px;
  font-size: 12px;
  color: #888;
  display: inline-block;
}
#index .middle .hot-news .item .comments{
  margin-left: 260px;
  color: #555;
  font-size: 12px;
}

#index .middle .hot-news .item .belong:hover{
  cursor: pointer;
  color: rgba(33, 173, 216, 0.952);
}

#index .middle .hot-news .update{
  width: 100%;
  height: 38px;
  background:rgb(94, 188, 216);
  text-align: center;
  line-height: 38px;
  color: white;
  font-size: 17px;
  
}
#index .middle .hot-news .update:hover{
  background:rgb(55, 184, 223);
  cursor: pointer;
}


/* 右侧 */
#index .right{
  width:280px;
  margin-left: 10px;
}
#index .right .login{
  border: 1px solid #ddd;
  height: 270px;
  margin-bottom: 20px;
  /* display: none; */
}
#index .right .login .title{
  width: 90%;
  height: 30px;
  margin: 0 auto;
  line-height: 30px;
  font-size: 16px;
  border-bottom: 1px solid #ddd;
  margin-top: 15px;
}
#index .right .login .function{
  width: 90%;
  margin: 10px auto;
}
#index .right .login .function span{
  font-size: 13px;
  display: inline-block;
}
#index .right .login .function span:hover{
  cursor: pointer;
  color: rgb(55, 184, 223);
  text-decoration: underline;
}
#index .right .login .function .forget{
  margin-left:120px;
}
#index .right .login .btn{
  width: 91%;
  margin: 0 auto;
  margin-left:13px;
  height: 40px;
}
#index .right .login .input-group{
  width:90%;
  margin:0 auto;
  margin-top: 20px;
}
#index .right .login .input-group input::placeholder{
  width: 210px;
  height: 40px;
  font-size: 13px;
}


/* 注册 */
#index .right > .register{
  border: 1px solid #ddd;
  height: auto;
  padding-bottom: 20px;
  margin-bottom: 20px;
  display: none;
}
#index .right .register .title{
  width: 90%;
  height: 30px;
  margin: 0 auto;
  line-height: 30px;
  font-size: 16px;
  border-bottom: 1px solid #ddd;
  margin-top: 15px;
}
#index .right .register .function{
  width: 90%;
  margin: 10px auto;
}
#index .right .register .function span{
  font-size: 13px;
  display: inline-block;
}
#index .right .register .function span:hover{
  cursor: pointer;
  color: rgb(55, 184, 223);
  text-decoration: underline;
}
#index .right .register .function .forget{
  margin-left:120px;
}
#index .right .register .btn{
  width: 91%;
  margin: 0 auto;
  margin-left:13px;
  height: 35px;
  margin-top: -1px;
}
#index .right .register .input-group{
  width:90%;
  margin:0 auto;
  margin-top: 20px;
}
#index .right .register .input-group button{
  width: 49%;
  margin-left: -1px;
  background: rgb(94, 188, 216);
  color: #fff;
  border-radius: 0px;
  font-size: 12px;
}
#index .right .register .input-group button {outline:none;}
#index .right .register .input-group button:focus {outline:none;} /*for IE*/
#index .right .register .input-group button::-moz-focus-inner {border-color: transparent;} /*for mozilla*/
#index .right .register .input-group input::placeholder{
  width: 210px;
  height: 40px;
  font-size: 13px;
}
#index .right .register .input-group input.check{
  width: 50%;
  border-radius: 0px;

}

/* 已登录状态 */
#index .right .login-status{
  border: 1px solid #ddd;
  padding-bottom: 15px;
  margin-bottom: 20px;
  display: none;
}
#index .right .login-status .title{
  width: 90%;
  height: 30px;
  margin: 0 auto;
  line-height: 30px;
  font-size: 16px;
  border-bottom: 1px solid #ddd;
  margin-top: 15px;
}
#index .right .login-status .base-infor{
  width: 90%;
  margin:10px auto;
  height: auto;
}
#index .right .login-status .base-infor::after{
  height: 0;
  content: '';
  clear: both;
  display: block;
}
#index .right .login-status .base-infor img{
  height: 80px;
  width: 80px;
  border: 1px solid #ddd;
  display: inline-block;
  float: left;
  border-radius: 10px;
  margin-left: 10px;
  margin-top: 5px;
}
#index .right .login-status .base-infor > p{
  float: left;
  white-space:nowrap;       
  overflow: hidden;             
  text-overflow: ellipsis;
  width: 100px;
  font-size: 13px;
  /* text-indent: 1em; */
  margin-left: 15px;
}
#index .right .login-status .base-infor > span{
  float: left;
  white-space:nowrap;       
  overflow: hidden;             
  text-overflow: ellipsis;
  width: 130px;
  margin-top: 15px;
  margin-left: 15px;
}
#index .right .login-status .base-infor > .change-infor{
  float: left;
  margin-left: 15px;
}
#index .right .login-status .base-infor > a{
  float: left;
  margin-left: 15px;
}
#index .right .login-status .btn{
  margin: 0 auto;
  display:  block;
  width: 90%;
  margin-top: 10px;
}






/* 榜单 */
#index .right .ranking-list{
  border: 1px solid #ddd;
  padding-bottom: 15px;
  margin-bottom: 20px;
}
#index .right .ranking-list .title{
  width: 90%;
  height: 30px;
  margin: 0 auto;
  line-height: 30px;
  font-size: 16px;
  border-bottom: 1px solid #ddd;
  margin-top: 15px;
}
#index .right .ranking-list ul{
  width: 90%;
  margin: 0 auto;
  
}
#index .right .ranking-list ul li{
  width:100%;
  margin-top: 17px;
  
}
#index .right .ranking-list ul li span{
  display: inline-block;
  height: 18px;
  line-height: 18px;
  vertical-align: top;
  color: #333;
}
#index .right .ranking-list ul li span.rank{
  width: 18px;
  text-align: center;
  margin-right: 10px; 
}
#index .right .ranking-list ul li .active{
  background: greenyellow;
}
#index .right .ranking-list ul li .content{
  font-size:12px; 
  white-space:nowrap;       
  overflow: hidden;             
  text-overflow: ellipsis;
  width:150px; 
}
#index .right .ranking-list ul li .content:hover{
  cursor: pointer;
  color: rgb(55, 184, 223);
}
#index .right .ranking-list ul li .comments{
  font-size: 12px;
  float: right;
}
/* 娱乐 */
#index .right .entertain{
  text-align: center;
  border: 1px solid #ddd;
  font-size: 16px;
  margin-bottom: 20px;
}
#index .right .entertain .title{
  margin: 10px auto;
  width: 90%;
  height: 30px;
  line-height: 30px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
#index .right .entertain .title span{
  display: inline-block;
  float: right;
  font-size: 13px;
  color: rgb(23, 117, 146);
}
#index .right .entertain .title span:hover{
  cursor: pointer;
  text-decoration: underline;
}
#index .right .entertain img{
  width: 90%;
  margin-bottom: 20px;
}
#index .right .entertain ul{
  text-align: left;
  width: 90%;
  margin: 0 auto;
}
#index .right .entertain ul li{
  margin-bottom:10px;
  font-size: 14px;
  white-space:nowrap;       
  overflow: hidden;             
  text-overflow: ellipsis;
}
#index .right .entertain ul li a:hover{
  cursor: pointer;
  color: rgb(21, 125, 156);
}
/* 推荐关注 */
#index .right .area-introduce{
  text-align: center;
  border: 1px solid #ddd;
  font-size: 16px;
  margin-bottom: 20px;
}
#index .right .area-introduce .title{
  margin: 10px auto;
  width: 90%;
  height: 30px;
  line-height: 30px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
#index .right .area-introduce .title .focus{
  display: inline-block;
  float: right;
  font-size: 13px;
  color: rgb(23, 117, 146);
}
#index .right .area-introduce .title .focus:hover{
  cursor: pointer;
  text-decoration: underline;
}
#index .right .area-introduce .title .left-arrow,
#index .right .area-introduce .title .right-arrow{
  display: inline-block;
  height: 18px;
  width: 18px;
  border: 1px solid #ccc;
  line-height: 15px;
  text-align: center;
  border-radius: 50%;
  background: #ccc;
  font-weight: bold;
  color: #fff;
  margin-left: 10px;
  margin-right: -4px; 
}
#index .right .area-introduce .title .left-arrow:hover,
#index .right .area-introduce .title .right-arrow:hover{
  cursor: pointer;
  background: rgb(55, 184, 223);
}
#index .right .area-introduce .carousel-wrapper{
  margin: 15px auto;
  width: 90%;
}
#index .right .area-introduce .carousel-wrapper #carousel-example-generic .right{
  display: inline-block;
  height: 100%;
  width: 12%;
}
#index .right .area-introduce .carousel-wrapper #carousel-example-generic .carousel-inner .item img{
  width:100%;
  height: 100%;
}







</style>
