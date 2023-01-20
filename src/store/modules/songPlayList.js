import { reqGetLyric } from "@/api";
export default {
  namespaced: true,
  state: {
    //播放列表的歌单
    playList: [
      {
        name: "春娇与志明（cover街道办&欧阳耀莹）",
        ar: [{ name: "宋明雨" }, { name: "芩芩" }],
        al: {
          id: 157497102,
          name: "心海",
          pic: 109951168200008580,
          picUrl:
            "http://p3.music.126.net/O4KwqDqTahcEJdm4L-swMg==/109951168200008579.jpg",
          pic_str: "109951168200008579",
        },
        id: 2011144452,
      },
    ],
    //歌单列表中当前播放歌曲的下标
    playListIndex: 0,
    //暂停按钮的显示
    isPauseButton: true,
    //歌词播放页面是否弹出
    isShow: false,
    //歌词
    lyric: "",
    //歌曲当前播放到的时间(毫秒数)
    currentTime: 0,
    //歌曲总时长
    duration: 0,
  },
  getters: {},
  mutations: {
    //修改暂停按钮的显示状态
    updataPauseButton(state, values) {
      state.isPauseButton = values;
    },
    //修改播放歌曲的内容
    updataPlayList(state, values) {
      state.playList = values;
    },
    //修改播放歌曲的序号
    updataPlayListIndex(state, index) {
      state.playListIndex = index;
    },
    //修改是否显示弹出层
    updataIsShow(state) {
      state.isShow = !state.isShow;
    },
    //获取歌词
    getLyric1(state, data) {
      state.lyric = data;
    },
    //修改歌曲当前播放到的时间(毫秒数)
    updataCurrentTime(state, value) {
      state.currentTime = value;
    },
    //获取歌曲总时长
    getDuration(state, value) {
      state.duration = value;
    },
    //添加一首歌到播放列表歌单
    pushPlayList(state, value) {
      state.playList.push(value);
    },
  },
  actions: {
    //获取歌词
    async getLyric({ commit }, id) {
      let result = await reqGetLyric(id);
      if (result.code == 200) {
        commit("getLyric1", result.lrc.lyric);
      }
    },
  },
};
