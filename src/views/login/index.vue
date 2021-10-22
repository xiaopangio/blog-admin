<template>
  <!-- 登陆页 -->
  <div class="login-wrap">
    <div class="box">
      <div class="to-register" :class="type === 'login' ? 'show-register' : 'hide-register'">
        <h1>Don't have an account ?</h1>
        <el-button @click="changeType('register')">SIGN UP</el-button>
      </div>
      <div class="to-login" :class="type === 'register' ? 'show-login' : 'hide-login'">
        <h1>Already have an account ?</h1>
        <div>
          <el-button @click="changeType('login')">SIGN IN</el-button>
        </div>
      </div>
      <div class="form" :class="[type, flag && type + '-move']">
        <el-form
          v-if="type === 'login'"
          class="form-box"
          ref="loginForm"
          :rules="loginRules"
          :model="loginForm"
          key="login"
        >
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" placeholder="密码" show-password></el-input>
          </el-form-item>
          <el-form-item prop="captcha">
            <el-row>
              <el-col :span="18">
                <el-input v-model="loginForm.captcha" :maxlength="4" placeholder="验证码"></el-input>
              </el-col>
              <el-col :span="6">
                <div class="captcha" v-html="captcha" @click="refreshCaptcha"></div>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button @click="submitForm('loginForm')">登陆</el-button>
          </el-form-item>
        </el-form>
        <el-form
          v-if="type === 'register'"
          class="form-box"
          ref="registerForm"
          :rules="registerRules"
          :model="registerForm"
          key="register"
        >
          <el-form-item prop="username">
            <el-input v-model="registerForm.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="registerForm.password" show-password placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item prop="password1">
            <el-input v-model="registerForm.password1" show-password placeholder="确认密码"></el-input>
          </el-form-item>
          <!-- 邀请码为8位 -->
          <el-form-item prop="code">
            <el-input v-model="registerForm.code" :maxlength="8" placeholder="邀请码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="submitForm('registerForm')">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { getCaptcha, app_register } from "@/api/app";
import debounce from "lodash/debounce";
import { mapActions } from "vuex";
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerForm.password !== "") {
          this.$refs.registerForm.validateField("password1");
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      type: "login",
      flag: false,
      captcha: "",
      loginForm: {
        username: "",
        password: "",
        captcha: "",
      },
      registerForm: {
        username: "",
        password: "",
        password1: "",
        code: "",
      },
      loginRules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
          { min: 4, max: 10, message: "用户名为4-10位", trigger: "blur" },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          { min: 6, max: 10, message: "密码为6-10位", trigger: "blur" },
        ],
        captcha: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "验证码格式不正确", trigger: "blur" },
        ],
      },
      registerRules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
          { min: 4, max: 10, message: "用户名为4-10位", trigger: "blur" },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          { min: 6, max: 10, message: "密码为6-10位", trigger: "blur" },
          { validator: validatePass, trigger: "blur" },
        ],
        password1: [
          {
            required: true,
            message: "请再次输入密码",
            trigger: "blur",
          },
          { validator: validatePass2, trigger: "blur" },
        ],
        code: [
          { required: true, message: "请输入邀请码", trigger: "blur" },
          { min: 8, max: 8, message: "邀请码格式不正确", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    ...mapActions(["LOGIN"]),
    initData() {
      getCaptcha().then((res) => {
        this.captcha = this.resetSvg(res.data.data);
      });
    },
    initForm() {
      this.loginForm = {
        username: "",
        password: "",
        captcha: "",
      };
      this.registerForm = {
        username: "",
        password: "",
        password1: "",
        code: "",
      };
    },
    refreshCaptcha: debounce(function () {
      getCaptcha().then((res) => {
        this.captcha = this.resetSvg(res.data.data);
      });
    }, 500),
    resetSvg(svg) {
      svg = svg.replace('width="100"', 'width="100%"');
      svg = svg.replace('height="40"', 'height="100%"');
      return svg;
    },
    changeType(type) {
      if (this.flag) return;
      this.type = type;
      this.flag = true;
      this.initForm();
      this.$nextTick(() => {
        this.resetForm(type + "Form");
      });
      setTimeout(() => {
        this.flag = false;
      }, 2000);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 后面封装到vuex中
          if (formName === "registerForm") {
            const data = { ...this.registerForm };
            delete data.password1;
            app_register(data).then(() => {
              // 注册成功 跳到登陆
              this.changeType("login");
            });
          } else {
            //   将登陆方法 放到vuex中管理
            this.LOGIN(this.loginForm).then(() => {
              // 登陆成功 跳转到首页
              this.$router.push("/");
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.login-wrap {
  background: #cccccc;
  height: 100vh;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  .box {
    height: 300px;
    width: 80vw;
    background: #3b3b3b;
    position: relative;
    .to-register {
      position: absolute;
      top: 50%;
      left: 20px;
      transform: translate(0, -50%);
      &.show-register {
        opacity: 1;
        animation: show 2s ease;
      }
      &.hide-register {
        opacity: 0;
        animation: hide 2s ease;
      }
    }
    .to-login {
      position: absolute;
      top: 50%;
      right: 20px;
      transform: translate(0, -50%);
      > div {
        text-align: right;
      }
      &.show-login {
        opacity: 1;
        animation: show 2s ease;
      }
      &.hide-login {
        opacity: 0;
        animation: hide 2s ease;
      }
    }
    .form {
      position: absolute;
      top: -50px;
      height: 400px;
      width: 400px;
      background: #fff;
      display: flex;
      align-items: center;
      padding: 30px;
      box-sizing: border-box;
      .form-box {
        width: 100%;
      }
      &.login {
        left: calc(80vw - 50px - 400px);
      }
      &.register {
        left: 50px;
      }
      &.login-move {
        animation: move-to-login 2s ease;
      }

      &.register-move {
        animation: move-to-register 2s ease;
      }
      .captcha {
        cursor: pointer;
        height: 40px;
        width: 100px;
      }
    }
  }
}

@keyframes move-to-login {
  0% {
    left: 50px;
  }
  100% {
    left: calc(80vw - 50px - 400px);
  }
}

@keyframes move-to-register {
  0% {
    left: calc(80vw - 50px - 400px);
  }
  100% {
    left: 50px;
  }
}

@keyframes show {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes hide {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
