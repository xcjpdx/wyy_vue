<template>
  <div class="login">
    <div class="login_head">登录</div>
    <div class="login_body">
      手机号：<input type="text" v-model="phone" />
      <br />
      验证码：<input type="text" v-model="verificationCode" />
      <br />
      <div class="bottom">
        <div>
          <van-button
            size="small"
            color="linear-gradient(to right, #ff6034, #ee0a24)"
            @click="login"
          >
            登录
          </van-button>
        </div>
        <div>
          <van-button
            size="small"
            color="linear-gradient(to right, #ff6034, #ee0a24)"
            @click="$router.go(-1)"
          >
            返回
          </van-button>
        </div>
      </div>
    </div>
    <div class="verificationCode">
      <van-button
        v-if="!sendStatus"
        size="small"
        color="linear-gradient(to right, #ff6034, #ee0a24)"
        @click="getVerificationCode(phone)"
      >
        获取验证码
      </van-button>
      <van-count-down :time="time" format="mm 分 ss 秒" v-else />
    </div>
  </div>
</template>

<script>
import { captcha } from "@/api";
export default {
  name: "login",
  data() {
    return {
      phone: "", //手机号
      verificationCode: "", //验证码
      sendStatus: false, //验证码获取状态
      time: 10 * 60 * 1000, //验证码有效时间：10分钟
    };
  },
  methods: {
    // 点击进行登录
    login() {
      let value = {
        phone: this.phone,
        verificationCode: this.verificationCode,
      };
      this.$store.dispatch("login/userLogin", value);
    },
    //获取验证码
    async getVerificationCode(value) {
      let result = await captcha(value);
      if (result.code == 200) {
        this.sendStatus = result.data;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  position: relative;
  .login_head {
    margin: 0.4rem;
    text-align: center;
    font-size: 0.5rem;
    font-weight: 700;
    color: rgb(243, 112, 112);
  }
  .login_body {
    padding: 0 0 0 0.3rem;
    input {
      margin: 0.4rem 0;
      border: 1px solid rgb(128, 125, 125);
    }
    .bottom {
      display: flex;
      justify-content: center;
      div {
        margin: 0.5rem;
      }
    }
  }
  .verificationCode {
    width: 1.5rem;
    height: 0.4rem;
    position: absolute;
    top: 1.5rem;
    right: 0.4rem;
  }
}
</style>
