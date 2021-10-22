import {
  CHANGE_COLLAPSE,
  SET_TOKEN,
  SET_USER_ID,
  SET_USER_INFO,
} from "./constant";
import { setToken, setUserId } from "@/utils/storage";
const mutations = {
  [CHANGE_COLLAPSE](state) {
    state.isCollapse = !state.isCollapse;
  },
  [SET_TOKEN](state, token) {
    state.token = token;
    setToken(token);
  },
  [SET_USER_ID](state, id) {
    state.user_id = id;
    setUserId(id);
  },
  [SET_USER_INFO](state, userInfo) {
    state.user_info = userInfo;
  },
};

export default mutations;
