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

// 导入购物车的组件页面
import shoppingCart from './components/03.shoppingCart.vue';


// 整合Vuex 统一进行数据管理
import Vuex from 'vuex'
Vue.use(Vuex)

//实例化一个仓库 用来保存数据
// 实例化Vue的时候 也需要传入 仓库对象
const store = new Vuex.Store({
//   // 这里就是我们的数据
  state:{
    // count:998
    cartDate: JSON.parse(window.localStorage.getItem('goodKey'))||{}
  },
  // 这个是暴露的修改方法
  mutations:{
    //  increment (state){
    //  state.count++
    //  }
    addGoods(state,goodInfo){
      // console.log(goodInfo);
      if(state.cartDate[goodInfo.goodId]==undefined){
        // 传过来的id 不存在新增的这个id作为属性
        // 直接增加这个属性即可
        state.cartDate[goodInfo.goodId]=goodInfo.goodNum;
        // 为了要让vue检测到数据的改变同步修改页面显示 需要调用Vue.set方法
        Vue.set(state.cartDate,goodInfo.goodId,goodInfo.goodNum);
      }else{
        // 传过来的id已经存在累加
        state.cartDate[goodInfo.goodId]+=goodInfo.goodNum;

      }
    },
     // 额外的增加一个修改的方法
    // 逻辑是 直接把传入的 数量 替换掉 默认的数量
    // 格式约定 格式{goodId:商品id,goodNum:数量}
    updateGoodsNum(state,goodInfo){
      // 直接替换即可
      state.cartDate[goodInfo.goodId] = goodInfo.goodNum;
    },
    // 额外的增加一个删除的方法
    // goodId就是 商品的id
    deleteGoods(state,goodId){
      // 如何删除对象中的属性
      // delete 删除对象中的属性
      // delete state.cartDate[goodId];
      // delete 删除的属性不会触发视图更新
      // 需要调用Vue.delete方法才可以
      Vue.delete(state.cartDate,goodId);
    },
    },
    // getters vuex的计算属性
    getters:{
      goodsCount:state =>{
        // 临时num
        let num =0;
        // 循环数据对象
        for(const key in state.cartDate){
          // console.log(key);
          num += state.cartDate[key]
        }
        // 累加总数
        // 返回总数
        return num;
      }
    }
  })
// 浏览器页面关系(刷新时)保存到localstorage中
window.onbeforeunload=function(){
  window.localStorage.setItem('goodKey',JSON.stringify(store.state.cartDate))
}

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
  {
    path:'/',
    // component:Index,
  //   //重定项解析到index 直接修改路由地址
    redirect:'/index'
  },
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
  //购物车
  {
  path:'/cart',
  component:shoppingCart,
  },
]
//实例化路由对象
let router = new VueRouter({
  routes:routes
})

//增加导航守卫(路由守卫)
router.beforeEach((to,from,next)=>{
// 如果访问的是 order页面判断登录
if(to.path.indexOf('/order/')!=-1){
  // 调用接口
  axios.get("/site/account/islogin").then(response=>{
    // console(response);
    //登录了才可以继续访问
    if(response.data.code!='nologin'){
      // 直接放走
      next();
    }else{
      // 没有登录打到登录页面
      next('/login')
    }
  })
}else{
  next();
}
})


// 挂载到Vue实例上面
Vue.config.productionTip = false
// 导入首页的组件
new Vue({
  render: h => h(App),
  // 路由对象
  router,
  // 仓库对象 属性的名字 叫做store
  store
}).$mount('#app')
