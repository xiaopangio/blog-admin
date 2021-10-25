<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{ $route.matched[1].meta.menu }}</el-breadcrumb-item>
    <el-breadcrumb-item v-if="$route.matched.length > 2">{{
      $route.matched[2].meta.menu
    }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
export default {};
</script>
<style></style>
