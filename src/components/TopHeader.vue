<template>
  <div id="top-header">
    <!-- 本论坛概括图片 -->
    <div class="img-wrapper">
      <img src="../img/width.jpg" alt="">
    </div>

    <!-- 本论坛信息框 -->
    <div class="infor-wrapper">
      <div class="img-wrapper">
        <img :src="belongInfo.imgSrc" alt="">
      </div>
      <div class="upper">
        <span class="title">{{belongInfo.name}}</span>
        <input class="btn btn-danger" type="button" value="+ 关注" @click="focusToggle($event)">
        <span class="focus">关注：{{belongInfo.attention}}</span>
        <span class="articles">文章：{{belongInfo.articles}}</span>
      </div>
      <span class="summary">{{belongInfo.summary}}</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  inject: ['reload'],
  name: 'TopHeader',
  props:['forum'],
  data () {
    return {
      belongInfo:{
        imgSrc: '',
        name: '',
        attention: 0,
        articles: 0,
        summary: ''
      },
      forum:{
        name:''
      }
    }
  },
  methods:{
    pageReload(){
      this.reload();
    },
    focusToggle(e){
      var event = e || window.event;
      var target = event.target || event.srcElement;
      var name = $.cookie('username');
      var universityFocus = $(target.parentNode.children[0]).text();
      if($(target).val()=='+ 关注'){
        if(name){
          let sql = `INSERT INTO focus (name, focus) VALUES ("${name}", "${universityFocus}")`;
          axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
            .then(res=>{
              // console.log(res.data); 
              $(target).val('已关注')
              alert('关注成功')
            })
            .catch(error=>{
                // console.log(error);
            });
        }
        else{
          alert("请先登录")
        }
      }
      else{
        if(name){
          let sql = `DELETE FROM focus WHERE name = "${name}" and focus = "${universityFocus}"`;
          axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
            .then(res=>{
              // console.log(res.data); 
              $(target).val('+ 关注')
              alert('取消关注成功')
            })
            .catch(error=>{
                // console.log(error);
            });
        }
        else{
          alert("请先登录")
        }
        
      }
    }
  },
  beforeCreate() {
    
  },
  created() {
    var university = this.forum.name;
    { 
      let sql = `SELECT * FROM forum WHERE name = "${university}"`;
      axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
        .then(res=>{
          // console.log(res.data);
          
            for(var item of res.data){
              var newsObj = {
                imgSrc: item.imgSrc,
                name: item.name,
                attention: item.attention,
                articles: item.articles,
                summary: item.introduce
              }
              this.belongInfo = newsObj;
            }

        })
        .catch(error=>{
            // console.log(error);
        });
    }

    var user = $.cookie('username')
    if(user){
      let sql = `SELECT * FROM focus WHERE name = "${user}" and focus = "${university}"`;
      axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
        .then(res=>{
          // console.log(res.data);
          if(res.data.length != 0){
            $('#top-header .infor-wrapper .upper .btn').val("已关注");
          }
        })
        .catch(error=>{
            // console.log(error);
        });
    }
  },
  watch: {
    belongInfo:function(){
      // this.forum.name = this.belongInfo.name;
    },
  },
}

</script>


<style scoped>
#top-header{
  width: 1100px;
  margin:0 auto;
    
  height: auto;
  position: relative;
}
#top-header::after{
  height: 0;
  clear: both;
  content: '';
  display: block;
}
#top-header > .img-wrapper{
  width: 100%;
  height: 180px;
  
}
#top-header > .img-wrapper img{
  width: 100%;
  height: 100%;
}
#top-header .infor-wrapper{
  width: 100%;
  height: 100px;
  border-bottom: 1px solid #ddd;
  background: rgb(245, 245, 250);
  border-top: 1px solid #ddd;
}
#top-header .infor-wrapper > .img-wrapper{
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
#top-header .infor-wrapper > .img-wrapper img{
  width: 95%;
  height: 95%;
}
#top-header .infor-wrapper .upper{
  vertical-align: middle;
}
#top-header .infor-wrapper .title{
  margin-left: 230px;
  font-size: 21px;
  display: inline-block; 
  margin-top: 20px;
  
}
#top-header .infor-wrapper .upper .btn{
  margin-top: -10px;
  
  margin-left: 20px;
  width: 80px;
}
#top-header .infor-wrapper .upper .focus{
  
  display: inline-block;
  font-size: 12px;
  margin-bottom: 0px;
  margin-left: 20px;
}
#top-header .infor-wrapper .upper .articles{
  margin-bottom: 0px;
  margin-left: 20px;
  font-size: 12px;
  color: #444;
}
#top-header .infor-wrapper .summary{
  margin-left: 230px;
  display: inline-block;
  margin-top: 10px;
  font-size: 14px;
}


</style>
