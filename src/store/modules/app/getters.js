import { getToken, getUserId } from "@/utils/storage";
const getters = {
  isCollapse: (state) => state.isCollapse,
  token: (state) => {
    return state.token || getToken();
  },
  user_id: (state) => {
    return state.user_id || getUserId();
  },
  user_info: (state) => state.user_info,
};

export default getters;
