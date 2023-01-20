import { reqGetCloudsearch } from "@/api";

export default {
  namespaced: true,
  state: {
    //通过搜索获取到的歌曲
    songs: [],
  },
  getters: {},
  mutations: {
    //通过搜索获取歌曲
    getCloudsearch1(state, value) {
      state.songs = value;
    },
  },
  actions: {
    //通过搜索获取歌曲
    async getCloudsearch({ commit }, value) {
      let results = await reqGetCloudsearch(value);
      if (results.code == 200) {
        commit("getCloudsearch1", results.result.songs);
      }
    },
  },
};
