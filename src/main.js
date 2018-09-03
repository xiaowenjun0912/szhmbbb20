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
import ShoppingCart from './components/03.shoppingCart.vue';
// 导入登录页面的组件
import Login from './components/04.login.vue';
// 导入填写订单页面的组件
import FillOrder from './components/05.fillOrder.vue';
// 导入提交订单页面的组件
import PayOrder from './components/06.payOrder.vue';
// 导入提交订单页面的组件
import PaySuccess from './components/07.paySuccess.vue';
//导入会员中心页面
import VipCenter from './components/08.vipCenter.vue'; 
// 导入订单列表页面
import OrderList from './components/09.orderList.vue';
// 
import OrderDetail from './components/10.orderDetail.vue';

// 导入 elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 记得要use一下 才会把Elementui中的内容注册到Vue上面
Vue.use(ElementUI);

// 导入iView
import iView from 'iview';
import 'iview/dist/styles/iview.css';
// 记得use一下
Vue.use(iView);

// 全局导入axios
import axios from 'axios';
// 配置全局基地址(所有跟插件 框架相关的设置 去对应的文档找)
// 一般来说接口 是在一台服务器上的 一系列地址
// 抽取出来还有一个好处 如果服务器更换地址 只需要调整一个位置
axios.defaults.baseURL = 'http://47.106.148.205:8899';
//让ajax携带cookie
// 跨域请求时 是否会携带 凭证(cookie)
axios.defaults.withCredentials = true;
// 增加到Vue的原型中 学习了 iView this.$Message
Vue.prototype.$axios = axios;

// 导入放大镜
import ProductZoomer from 'vue-product-zoomer';
Vue.use(ProductZoomer);

// 注册VueRouter(类似于Express的中间件语法)
// 传送门:https://router.vuejs.org/zh/guide/#html JavaScript分类的第0行
Vue.use(VueRouter);




//实例化一个仓库 用来保存数据
// 实例化Vue的时候 也需要传入 仓库对象
// 整合 Vuex 统一进行数据管理
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
//   // 这里就是我们的数据
  state:{
    // count:998
    cartDate: JSON.parse(window.localStorage.getItem('goodKey'))||{},
    // 是否已经登录
    isLogin:false,
    // 记录登录之前的网址
    fromPath:"",
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
      // 切换登录状态
      changeLoginStatus(state,isLogin){
        state.isLogin=isLogin;
      },
        // 增加一个保存来时地址的方法
    saveFromPath(state,fromPath){
      state.fromPath = fromPath;
    }
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
    // 注册 这个过滤器 只能格式化固定的内容
    // 可以接收参数
    Vue.filter('filterDate',function(val,formatStr){
      console.log(formatStr);
      // 如果你传入了格式化字符串 就是传入的
      if(formatStr!=undefined){
        return moment(val).format(formatStr);
      }else{
        // 没有传入这个格式化字符串 就是默认的
        return moment(val).format("YYYY年MM月DD日");
      }
    })
   

    
  


//定义路由的规则
let routes =[
  // 默认首页也打开index 使用重定项
  {
    path:'/',
    //重定项解析到index 直接修改路由地址
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
  component:ShoppingCart,
  },
  // 登录页面的路由
  {
    path:'/login',
    component:Login,
  },
   // 填写订单的路由
   {
    path:'/order/:ids',
    component:FillOrder,
    // 路由元信息 可以随意加 
    meta: {
      checkLogin: true
      // panduan:true
    }
  },
    // 订单支付
  {
    path: '/payOrder/:orderid',
    component: PayOrder,
    // 路由元信息 可以随意加  订单支付页 也必须登陆才可以访问
    meta: {
      checkLogin: true
    }
  },
  // 支付成功
      {
        path: '/paySuccess',
        component: PaySuccess,
        // 路由元信息 可以随意加  订单支付页 也必须登陆才可以访问
        meta: {
          checkLogin: true
        }
      },
      // 会员中心
      {
        path: '/vipCenter',
        component: VipCenter,
        // 路由元信息 可以随意加  订单支付页 也必须登陆才可以访问
        meta: {
          checkLogin: true  
        }
      },
      // 订单列表页面
          {
            path: '/orderList',
            component: OrderList,
            // 路由元信息 可以随意加  订单支付页 也必须登陆才可以访问
            meta: {
              checkLogin: true  
            }
          },
          {
            path: '/orderDetail/:id',
            component: OrderDetail,
            // 路由元信息 可以随意加  订单支付页 也必须登陆才可以访问
            meta: {
              checkLogin: true  
            }
          },
]
//实例化路由对象
let router = new VueRouter({
  routes:routes
})

//增加导航守卫(路由守卫)
router.beforeEach((to,from,next)=>{
      // 每次过来都保存一下来时的地址
      // 提交载荷 保存数据
  store.commit('saveFromPath',from.path);
    
  
  
  // !=-1 说明包含了 /order/
    // 如果访问的是 order页面判断登录
    if(to.path.indexOf('/order/')!=-1){
      // 调用接口
      axios.get("/site/account/islogin").then(response=>{
        // alert('1');
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
  store,
  beforeCreate(){
    // console.log('你爷爷被创建了');
    axios.get("/site/account/islogin").then(response=>{
      // console.log(response);
      if(response.data.code=='logined'){
        // 登陆成功了
        this.$message.error('大哥你好,你登录成功');

        store.state.isLogin = true;
      }else{
        // 没有登陆
      }
    })
  },
}).$mount('#app')
