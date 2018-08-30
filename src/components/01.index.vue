<template>
    <!-- 基础结构 从静态资源目录下 02.商品列表下拷贝 -->
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="item in catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="itemSon in item.subcates" :key="itemSon.id">
                                                {{itemSon.title}}&nbsp;
                                            </span>

                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                <a v-for="itemSon in item.subcates" :key="itemSon.id" href="/goods/43.html">{{itemSon.title}}</a>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <!--幻灯片下面是轮播图-->
                    <div class="left-705">
                        <el-carousel height="341px" width="705px">
                            <el-carousel-item v-for="item in sliderlist" :key="item.id">
                                <!-- <h3>{{item.title}}</h3> -->
                                <img :src="item.img_url" alt="" height="341px" width="705px">
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <!--最右边的幻灯片-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item, index) in toplist" :key="item.id">
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <!-- <span>2017-09-26</span> -->
                                    <span>{{item.add_time | filterDate}}</span>

                                </div>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="section" v-for="(item, index) in groupData" :key="item.catetitle">
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a href="/goods/43.html" v-for="(itemSon, indexSon) in item.level2catelist" :key="itemSon.subcateid">{{itemSon.subcatetitle}}</a>
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
        <!-- 商品列表的 -->
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="(itemSon, indexSon) in item.datas" :key="itemSon.artID">
                            <!-- 动态拼接前面加冒号 -->
                            <router-link :to="'/detail/'+itemSon.artID">
                                <div class="img-box">
                                    <!-- 懒加载的图片 -->
                                    <!-- <img :src="itemSon.img_url"> -->
                                    <img v-lazy="itemSon.img_url">

                                </div>
                                <div class="info">
                                    <h3>{{itemSon.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{itemSon.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{itemSon.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{itemSon.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </router-link>

                        </li>
                       
                    </ul>
                </div>
            </div>
        </div>

    </div>
</template>

<script>


export default {
    // 设置名字
    name: "index",
    data: function() {
        return {
            // info:"我是一条信息"
            catelist: [], //分类数据
            sliderlist: [], //轮播图数据
            toplist: [], //热卖排行
            groupData:[]//下面渲染的数据
        };
    },
    //生命周期函数 创建之前
    beforeCreate() {},
    created() {
        //网络数据获取
        this.$axios
            .get("/site/goods/gettopdata/goods")

            .then(response => {
                // 把获取到的数据 设置给 当前这个组件的 data属性
                this.catelist = response.data.message.catelist;
                this.sliderlist = response.data.message.sliderlist;
                this.toplist = response.data.message.toplist;
                // console.log(response);
                //把获取到的数据  设置给 当前这个组件的data属性
                // console.log(this);
            });

            //底部的分类数据
            this.$axios
            .get("/site/goods/getgoodsgroup")
            .then(response=>{
                console.log(response);
                this.groupData = response.data.message;
            })
    },
   
};
</script>



<style>
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>
