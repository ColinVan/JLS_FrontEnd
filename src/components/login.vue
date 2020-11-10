<template>
  <div class="login-back">
    <img src="../assets/log&reg.jpg" style="width: 100%;-webkit-user-select: none;">
    <div class="login-card">
      <el-form ref="loginForm" :model="form" :rules="rules" class="login-box">
        <h3 class="login-title" style="text-align: center">欢迎登录</h3>
        <el-form-item prop="username">
          <span>Username:</span>
          <el-input prefix-icon="el-icon-edit" type="text" placeholder="请输入用户名" v-model="form.username"/>
        </el-form-item>
        <el-form-item prop="password">
          <span>Password:</span>
          <el-input prefix-icon="el-icon-warning" type="password" placeholder="请输入密码" v-model="form.password"/>
        </el-form-item>
        <el-form-item>
          <el-col span="20">
            <el-checkbox v-model="form.checked">记住我</el-checkbox>
          </el-col>
          <el-col span="4">
            <router-link to="/register">
              <el-button type="text" class="register-btn">注册</el-button>
            </router-link>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('loginForm')" style="width: 100%;margin: auto">登录</el-button>
        </el-form-item>
      </el-form>
      <div style="width: 80%;margin: auto">
        <el-alert v-if="isAlertDisplay"
                  :closable="false"
                  title="用户名或密码不正确"
                  type="error"
                  show-icon>
        </el-alert>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from 'js-md5'

export default {
  name: 'login',
  components: {},
  data () {
    return { // 用户在表单上写下的数据
      form: {
        username: '', // 用户输入的用户名
        password: '', // 用户输入的密码
        checked: false // 用户是否勾选记住我
      },

      rules: {
        // 对data域内的username和password提出约束, 这是element-ui给表单提供的功能
        username: [
          { required: true, message: '账号不可为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不可为空', trigger: 'blur' }
        ]
      },
      isAlertDisplay: false
    }
  },
  // 登录页面中屏蔽导航栏和页脚 通过子组件触发事件顺带给父组件传值
  activated () {
    // this.$emit('public_header', false)
    // this.$emit('public_footer', false)
  },
  deactivated () {
    this.$emit('public_header', true)
    this.$emit('public_footer', true)
  },
  methods: {
    onSubmit (formName) {
      const user = {
        username: this.form.username,
        password: md5(this.form.password)
      }
      // 为表单绑定自定义验证功能, 该功能属于element-ui提供
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 把用户填写的登录信息发给服务器
          this.axios.post('/api/user/login', user).then(body => {
            // 服务器检测用户提交的用户名和密码, 如果检测成功, 则服务器返回密码的md5值, 否则服务器回送一个空值
            // 事实证明这样做存在一个很大的问题：把密码的MD5值作为包粗壮乃客户端证明用户已登录的凭证式不靠谱的, 当客户端和服务端通信时, 
            // 如果服务端需要客户端提供自己的身份, 则这个MD5值无法验证用户身份, 因为不同的用户很可能用相同的密码
            const token = body.data
            if (token === '') {
              alert('token from server is:' + token)
              this.isAlertDisplay = true
              return false
            } else {
              // 向store记录登录信息, 转到首页
              alert('token from server is:' + token)
              this.$store.commit('setToken', token)
              this.isAlertDisplay = false
              this.$router.push('/')
              return true
            }
          })
        } else {
          alert('Not valid!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
  .login-back {
    position: fixed;
    width: 100%;
    height: 100%;
    margin-top: 0 !important;
  }

  .login-card {
    position: absolute;
    background: #fbfbfb;
    width: 20%;
    height: 50%;
    top: 20%;
    margin-left: 40%;
    padding: 20px;
    /* box-shadow: 10px 10px 10px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);*/
    border-radius: 10px;
    z-index: 2;
    opacity: 0.75;
  }

  .login-box {
    width: 80%;
    margin: auto;
  }
</style>
