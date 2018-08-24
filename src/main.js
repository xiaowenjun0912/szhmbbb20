// 导入vue
import Vue from 'vue'

//导入路由
import VueRouter from 'vue-router'

//导入App根组件(最外面的组件)
import App from './App.vue'

//导入首页的组件
import Index from './components/01.index.vue';

//注册VueRouter(类似于Express的中间件语法)
Vue.use(VueRouter);

//定义路由的规则
let routes =[
  // 默认首页也打开index 使用重定项
  // {
  //   path:'/',
  //   // component:Index,
  //   //重定项解析到index 直接修改路由地址
  //   redirect:'/index'
  // },
  //首页规则
  {
    path:'/index',
    component:Index,
  },
]
//实例化路由对象
let router = new VueRouter({
  routes:routes
})

// 挂载到Vue实例上面

Vue.config.productionTip = false
// 导入首页的组件
new Vue({
  render: h => h(App),
  // 路由对象
  router
}).$mount('#app')
