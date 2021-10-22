<template>
  <el-container>
    <el-aside :class="isCollapse ? 'min-aside' : 'max-aside'">
      <LayoutAside />
    </el-aside>
    <el-container>
      <el-header>
        <LayoutHeader />
      </el-header>
      <el-main>
        <router-view class="router-view"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import LayoutAside from "./LayoutAside.vue";
import LayoutHeader from "./LayoutHeader.vue";
import { mapGetters } from "vuex";
export default {
  components: { LayoutAside, LayoutHeader },
  computed: {
    ...mapGetters(["isCollapse"]),
  },
};
</script>

<style lang="scss">
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  height: 60px !important;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  height: calc(100vh - 60px);
  .router-view {
    background: #fff;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
  }
}

.min-aside {
  width: 64px !important;
}
.max-aside {
  width: 200px !important;
}
</style>
