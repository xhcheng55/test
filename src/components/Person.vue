<template>
  <div id="person" >
    <!-- 本论坛概括图片 -->
    <div class="img-wrapper">
      <img src="../img/width.jpg" alt="">
    </div>

    <!-- 本论坛信息框 -->
    <div class="infor-wrapper">
      <div class="img-wrapper">
        <img :src="owner.imgSrc" alt="" >
      </div>
      <div class="upper">
        <span class="title">{{owner.extraName}}</span>
        <input class="btn btn-default" type="button" value="换头像" >
        <!-- <span class="focus">关注</span>
        <span class="articles">文章：4444</span> -->
      </div>
      <span class="summary">{{owner.personalSign}}</span>
    </div>

    <!-- 功能导航 -->

    <div class="function">
      <ul >
        <li class="active" @click="switchMenu($event)"><span class="glyphicon glyphicon-home" aria-hidden="true" ></span> 个人</li>
        <li @click="switchMenu($event)"><span class="glyphicon glyphicon-edit" aria-hidden="true" ></span> 文章</li>
        <li @click="switchMenu($event)"><span class="glyphicon glyphicon-star" aria-hidden="true" ></span> 收藏</li>
        <li @click="switchMenu($event)"><span class="glyphicon glyphicon-heart" aria-hidden="true" ></span> 关注论坛</li>
        <li @click="switchMenu($event)"><span class="glyphicon glyphicon-comment" aria-hidden="true" ></span> 回复</li>
        <li @click="switchMenu($event)"><span class="glyphicon glyphicon-envelope" aria-hidden="true" ></span> 留言板</li>
      </ul>
    </div>

    <!-- 内容 -->
    <div class="content">
      <div class="left">
        <div class="person-infor"> 
          <!-- 个人 -->
          <div class="personal-infor">
              <div class="form-group">
                <label for="exampleInputName2">昵称：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                <input type="text" class="form-control"  placeholder="" :value="owner.extraName">
                
              </div>
              <div class="form-group">
                  <label for="exampleInputEmail">Email：  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                  <input type="email" class="form-control" id="exampleInputEmail" placeholder="" :value="owner.email">
                  
              </div>
              <div class="form-group">
                <label for="exampleInputName2">手机号：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                <input type="text" class="form-control" id="exampleInputName2" placeholder="" :value="owner.phonenumber">
                
              </div>
              <div class="form-group">
                <label for="exampleInputName2">其他联系方式：</label>
                <input type="text" class="form-control" id="exampleInputName2" placeholder="" :value="owner.otherContact">
                
              </div>             
              <div class="form-group">
                <label for="exampleInputName2">个性签名：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                <input type="text" class="form-control" id="exampleInputName2" placeholder="" :value="owner.personalSign">
                
              </div>
              <div class="form-group">
                <label for="exampleInputName2">学校专业：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                <input type="text" class="form-control" id="exampleInputName2" placeholder="" :value="owner.schoolMajor">
                
              </div>
              <div class="form-group">
                <label for="exampleInputName2">密码：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                <input type="text" class="form-control" id="exampleInputName2" placeholder="">
                
              </div>
              <div class="form-group">
                <label for="exampleInputName2">爱好：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                <input type="text" class="form-control" id="exampleInputName2" placeholder="" :value="owner.hobby">
                
              </div>
              <button class="btn btn-primary" @click="savePersonalInfo($event)">保存</button>
          </div>
          <!-- 文章 -->
          <div class="article">
            <h5>&raquo; 我的文章</h5>
            <ul class="article-list clearfix">
              <li v-for="(value, index) in Article" :key="index.value">
                <span class="article-title" @click="toArticle(value.title, value.userName, value.newsBelong)"><router-link :to="{name:'articleLink'}" @click="toArticle(value.title, value.userName, value.newsBelong)">{{value.title}}</router-link></span>  
                <span class="date">{{value.date}}</span>
                
              </li>
            </ul>
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
                    <input type="text" name="" class="pageJumpTo" >
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
          </div>
          <!-- 收藏 -->
          <div class="collection">
            <h5>&raquo; 我的收藏</h5>
            <ul class="collection-list clearfix">             
              <li v-for="(value, index) in Collection" :key="index.value">
                <span class="collection-title" @click="toArticle(value.title,value.userName, value.newsBelong)"><router-link :to="{name:'articleLink'}" @click="toArticle(value.title,value.userName, value.newsBelong)">{{value.title}}</router-link></span>
                <span class="date">{{value.date}}</span>
              </li>
            </ul>
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
                    <input type="text" name="" class="pageJumpTo" >
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
          </div>
          <!-- 关注 -->
          <div class="focus clearfix">
            <p>关注的论坛</p>
            <ul>
              <li v-for="(value, index) in myFocus" :key="index.value">
                <div class="focus-item clearfix">
                  <div class="img-wrapper">
                    <img :src="value.imgSrc" alt="">
                  </div>
                  <span @click="toSinglePage(value.name,'')"><router-link :to="{name:'singlePageLink'}" @click="toSinglePage(value.name,'')">{{value.name}}</router-link></span>
                  
                  <button class="btn btn-default" @click="cancelFocus($event)">已关注</button>
                </div>
              </li>
            </ul>
          </div>
          <!-- 回复 -->
          <div class="reply">
            <p>我收到的回复</p>
            <div class="item-wrapper">
              <ul>
                <li v-for="(value, index) in Reply" :key="index.value">
                  <div class="item"> 
                    <span class="reply-article-title"> 
                      标题：<router-link :to="{name: 'articleLink'}" @click="toArticle(value.title, value.name, value.belong)">{{value.title}}</router-link>
                    </span>
                    <span class="date">{{value.date}}</span>
                    <div class="reply-content">
                      <span class="name"><router-link :to="{name: 'personLink'}" @click="toPerson(value.name)">{{value.name}}</router-link></span>&nbsp;  回复了：&nbsp;
                      <p class="message"><router-link :to="{name: 'articleLink'}" @click="toArticle(value.title, value.name, value.belong)">{{value.content}}</router-link></p>
                    </div>
                  </div>
                </li>
              </ul>
              
            </div>
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
                    <input type="text" name="" class="pageJumpTo" >
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
          </div>
          <!-- 留言 -->
          <div class="message-leave">
            <p class="message-get">我收到的留言</p>
            <div class="message-wrapper">
              <ul>
                <li v-for="(value, index) in MsgLeft" :key="index.value">
                  <div class="message-item"> 
                    <router-link :to="{name:'personLink'}"><span class="name" @click="toPerson(value.name)">{{value.name}}</span></router-link>&nbsp;  留言：&nbsp;
                    <p class="message">{{value.content}}</p>
                  </div>
                </li>
              </ul>
              
            </div>
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
                    <input type="text" name="" class="pageJumpTo" >
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
            <p class="message-send">写留言</p>
            <div class="leave-message">
              <textarea name="" id="" cols="30" rows="10" v-model="messageLeft"></textarea>
              <button class="btn btn-primary" @click="sendMessage($event)">发送</button>
            </div>
          </div>
          
        </div>
      </div>
      <div class="right">
        <div class="myfriend">
          <input type="text" class="form-control" id="exampleInputAmount" placeholder="搜索">
          <button class="btn btn-primary" @click="searchFriends($event)">查找</button> 
          <span @click="friendlistToggle($event)"><span class="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span> 我关注的人</span>
          <ul class="friend-list">
            <li v-for="(value, index) in myFriends" :key="index.value" @click="updateUser($event)">
              <img :src="value.imgSrc" alt=""><span><router-link :to="{name:'personLink'}" @click="updateUser($event)">{{value.extraName}}</router-link></span>
            </li>
          </ul>
          <div class="search-result">
            <ul>
              <li v-for="(value, index) in myFriendsSearch" :key="index.value" @click="updateUser($event)">
                <router-link :to="{name: 'personLink'}">{{value.name}}</router-link>
              </li> 
            </ul>
          </div>
        </div>
      </div>
    </div>
    


  </div>
</template>

<script>
import axios from 'axios'
import Search from "./Search"
import Navigator from "./Navigator"
export default {
  inject: ['reload'],
  name: 'Person',
  data () {
    return {
      myArticle: [
        // {
        //   title:'Lorem ipsum dolor sit amet consectetur, aerendis molestiae, eos recusandae ullam quaerat illum. Eligendi dolorum voluptatum qui molestias.',
        //   date:'2019-09-05'
        // }
      ],
      Article: [],
      myCollection: [
        // {
        //   title:'Lorem ipsum dolor sit amet consectetur, aerendis molestiae, eos recusandae ullam quaerat illum. Eligendi dolorum voluptatum qui molestias.',
        //   date:'2019-09-05'
        // }
      ],
      Collection: [],
      myFocus: [
        // {
        //   name: '浙江师范大学',
        //   imgSrc: '../../static/img/logo.jpg'
        // },
      ],
      // reply一页只放八个
      myReply: [
        // {
        //   title: 'Java 跌落神坛！Python 正式登顶世界第一编程语言啊啊啊啊啊啊啊啊',
        //   date: '2019-04-02 04:44',
        //   name: '张三',
        //   content: 'Python不一定是世界第一编程语言Python不一定是世界第一编程语言Python不一定是世界第一编程语言Python不一定是世界第一编程语言Python不一定是世界第一编程语言Python不一定是世界第一编程语言Python不一定是世界第一编程语言Python不一定是世界第一编程语言Python不一定是世界第一编程语言'
        // }, 
      ],
      Reply:[],
      myMsgLeft: [],
      MsgLeft:[],
      myFriends: [
        // {
        //   imgSrc: '',
        //   name: '',
        //   extraName:'',
        //   email: '',
        //   phonenumber: '',
        //   otherContact: '',
        //   personSign: '',
        //   schoolMajor: '',
        //   dateComeToSchool: '',
        //   hobby: ''
        // },
        
      ],
      myFriendsSearch: [
        // {
        //   name: '藏三唐'
        // },
      ],
      // 当前被阅读数据的用户
      owner:{
        // this.$route.params.name
        name: "",
        personalSign: '',
        imgSrc:'',
        extraName:'',
        email: '',
        phonenumber: '',
        otherContact: '',
        schoolMajor: '',
        password: '',
        hobby: ''
      },
      // 登录的用户
      user:{},
      // 当前页码
      currentPage: 1,
      // 总共页数
      totalPages: 0,
      // 一页最大显示数据量
      itemMaxNum: 10,
      // 发送留言内容
      messageLeft:''
    }
  },
  components:{
    "search": Search,
    "navigator": Navigator
  },
  methods: {
    // 好友列表收缩展开
    friendlistToggle(e){ 
      var event = e || event;
      var target = event.target || event.srcElement;
      $('#person .content .right .myfriend > .friend-list').toggle(300);
      var arrow = $('#person .content .right .myfriend > span > span');
      if(arrow.hasClass('glyphicon-triangle-bottom')){
        arrow.removeClass('glyphicon-triangle-bottom');
        arrow.addClass('glyphicon-triangle-right');
      }
      else{
        arrow.addClass('glyphicon-triangle-bottom');
        arrow.removeClass('glyphicon-triangle-right');
      }
    },
    // 搜索好友按钮点击事件
    searchFriends(e){
      if($.cookie('username')){
        let friend = $('#person .content .right .myfriend > input').val();
        let name = this.owner.name;
        let sql = `SELECT * FROM friends WHERE name = "${name}" and friend like "%${friend}%"`;
        axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
          .then(res=>{
            // console.log(res.data);
            var news =[];
            for(var item of res.data){
              var newsObj = {
                name: item.friend,
              }
              news.push(newsObj);
            }
            this.myFriendsSearch = news;
          })
          .catch(error=>{
              console.log(error);
          });
      }
      var event = e || event;
      var target = event.target || event.srcElement;
      $('#person .content .right .myfriend .search-result').show(100);
      e.stopPropagation(); 
    },
    // 保存个人信息
    savePersonalInfo(e){
      var event = e || event;
      var target = event.target || event.srcElement;
      var extraName = $(target.parentNode.children[0].children[1]).val();
      var email = $(target.parentNode.children[1].children[1]).val();
      var phonenumber = $(target.parentNode.children[2].children[1]).val();
      var otherContact = $(target.parentNode.children[3].children[1]).val();
      var personalSign = $(target.parentNode.children[4].children[1]).val();
      var schoolMajor = $(target.parentNode.children[5].children[1]).val();
      var hobby = $(target.parentNode.children[7].children[1]).val();
      var name = this.owner.name;
      //信息写入数据库操作
      if($.cookie('username')){
        let sql = `UPDATE user SET extraName="${extraName}",email="${email}",phonenumber="${phonenumber}",otherContact="${otherContact}",personalSign="${personalSign}",schoolMajor="${schoolMajor}",hobby="${hobby}" WHERE name = "${name}"`;
        axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
          .then(res=>{
            // console.log(res.data);
            alert('保存成功!')
          })
          .catch(error=>{
              console.log(error);
          });
      }else{
        alert("保存失败, 请登录")
      }
      
    },
    // 取消关注论
    cancelFocus(e){
      var event = e || window.event;
      var target = event.target || event.srcElement;
      var node = target.parentNode;
      var universityDel = $(node.children[1]).text();
      var user = $.cookie('username');
      if(user){
        let sql = `DELETE FROM focus WHERE focus = "${universityDel}" and name = "${user}"`;
        axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
          .then(res=>{
            // console.log(res.data);
            $(node).hide();
            alert('已取消关注');
            
          })
          .catch(error=>{
            alert("删除失败, 请重试")
          });
      }
      else{
        alert("请登录用户再操作")
      }
      
    },
    // 导航栏各栏目的转换
    switchMenu(e){
      // this.reload();
      var event = e || window.event;
      var target = event.target || event.srcElement;
      var pages = document.getElementsByClassName('pageJumpTo');
      for(var i=0; i< pages.length; i++){
        pages[i].value = '';
      }
      $(target).siblings().removeClass('active');
      $(target).addClass('active');
      var nameSelected = $(target).text();
      $('#person .content .left .personal-infor').hide();
      $('#person .content .left .personal-infor').siblings().hide();
      switch(nameSelected){
        case ' 个人': 
          $('#person .content .left .person-infor .personal-infor').show(); 
          break;
        case ' 文章': 
          $('#person .content .left .person-infor .article').show(); 
          this.totalPages = Math.floor(this.myArticle.length/this.itemMaxNum) +1
          this.currentPage = 1;
          break;
        case ' 收藏': 
          $('#person .content .left .person-infor .collection').show(); 
          this.currentPage = 1;
          this.totalPages = Math.floor(this.myCollection.length/this.itemMaxNum) +1
          break;
        case ' 关注论坛': 
          $('#person .content .left .person-infor .focus').show(); 
          break;
        case ' 回复': 
          $('#person .content .left .person-infor .reply').show(); 
          this.currentPage = 1;
          this.totalPages = Math.floor(this.myReply.length/this.itemMaxNum) +1
          break;
        case ' 留言板': 
          $('#person .content .left .person-infor .message-leave').show(); 
          if(this.owner.name == $.cookie('username')){
            this.currentPage = 1;
            this.totalPages = Math.floor(this.myMsgLeft.length/this.itemMaxNum) +1
          }
          else{
            $('#person .content .left .person-infor .message-leave .message-get').hide();
            $('#person .content .left .person-infor .message-leave .message-wrapper').hide();
            $('#person .content .left .person-infor .message-leave .nav').hide();
            $('#person .content .left .person-infor .message-leave .message-send').show();
            $('#person .content .left .person-infor .message-leave .leave-message').show();
          }
          break;
        default: break;
      }
      
    },
    // 编辑资料按钮
    editPersonInfo(){
      $('#person .content .left .personal-infor').siblings().hide();
      $('#person .content .left .person-infor .personal-infor').show(); 
    },
    // 修改本页用户
    updateUser(e){
      var event = e || window.event;
      var target = event.target || event.srcElement;
      var user = window.sessionStorage.getItem('user');
      $('#person .content .left .person-infor .personal-infor  button').show();
      if(user != $.cookie('username')){
        $('#person .content .left .person-infor .personal-infor  button').hide();
      }
      {
        // 个人信息
        // {
        //   let sql = `SELECT * FROM user WHERE name = "${user}"`;
        //   axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
        //     .then(res=>{
        //       // console.log(res.data);
        //       for(var item of res.data){
        //         var newsObj = {
        //           name: item.name,
        //           personalSign: item.personalSign,
        //           imgSrc: item.imgSrc,
        //           extraName: item.extraName,
        //           email: item.email,
        //           phonenumber: item.phonenumber,
        //           otherContact: item.otherContact,
        //           schoolMajor: item.schoolMajor,
        //           password: item.password,
        //           hobby: item.hobby
        //         }
        //         this.owner = newsObj;
        //       }
              
        //     })
        //     .catch(error=>{
        //         // console.log(error);
        //     });
        // }

        // // 文章
        // {
        //   let type = "原创";
        //   let sql = `SELECT * FROM allarticles WHERE type = "${type}" and author = "${user}" order by time desc`;
        //   axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
        //     .then(res=>{
        //       // console.log(res.data);
        //       var news =[];
        //       for(var item of res.data){
        //         var newsObj = {
        //           imgSrc: item.imgSrc,
        //           userName: item.author,
        //           title: item.title,
        //           newsSummary: item.content,
        //           newsBelong: item.belong,
        //           date: item.time,
        //           newsComments: item.comment,
        //           newsId: item.id
        //         }
        //         news.push(newsObj);
        //       }
        //       this.myArticle = news;
        //     })
        //     .catch(error=>{
        //         // console.log(error);
        //     });
        // }

        // // 收藏
        // {
        //   let type = "收藏";
        //   let sql = `SELECT * FROM allarticles WHERE type = "${type}" and author = "${user}" order by time desc`;
        //   axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
        //     .then(res=>{
        //       // console.log(res.data);
        //       var news =[];
        //       for(var item of res.data){
        //         var newsObj = {
        //           imgSrc: item.imgSrc,
        //           userName: item.author,
        //           title: item.title,
        //           newsSummary: item.content,
        //           newsBelong: item.belong,
        //           date: item.time,
        //           newsComments: item.comment,
        //           newsId: item.id
        //         }
        //         news.push(newsObj);
        //       }
        //       this.myCollection = news;
        //     })
        //     .catch(error=>{
        //         // console.log(error);
        //     });
        // }
        
        // // 关注
        // {
        //   let sql = `SELECT * FROM focus WHERE name = "${user}"`;
        //   axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
        //     .then(res=>{
        //       // console.log(res.data);
        //       var news =[];
        //       for(var item of res.data){
        //         var newsObj = {
        //           name: item.focus,
        //           imgSrc: item.imgSrc
        //         }
        //         news.push(newsObj);
        //       }
        //       this.myFocus = news;
        //     })
        //     .catch(error=>{
        //         // console.log(error);
        //     });
        // }

        // // 回复
        // {
        //   let sql = `SELECT * FROM message WHERE name = "${user}" order by time desc`;
        //   axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
        //     .then(res=>{
        //       // console.log(res.data);
        //       var news =[];
        //       for(var item of res.data){
        //         var newsObj = {
        //           title: item.title,
        //           date: item.time,
        //           name: item.comefrom,
        //           content: item.content
        //         }
        //         news.push(newsObj);
        //       }
        //       this.myReply = news;
        //     })
        //     .catch(error=>{
        //         // console.log(error);
        //     });
        // }

        // // 留言
        // {
          
        //   let sql = `SELECT * FROM messageleft WHERE name = "${user}" order by time desc`;
        //   axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
        //     .then(res=>{
        //       // console.log(res.data);
        //       var news =[];
        //       for(var item of res.data){
        //         var newsObj = {
        //           name: item.comefrom,
        //           content: item.content
        //         }
        //         news.push(newsObj);
        //       }
        //       this.myMsgLeft = news;
              
        //     })
        //     .catch(error=>{
        //         console.log(error);
        //     });
        // }

        // // 好友
        // {       
        //   let sql = `SELECT friends.friend, user.imgSrc FROM friends, user WHERE friends.name = user.name and user.name = "${user}"`;
        //   axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
        //     .then(res=>{
        //       // console.log(res.data);
        //       var news =[];
        //       for(var item of res.data){
        //         var newsObj = {
        //           name: item.friend,
        //           imgSrc: item.imgSrc
        //         }
        //         news.push(newsObj);
        //       }
        //       this.myFriends = news;
        //     })
        //     .catch(error=>{
        //         console.log(error);
        //     });
        // }
      }
      this.toPerson(user);
      this.reload()
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
          this.updatePage(this.currentPage)
        }
      }
      if(target.innerText.indexOf('下') > -1){
        if(this.currentPage == this.totalPages){
          alert('已经是最后一页啦')
        }
        else{
          this.currentPage ++;
          
          this.updatePage(this.currentPage)
        }
      }
    },
    // 分页跳转操作
    turnPage(e){
      // this.totalPages = Math.floor(this.articleCommentsInfor.length / this.itemMaxNum ) + 1;
      var pages = document.getElementsByClassName('pageJumpTo');
      var page = 1;
      for(var i=0; i< pages.length; i++){
        if(pages[i].value != ''){
          page = pages[i].value
        }
        
      }
      
      function isPositiveNum(s){//是否为正整数
        var re = /^[1-9]*[1-9][0-9]*$/ ;
        return re.test(s)
      }
      
      if(isPositiveNum(page) && parseInt(page)>0 && parseInt(page) <= this.totalPages){
        this.currentPage = page;
        this.updatePage(this.currentPage);
      }
      else{
        alert('您的输入不正确，请重新输入')
      }
      var pages = document.getElementsByClassName('pageJumpTo');
      for(var i=0; i< pages.length; i++){
        pages[i].value = '';
      }
    },
    // 具体跳转
    updatePage(page){
      var menu = $('#person .function > ul > li.active').text();
      switch(menu){
        case " 文章":
          var from = (page-1) * 10;
          var to;
          if(this.myArticle.length-from>10){
            to = from + 10
          }
          else{
            to = (this.myArticle.length%10) + from;
          }
          this.Article = [];
          for(var i=from; i< to; i++){
            this.$set(this.Article, i-from, this.myArticle[i])
          }     
          break;
        case " 收藏":
          var from = (page-1) * 10;
          var to;
          if(this.myCollection.length-from>10){
            to = from + 10
          }
          else{
            to = (this.myCollection.length%10) + from;
          }
          this.Collection = [];
          for(var i=from; i< to; i++){
            this.$set(this.Collection, i-from, this.myCollection[i])
          }     
          break;
        case " 回复":
          var from = (page-1) * 10;
          var to;
          if(this.myReply.length-from>10){
            to = from + 10
          }
          else{
            to = (this.myReply.length%10) + from;
          }
          this.Reply = [];
          for(var i=from; i< to; i++){
            this.$set(this.Reply, i-from, this.myReply[i])
          }     
          break;
        case " 留言板": 
          var from = (page-1) * 10;
          var to;
          if(this.myMsgLeft.length-from>10){
            to = from + 10
          }
          else{
            to = (this.myMsgLeft.length%10) + from;
          }
          this.MsgLeft = [];
          for(var i=from; i< to; i++){
            this.$set(this.MsgLeft, i-from, this.myMsgLeft[i])
          }         
          break;
        default: break;
      }
    },
    // 发送留言
    sendMessage(e){
      var event = e || window.event;
      var target = event.target || event.srcElement;
      var comefrom = $.cookie('username');
      if(comefrom){
        let content = this.messageLeft;
        if(content){
          let name= this.owner.name;
          let time = '19:22'
          let sql = `INSERT INTO messageleft (name, content, comefrom, time) VALUES ("${name}", "${content}", "${comefrom}", "${time}")`;
          axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
            .then(res=>{
              // console.log(res.data);
              alert("留言成功");
              this.messageLeft = '';
            })
            .catch(error=>{
                // console.log(error);
            });
        }
        else{
          alert("内容不能为空")
        }
      }
      else{
        alert("请先登录")
      }
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
    // 

  },
  beforeCreate(){
    
    let name = window.sessionStorage.getItem('user');
    
    // 个人信息
    {
      let sql = `SELECT * FROM user WHERE name = "${name}"`;
      axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
        .then(res=>{
          // console.log(res.data);
          for(var item of res.data){
            var newsObj = {
              name: item.name,
              personalSign: item.personalSign,
              imgSrc: item.imgSrc,
              extraName: item.extraName,
              email: item.email,
              phonenumber: item.phonenumber,
              otherContact: item.otherContact,
              schoolMajor: item.schoolMajor,
              password: item.password,
              hobby: item.hobby
            } 
            if($.cookie('username')){
              this.owner = this.user = newsObj;
            }
            else{
              this.owner = newsObj;
            }
          }
          
        })
        .catch(error=>{
            // console.log(error);
        });
    }

    // 文章
    {
      // let type = "原创";
      let sql = `SELECT * FROM allarticles WHERE type = "原创" and author = "${name}"`;
      axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
        .then(res=>{
          // console.log(res.data);
          let news =[];
          for(var item of res.data){
            var newsObj = {
              imgSrc: item.imgSrc,
              userName: item.author,
              title: item.title,
              newsSummary: item.content,
              newsBelong: item.belong,
              date: item.time,
              newsComments: item.comment,
              newsId: item.id
            }
            news.push(newsObj);
          }
          this.myArticle = news;
        })
        .catch(error=>{
            // console.log(error);
        });
    }

    // 收藏
    if(name == $.cookie('username')){
      let sql = `SELECT * FROM allarticles WHERE type = "收藏" and author = "${name}"`;
      axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
        .then(res=>{
          // console.log(res.data);
          var news =[];
          for(var item of res.data){
            var newsObj = {
              imgSrc: item.imgSrc,
              userName: item.author,
              title: item.title,
              newsSummary: item.content,
              newsBelong: item.belong,
              date: item.time,
              newsComments: item.comment,
              newsId: item.id
            }
            news.push(newsObj);
          }
          this.myCollection = news;
        })
        .catch(error=>{
            console.log(error);
        });
    }
    
    // 关注
    if(name == $.cookie('username')){
      
      let sql = `SELECT focus.focus, forum.imgSrc FROM focus, forum WHERE focus.name = "${name}" and forum.name = focus.focus`;
      axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
        .then(res=>{
          // console.log(res.data);
          var news =[];
          for(var item of res.data){
            var newsObj = {
              name: item.focus,
              imgSrc: item.imgSrc
            }
            news.push(newsObj);
          }
          this.myFocus = news;
        })
        .catch(error=>{
            // console.log(error);
        });
    }

    // 回复
    if(name == $.cookie('username')){
      let sql = `SELECT * FROM message WHERE name = "${name}"`;
      axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
        .then(res=>{
          // console.log(res.data);
          let news =[];
          for(var item of res.data){
            var newsObj = {
              title: item.title,
              date: item.time,
              name: item.comefrom,
              content: item.content,
              belong: item.belong
            }
            news.push(newsObj);
          }
          this.myReply = news;
          
        })
        .catch(error=>{
            // console.log(error);
        });
    }

    // 留言
    if(name == $.cookie('username')){
      let sql = `SELECT * FROM messageleft WHERE name = "${name}"`;
      axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
        .then(res=>{
          // console.log(res.data);
          var news =[];
          for(var item of res.data){
            var newsObj = {
              name: item.comefrom,
              content: item.content
            }
            news.push(newsObj);
          }
          this.myMsgLeft = news;
        })
        .catch(error=>{
            console.log(error);
        });
    }

    // 好友
    if(name == $.cookie('username')){
      let sql = `SELECT friends.friend, user.extraName, user.imgSrc FROM friends, user WHERE friends.friend = user.name and friends.name = "${name}"`;
      axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
        .then(res=>{
          // console.log(res.data);
          var news =[];
          for(var item of res.data){
            var newsObj = {
              name: item.friend,
              imgSrc: item.imgSrc,
              extraName: item.extraName
            }
            news.push(newsObj);
          }
          this.myFriends = news;
        })
        .catch(error=>{
            console.log(error);
        });
    }

    $(document).on('click',function(e){
        var event = e || event;
        var target = event.target || event.srcElement;
        if($(this) != $('#person .content .right .myfriend > button')){
          $('#person .content .right .myfriend .search-result').hide(100);
        }
    })
    
  },
  watch: {
    myArticle:{
      handler:function(){
        if(this.myArticle.length>10){
          this.Article = this.myArticle.slice(0,10);
        }else{
          this.Article = this.myArticle
        }
      }
    },
    myCollection:{
      handler:function(){
        if(this.myCollection.length>10){
          this.Collection = this.myCollection.slice(0,10);
        }else{
          this.Collection = this.myCollection
        }
      }
    },
    myReply:{
      handler:function(){
        if(this.myReply.length>10){
          this.Reply = this.myReply.slice(0,10);
        }else{
          this.Reply = this.myReply
        }
      }
    },
    myMsgLeft:{
      handler:function(){
        if(this.myMsgLeft.length>10){
          this.MsgLeft = this.myMsgLeft.slice(0,10);
        }else{
          this.MsgLeft = this.myMsgLeft
        }
      }
    }
  },
  mounted() {
    // console.log("mounted"+this.$route.params.name+"user"+$.cookie('username'));
  },
  Updated(){
    // console.log("Updated"+this.$route.params.name+"user"+$.cookie('username'));
  },
}

</script>


<style scoped>
a{
  color: #333;
}
a:hover{
  color: rgb(14, 130, 175);
  text-decoration: none;
}
#person{
  width: 1100px;
  margin:0 auto;
    
  height: auto;
  position: relative;
}
#person::after{
  height: 0;
  clear: both;
  content: '';
  display: block;
}
#person > .img-wrapper{
  width: 100%;
  height: 180px;
  
}
#person > .img-wrapper img{
  width: 100%;
  height: 100%;
}
#person .infor-wrapper{
  width: 100%;
  height: 100px;
  border-bottom: 1px solid #ddd;
  background: rgb(242, 242, 247);
  border-top: 1px solid #ddd;
}
#person .infor-wrapper > .img-wrapper{
  width: 160px;
  height: 160px;
  display: inline-block;
  border: 1px solid #ccc;
  text-align: center;
  position: absolute;
  top: 105px;
  left: 40px;
  line-height: 160px;
  background: #fff;
}
#person .infor-wrapper > .img-wrapper img{
  width: 95%;
  height: 95%;
}
#person .infor-wrapper .upper{
  vertical-align: middle;
}
#person .infor-wrapper .title{
  margin-left: 230px;
  font-size: 21px;
  display: inline-block; 
  margin-top: 20px;
  
}
#person .infor-wrapper .upper .btn{
  margin-top: -10px;
  
  margin-left: 20px;
  width: 80px;
}
#person .infor-wrapper .upper .focus{
  
  display: inline-block;
  font-size: 12px;
  margin-bottom: 0px;
  margin-left: 20px;
}
#person .infor-wrapper .upper .articles{
  margin-bottom: 0px;
  margin-left: 20px;
  font-size: 12px;
  color: #444;
}
#person .infor-wrapper .summary{
  margin-left: 230px;
  display: inline-block;
  margin-top: 10px;
  font-size: 14px;
}

/* 功能导航 */
#person .function{
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #ddd;

}
#person .function > ul{
  background: rgb(238, 238, 245);
  width: 100%;
  height: 100%;
}
#person .function > ul > li{
  width: 120px;
  float: left;
  line-height: 45px;
  font-size: 16px;
  text-align: center;
  color: #668;
}
#person .function > ul > li:hover{
  background: #dde;
  cursor: pointer;
}
#person .function > ul > li.active{
  background: #dde;
}

/* 内容 */
#person .content{

  width: 100%;
  height: auto;
}
#person .content .left{
  /* border: 1px solid #ddd; */
  width: 75%;
  height: auto;
  float: left;
}
#person .content .left .person-infor{
  width: 100%;
  height: auto;
  border: 1px solid #ddd;
  min-height: 500px;
}
#person .content .left .person-infor .personal-infor{
  width: 90%;
  height: auto;
  margin: 20px auto;
}

#person .content .left .person-infor .personal-infor .form-group label{
  display: inline-block;
  color: #555
}
#person .content .left .person-infor .personal-infor .form-group input{
  width: 70%;
  display: inline-block;

}

#person .content .left .person-infor .personal-infor  button{
  width: 70px;
}




/* 分页 */
#person .content .left .article  .nav::after{
  display: block;
  height: 0;
  clear: both;
  content: '';
}
#person .content .left .article  .nav > nav{
  float: right;
}
#person .content .left .article  .nav > nav > ul > li input{
  height: 34px;
  display: block;
  float: left;
  width: 50px;
  border: 1px solid #ddd;
  margin-left: 10px;
}
#person .content .left .article  .nav > nav > ul > li > .btnJump{
  background: #fff;
  border: 1px solid #ddd;
  color: #337ab7;
}
#person .content .left .article  .nav > nav > ul > li > .btnJump:hover{
  cursor: pointer;
}
/* 分页 */
#person .content .left .collection  .nav::after{
  display: block;
  height: 0;
  clear: both;
  content: '';
}
#person .content .left .collection  .nav > nav{
  float: right;
}
#person .content .left .collection  .nav > nav > ul > li input{
  height: 34px;
  display: block;
  float: left;
  width: 50px;
  border: 1px solid #ddd;
  margin-left: 10px;
}
#person .content .left .collection  .nav > nav > ul > li > .btnJump{
  background: #fff;
  border: 1px solid #ddd;
  color: #337ab7;
}
#person .content .left .collection  .nav > nav > ul > li > .btnJump:hover{
  cursor: pointer;
}
/* 分页 */
#person .content .left .reply  .nav::after{
  display: block;
  height: 0;
  clear: both;
  content: '';
}
#person .content .left .reply  .nav > nav{
  float: right;
}
#person .content .left .reply  .nav > nav > ul > li input{
  height: 34px;
  display: block;
  float: left;
  width: 50px;
  border: 1px solid #ddd;
  margin-left: 10px;
}
#person .content .left .reply  .nav > nav > ul > li > .btnJump{
  background: #fff;
  border: 1px solid #ddd;
  color: #337ab7;
}
#person .content .left .reply  .nav > nav > ul > li > .btnJump:hover{
  cursor: pointer;
}
/* 分页 */
#person .content .left .person-infor .message-leave  .nav::after{
  display: block;
  height: 0;
  clear: both;
  content: '';
}
#person .content .left .person-infor .message-leave  .nav > nav{
  float: right;
}
#person .content .left .person-infor .message-leave  .nav > nav > ul > li input{
  height: 34px;
  display: block;
  float: left;
  width: 50px;
  border: 1px solid #ddd;
  margin-left: 10px;
}
#person .content .left .person-infor .message-leave  .nav > nav > ul > li > .btnJump{
  background: #fff;
  border: 1px solid #ddd;
  color: #337ab7;
}
#person .content .left .person-infor .message-leave  .nav > nav > ul > li > .btnJump:hover{
  cursor: pointer;
}





/* 文章和收藏 */
#person .content .left .article{
  width: 100%;
  height: auto;
  padding: 20px;
  display: none;
}
#person .content .left .collection{
  width: 100%;
  height: auto;
  padding: 20px;
  display: none;
}
#person .content .left .article h5,
#person .content .left .collection h5{
  margin-bottom: 20px;
  display: block;
  width: 100%;
}
#person .content .left .article .article-list,
#person .content .left .collection .collection-list{
  width: 100%;
  min-height: 100px;
  overflow: hidden;
}
#person .content .left .article .article-list > li,
#person .content .left .collection .collection-list > li{
  margin-bottom: 5px;
  width: 100%;
  height: 35px;;
}
#person .content .left .article .article-list > li > span,
#person .content .left .collection .collection-list > li > span{
  display: inline-block;
  height: 30px;
  padding: 0;
  margin: 0;
  color: #555
}
#person .content .left .article .article-list > li > .article-title,
#person .content .left .collection .collection-list > li > .collection-title{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 85%;
  float: left;
  font-size: 16px;
}
#person .content .left .article .article-list > li > .article-title:hover,
#person .content .left .collection .collection-list > li > .collection-title:hover{
  cursor: pointer;
  color: rgb(14, 130, 175);
  text-decoration: underline;
}
#person .content .left .article .article-list > li > .date,
#person .content .left .collection .collection-list > li > .date{
  float: right;
  width: 10%;
  font-weight: normal;
}

/* 关注 */
#person .content .left .focus{
  width: 100%;
  height: auto;
  padding: 20px;
  border: 1px solid #eee;
  border-top: 1px solid transparent;
  min-height: 100px;

  overflow: scroll;
  display: none;
}
#person .content .left .focus::-webkit-scrollbar{
  display: none;
}
#person .content .left .focus > p{
  margin-bottom: 20px;
  width: 100%;
}
#person .content .left .focus .focus-item{
  width: 45%;
  border: 1px solid #bbb;
  float: left;
  height: auto;
  line-height: 40px;
  font-size: 16px;
  padding:4px 10px;
  border-radius: 10px;
  margin-right: 35px;
  margin-bottom: 15px;
}
#person .content .left .focus .focus-item .img-wrapper{
  float: left;
  margin-top: -2px; 
  width: 35px;
  height: 35px;
}
#person .content .left .focus .focus-item .img-wrapper img{
  width: 100%;
  height: 100%;
}
#person .content .left .focus .focus-item span{
  float: left;
  height: 100%;
  margin-left: 10px;
}
#person .content .left .focus .focus-item span:hover{
  cursor: pointer;
  color: rgb(14, 130, 175);
}
#person .content .left .focus .focus-item button{
  float: right;
  margin-top: 3px;
  margin-right: 5px;
  outline: none;
}
#person .content .left .focus .focus-item button:focus
{
  background: #fff;
}


/* 回复 */
#person .content .left .reply{
  width: 100%;
  height: auto;
  padding: 20px;
  display: none;
  min-height: 100px;
}
#person .content .left .reply > p{
  margin-bottom: 10px;
}
#person .content .left .reply .item-wrapper{
    border: 1px solid #ccc;
    min-height: 100px;
}
#person .content .left .reply .item-wrapper .item{
  border-bottom: 1px solid #ccc;
  width: 100%;
  height: auto;
  padding: 20px 15px;
}
#person .content .left .reply .item-wrapper .item .reply-article-title{
  font-size: 14px;
  white-space:nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 80%;
  display: inline-block;
}
#person .content .left .reply .item-wrapper .item .date{
  line-height: 25px;
  float: right;
  font-size: 12px;
}
#person .content .left .reply .item-wrapper .item .reply-content{
  border-bottom: 1px solid #bbb;
  height: auto;
  width: 100%;
  font-size: 13px;
  padding: 10px;
  padding-bottom: 0px;
  margin-top: -10px;
}
#person .content .left .reply .item-wrapper .item .reply-content .name{
  display: inline-block;
  color: rgb(14, 130, 175);
}
#person .content .left .reply .item-wrapper .item .reply-content .message{
 display: inline-block;
 font-size: 13px;
 margin-top: 3px;
 margin-bottom: 5px;
}
#person .content .left .reply .item-wrapper .item .reply-content .name:hover,
#person .content .left .reply .item-wrapper .item .reply-content .message:hover,
#person .content .left .reply .item-wrapper .item .reply-article-title:hover{
  cursor: pointer;
  color: rgb(14, 130, 175);
}

/* 留言 */
#person .content .left .person-infor .message-leave{
  width: 100%;
  height: auto;
  /* border: 1px solid #eee; */
  padding: 20px;
  display: none;
}
#person .content .left .person-infor .message-leave  p{
  margin-bottom: 15px;
}
#person .content .left .person-infor .message-leave  .message-wrapper{
  border: 1px solid #ccc;
  padding: 15px;
  width: 100%;
  height: auto;
  min-height: 100px;
}
#person .content .left .person-infor .message-leave  .message-wrapper  .message-item{
  border-bottom: 1px solid #ccc; 
  height: auto;
  margin-bottom: 20px;
}
#person .content .left .person-infor .message-leave .message-wrapper .message-item .name{
  color: rgb(14, 130, 175);
}
#person .content .left .person-infor .message-leave .message-wrapper .message-item .name:hover{
  cursor: pointer;
  text-decoration: underline;
}
#person .content .left .person-infor .message-leave .message-wrapper .message-item .message{
  margin-top: 5px;
}
#person .content .left .person-infor .message-leave .message-send{
  display: none;
}
#person .content .left .person-infor .message-leave .leave-message{
  border: 1px solid #ccc;
  padding: 20px;
  display: none;
}
#person .content .left .person-infor .message-leave .leave-message > textarea{
  width: 100%;
  height: 100px;
  padding: 10px;
}
#person .content .left .person-infor .message-leave .leave-message > button{
  display: block;
}





/* 右边 */
#person .content .right{
  width: 24%;
  height: auto;
  float: left;
  margin-left: 10px;

}
#person .content .right .myfriend{
  border: 1px solid #ddd;
  border-top: 1px solid transparent;
  height: auto;
  width: 100%;
  padding: 15px;
}

#person .content .right .myfriend > input{
  width: 74%;
  height: 30px;
  display: inline-block;
  border-radius: 0px;
}
#person .content .right .myfriend > button{
  display: inline-block;
  height: 30px;
  border: 0px;
}
#person .content .right .myfriend > span{
  display: inline-block;
  margin-top: 15px;
  font-size: 16px;
  /* display: none; */
}
#person .content .right .myfriend .friend-list{
  margin-top: 5px;
  padding: 0px 20px 20px 20px;
  font-size: 13px;
  min-height: 70px;
  max-height: 550px;
  overflow: scroll;
  /* display: none; */
}
#person .content .right .myfriend .friend-list::-webkit-scrollbar{
  display: none;
}
#person .content .right .myfriend .friend-list > li{
  margin-bottom: 2px; 
  height: 30px;
  white-space:nowrap;       
  overflow: hidden;             
  text-overflow: ellipsis;
  width: 100%;
}

#person .content .right .myfriend .friend-list > li > img{
  height: 30px;
  width: 30px;
  margin-right: 5px;
  border: 1px solid #ddd;
}

#person .content .right .myfriend .friend-list > li > span:hover,
#person .content .right .myfriend > span:hover{
  cursor: pointer;
  color: rgb(14, 130, 175);
}
#person .content .right .myfriend .search-result{
  border: 1px solid #ccc;
  border-top: 1px solid transparent;
  width:170px;
  height: auto;
  margin-top: -2px;
  font-size: 13px;
  min-height: 50px;
  max-height: 300px;
  overflow: scroll;
  z-index: 3;
  background: #fff;
  position: absolute;
  top: 375px;
  display: none;
}
#person .content .right .myfriend .search-result::-webkit-scrollbar{
  display: none;
}
#person .content .right .myfriend .search-result > ul > li{
  width: 100%;
  white-space:nowrap;       
  overflow: hidden;             
  text-overflow: ellipsis;
  height: 25px;
  line-height: 25px;
  padding: 0 5px;
  text-align: center;
}
#person .content .right .myfriend .search-result > ul > li:hover{
  background: #eee;
  cursor: pointer;
}


</style>
