<template>
  <div id="hello">
    <button>abc</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  inject: ['reload'],
  name: 'HelloWorld',
  data () {
    return {
      
    }
  },
  methods:{
    pageReload(){
      this.reload();
    }
  },
  beforeCreate() {
    // vue实例中的el，data，data中的message都为undefined
  },
  created() {
    // el还是undefined，而数据已经与data中的属性进行绑定（放在data中属性当值发生改变的同时，视图也会发生变化），
    // 在这里可以在渲染前倒数第二次更改数据的机会，不会触发其他的钩子函数，一般可以在这里做初始数据的获取
  },
  beforeMount() {
    // 载入前（完成了data和el数据初始化），但是页面中的内容还是vue中的占位符，data中的message信息没有被挂在到Bom节点中，
    // 在这里可以在渲染前最后一次更改数据的机会，不会触发其他的钩子函数，一般可以在这里做初始数据的获取
  },
  mounted() {
    // 载入后html已经渲染(ajax请求可以放在这个函数中)，把vue实例中的data里的message挂载到BOM节点中去
  },
  beforeUpdate() {
    // 更新前状态（view层的数据变化前，不是data中的数据改变前），
    // 重新渲染之前触发，然后vue的虚拟dom机制会重新构建虚拟dom与上一次的虚拟dom树利用diff算法进行对比之后重新渲染
  },
  updated() {
    // 数据已经更改完成，dom也重新render完成
  },
  beforeDestroy() {
    // 销毁前执行（$destroy方法被调用的时候就会执行）,一般在这里善后:清除计时器、清除非指令绑定的事件等等…’)
  },
  destroyed() {
    // 销毁后 （Dom元素存在，只是不再受vue控制）,卸载watcher，事件监听，子组件
  },
}


</script>


<style scoped>



</style>
