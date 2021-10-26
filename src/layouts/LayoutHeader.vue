<template>
  <!-- header内容填充 -->
  <el-row :gutter="20">
    <!-- 菜单伸缩按钮 -->
    <el-col :span="2">
      <i
        class="cursor"
        :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
        @click="CHANGE_COLLAPSE"
      ></i>
    </el-col>
    <!-- 时间 -->
    <el-col class="time" :span="4">{{ time }}</el-col>
    <el-col :span="5" :offset="13">
      <div class="setting-box">
        <!-- 需要一个默认头像 -->
        <img
          class="avatar"
          :src="
            user_info.avatar
              ? baseUrl + user_info.avatar
              : require('../assets/imgs/avatar.png')
          "
          alt
        />
        <div>{{ user_info.name }}</div>
        <div class="cursor" @click="drawer = true">
          <i class="el-icon-setting"></i>
          设置
        </div>
      </div>
    </el-col>
    <el-drawer
      size="10%"
      :with-header="false"
      v-model="drawer"
      direction="rtl"
      ref="drawer"
    >
      <div class="drawer">
        <div class="cursor" @click="toMine">
          <i class="el-icon-user"></i>
          <span>个人中心</span>
        </div>
        <div class="cursor" @click="logout">
          <i class="el-icon-switch-button"></i>
          <span>注销</span>
        </div>
      </div>
    </el-drawer>
  </el-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { parseTime } from "@/utils";
export default {
  data() {
    return {
      timer: null,
      time: null,
      drawer: false,
      baseUrl: process.env.VUE_APP_BASEURL,
    };
  },
  computed: {
    ...mapGetters(["isCollapse", "user_info"]),
  },
  created() {
    this.upDateTime();
  },
  //   页面销毁时 清除定时器
  unmounted() {
    this.clearTime();
  },
  methods: {
    ...mapActions(["CHANGE_COLLAPSE", "LOGOUT"]),
    upDateTime() {
      this.clearTime();
      this.timer = setInterval(() => {
        this.time = parseTime(new Date());
      }, 1000);
    },
    // 清除定时器
    clearTime() {
      if (this.timer) {
        clearInterval(this.timer);
      }
    },
    toMine() {
      this.$refs.drawer.handleClose();
      this.$router.push("/mine");
    },
    logout() {
      this.LOGOUT();
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.cursor {
  cursor: pointer;
}
.setting-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .avatar {
    height: 30px;
    width: 30px;
    border-radius: 50%;
  }
}
.time {
  border: 1px solid transparent;
}
.drawer {
  height: 100%;
  padding: 0 18px;
  > div {
    text-align: left;
    > span {
      margin-left: 10px;
    }
  }
}
</style>
