<template>
  <div class="login-form">
    <div class="g-form">
      <div class="g-form-line">
        <span class="g-form-label">用户名：</span>
        <div class="g-form-input">
          <input type="text" v-model="usernameModel" placeholder="请输入用户名">
        </div>
        <span class="g-form-error">{{ userError.errorText}}</span>
      </div>
      <div class="g-form-line">
        <span class="g-form-label">密码：</span>
        <div class="g-form-input">
          <input type="password" v-model="passwordModel" placeholder="请输入密码">
        </div>
        <span class="g-form-error">{{ passError.errorText }}</span>
      </div>
      <div class="g-form-line">
        <div class="g-form-btn">
          <a class="button" @click="onLogin">登录</a>
        </div>
      </div>
      <p>{{ errorText }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
        usernameModel: '',
        passwordModel: '',
        errorText: ''
    }
  },
  methods: {
    onLogin() {
        if (!this.userError.status || !this.passError.status) {
            this.errorText = '部分选项未通过';
        } else {
            this.errorText = '';
            this.$http.post('/api/login')
                .then((res) => {
                    this.$emit('has-log', res.data.data)
                }).catch((err) => {
                    this.errorText = "登录失败"
                })
        }
    }
  },
  computed: {
      userError() {
          let status,errorText;
          if (!(/\w+@\w+\.\w+/g.test(this.usernameModel))) {
              status = false;
              errorText = "不是合法的邮箱地址";
          } else {
              status = true;
              errorText = '';
          }
          if (!this.userFlag) {
              errorText = '';
              this.userFlag = true;
          }
          return {
              status,
              errorText
          }
      },
      passError() {
          let status,errorText;
          if (!(/^\w{6,}$/g.test(this.passwordModel))) {
              status = false;
              errorText = "密码小于6位";
          } else {
              status = true;
              errorText = '';
          }
          if (!this.passFlag) {
              errorText = '';
              this.passFlag = true;
          }
          return {
              status,
              errorText
          }
      }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
