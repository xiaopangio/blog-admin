import router from "@/router";
import store from "@/store";
// 白名单
const whiteRoute = ["/login"];
router.beforeEach(async (to, from, next) => {
  if (whiteRoute.includes(to.path)) {
    next();
  } else {
    const hasToken = store.getters.token;
    if (hasToken) {
      const userId = store.getters.user_id;
      const userInfo = store.getters.user_info;
      // 获取vuex中的路由
      //   这里是空的  先注释
      if (userInfo.userId) {
        next();
      } else {
        try {
          // 获取用户信息
          await store.dispatch("SET_USER_INFO", userId);
          // 解决页面刷新白屏
          await next({ ...to, replace: true });
        } catch (e) {
          console.log(e);
          next("/login");
          store.dispatch("LOGOUT");
        }
      }
    } else {
      next("/login");
    }
  }
});
