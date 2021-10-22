<template>
  <!-- 根据路由 渲染菜单 -->
  <!-- 我们需要菜单的名字和图标 -->
  <el-menu :collapse="isCollapse" :collapse-transition="false" router>
    <template v-for="route in routes">
      <el-menu-item v-if="!route.children"
        :key="route.path"
        :index="route.path">
        <template #title>
            <span>{{route.meta.menu}}</span>
        </template>
        <i :class="route.meta.icon"></i>
      </el-menu-item>
      <el-sub-menu v-else :key="route.path"> 
            <template #title>
              <i :class="route.meta.icon"></i>
              <span slot="title">{{route.meta.menu}}</span>
            </template>
            <el-menu-item v-for="(subRoute) in route.children" :key="subRoute.path" :index="subRoute.path">
              <span>{{subRoute.meta.menu}}</span>
            </el-menu-item>
          </el-sub-menu>
    </template>
  </el-menu>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["isCollapse"]),
    routes() {
      const routes= this.$router.options.routes[1].children
      return routes;
    },
  },
};
</script>

<style></style>
