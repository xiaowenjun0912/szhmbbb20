<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit">
                        <a class="selected" href="javascript:;">账户登录</a>
                        <i>|</i>
                        <a href="/register.html">免费注册</a>
                    </div>

                    <div id="loginform" name="loginform" class="login-box">
                            <el-input v-model.trim="name" placeholder="请输入用户名"></el-input>
                            <br>
                            <br>
                            <el-input v-model.trim="password" type="password" placeholder="请输入密码"></el-input>
                            <br>
                            <br>
                        <div class="btn-box">
                            <input id="btnSubmit" name="btnSubmit" @click="login" type="submit" value="立即登录">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    // 在开发者工具里面看到组件的名字
    name:"login",
    data:function(){
        return{
            name:"admin",
            password:"123",
        }
    },
    methods:{
        login(){
            // 设置进度条的颜色大小
            this.$Loading.config({
                color:"yellow",
                failedColor:"red",
                height:18,
            })
            // 显示进度条
            this.$Loading.start();
            this.$axios.post('/site/account/login',{
                user_name:this.name,
                password:this.password
            }).then(response=>{
                // console.log(response);
                if(response.data.status==0){
                    // 修改Vuex中的数据
                    // 提交载荷
                    this.$message.error('大哥你好,你登录成功');
                    this.$store.commit('changeLoginStatus',true);
                    // 登录成功之后返回之前的页面
                    this.$router.push(this.$store.state.fromPath);

                }
                // 关闭进度条
                this.$Loading.finish();
            })
        }
    }
}
</script>
<style>

</style>

