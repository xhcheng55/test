<template>
  <div id="singlePage" >
    <!-- 顶部论坛信息 -->
    <top-header :forum="forum"></top-header>
  
    <!-- 导航 -->
    <ul class="nav">
      <li class="active" @click="visitArticle($event)">文章</li>
      <li >图片</li>
      <li >视频</li>
      <li @click="publishArticle($event)">发布文章</li>
      <li style="width: 0px;">
        <div class="input-group">
          <input type="text" class="form-control" id="exampleInputAmount" placeholder="search">
          <div class="input-group-addon"><span class="glyphicon glyphicon-search" aria-hidden="true" @click="search($event)"></span></div>
        </div>
      </li>
    </ul>
    
    <!-- 主要内容 -->
    <div class="content"> 
      <!-- 左侧 -->
      <div class="left">
        <div class="show-content">
          <!-- 刷新 -->
          <button class="btn update" @click="pageReload(forum.name)"><router-link :to="{name: 'singlePageLink'}" >刷新点一下我呀~</router-link></button>

          <!-- 每个单项 -->
          <ul>
            <li v-for="(value, index) in articlesShow" :key="index.value">
              <div class="item">
                <div class="comments-wrapper">
                  <div class="comments"><p>{{value.comments}}</p></div>
                </div>
                <div class="title-summary-pic">
                  <p class="title" @click="toArticle(value.title,value.author,value.belong)"><router-link :to="{name: 'articleLink'}" @click="toArticle(value.title,value.author,value.belong)">{{value.title}}</router-link></p> 
                  <p class="summary">{{value.summary}}</p>
                  <div class="img-wrapper">
                    <ul>
                      <li v-for="(val, ind) in value.img" :key="ind.val">
                        <img :src="val" alt="pic1" >
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="name-date-belong">
                  <div class="name">
                    <span class="glyphicon glyphicon-user" aria-hidden="true"></span> 
                    <router-link :to="{name: 'personLink'}" @click="toPerson(value.author)">{{value.extraName}}</router-link>
                  </div>
                  <span class="belong">{{value.belong}}</span>
                  <span class="date">{{value.time}}</span>
                </div>
              </div>

            </li>
          </ul>
        </div>  

        <!-- 分页导航 -->
        <div class="nav">
          <nav aria-label="Page navigation">
            <ul class="pagination" @click="pageStatusToggle($event)">
              <!-- <li>
                <a href="#" aria-label="Previous">
                  <span aria-hidden="true">首页</span>
                </a>
              </li> -->
              <li>
                <a href="#">上一页</a>
              </li>
              <li class="active">
                <a >第 {{currentPage}} 页 / 共 {{totalPages}} 页</a>
              </li>
              <li>
                <a href="#">下一页</a>
              </li>
              <li>
                <input type="text" name="" id="pageJumpTo" >
              </li>
              <li>
                <a href="#" class="btnJump" @click="turnPage($event)">跳转</a>
              </li>
              <!-- <li>
                <a href="#" aria-label="Next">
                  <span aria-hidden="true">尾页</span>
                </a>
              </li> -->
            </ul>
          </nav>
        </div>

        <!-- 发布文章 -->
        <div class="publish">
          <p class="publish"><b>发布文章</b></p>
          <textarea name="" id="title" cols="60" rows="1" placeholder="标题" v-model="publish_title"></textarea>
          <div contenteditable="true" class="main-content">

          </div>
          <button class="btn btn-primary" @click="publish($event)">发布</button>
          
        </div>
        
      </div>

      <!-- 右侧 -->
      <div class="right">
        <!-- 未登录 -->
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
          <button type="button" class="btn btn-primary">登录</button>
        </div>

        <!-- 已登录状态 -->
        <div class="login-status">
          <div class="title">我的账号信息</div>
          <div class="base-infor">
            <img :src="userInfo.sculptureSrc" alt="head-sculpture头像">
            <span class="name">昵称：</span>
            <p class="name">{{userInfo.extraName}}</p>
            <router-link :to="{name: 'personLink'}" @click="toPerson(userInfo.name)">[ 修改个人资料 ]</router-link>
            
          </div>
          <router-link :to="{name: 'personLink'}"><button class="btn btn-default"  @click="toPerson(userInfo.name)">个人中心 </button></router-link>
          <router-link :to="{name: 'personLink'}"><button class="btn btn-default"  @click="toPerson(userInfo.name)">我的文章：{{userInfo.article}}</button></router-link>
        </div>

        <!-- 论坛推荐 -->
        <div class="introduce-module">
          <div class="title">论坛推荐</div>
          <div class="module-wrapper">
            <ul>
              <li v-for="(value, index) in introModule" :key="index.value">
                <div class="module">
                  <router-link :to="{name:'singlePageLink'}" @click="pageReload(value.belong)"><img :src="value.imgSrc" alt="intro" @click="pageReload(value.belong)"></router-link>
                  <router-link :to="{name:'singlePageLink'}" @click="pageReload(value.belong)"><p @click="pageReload(value.belong)">{{value.belong}}</p></router-link>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- 本论坛热议榜 -->
        <div class="ranking-list">
          <div class="title">
            本论坛热议榜
          </div>
          <ul>
            <li v-for="(value, index) in rankingList" :key="index.value">
              <span :class="[ index < 3 ? 'active rank' : 'rank' ]">{{index+1}}</span>
              <router-link :to="{name:'articleLink'}" @click="toArticle(value.title,value.author, value.belong)"><span class="content" @click="toArticle(value.title,value.author, value.belong)">{{value.title}}</span></router-link>
              <span class="comments">{{value.comments}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import TopHeader from "./TopHeader"
import axios from 'axios'
export default {
  inject: ['reload'],
  name: 'SinglePage',
  data () {
    return {
      rankingList: [
        // {
        //   title: 'Python 正式登顶世界第一编程语言',
        //   comments: 122122
        // },
        
        
      ],
      introModule: [
        
        // {
        //   imgSrc: '../../static/img/carousel1.jpg',
        //   belong: '浙师大'
        // }
      ],
      userInfo:{
        sculptureSrc: '../../static/img/carousel1.jpg',
        name: 'michael jordanaaa',
        article: 12
      },
      // articles:[
      //   {
      //     title: 'Java 跌落神坛！Python 正式登顶世界第一编程语言啊啊啊啊aaaa',
      //     summary: 'Java 跌落神坛！Python 正式登顶世界第一编程语言',
      //     comments: 1234,
      //     author: 'michael Jordanmichael Josss',
      //     belong: '浙江师范大学啊哈哈哈哈',
      //     time: '2019.04.03 10:10',
      //     img: [
      //       '../../static/img/carousel1.jpg',
      //       '../../static/img/carousel2.jpg',
      //       '../../static/img/logo.jpg'
      //     ]
      //   },
      // ],
      articles:[],
      articlesShow:[],
      currentPage: 1,
      totalPages: 1,
      itemMaxNum: 10,
      publish_title:'',
      forum:{
        
        name: ''
      }
    }
  },
  components:{
    "top-header": TopHeader,
  },
  methods:{
    
    // 刷新
    pageReload(name){
      this.$router.push({name:'singlePageLink'});
      this.toSinglePage(name,'')
      this.reload();
    },
    // 选择发布文章栏目
    publishArticle(e){
      $('#singlePage .content .left .publish').css('display','block');
      $('#singlePage .content .left .show-content').css('display','none');
      $('#singlePage .content .left .nav').css('display','none');
      var event = e || window.event;
      var target = event.target|| event.srcElement;
      $(target).siblings().removeClass('active');
      $(target).addClass('active');
      if(window.sessionStorage.getItem('keyWord')){
        $('#singlePage .content .left .publish .btn').attr('disabled','disabled')
      }
    },
    // 发布文章
    publish(e){
      var event = e || window.event;
      var target = event.target|| event.srcElement;
      var publishTitle = this.publish_title;
      var name = this.forum.name;
      if($.cookie('username')){
        var  publish_content = $('#singlePage .content .left .publish .main-content').html();
        if(this.publish_title && publish_content){
          let sqlSen = `SELECT * FROM allarticles WHERE title = "${publishTitle}" and author = "${$.cookie('username')}"`;
            axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sqlSen}`)
              .then(res=>{
                // console.log(res.data);
                if(res.data.length==0){
                  let title = publishTitle;
                  let author = $.cookie('username');
                  let imgSrc = "../../static/img/carousel1.jpg";
                  let content = publish_content;
                  let belong = name;
                  let time = '19:05';
                  let sql = `INSERT INTO allarticles (title, author, imgSrc, content, belong, time, comment, type, itemOrder) 
                            VALUES ("${title}", "${author}", "${imgSrc}", "${content}", "${belong}", "${time}", 0, "原创", 0)`;
                  axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
                    .then(res=>{
                      // console.log(res.data);
                      alert("发布成功")
                    })
                    .catch(error=>{
                        // console.log(error);
                    });
                }else{
                  alert("您已经在此论坛发表过相同标题的文章")
                }
                
              })
              .catch(error=>{
                  // console.log(error);
              });
          
          
        }
        else{
          alert('标题和内容不能为空')
        }
      }
      else{
        alert('请先登录')
      }





    },
    // 看文章
    visitArticle(e){
      $('#singlePage .content .left .publish').css('display','none');
      $('#singlePage .content .left .show-content').css('display','block');
      var event = e || window.event;
      var target = event.target|| event.srcElement;
      $(target).siblings().removeClass('active');
      $(target).addClass('active')
    },
    // 分页active状态切换
    pageStatusToggle(e){
      var event = e || window.event;
      var target = event.target|| event.srcElement;
      var li = target.parentNode;
      // 效果
      $(li).removeClass('active');
      if(target.innerText.indexOf('第') > -1){
        $(li).addClass('active');
      }
      // 构造分页
      if(target.innerText.indexOf('上') > -1){
        if(this.currentPage==1){
          alert('已经是第一页啦')
        }
        else{
          this.currentPage --;
          this.updatePage(this.currentPage);
        }
      }
      if(target.innerText.indexOf('下') > -1){
        if(this.currentPage == this.totalPages){
          alert('已经是最后一页啦')
        }
        else{
          this.currentPage ++;
          this.updatePage(this.currentPage);
        }
      }
    },
    // 分页跳转操作
    turnPage(e){
        var page = document.getElementById('pageJumpTo').value;
        
        function isPositiveNum(s){//是否为正整数
          var re = /^[1-9]*[1-9][0-9]*$/ ;
          return re.test(s)
        }


        if(isPositiveNum(page) && parseInt(page)>0 && parseInt(page) <= this.totalPages){
          this.currentPage = page;
          this.updatePage(this.currentPage);
        }
        else{
          alert(`页数最大为: ${this.totalPages}, 您的输入不正确, 请重新输入`)
        }
        document.getElementById('pageJumpTo').value = '';
    },
    //具体跳转
    updatePage(page){
      var from = (page-1) * this.itemMaxNum;
      var to;
      if(this.articles.length-from>this.itemMaxNum){
        to = from + this.itemMaxNum
      }
      else{
        to = (this.articles.length % this.itemMaxNum) + from;
      }
      this.articlesShow = [];
      for(var i=from; i< to; i++){
        this.$set(this.articlesShow, i-from, this.articles[i])
      }
    },
    // 注册
    register(){
      this.$router.push({name:'indexLink'});
    },
    // 搜索
    search(e){
      var event = e || window.event;
      var target = event.target|| event.srcElement;
      var contentSearch = $(target.parentNode.parentNode.children[0]).val();
      this.$router.push({name:'singlePageLink'});
      this.toSinglePage(this.forum.name,contentSearch);
      this.reload(); 
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
      var session = window.sessionStorage;
      session.setItem('user', user);
      this.reload()
    },
  },
  watch:{
    articles:{
      handler:function(){
        if(this.articles.length > this.itemMaxNum){
          this.articlesShow = this.articles.slice(0,this.itemMaxNum);
        }else{
          this.articlesShow = this.articles
        }
      }
    },
  },
  beforeCreate() {
    
    var username = $.cookie('username');
    var university = window.sessionStorage.getItem('university');
    var keyWord = window.sessionStorage.getItem('keyWord');
    
    
    if(username){
      let sql = `SELECT user.imgSrc, user.extraName, user.name, user.password, count(*) as count FROM user, allarticles WHERE user.name = "${username}" and user.name = allarticles.author and allarticles.type = "原创" limit 1`;
        axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
          .then(res=>{
            for(var item of res.data){
              var newObj = {
                sculptureSrc: item.imgSrc,
                name: item.name,
                password: item.password,
                article: item.count,
                extraName: item.extraName
              }
              this.userInfo = newObj;
            }
            this.$emit("login",this.userInfo.extraName);
            $('#singlePage .content .right .login').hide();
            // $('#index .right > .register').hide();
            $('#singlePage .content .right .login-status').show();
          })
          .catch(error=>{
              // console.log(error);
          });
    }else{
      // console.log("hello")
      $('#singlePage .content .right .login').show();
      // $('#index .right > .register').hide();
      $('#singlePage .content .right .login-status').hide();
    }

    // 加载主要文章
    if(!keyWord){
      let sql = `SELECT * FROM allarticles, user WHERE user.name = allarticles.author and belong = "${university}" order by time desc`;
      axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
        .then(res=>{
          // console.log(res.data);
          var news = [];
          for(var item of res.data){
            var newsObj = {
              title: item.title,
              summary: item.content,
              comments: item.comment,
              author: item.author,
              belong: item.belong,
              time: item.time,
              extraName: item.extraName,
              img: [
                '../../static/img/carousel1.jpg',
                '../../static/img/carousel2.jpg',
                '../../static/img/logo.jpg'
              ]
            }
            news.push(newsObj);
          }
          this.articles = news;
          this.totalPages = Math.floor(this.articles.length / this.itemMaxNum ) + 1;  
        })
        .catch(error=>{
            // console.log(error);
        });
    }else{
      if(university){
        let sql = `SELECT * FROM allarticles, user WHERE user.name = allarticles.author and allarticles.belong = "${university}" and allarticles.title like "%${keyWord}%" order by time desc`;
        axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
          .then(res=>{
            // console.log(res.data);
            var news = [];
            for(var item of res.data){
              var newsObj = {
                title: item.title,
                summary: item.content,
                comments: item.comment,
                author: item.author,
                belong: item.belong,
                time: item.time,
                extraName: item.extraName,
                img: [
                  '../../static/img/carousel1.jpg',
                  '../../static/img/carousel2.jpg',
                  '../../static/img/logo.jpg'
                ]
              }
              news.push(newsObj);
            }
            this.articles = news;
            this.totalPages = Math.floor(this.articles.length / this.itemMaxNum ) + 1;  
          })
          .catch(error=>{
              // console.log(error);
          });
      }else{
        let sql = `SELECT * FROM allarticles, user WHERE user.name = allarticles.author and allarticles.title like "%${keyWord}%" order by time desc`;
        axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
          .then(res=>{
            // console.log(res.data);
            var news = [];
            for(var item of res.data){
              var newsObj = {
                title: item.title,
                summary: item.content,
                comments: item.comment,
                author: item.author,
                belong: item.belong,
                time: item.time,
                extraName: item.extraName,
                img: [
                  '../../static/img/carousel1.jpg',
                  '../../static/img/carousel2.jpg',
                  '../../static/img/logo.jpg'
                ]
              }
              news.push(newsObj);
            }
            this.articles = news;
            this.totalPages = Math.floor(this.articles.length / this.itemMaxNum ) + 1;  
          })
          .catch(error=>{
              // console.log(error);
          });
      }
    }
    
    // 加载论坛推荐
    {
      let sql = `SELECT * FROM forum order by attention desc limit 6`;
      axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
        .then(res=>{
          // console.log(res.data);
          var news = [];
          for(var item of res.data){
            var newsObj = {
              imgSrc: item.imgSrc,
              // title: item.title,
              // summary: item.content,
              // comments: item.comment,
              // author: item.author,
              belong: item.name,
              // time: item.time,
              // img: [
              //   '../../static/img/carousel1.jpg',
              //   '../../static/img/carousel2.jpg',
              //   '../../static/img/logo.jpg'
              // ]
            }
            news.push(newsObj);
          }
          this.introModule = news;
          
        })
        .catch(error=>{
            // console.log(error);
        });
    }

    // 热议榜单
    {
      let sql = `SELECT * FROM allarticles order by comment desc limit 10`;
      axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
        .then(res=>{
          // console.log(res.data);
          var news = [];
          for(var item of res.data){
            var newsObj = {
              imgSrc: item.imgSrc,
              title: item.title,
              summary: item.content,
              comments: item.comment,
              author: item.author,
              belong: item.belong,
              time: item.time,
              img: [
                '../../static/img/carousel1.jpg',
                '../../static/img/carousel2.jpg',
                '../../static/img/logo.jpg'
              ]
            }
            news.push(newsObj);
          }
          this.rankingList = news;
          
        })
        .catch(error=>{
            // console.log(error);
        });
    }


  },
  created() {
    $('#singlePage .content .left .publish').css('display','none');
    this.forum.name = window.sessionStorage.getItem('university');
  },
  
}
</script>


<style scoped>

#singlePage{
  width: 1100px;
  margin:0 auto;
    
  height: auto;
  position: relative;
}
#singlePage::after{
  height: 0;
  clear: both;
  content: '';
  display: block;
  
}

#singlePage ul.nav{
  width: 100%;
  background: #eee;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
#singlePage > ul > li{
  width: 90px;
  display: block;
  text-align: center;
  float: left;
  height: 46px;
  line-height: 46px;
  font-size: 16px;
  background: #eee;
}
#singlePage ul li.active{
  background: #ddd;
}
#singlePage ul li:hover{
  cursor: pointer;
  background: #ddd;
}
#singlePage ul li .input-group{
  margin-top: 5px;
  width: 250px;
  margin-left: 50px;
  
}
#singlePage ul li .input-group .exampleInputAmount{
  width: 90%; 
}
#singlePage ul li .input-group .input-group-addon{
  width: 10%;
}

#singlePage .content{
  padding-top:10px;
}
#singlePage .content .left{
  border:1px solid #ddd;
  width: 790px;
  height: auto;
  float: left;
  margin-right: 8px;
}
#singlePage .content .left .publish{
  padding:15px;
  display: none;
}
#singlePage .content .left .publish p{
  height: 30px;
  padding: 0px;
  padding-top: 10px;
  font-size: 16px;
}
#singlePage .content .left .publish #title{
  width: 50%;
  height: 33px;
  resize: none;
  margin-bottom: 20px;
  padding: 5px;
  border: 1px solid #bbb;
  
}
#singlePage .content .left .publish .main-content{
  width: 93%;
  padding: 15px;
  height: 200px;
  margin-bottom: 20px;
  border: 1px solid #bbb;
  background: #fff;
}
#singlePage .content .left .update{
  width: 100%;
  height: 40px;
  text-align: center;
  background: rgb(198, 213, 218);
  border-radius: 0px;
  color:#fff !important;
}
#singlePage .content .left .update:hover{
  background: rgb(97, 166, 194);
}
#singlePage .content .left .item{
  border-bottom: 1px solid #ddd;
  width: 100%;
  padding: 18px 15px 10px 15px;
}
#singlePage .content .left .item:hover{
  background: rgba(238, 246, 248, 0.7);
}
#singlePage .content .left .item::after{
  height: 0;
  content: '';
  clear: both;
  display: block;
}
#singlePage .content .left .item .comments{
  width: 9%;
  height: auto;
  text-align: center;
  float: left;
  margin-right: 15px;
}
#singlePage .content .left .item .comments p{
  width: 100%;
  margin: 0 auto;
  height: 35px;
  line-height: 35px;
  background: rgb(243, 241, 241);
  border: 1px solid rgb(219, 217, 217);
  border-radius: 12px;
}
#singlePage .content .left .item .title-summary-pic{
  float: left;
  width: 60%;
}
#singlePage .content .left .item .title-summary-pic::after{
  height: 0px;
  content: '';
  clear:both;
  display: block;
}
#singlePage .content .left .item .title-summary-pic .title{
  font-size: 16px;
  display: block;
  white-space:nowrap;       
  overflow: hidden;             
  text-overflow: ellipsis;
  color: rgb(14, 130, 175);
}
#singlePage .content .left .item .title-summary-pic .title:hover{
  text-decoration: underline;
  cursor: pointer;
}
#singlePage .content .left .item .title-summary-pic .summary{
  white-space:nowrap;       
  overflow: hidden;             
  text-overflow: ellipsis;
  font-size: 14px;
  color: #777;
}
#singlePage .content .left .item .title-summary-pic .img-wrapper{
  height: auto;
  min-height: 0px;
  max-height: 100px;
  width: 100%;
  /* display: none; */
  margin-top: 20px;
}
#singlePage .content .left .item .title-summary-pic .img-wrapper > ul >  li{
  display: inline;
}
#singlePage .content .left .item .title-summary-pic .img-wrapper::after{
  height: 0;
  content: '';
  clear:both;
  display: block;
}
#singlePage .content .left .item .title-summary-pic .img-wrapper img{
  margin-right: 10px;
  width: 90px;
  height: 90px;;
  display: inline-block;
  border: 1px solid #ddd;
}
#singlePage .content .left .item .title-summary-pic .img-wrapper img:hover{
  cursor: pointer;
  border: 3px solid #ddd;
}
#singlePage .content .left .item .name-date-belong{
  width:26%;
  float: left;
  margin-left: 20px;
  font-size: 13px;
  color: #777;
  margin-top: 1px; 
}
#singlePage .content .left .item .name-date-belong .name{
  white-space:nowrap;       
  overflow: hidden;             
  text-overflow: ellipsis;
  width: 150px;
}
#singlePage .content .left .item .name-date-belong .name:hover{
  cursor: pointer;
  text-decoration: underline;
  color: rgb(14, 130, 175);
}
#singlePage .content .left .item .name-date-belong > span{
  display: inline-block;
  margin-top: 15px; 
}

#singlePage .content .left .item .name-date-belong .belong{
  width: 120px;
  white-space:nowrap;       
  overflow: hidden;             
  text-overflow: ellipsis;
}
#singlePage .content .left .item .name-date-belong .date{
  float: right;
  white-space:nowrap;       
  overflow: hidden;             
  text-overflow: ellipsis;
  max-width: 60px;
}
/* 分页 */
#singlePage .content .left  .nav::after{
  display: block;
  height: 0;
  clear: both;
  content: '';
}
#singlePage .content .left  .nav > nav{
  float: right;
}
#singlePage .content .left  .nav > nav > ul > li input{
  height: 34px;
  display: block;
  float: left;
  width: 50px;
  border: 1px solid #ddd;
  margin-left: 10px;
}
#singlePage .content .left  .nav > nav > ul > li > .btnJump{
  background: #fff;
  border: 1px solid #ddd;
  color: #337ab7;
}
#singlePage .content .left  .nav > nav > ul > li > .btnJump:hover{
  cursor: pointer;
}

/* 主要内容 */
#singlePage .content .right{
  width:300px;
  height: 1000px;
  float: left;
}
#singlePage .content .right .login{
  width:100%;
  border: 1px solid #ddd;
  height: 270px;
  margin:0 auto;
  margin-bottom: 20px;
}
#singlePage .content .right .login .title{
  width: 90%;
  height: 30px;
  margin: 0 auto;
  line-height: 30px;
  font-size: 16px;
  border-bottom: 1px solid #ddd;
  margin-top: 15px;
}
#singlePage .content .right .login .function{
  width: 90%;
  margin: 10px auto;
}
#singlePage .content .right .login .function span{
  font-size: 13px;
  display: inline-block;
}
#singlePage .content .right .login .function span:hover{
  cursor: pointer;
  color: rgb(55, 184, 223);
  text-decoration: underline;
}
#singlePage .content .right .login .function .forget{
  margin-left:120px;
}
#singlePage .content .right .login .btn{
  width: 91%;
  margin: 0 auto;
  margin-left:13px;
  height: 40px;
}
#singlePage .content .right .login .input-group{
  width:90%;
  margin:0 auto;
  margin-top: 20px;
}
#singlePage .content .right .login .input-group input{
  width: 210px;
  height: 40px;
}

/* 已登录状态 */
#singlePage .content .right .login-status{
  border: 1px solid #ddd;
  padding-bottom: 15px;
  margin-bottom: 20px;
  display: none;
}
#singlePage .content .right .login-status .title{
  width: 90%;
  height: 30px;
  margin: 0 auto;
  line-height: 30px;
  font-size: 16px;
  border-bottom: 1px solid #ddd;
  margin-top: 15px;
}
#singlePage .content .right .login-status .base-infor{
  width: 90%;
  margin:10px auto;

  height: auto;
}
#singlePage .content .right .login-status .base-infor::after{
  height: 0;
  content: '';
  clear: both;
  display: block;
}
#singlePage .content .right .login-status .base-infor img{
  height: 100px;
  width: 100px;
  border: 1px solid #ddd;
  display: inline-block;
  float: left;
  border-radius: 10px;
}
#singlePage .content .right .login-status .base-infor > p{
  float: left;
  white-space:nowrap;       
  overflow: hidden;             
  text-overflow: ellipsis;
  width: 150px;

  /* text-indent: 1em; */
  margin-left: 15px;
}
#singlePage .content .right .login-status .base-infor > span{
  float: left;
  white-space:nowrap;       
  overflow: hidden;             
  text-overflow: ellipsis;
  width: 150px;

  margin-top: 15px;
  margin-left: 15px;
}
#singlePage .content .right .login-status .base-infor > a{
  float: left;
  margin-left: 15px;
}
#singlePage .content .right .login-status .btn{
  margin: 0 auto;
  display:  block;
  width: 90%;
  margin-top: 10px;
}
#singlePage .content .right .login-status > a:hover{
  text-decoration: none;
}






/* 推荐论坛 */
#singlePage .content .right .introduce-module{
  border: 1px solid #ddd;
  margin-bottom: 20px;
  padding-bottom: 5px;
}
#singlePage .content .right .introduce-module .title{
  width: 90%;
  height: 30px;
  margin: 0 auto;
  line-height: 30px;
  font-size: 16px;
  border-bottom: 1px solid #ddd;
  margin-top: 15px;
}
#singlePage .content .right .introduce-module .module-wrapper{

  width: 100%;
  height: auto;
  margin-top: 15px;
  overflow: hidden;
  padding-left: 16px;
}
#singlePage .content .right .introduce-module .module-wrapper::after{
  height: 0;
  clear: both;
  content: '';
  display: block;
}
#singlePage .content .right .introduce-module .module-wrapper .module{
  width: 78px;
  height: 100px;
  float: left;
  margin-right:15px;
  overflow: hidden;
  text-align: center;
}
#singlePage .content .right .introduce-module .module-wrapper .module img{
  width: 62px;
  height: 62px;
  
}
#singlePage .content .right .introduce-module .module-wrapper .module p{
  margin: 0 auto;
  margin-top: 7px;
  font-size: 12px;
  width: 80%;
  white-space:nowrap;       
  overflow: hidden;             
  text-overflow: ellipsis;
  color: #333;
}
#singlePage .content .right .introduce-module .module-wrapper .module img:hover,
#singlePage .content .right .introduce-module .module-wrapper .module p:hover{
  cursor: pointer;
  text-decoration: underline;
}



/* 榜单 */
#singlePage .content .right .ranking-list{
  border: 1px solid #ddd;
  margin-top: 20px;
  padding-bottom: 15px;
  margin-bottom: 20px;
}
#singlePage .content .right .ranking-list::after{
  content: '';
  height: 0;
  clear: both;
  display: block;
}
#singlePage .content .right .ranking-list .title{
  width: 90%;
  height: 30px;
  margin: 0 auto;
  line-height: 30px;
  font-size: 16px;
  border-bottom: 1px solid #ddd;
  margin-top: 15px;
}
#singlePage .content .right .ranking-list ul{
  margin: 0 auto;
  width: 90%;
}
#singlePage .content .right .ranking-list ul li{
  width: 100%;
  font-size: 13px;
  text-align: left;
  margin: 0;
  height: 20px;
  margin-top: 17px;
}
#singlePage .content .right .ranking-list ul li:hover{
  background: rgb(246, 246, 246);
  cursor: none
}
#singlePage .content .right .ranking-list ul li span{
  display: inline-block;
  height: 18px;
  line-height: 18px;
  vertical-align: top;
}
#singlePage .content .right .ranking-list ul li .rank{
  width: 18px;
  text-align: center;
  margin-right: 10px; 
}
#singlePage .content .right .ranking-list ul li .rank:first{
  background: greenyellow;
}
#singlePage .content .right .ranking-list ul li .active{
  background: greenyellow;
}
#singlePage > .content .right .ranking-list ul li .content{
  white-space:nowrap;       
  overflow: hidden;             
  text-overflow: ellipsis;
  width: 170px;
  padding: 0px;

}
#singlePage .content .right .ranking-list ul li span.content{
  color: black;
}
#singlePage .content .right .ranking-list ul li span.content:hover{
  cursor: pointer;
  text-decoration: underline;
  color: rgb(14, 130, 175);
}
#singlePage .content .right .ranking-list ul li .comments{
  float: right;
}



</style>