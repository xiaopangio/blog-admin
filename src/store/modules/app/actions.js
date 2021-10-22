import {
  CHANGE_COLLAPSE,
  LOGIN,
  SET_TOKEN,
  SET_USER_ID,
  SET_USER_INFO,
  LOGOUT,
} from "./constant";
import { app_login, app_userInfo } from "@/api/app";
const actions = {
  [CHANGE_COLLAPSE]({ commit }) {
    commit(CHANGE_COLLAPSE);
  },
  [LOGIN]({ commit }, data) {
    return new Promise((resolve, reject) => {
      app_login(data)
        .then((res) => {
          commit(SET_TOKEN, res.data.token);
          commit(SET_USER_ID, res.data.id);
          resolve(res);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  [SET_USER_INFO]({ commit }, id) {
    return new Promise((resolve, reject) => {
      app_userInfo(id)
        .then((res) => {
          commit(SET_USER_INFO, res.data);
          resolve(res);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  [LOGOUT]({ commit }) {
    commit(SET_TOKEN, "");
    commit(SET_USER_ID, "");
    commit(SET_USER_INFO, {});
  },
};

export default actions;
