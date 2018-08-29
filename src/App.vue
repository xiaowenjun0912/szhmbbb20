<template>
    <div>
        <!-- 头部 -->
        <div class="header">
            <!-- 1.0 导航栏头部 -->
            <div class="head-top">
                <div class="section">
                    <div class="left-box">
                        <span>
                            <font style="vertical-align: inherit;">
                                <font style="vertical-align: inherit;">黑马买买买</font>
                            </font>
                        </span>
                        <a target="_blank" href="#"></a>
                        <a target="_blank" href="#"></a>
                    </div>
                    <div id="menu" class="right-box">
                        <span style="display: none;">
                            <a href="" class="">
                                <font style="vertical-align: inherit;">
                                    <font style="vertical-align: inherit;">登录</font>
                                </font>
                            </a>
                            <strong>
                                <font style="vertical-align: inherit;">
                                    <font style="vertical-align: inherit;">| </font>
                                </font>
                            </strong>
                            <a href="" class="">
                                <font style="vertical-align: inherit;">
                                    <font style="vertical-align: inherit;">注册</font>
                                </font>
                            </a>
                            <strong>
                                <font style="vertical-align: inherit;">
                                    <font style="vertical-align: inherit;">|</font>
                                </font>
                            </strong>
                        </span>
                        <span>
                            <a href="" class="">
                                    会员中心
                            </a>
                            <strong>
                                        |
                            </strong>
                            <a>
                                        退出
                            </a>
                            <strong>
                                        |
                            </strong>
                        </span>
                        <!-- <a href="" class=""> -->
                            <router-link to="/cart">
                                <i class="iconfont icon-cart"></i>购物车（
                                    <span id="shoppingCartCount">
                                        <span>{{$store.getters.goodsCount}}</span>
                                    )</span>
                            </router-link>
                                <!-- </a> -->
                    </div>
                </div>
            </div>

            <!-- 2.0 导航条 -->
            <div class="head-nav">
                <div class="section">
                    <div id="menu2" class="nav-box menuhd">
                        <ul>
                            <li class="index">
                                <!-- 路由跳转的连接 地址是/index-->
                                <router-link to="/index">
                                  <span class="out" style="top: 0px;">
                                        <!-- <font style="vertical-align: inherit;"> -->
                                            <!-- <font style="vertical-align: inherit;"> -->
                                                首页
                                                <!-- </font> -->
                                        <!-- </font> -->
                                    </span>
                                </router-link>
                                  
                            </li>
                            <li class="news">
                                <a href="#" class="">
                                    <span class="out" style="top: 0px;">
                                        <font style="vertical-align: inherit;">
                                            <font style="vertical-align: inherit;">每日精选</font>
                                        </font>
                                    </span>
                                </a>
                            </li>
                            <li class="photo">
                                <a href="#" class="">
                                    <span class="out" style="top: 0px;">
                                        <font style="vertical-align: inherit;">
                                            <font style="vertical-align: inherit;">秒杀专区</font>
                                        </font>
                                    </span>
                                </a>
                            </li>
                            <li class="video">
                                <a href="#" class="">
                                    <span class="out" style="top: 0px;">
                                        <font style="vertical-align: inherit;">
                                            <font style="vertical-align: inherit;">黑马超市</font>
                                        </font>
                                    </span>
                                </a>
                            </li>
                            <li class="down">
                                <a href="#" class="">
                                    <span class="out" style="top: 0px;">
                                        <font style="vertical-align: inherit;">
                                            <font style="vertical-align: inherit;">会员权益</font>
                                        </font>
                                    </span>
                                </a>
                            </li>
                            <li class="goods">
                                <a href="" class="router-link-exact-active ">
                                    <span class="out" style="top: 0px;">
                                        <font style="vertical-align: inherit;">
                                            <font style="vertical-align: inherit;">购物商城</font>
                                        </font>
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="search-box">
                        <div class="input-box">
                            <input id="keywords" name="keywords" type="text" onkeydown="if(event.keyCode==13){};" placeholder="输入关健字" x-webkit-speech="">
                        </div>
                        <a href="javascript:;">
                            <i class="iconfont icon-search"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <!-- 视图的出口 -->
        <router-view></router-view>
        <!-- 底部 -->
        <div class="footer">
            <div class="section">
                <div class="foot-nav">
                    <a href="">关于我们</a>
                    <strong>|</strong>
                    <a href="">联系我们</a>
                    <strong>|</strong>
                    <a href="">联系客服</a>
                    <strong>|</strong>
                    <a href="">合作招商</a>
                    <strong>|</strong>
                    <a href="">商家帮助</a>
                    <strong>|</strong>
                    <a href="">营销中心</a>
                    <strong>|</strong>
                    <a href="">隐私政策</a>
                </div>
                <div class="foot-box">
                    <div class="copyright">
                        <p>版权所有 黑马买买买 </p>
                        <p>公司地址： 联系电话：</p>
                        <p class="gray">Copyright © 2009-2018 itcast Corporation,All Rights Reserved.</p>
                    </div>
                    <div class="service">
                        <p>周一至周日 9:00-24:00</p>
                        <a href="#">
                            <i class="iconfont icon-phone"></i>在线客服</a>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
import $ from "jquery";
export default {
    //修改之后devtool插件的控制台中 会有不同的名字 更加利于查找元素
    //传送门 //http://cn.vuejs
    name: "container"
};
//插件的代码 为a标签增加两个用于动画的span
// 插件的代码 为a标签增加两个用于动画的span
$(function() {
    $("#menu2 li a").wrapInner('<span class="out"></span>');
    $("#menu2 li a").each(function() {
        $('<span class="over">' + $(this).text() + "</span>").appendTo(this);
    });

    $("#menu2 li a").hover(
        function() {
            $(".out", this)
                .stop()
                .animate({ top: "48px" }, 300); // move down - hide
            $(".over", this)
                .stop()
                .animate({ top: "0px" }, 300); // move down - show
        },
        function() {
            $(".out", this)
                .stop()
                .animate({ top: "0px" }, 300); // move up - show
            $(".over", this)
                .stop()
                .animate({ top: "-48px" }, 300); // move up - hide
        }
    );
});
</script>

<style>
/* 引入样式 */
@import url("./assets/statics/site/css/style.css");
/* 导入jquery 动画插件的样式 */
@import url("./assets/lib/css/style.css");
/* 覆盖蓝色的背景 也可以直接修改 插件的样式  */
#menu2 {
    background-image: none;
}
</style>
