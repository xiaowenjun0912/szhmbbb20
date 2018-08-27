// 导入vue
import Vue from 'vue'

//导入路由
import VueRouter from 'vue-router'

//导入App根组件(最外面的组件)
import App from './App.vue'

//导入首页的组件
import Index from './components/01.index.vue';

// 导入我们的商品详情页面
import Detail from './components/02.productDetail.vue';

//注册VueRouter(类似于Express的中间件语法)
Vue.use(VueRouter);

// 导入element-ui 
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//导入懒加载vue插件
import Vuelazyload from 'vue-lazyload'
//注册到Vue上
Vue.use(Vuelazyload,{
  preLoad:1.3,
  // error:'dist/error.png',
  loading:require("./assets/lib/images/草图.png"),
  attempt:1
})

    // 注册一个全局过滤器
    import moment from 'moment';
    Vue.filter('filterDate',function(val){
          return moment(val).format("YYYY年MM月DD日");
    })
   
    // iview的吸附效果和点击去顶部
    import iView from 'iview';
    import 'iview/dist/styles/iview.css';
    Vue.use(iView);
    
    // 放大镜
    import ProductZoomer from 'vue-product-zoomer';
    Vue.use(ProductZoomer);


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
  //商品详情页面
  {
    path:'/detail/:id',
    component:Detail,
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
