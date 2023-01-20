import { login } from "@/api";

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    // 用户登录
    async userLogin({ commit }, value) {
      let result = await login(value);
      console.log(result);
    },
  },
};
