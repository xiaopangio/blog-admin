import { createRouter, createWebHistory } from "vue-router";
import LayoutBasic from '@/layouts/LayoutBasic.vue'
import RouteView from "@/layouts/RouteView.vue";
// 路由
// 路由配置
// 我们先默认写死路由 后面会根据接口动态分配路由
const routes = [
  {
    path: "/login", // 路由的路径
    name: "Login",
    component: () => import("@/views/login"), // 使用路由懒加载
  },
  //   加载当这个了路由下
  {
    path: "/",
    name: "",
    component: LayoutBasic,
    redirect: "/dashboard", // 路由重定向 当我们访问'/' 重定向到我们主页
    children: [
      // 嵌套路由
      {
        // 作为我们的主页
        path: "/dashboard",
        name: "DashBoard",
        // 我们将菜单名和图标放到meta属性里
        meta: {
          menu: "主页",
          icon: "el-icon-s-home",
        },
        component: () => import("@/views/sys/dashboard"),
      },
      {
        path: "/articles",
        name: "Articles",
        meta:{
          menu:"文章",
          icon: "el-icon-s-home",
        },
        component: RouteView,
        children: [
          {
            path: "/articles/edit",
            name: "Edit",
            meta: {
              menu: "文章修改",

            },
            component: () => import("@/views/sys/articles/edit.vue"),
          },
          {
            path: "/articles/list",
            name: "List",
            meta: {
              menu: "文章列表",

            },
            component: () => import("@/views/sys/articles"),
          }
        ]
      },
      {
        path: "/audit",
        name: "Audit",
        meta: {
          menu: "审核",
          icon: "el-icon-s-home",
        },
        component: () => import("@/views/sys/audit"),
      },
      {
        path: "/category",
        name: "Category",
        meta: {
          menu: "分类管理",
          icon: "el-icon-s-home",
        },
        component: () => import("@/views/sys/category"),
      },
      {
        path: "/draft",
        name: "Draft",
        meta: {
          menu: "草稿箱",
          icon: "el-icon-s-home",
        },
        component: () => import("@/views/sys/draft"),
      },
      {
        path: "/menus",
        name: "Menus",
        meta: {
          menu: "菜单",
          icon: "el-icon-s-home",
        },
        component: () => import("@/views/sys/menus"),
      },
      {
        path: "/roles",
        name: "Roles",
        meta: {
          menu: "权限",
          icon: "el-icon-s-home",
        },
        component: () => import("@/views/sys/roles"),
      },
      {
        path: "/user",
        name: "User",

        meta: {
          menu: "用户",
          icon: "el-icon-s-home",
        },
        component: () => import("@/views/sys/user"),
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
