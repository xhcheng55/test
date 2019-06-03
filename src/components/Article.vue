<template>
  <div id="article">
    <top-header :forum="forum"></top-header>
    <div class="wrapper">
      <div class="back"><span @click="toSinglePage(forum.name,'')">&laquo; <router-link :to="{name: 'singlePageLink'}" @click="toSinglePage(forum.name,'')">返回对应论坛</router-link></span></div>
      
      <div class="left">
        <!-- 基本信息 -->
        <div class="base-infor">
          <div class="title">文章作者信息</div>
          <div class="sculptrue-name-care">
            <img :src="articleInfo.sculptureSrc" alt="头像">
            <span @click="toPerson(articleInfo.author)"><router-link :to="{name:'personLink'}" @click="toPerson(articleInfo.author)">{{articleInfo.extraName}}</router-link></span>
            <button class="btn btn-default" @click="caredToggle($event)">关注</button>
          </div>
          <div class="cared">关注：{{articleInfo.authorCared}}</div>
          <div class="article"><router-link :to="{name:'personLink'}" @click="toPerson(articleInfo.author)">文章：{{articleInfo.authorArticle}}</router-link></div>
        </div>

        <!-- 文章信息 -->
        <div class="article-infor">
          <div class="latest-articles">
            <div class="title">最新文章</div>
            <ul>
              <li v-for="(item, index) in latestArticle" :key="index.item" @click="toArticle(item.title,item.userName,item.belong)">
                <router-link :to="{name: 'articleLink'}" @click="toArticle(item.title,item.userName,item.belong)">{{item.title}}</router-link>
              </li>
            </ul>
          </div>
          <div class="hot-articles">
            <div class="title">热门文章</div>
            <ul>
              <li v-for="(item, index) in hotestArticle" :key="index.item" @click="toArticle(item.title,item.userName,item.belong)">
                <router-link :to="{name: 'articleLink'}" @click="toArticle(item.title,item.userName,item.belong)">{{item.title}}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="right">
        <!-- 标题 -->
        <div class="title">
          <p class="title-name" >
            {{articleInfo.title}}
          </p>
          <p class="collect" @click="collectToggle($event)">收藏</p>
          <p class="reply" @click="replyArticle()">回复</p>
        </div>
        <div class="append-infor">
          <span class="date">{{articleInfo.time}}</span>
          <span class="read-times">阅读次数：{{articleInfo.readTimes}}</span>
        </div>

        <ul>
          <li v-for="(item, index) in comments" :key="index.item">
            <div class="owner-part">
              <div class="part-left">
                <div class="img-wrapper">
                  <img :src="item.author.sculptureSrc" alt="头像">
                </div>
                 <router-link :to="{name: 'personLink'}" @click="toPerson(item.author.name)"><p class="name" @click="toPerson(item.author.name)">{{item.author.extraName}}</p></router-link>
                 <p>{{item.author.itemOrder}}</p>
                <!-- <p class="author">作者</p> -->
              </div>
              <div class="part-right">
                <div class="content">{{item.author.content}}</div>
                <div class="content-end">
                  <span class="date">{{item.author.publishDate}}</span>
                  <span class="reply" @click="replyToggle($event)">展开回复</span>
                </div>
                <div class="reply-msg">
                  <ul>
                    <li v-for="(value, ind) in item.replyer" :key="ind.value">
                      <div class="item">
                        <div class="img-wrapper">
                          <img :src="value.sculptureSrc" alt="">
                        </div>
                        <div class="content">
                          <span class="name"><router-link :to="{name: 'personLink'}" @click="toPerson(value.name)">{{value.extraName}}</router-link>:</span> 
                          <span class="msg">{{value.content}}</span>
                        </div>
                        <div class="date-reply">
                          <span class="date">{{value.publishDate}}</span>
                          <span class="reply" @click="replyAutofill($event)">回复</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                  
                  <div class="add-reply">
                    <textarea name="" id="myreply" cols="30" rows="2" placeholder="我来说几句..."></textarea>
                    <button class="btn btn-primary" @click="publishReply($event)">发表</button>
                  </div>
                </div>
              </div>
            </div>

          </li>
        </ul>

        
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

        <!-- 添加评论 -->
        <div class="add-part">
          <textarea name="" id="" cols="30" rows="6" placeholder="我也来发表评论"></textarea>
          <button class="btn btn-primary" @click="publishNewComment()">发表</button>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import TopHeader from './TopHeader'
export default {
  inject: ['reload'],
  name: 'Article',
  data () {
    return {
      latestArticle: [
        {
          title: ''
        },
      ],
      hotestArticle: [
        {
          title: ''
        },
      ],
      articleCommentsInfor: [
        // {
        //   author:{
        //     sculptureSrc: '../../static/img/carousel1.jpg',
        //     name: 'michael jordanaaaaaa',
        //     content: 'hello,这是一楼',
        //     publishDate: '2019-04-05 23:43:22',
        //     itemOrder:0
        //   },
        //   replyer:[
        //     {
        //       sculptureSrc: '../../static/img/carousel1.jpg',
        //       name: 'michael jordanaaaaaa',
        //       content: 'hello,这是一楼',
        //       publishDate: '2019-04-05 23:43:22',
        //     },
            
        //     {
        //       sculptureSrc: '../../static/img/carousel1.jpg',
        //       name: 'michael jordanaaaaaa',
        //       content: 'hello,这是一楼',
        //       publishDate: '2019-04-05 23:43:22',
        //     },
        //   ]
        // },

        
      ],
      comments:[],
      articleInfo: {
        title: '',
        time: '',
        readTimes: 0,
        author: '',
        authorCared: 0,
        authorArticle: 0,   
      },
      currentPage: 1,
      totalPages: 1,
      itemMaxNum: 30,
      forum:{
        name:''
      }
    }
  },
  components:{
    "top-header": TopHeader
  },
  methods:{
    // 页面刷新
    pageReload(){
      this.reload()
    },
    // 收起/展开回复
    replyToggle(e){
      var event = e || window.event;
      var target = event.target|| event.srcElement;
      $(e.target.parentNode.parentNode.children[2]).toggle(400);
      if($(e.target).text()=='展开回复'){
        $(e.target).text('收起回复');
      }else{
        $(e.target).text('展开回复');
      }
    },
    // 回复自动填充
    replyAutofill(e){
      var event = e || window.event;
      var target = event.target|| event.srcElement;
      var reply_username = $(target.parentNode.parentNode.children[1].children[0].children[0]).text();
      $(target.parentNode.parentNode.parentNode.parentNode.parentNode.children[1].children[0]).val(' 回复 ' +reply_username+ ' : ');
    },
    // 切换是否关注
    caredToggle(e){
      var event = e || window.event;
      var target = event.target|| event.srcElement;
      var name = $.cookie('username');
      
      if($(target).text()=='关注'){
        if(name){
          let friend = $(target.parentNode.children[1]).text();
          // console.log(friend + " insert");
          let sql = `INSERT INTO friends (name, friend) VALUES ("${name}", "${friend}")`;
          axios.post(`http://119.3.90.180/static/visitdatabase.php`,`sql=${sql}`)
            .then(res=>{
              // console.log(res.data); 
              $(target).text('已关注');
              alert('关注成功');
            })
            .catch(error=>{
                // console.log(error);
            });
        }
        else{
          alert("请先登录");
        }
      }else{
        if(name){
          let friend = $(target.parentNode.children[1]).text();
          // console.log(friend + "del");
          let sql = `DELETE FROM friends WHERE name = "${name}" and friend = "${friend}"`;
          axios.post(`http://119.3.90.180/static/visitdatabase.php`,`sql=${sql}`)
            .then(res=>{
              // console.log(res.data); 
              $(target).text('关注');
              alert('取消关注成功');
            })
            .catch(error=>{
                // console.log(error);
            });
        }
        else{
          alert("请先登录");
        }
        
      }
    },
    // 切换是否收藏文章
    collectToggle(e){
      var event = e || window.event;
      var target = event.target|| event.srcElement;
      if($(e.target).text()=='收藏'){
        $(e.target).text('已收藏');
        alert('收藏成功');
      }else{
        $(e.target).text('收藏');
        alert('取消收藏成功');
      }
    },
    // 回复作者
    replyArticle(){
      var top = $('#article .wrapper > .right  .add-part > textarea')[0].offsetTop;
      window.scrollTo(0,top);
    },
    // 发表新评论
    publishNewComment(e){
      var event = e || window.event;
      var target = event.target|| event.srcElement;
      if($('#article .wrapper > .right  .add-part > textarea').val() == ''){
        alert('内容不能为空');
      }
      else{
        var comefrom = $.cookie('username');
        var name = this.articleInfo.author;
        var content  = $(target.parentNode.children[0]).val();
        var title = "Java 跌落神坛！Python 正式登顶世界第一编程语言";
        var itemorder = this.articleCommentsInfor.length;
        var subCommentid = this.articleCommentsInfor[0].author.subCommentId;
        var time = '19:55';
        {
          let sql = `INSERT INTO maincomment (name, comefrom, content, title, itemOrder, subCommentId, time) VALUES ("${name}", "${comefrom}", "${content}", "${title}", "${itemorder}", "${subCommentid}", "${time}")`;
          axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
            .then(res=>{
              alert('发表成功');
            })
            .catch(error=>{
              alert('发表失败');
            });
        }
        
      }
      
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
          alert('已经是第一页啦');
        }
        else{
          this.currentPage --;
          this.updatePage(this.currentPage);
        }
      }
      if(target.innerText.indexOf('下') > -1){
        if(this.currentPage == this.totalPages){
          alert('已经是最后一页啦');
        }
        else{
          this.currentPage ++;
          this.updatePage(this.currentPage);
        }
      }
    },
    // 分页跳转操作
    turnPage(e){
      
      this.totalPages = Math.floor(this.articleCommentsInfor.length / this.itemMaxNum ) + 1;
      
      var page = document.getElementById('pageJumpTo').value;
      
      function isPositiveNum(s){//是否为正整数
        var re = /^[1-9]*[1-9][0-9]*$/ ;
        return re.test(s);
      }


      if(isPositiveNum(page) && parseInt(page)>0 && parseInt(page) <= this.totalPagesthis.totalPages){
        this.currentPage = page;
        this.updatePage(this.currentPage);
      }
      else{
        alert(`页数最大为: ${this.totalPages}, 您的输入不正确, 请重新输入`);
      }
      document.getElementById('pageJumpTo').value = '';
    },
    //具体跳转
    updatePage(page){
      var from = (page-1) * this.itemMaxNum;
      var to;
      if(this.articleCommentsInfor.length-from>this.itemMaxNum){
        to = from + this.itemMaxNum;
      }
      else{
        to = (this.articleCommentsInfor.length % this.itemMaxNum) + from;
      }
      this.comments = [];
      for(var i=from; i< to; i++){
        this.$set(this.comments, i-from, this.articleCommentsInfor[i]);
      }
    } ,
    // 发表回复
    publishReply(e){
      var event = e || window.event;
      var target = event.target|| event.srcElement;
      var content = $(target.parentNode.children[0]).val();
      let name = $.cookie('username');
      var mainContent = content;
      var itemorder = $(target.parentNode.parentNode.parentNode.parentNode.children[0].children[2]).text();
      var subCommentid = this.articleCommentsInfor[0].author.subCommentId;
      var title = "Java 跌落神坛！Python 正式登顶世界第一编程语言";
      var time = '19:05';
      if(name){
        if(content.indexOf(' 回复 ')==0){
          // 回复评论
          var temp = content.split(' ');
          var comefrom = temp[2];
          {
            let sql = `INSERT INTO subcomment (name, comefrom, content, time, subcommentId, title, itemOrder) VALUES ("${name}", "${comefrom}", "${mainContent}", "${time}", "${subCommentid}", "${title}", "${itemorder}")`;
            axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
              .then(res=>{
                alert('回复成功');
              })
              .catch(error=>{
                alert('回复失败');
              });
          }
        }
        else{
          // 回复楼层 
          var comefrom = '' 
          {
            let sql = `INSERT INTO subcomment (name, comefrom, content, time, subcommentId, title, itemOrder) VALUES ("${name}", "${comefrom}", "${mainContent}", "${time}", "${subCommentid}", "${title}", "${itemorder}")`;
            axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
              .then(res=>{
                alert('回复成功')
              })
              .catch(error=>{
                alert('回复失败')
              });
          }
        }
      }else{
        alert('请先登录')
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
              this.reload();
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
  // 监听
  watch:{
    articleCommentsInfor:{
      handler:function(){
        if(this.articleCommentsInfor.length > this.itemMaxNum){
          this.comments = this.articleCommentsInfor.slice(0,this.itemMaxNum);
        }else{
          this.comments = this.articleCommentsInfor
        }
      }
    },
  },
  beforeCreate() {
    
    // 个人信息
    var name = window.sessionStorage.getItem('name')
    var title = window.sessionStorage.getItem('title')
    var university = window.sessionStorage.getItem('uni') || "浙江师范大学";
    
    // this.articleCommentsInfor = [];

    // 个人资料
    {
      let sql = `SELECT * FROM allarticles, user WHERE allarticles.author = "${name}" and allarticles.title = "${title}" and allarticles.type = "原创" and user.name = allarticles.author`;
      axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
        .then(res=>{
          // console.log(res.data); 
          for(var item of res.data){
            var newsObj = {
              sculptureSrc: item.imgSrc,
              title: item.title,
              time: item.time,
              readTimes: item.readTimes,
              author: item.author,
              authorCared: 0,
              authorArticle: 0,
              extraName: item.extraName
            }
            this.articleInfo = newsObj;
          }


        })
        .catch(error=>{
            // console.log(error);
        });

      // 文章数
      sql = `SELECT * FROM allarticles WHERE author = "${name}" and type = "原创"`;
      axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
      .then(res=>{
        // console.log(res.data);
        
        this.articleInfo.authorArticle = res.data.length
         
      })
      .catch(error=>{
          // console.log(error);
      });
      
      // 关注人数
      sql = `SELECT * FROM friends WHERE friend = "${name}"`;
      axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
      .then(res=>{
        // console.log(res.data);
        console.log(name);
        console.log(res.data)
        this.articleInfo.authorCared = res.data.length
         
      })
      .catch(error=>{
          // console.log(error);
      });

    }

    // 最新文章
    {
      let sql = `SELECT * FROM allarticles WHERE author = "${name}" and type = "原创" order by time desc limit 5`;
      axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
        .then(res=>{
          // console.log(res.data);
          var news =[];
          for(var item of res.data){
            var newsObj = {
              title: item.title,
              userName: item.author,
              belong: item.belong
            }
            news.push(newsObj);
          }
          this.latestArticle = news;
        })
        .catch(error=>{
            // console.log(error);
        });
    }

    // 评论多的文章
    {
      let sql = `SELECT * FROM allarticles WHERE author = "${name}" and type = "原创" order by comment desc limit 5`;
      axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
        .then(res=>{
          // console.log(res.data);
          var news =[];
          for(var item of res.data){
            var newsObj = {
              title: item.title,
              userName: item.author,
              belong: item.belong
            }
            news.push(newsObj);
          }
          this.hotestArticle = news;
        })
        .catch(error=>{
            // console.log(error);
        });
    }
    
    // 加载楼层
    let com = [];
    {
      // let sql = `SELECT user.imgSrc as sculptureSrc, user.name as name, allarticles.time as time, allarticles.content as content FROM user, allarticles 
      // WHERE user.name = allarticles.author and allarticles.author = "${name}" and type = "原创" and allarticles.title="${title}" `;
      let sql = `SELECT allarticles.itemOrder as itemorder, user.extraName as extraName, user.imgSrc as sculptureSrc, user.name as name, allarticles.time as time, allarticles.content as content FROM user, allarticles 
      WHERE user.name = allarticles.author and allarticles.author = "${name}" and type = "原创" and allarticles.title="${title}" `;
      axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
        .then(res=>{
          // console.log(res.data);
          
          for(var item of res.data){
            var autObj = {
              sculptureSrc: item.sculptureSrc,
              name: item.name,
              content: item.content,
              publishDate: item.time,
              itemOrder: item.itemorder,
              extraName: item.extraName
            }
            var obj = {};
            obj.author = autObj;
            obj.replyer = [];
            com.push(obj);
            
          }
          
        })
        .catch(error=>{
            // console.log(error);
        });
    }

    {
      let sql = `SELECT user.imgSrc as sculptureSrc, 
            maincomment.itemOrder as itemorder, 
            user.name as name, 
            maincomment.time as time, 
            user.extraName as extraName, 
            maincomment.subCommentId as subCommentId, 
            maincomment.content as content FROM maincomment,user,allarticles 
      WHERE allarticles.author = "${name}"  
            and type = "原创" 
            and allarticles.title="${title}" 
            and allarticles.id = maincomment.subCommentId 
            and maincomment.comefrom = user.name 
            order by maincomment.itemOrder`;
      axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
        .then(res=>{
          // console.log(res.data);
          for(var item of res.data){
            var replyObj = {
              sculptureSrc: item.sculptureSrc,
              name: item.name,
              content: item.content,
              publishDate: item.time,
              itemOrder: item.itemorder,
              subCommentId: item.subCommentId,
              extraName: item.extraName
            }
            // var arr = new Array();
            // arr.push(replyObj);
            var obj = {};
            obj.author = replyObj;
            obj.replyer = [];
            com.push(obj)
          }
          
          this.articleCommentsInfor = com;
          this.totalPages = Math.floor(this.articleCommentsInfor.length / this.itemMaxNum ) + 1;
        })
        .catch(error=>{
            // console.log(error);
        });
    }

    // 加载子评论
    {
      let sql = `SELECT subcomment.name as name, user.extraName as extraName, subcomment.comefrom as comefrom, subcomment.content as content, subcomment.time as time, subcomment.itemOrder as itemorder, user.imgSrc as sculptureSrc
      FROM allarticles, subcomment, user WHERE subcomment.title="${title}" and subcomment.subCommentId = allarticles.id and subcomment.title= allarticles.title and subcomment.name = user.name`;
      axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
        .then(res=>{
          for(var item of res.data){
            var subCommentObj = {
              sculptureSrc: item.sculptureSrc,
              name: item.name,
              content: item.content,
              publishDate: item.time,
              comefrom: item.comefrom,
              order: item.itemorder,
              extraName: item.extraName
            }   
            console.log(this.articleCommentsInfor[subCommentObj.order].replyer.push(subCommentObj));
          }
        })
        .catch(error=>{
            // console.log(error);
        });
    }
    
    
  },
  created() {
    
    this.forum.name = window.sessionStorage.getItem('uni') || "浙江师范大学";
    var friend = window.sessionStorage.getItem('name');
    var user = $.cookie('username')
    if(user){
      let sql = `SELECT * FROM friends WHERE name = "${user}" and friend = "${friend}"`;
      axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
        .then(res=>{
          // console.log(res.data);
          if(res.data.length != 0){
            $('#article .wrapper .left .base-infor .sculptrue-name-care .btn').val("已关注");
          }
        })
        .catch(error=>{
            // console.log(error);
        });
    }
    
  },
  mounted() {
    this.totalPages = Math.floor(this.articleCommentsInfor.length / this.itemMaxNum ) + 1;
  },
}
</script>


<style scoped>

a{
  text-decoration: none;
  color: #333;
}

a:hover{
  color: rgb(14, 130, 175);
}
#article .wrapper{
  width: 1100px;
  height: auto;
  border:1px solid #ddd;
  margin: 0 auto;
}
#article .wrapper::after{
  height: 0;
  clear: both;
  content:'';
  display: block;
}
#article .wrapper .back{
  width: 100%;
  text-align: right;
  height: 40px;
  line-height: 40px;
  background: #eee;
  color: rgb(14, 130, 175);
  padding-right: 20px;
  border: 1px solid #ddd;
}
#article .wrapper .back a{
  color: rgb(14, 130, 175);
}
#article .wrapper .back span:hover{
  cursor: pointer;
  text-decoration: underline;
}

/* 左边 */
#article .wrapper .left{
  /* border: 1px solid black; */
  width: 250px;
  height: 1200px;
  float: left;
}
#article .wrapper .left .base-infor{
  width: 100%;
  height: auto; 
  margin: 0 auto;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-bottom: 1px solid transparent;
  border-top: 1px solid transparent;
}

#article .wrapper .left .base-infor .title{
  width: 90%;
  height: 30px;
  margin: 0 auto;
  line-height: 30px;
  font-size: 16px;
  border-bottom: 1px solid #ddd;
  margin-top: 15px;
  margin-bottom: 10px;
}

#article .wrapper .left .base-infor .sculptrue-name-care{
  display: table-cell;
  width:250px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
  margin-top: 10px;
}
#article .wrapper .left .base-infor .sculptrue-name-care::after{
  display: block;
  content: '';
  clear: both;
  height: 0;
}
#article .wrapper .left .base-infor .sculptrue-name-care img{
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: inline-block;
  margin-left: 10px;
}
#article .wrapper .left .base-infor .sculptrue-name-care img:hover{
  cursor:pointer;
  border: 1px solid #eee;
}
#article .wrapper .left .base-infor .sculptrue-name-care span{
  display: inline-block;
  margin-left:10px;
  font-weight: 400;
  white-space:nowrap;       
  overflow: hidden;             
  text-overflow: ellipsis;
  width:70px;
}
#article .wrapper .left .base-infor .sculptrue-name-care span:hover{
  cursor:pointer;
  color: rgb(14, 130, 175);
}
#article .wrapper .left .base-infor .sculptrue-name-care .btn{
  float: right;
  display: inline-block;
  margin-top: 8px;
  margin-right: 10px;
}
#article .wrapper .left .base-infor > .cared,
#article .wrapper .left .base-infor > .article{
  width: 100%;
  margin: 0 auto;
  height: 36px;
  text-align: center;
  line-height: 36px;
  border-bottom: 1px solid #ddd;
  
  /* border-left: 1px solid #ddd;
  border-right: 1px solid #ddd; */
} 
#article .wrapper .left .base-infor > .article:hover{
  background: #eee;
  cursor: pointer;
} 
#article .wrapper .left .article-infor{
  margin: 0 auto;
  width: 100%;
  height: auto;
  /* border: 1px solid #ddd; */
}
#article .wrapper .left .article-infor .latest-articles,
#article .wrapper .left .article-infor .hot-articles{
  width: 100%;
  height: auto;
  border: 1px solid #ddd;
  margin: 0 auto;
  margin-bottom: 20px;
}
#article .wrapper .left .article-infor .latest-articles .title,
#article .wrapper .left .article-infor .hot-articles .title{
  width: 90%;
  height: 30px;
  margin: 0 auto;
  line-height: 30px;
  font-size: 16px;
  border-bottom: 1px solid #ddd;
  margin-top: 15px;
  margin-bottom: 10px;
}
#article .wrapper .left .article-infor .latest-articles ul,
#article .wrapper .left .article-infor .hot-articles ul{
  width: 90%;
  margin: 0 auto;
  color: #444;
}
#article .wrapper .left .article-infor .latest-articles ul li,
#article .wrapper .left .article-infor .hot-articles ul li{
  margin-bottom: 10px;
  font-size: 13px;
}
#article .wrapper .left .article-infor .latest-articles ul li:hover,
#article .wrapper .left .article-infor .hot-articles ul li:hover{
  cursor: pointer;
  color: rgb(14, 130, 175);
}







/* 右边 */
#article .wrapper .right{
  /* border: 1px solid black; */
  width: 830px;
  height: auto;
  float: left;
  margin-left: 17px;
  padding: 15px 15px;
}
#article .wrapper .right .title{
  width: 100%;
  height: 40px;
}
#article .wrapper .right .title > .title-name{
  line-height: 40px;
  font-size: 18px;
  font-weight: bold;
  width: 570px;
  white-space:nowrap;       
  overflow: hidden;             
  text-overflow: ellipsis;
  float: left;
  margin-right: 40px;
  color: #444;
} 
#article .wrapper .right .title > .reply,
#article .wrapper .right .title > .collect{ 
  height: 25px;
  line-height: 25px;
  border: 1px solid #ddd;
  width:70px;
  text-align: center;
  float: left;
  margin-top: 6px;
  margin-right: 10px; 
}
#article .wrapper .right .title > .reply:hover,
#article .wrapper .right .title > .collect:hover{
  cursor: pointer;
  color: rgb(14, 130, 175);
  background: #eee;
}
#article .wrapper .right .append-infor{
  border-bottom: 1px solid #ccc;
  margin-top: 11px;
  height: 30px;
  padding-bottom: 5px;
}
#article .wrapper .right .append-infor .date{
  margin-right: 20px;
  font-size: 12px;
  color: #666;
}
#article .wrapper .right .append-infor .read-times{
  font-size: 12px;
  color: #666;
}
#article .wrapper .right .owner-part{
  width: 100%;
  height: auto;
  border: 1px solid #ddd;
  margin-top: 20px;
  background: rgb(248, 248, 248);
}
#article .wrapper .right .visitor-part{
  width: 100%;
  height: auto;
  border: 1px solid #ddd;
  border-top: 1px solid transparent;
  background: rgb(248, 248, 248);;
}
#article .wrapper .right .owner-part::after,
#article .wrapper .right .visitor-part::after{
  clear: both;
  height: 0;
  display: block;
  content: '';
}
#article .wrapper .right  .owner-part > .part-left,
#article .wrapper .right  .visitor-part > .part-left{
  width: 150px;
  height: 180px;
  float: left;
  text-align: center;
  font-size: 12px;
}
#article .wrapper .right  .owner-part > .part-left .img-wrapper,
#article .wrapper .right  .visitor-part > .part-left .img-wrapper{
  width: 100px;
  height: 100px;
  margin: 10px auto;
  padding: 2px;
}
#article .wrapper .right  .owner-part > .part-left .img-wrapper img,
#article .wrapper .right  .visitor-part > .part-left .img-wrapper img{
  width: 100%;
  height: 100%;
}
#article .wrapper .right  .owner-part > .part-left .img-wrapper img:hover,
#article .wrapper .right  .owner-part > .part-left .name:hover,
#article .wrapper .right  .visitor-part > .part-left .img-wrapper img:hover,
#article .wrapper .right  .visitor-part > .part-left .name:hover{
  cursor: pointer;
  color: rgb(14, 130, 175);
  text-decoration: underline;
}
#article .wrapper .right  .owner-part > .part-left .name,
#article .wrapper .right  .visitor-part > .part-left .name{
  width:100px;
  white-space:nowrap;       
  overflow: hidden;             
  text-overflow: ellipsis;
  margin: 0 auto;
}
#article .wrapper .right  .owner-part > .part-left .author{
  width:100px;
  margin: 3px auto;
  border: 1px solid #aaa;
  background: #eee;
}
#article .wrapper .right  .owner-part > .part-right,
#article .wrapper .right  .visitor-part > .part-right{
  width: 640px;
  height: auto;
  float: left;
  /* border-left: 1px solid #ccc; */
}
#article .wrapper .right  .owner-part > .part-right .content,
#article .wrapper .right  .visitor-part > .part-right .content{
  padding: 20px;
  min-height: 149px;
  font-size: 14px;
}
#article .wrapper .right  .owner-part > .part-right .content-end,
#article .wrapper .right  .visitor-part > .part-right .content-end{
  height: 30px;
  width: 100%;
  text-align: right;
  line-height: 30px;
  font-size: 12px;
}
#article .wrapper .right  .owner-part > .part-right .content-end > .reply,
#article .wrapper .right  .visitor-part > .part-right .content-end > .reply{
  padding-left: 20px;
  padding-right: 10px;
  color: rgb(14, 130, 175);
}
#article .wrapper .right  .owner-part > .part-right .content-end > .reply:hover,
#article .wrapper .right  .visitor-part > .part-right .content-end > .reply:hover{
  text-decoration: underline;
  cursor: pointer;
}
#article .wrapper .right  .owner-part > .part-right > .reply-msg,
#article .wrapper .right  .visitor-part > .part-right > .reply-msg{
  border: 1px solid #ddd;
  margin-bottom: 10px;
  border-radius: 2px;
  display: none;
}
#article .wrapper .right  .owner-part > .part-right > .reply-msg  .item,
#article .wrapper .right  .visitor-part > .part-right > .reply-msg  .item{
  /* padding: 10px 15px; */
  
  background: rgb(240, 240, 240);
}
#article .wrapper .right  .owner-part > .part-right > .reply-msg  .item  .img-wrapper,
#article .wrapper .right  .visitor-part > .part-right > .reply-msg  .item  .img-wrapper{
  
  width: 10%;
  height: 60px;
  float: left;
  text-align: center;
  padding-top: 10px;
}
#article .wrapper > .right  .owner-part > .part-right > .reply-msg  .item > .img-wrapper > img,
#article .wrapper > .right  .visitor-part > .part-right > .reply-msg  .item > .img-wrapper > img{
  width: 60%;
  height: 70%;
}
#article .wrapper > .right  .owner-part > .part-right > .reply-msg  .item > .content,
#article .wrapper > .right  .visitor-part > .part-right > .reply-msg  .item > .content{
  width: 90%;
  float: left;
  padding: 7px 0px 7px 0px;
  min-height: 0px;
}
#article .wrapper > .right  .owner-part > .part-right > .reply-msg  .item > .content > .msg{

  display: block;
}
#article .wrapper > .right  .owner-part > .part-right > .reply-msg  .item > .content > .name,
#article .wrapper > .right  .visitor-part > .part-right > .reply-msg  .item > .content > .name{
  color: rgb(14, 130, 175);
  white-space:nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 150px;
  display: inline-block;
}

#article .wrapper > .right  .owner-part > .part-right > .reply-msg .item > .date-reply,
#article .wrapper > .right  .visitor-part > .part-right > .reply-msg  .item > .date-reply{
  /* border: 1px solid #ddd; */
  line-height: 20px;
  text-align: right;
  font-size: 12px;
  width: 100%;
}

#article .wrapper > .right  .owner-part > .part-right > .reply-msg  .item > .date-reply > .reply,
#article .wrapper > .right  .visitor-part > .part-right > .reply-msg  .item > .date-reply > .reply{
  margin-left: 15px;
  margin-right: 10px;
  color: rgb(14, 130, 175);
}
#article .wrapper > .right  .owner-part > .part-right > .reply-msg  .item > .date-reply > .reply:hover,
#article .wrapper > .right  .owner-part > .part-right > .reply-msg  .item > .content > .name:hover,
#article .wrapper > .right  .visitor-part > .part-right > .reply-msg  .item > .date-reply > .reply:hover,
#article .wrapper > .right  .visitor-part > .part-right > .reply-msg  .item > .content > .name:hover{
  text-decoration: underline;
  cursor: pointer;  
}
#article .wrapper > .right  .owner-part > .part-right > .reply-msg  .add-reply,
#article .wrapper > .right  .visitor-part > .part-right > .reply-msg  .add-reply{
  vertical-align: bottom;
  padding:10px;
}
#article .wrapper > .right  .owner-part > .part-right > .reply-msg  .add-reply > textarea,
#article .wrapper > .right  .visitor-part > .part-right > .reply-msg  .add-reply > textarea{
  width: 89%;
  display: inline-block;
  height: 40px;
  resize: vertical;
  font-size: 15px;
  padding-left: 10px;
  line-height: 40px;
}
#article .wrapper > .right  .owner-part > .part-right > .reply-msg  .add-reply > .btn,
#article .wrapper > .right  .visitor-part > .part-right > .reply-msg  .add-reply > .btn{
  float: right;
  height: 40px;
}
#article .wrapper > .right  .nav::after{
  display: block;
  height: 0;
  clear: both;
  content: '';
}
#article .wrapper > .right  .nav > nav{
  float: right;
}
#article .wrapper > .right  .nav > nav > ul > li input{
  height: 34px;
  display: block;
  float: left;
  width: 50px;
  border: 1px solid #ddd;
  margin-left: 10px;
}
#article .wrapper > .right  .nav > nav > ul > li > .btnJump{
  background: #fff;
  border: 1px solid #ddd;
  color: #337ab7;
}
#article .wrapper > .right  .nav > nav > ul > li > .btnJump:hover{
  cursor: pointer;
}
#article .wrapper > .right  .add-part > textarea{
  display: block;
  margin-bottom: 10px;
  width: 100%;
  padding: 10px;
  resize: none;
}
#article .wrapper > .right  .add-part > .btn{
  float: right;
}











</style>
