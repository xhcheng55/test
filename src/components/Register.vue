<template>
  <div id="register">
    <!-- 本论坛概括图片 -->
    <div class="img-wrapper">
      <img src="../img/width.jpg" alt="">
    </div>

    <!-- 本论坛信息框 -->
    <div class="infor-wrapper">
      <div class="infor-header clearfix">
        <div class="img-wrapper">
          <img src="../../static/img/carousel1.jpg" alt="">
        </div>
        <p class="title">用户注册</p>
      </div>
    </div>
    <div class="wrapper">

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import TopHeader from './TopHeader'
export default {
  inject: ['reload'],
  name: 'Register',
  data () {
    return {
      
    }
  },
  components:{
    'top-header': TopHeader
  },
  methods: {
    pageReload(){
      this.reload();
    }
  },
}
</script>


<style scoped>
#register{
  width: 1100px;
  margin:0 auto;
    
  height: auto;
  position: relative;
}
#register::after{
  height: 0;
  clear: both;
  content: '';
  display: block;
}
#register > .img-wrapper{
  width: 100%;
  height: 180px;
  
}
#register > .img-wrapper img{
  width: 100%;
  height: 100%;
}



#register > .infor-wrapper{
  height: auto;
  width: 100%;

  padding: 10px 0px;
}
#register > .infor-wrapper > .infor-header{
  height: 100%;
  
}
#register > .infor-wrapper > .infor-header > .img-wrapper{
  height: 60px;
  width: 160px;

  float: left;
}
#register > .infor-wrapper > .infor-header > .img-wrapper img{
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
#register > .infor-wrapper > .infor-header > p.title{
  float: left;

  font-size: 25px;
  margin-left: 20px;
  line-height: 25px;
  margin-top: 20px;
}

#register .wrapper{
  width: 100%;
  height: 1000px;
  margin: 0 auto;
  border: 1px solid black;
}


</style>
