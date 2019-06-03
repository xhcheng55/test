<template>
  <div id="search">
    <div>
      <router-link :to="{name: 'indexLink'}" ><img src="../img/logo.jpg" alt="这是logo"></router-link>
    </div>
    <input type="email" class="form-control" id="exampleInputEmail2" placeholder="" v-model="searchContent">
    <button type="button" class="btn btn-primary" @click="hello($event)">进入论坛</button>
    <!-- <router-link :to="{name: 'singlePageLink', params:{university: searchContent}}" ><button type="button" class="btn btn-primary" >进入论坛</button></router-link> -->
    <button type="button" class="btn btn-primary" @click="hello($event)">全论坛搜索</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  inject: ['reload'],
  name: 'Search',
  data () {
    return {
      searchContent:'',
    }
  },
  methods:{
    
    hello(e){
      var event = e || window.event;
      var target = event.target|| event.srcElement;
      var glo = this;
      if($(target).text() == '进入论坛'){
        // 进入论坛
        var forumName = $(target.parentNode.children[1]).val();
        $(target.parentNode.children[1]).val("");
        let sql = `SELECT * FROM forum WHERE name = "${forumName}" order by attention desc limit 1`;
        axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
          .then(res=>{
            if(res.data.length!=0){
              var forumObj = {};
              for(var item of res.data){
                var newObj = {
                  name: item.name
                }
                forumObj = newObj;
              }
              this.$router.push({name:'singlePageLink'});
              glo.toSinglePage(forumObj.name,'')
              glo.pageReload();
            }else{
              let sql = `SELECT * FROM forum WHERE name like "%${forumName}%" order by attention desc limit 1`;
              axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
                .then(res=>{
                    if(res.data.length != 0){
                      var forumObj = {};
                      for(var item of res.data){
                        var newObj = {
                          name: item.name
                        }
                        forumObj = newObj;
                      }
                      this.$router.push({name:'singlePageLink'});
                      glo.toSinglePage(forumObj.name,'')
                      glo.reload()
                    }else{
                      alert("暂无匹配")
                      let sql = `SELECT * FROM forum order by attention desc limit 1`;
                      axios.post('http://119.3.90.180/static/visitdatabase.php',`sql=${sql}`)
                        .then(res=>{
                          var forumObj = {};
                          for(var item of res.data){
                            var newObj = {
                              name: item.name
                            }
                            forumObj = newObj;
                          }
                          this.$router.push({name:'singlePageLink'});
                          glo.toSinglePage(forumObj.name,'')
                          glo.reload()
                        })
                        .catch(error=>{
                            // console.log(error);
                        });
                    }
                })
                .catch(error=>{
                    // console.log(error);
                });
            }
          })
          .catch({})



      }else{
        // 全论坛搜索
        var forumName = $(target.parentNode.children[1]).val();
        $(target.parentNode.children[1]).val("");
        this.$router.push({name:'singlePageLink'});
        this.toSinglePage('',forumName)
        this.reload();
      }
    },
    pageReload(){
      this.reload();
    },
    // 跳转到singlePage
    toSinglePage(str,key){
      var session = window.sessionStorage;
      session.setItem('university', str);
      session.setItem('keyWord', key);
      this.reload()
    }
  },
  created() {
    
  },
}


</script>


<style scoped>
#search{
  margin: 0 auto;
  width:80%;
  height: 93px;
  display: flex;
  align-items: center;
}
#search::after{
  clear: both;
  display: block;
  height: 0;
  content: ''
}
#search > div{
  height: 60%;
  width:13%;
  margin-left:9%;
  margin-top: -8px;
}
#search img{
  /* height: 60%;
  width:13%;
  margin-left:9%;
  margin-top: -8px; */
  height: 100%;
  width: 100%;
}
#search img:hover{
  cursor: pointer;
}
#search input{
  width:45%;
  margin-left: 2%;
  height: 42px;
  border-radius: 0px;
}
#search button{
  border-radius: 0px;
  height: 42px;
  margin-right:5px;
}

</style>
