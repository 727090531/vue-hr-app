<template>
    <div>
<!-- 登录表单区 -->
        <el-form :model="loginForm" label-width="80px" class="loginContainer" :rules="rules" ref="loginRef" >
            <h3 class="loginTitle">系统登录</h3>
            <el-form-item label="" prop="username">
                <el-input v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
            </el-form-item>
            <el-form-item label="" prop="password">
                <el-input v-model="loginForm.password" show-password prefix-icon="el-icon-key"
                @keydown.enter.native="login"></el-input>
            </el-form-item>
            <el-checkbox size="normal" class="loginRemember" v-model="checked">记住密码</el-checkbox>
            <el-form-item>
                <el-button type="primary" @click="login">提交</el-button>
                <el-button @click="restLoginForm">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>

    export default {
        name: 'Login',
        data() {
            // let checkPassword = (rule,value,callback)=>{
            //     if (value===''){
            //         callback(new Error('请输入密码'));
            //     }else {
            //      if (this.loginForm.password !==''){
            //          this.$refs.loginRef.validateField('password');
            //      }
            //      callback();
            //     }
            // }
            return {
                loginForm: {
                    username:'',
                    password:''
                },
                rules:{
                username:[
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                  ],
                password:[
                    { required: true, $message: '请输入密码', trigger: 'blur' },
                    { min: 3, max: 20, $message: '长度在 3 到 20 个字符', trigger: 'blur' }
                ]
                },
                checked: true,
            }
        },

        methods: {
          restLoginForm(){
              console.log(this.$refs)
              this.$refs.loginRef.resetFields()
          },
          login:function () {
              this.$refs.loginRef.validate(async valid => {
                  // console.log(valid)
                  if (!valid) {
                      return this.$message.error('用户名或密码格式不正确，请重新输入')
                  }
                  const resp = await this.postKeyValueRequest('/doLogin', this.loginForm)
                  console.log(resp)
                  if (resp) {
                      console.log(resp.obj)
                      // 1. 将登录成功之后的user保存到客户端的sessionStorage中
                      //    1.1 项目中出了登录之外的其它API接口，必须在登录之后才能访问
                      //    1.2 user只应在当前网站打开期间生效，所以将user保存在sessionStorage中
                      window.sessionStorage.setItem('user', JSON.stringify(resp.obj));
                      // 获取查询字符串中的path是否包含redirect
                      let path = this.$route.query.redirect
                      // 2. 通过编程式导航跳转到后台主页，路由地址是 /home
                      await this.$router.replace((path === '/' || path === undefined) ? '/home' : path)
                  }
              })
          }
        }
    }
</script>

<style scoped>
    .loginContainer{
        border-radius: 15px;
        background-clip: padding-box;
        margin:180px auto;
        width: 350px;
        padding: 10px 70px 15px 12px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    .loginTitle{
        margin: 15px auto 20px auto;
        text-align: center;
        color: #505458;
    }
    .loginRemember {
        text-align: left;
        margin: 0px 0px 15px 0px;
    }
</style>