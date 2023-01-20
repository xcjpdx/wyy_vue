import {
  reqgetpersonalized,
  reqGetPlayList,
  reqGetPlayListDetail,
} from "@/api";

export default {
  namespaced: true,
  state: {
    personalized: [],
    playListDetail: {},
    playlist: [],
  },
  getters: {},
  mutations: {
    //获取推荐歌单
    getpersonalized1(state, value) {
      state.personalized = value;
    },

    //获取歌单详情
    GetPlayListDetail1(state, value) {
      state.playListDetail = value;
    },

    //获取歌单所有歌曲
    GetPlayList1(state, value) {
      state.playlist = value;
    },
  },
  actions: {
    //获取推荐歌单
    async getpersonalized({ commit }) {
      let results = await reqgetpersonalized();
      if (results.code == 200) {
        commit("getpersonalized1", results.result);
      }
    },

    //获取歌单详情
    async GetPlayListDetail({ commit }, id) {
      let results = await reqGetPlayListDetail(id);
      if (results.code == 200) {
        commit("GetPlayListDetail1", results.playlist);
      }
    },

    //获取歌单所有歌曲
    async GetPlayList({ commit }, id) {
      let results = await reqGetPlayList(id);
      if (results.code == 200) {
        commit("GetPlayList1", results.songs);
      }
    },
  },
};
