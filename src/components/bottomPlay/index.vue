<template>
  <!-- 底部播放 -->
  <div class="bottomPlay" :style="{ bottom: bottomPosition + 'rem' }">
    <!-- 左半部分 -->
    <div class="left" @click="updataShow">
      <div class="img">
        <img src="@/assets/cp.png" alt="" class="cp" />
        <img :src="playList[playListIndex].al.picUrl" class="tp" />
      </div>
      <div class="name">
        <span>{{ playList[playListIndex].name }} -- </span>
        <span v-for="item in playList[playListIndex].ar" :key="item"
          >{{ item.name }}&nbsp;&nbsp;</span
        >
      </div>
    </div>
    <!-- 有半部分 -->
    <div class="right">
      <div class="iconBf" @click="play">
        <van-icon name="play" v-if="isPauseButton" />
        <van-icon name="pause" v-else />
      </div>
      <div class="iconPlay">
        <van-icon name="bars" />
      </div>
    </div>
    <!-- 音乐播放器 -->
    <audio
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
    ></audio>
    <!-- 歌曲详情页的弹出层 -->
    <van-popup
      v-model:show="isShow"
      position="bottom"
      :style="{ height: '100%', weight: '100%' }"
      duration="0.5"
      z-index
    >
      <songDetails
        :songDetail="playList[playListIndex]"
        :play="play"
        :isPauseButton="isPauseButton"
      />
    </van-popup>
  </div>
</template>

<script>
import { mapState } from "vuex";
import songDetails from "./songDetails";
export default {
  name: "bottomPlay",
  props: ["bottomPosition"],
  components: {
    songDetails,
  },
  mounted() {
    this.$store.dispatch(
      "songPlayList/getLyric",
      this.playList[this.playListIndex].id
    );
  },
  updated() {
    this.$store.dispatch(
      "songPlayList/getLyric",
      this.playList[this.playListIndex].id
    );
    this.getDuration();
  },
  data() {
    return {
      num: 0,
      time: 0,
    };
  },
  computed: {
    ...mapState("songPlayList", [
      "playList",
      "playListIndex",
      "isPauseButton",
      "isShow",
    ]),
  },
  methods: {
    //播放|暂停 歌曲
    play() {
      //如果歌曲是暂停状态则播放歌曲，反之暂停
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.$store.commit("songPlayList/updataPauseButton", false);
        //开启定时器
        this.updataTime();
      } else {
        this.$refs.audio.pause();
        this.$store.commit("songPlayList/updataPauseButton", true);
        //关闭定时器
        clearInterval(this.time);
      }
    },
    //是否显示弹出层
    updataShow() {
      this.$store.commit("songPlayList/updataIsShow");
    },
    //当前歌曲播放到的时间
    updataTime() {
      //每隔一秒就获取一下歌曲当前的播放进度(使用定时器)
      this.time = setInterval(() => {
        this.$store.commit(
          "songPlayList/updataCurrentTime",
          this.$refs.audio.currentTime //当前音乐播放器播放到的进度(时间)
        );
      }, 1000);
    },
    //获取歌曲总时长
    getDuration() {
      this.$store.commit("songPlayList/getDuration", this.$refs.audio.duration);
    },
  },
  watch: {
    //监听播放的歌曲是否发生改变(歌曲序号)
    playListIndex() {
      // 发生了变化就让歌曲自动播放
      this.$refs.audio.autoplay = true;
      // 如果歌曲原本是暂停状态，就改变图标样式(因为自动播放了，所以要把图标样式从播放改成暂停)
      if (this.$refs.audio.paused) {
        this.$store.commit("songPlayList/updataPauseButton", false);
      }
    },
    //监听播放的歌曲是否发生改变(歌曲)
    playList() {
      if (this.isPauseButton) {
        this.$refs.audio.autoplay = true;
        this.$store.commit("songPlayList/updataPauseButton", false);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.bottomPlay {
  width: 100%;
  height: 1.5rem;
  border-top: 0.04rem solid rgb(70, 69, 69);
  background-color: #fff;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    width: 60%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .img {
      width: 30%;
      height: 1rem;
      position: relative;
      .cp {
        width: 1rem;
        height: 1rem;
        position: absolute;
        bottom: 0.02rem;
        left: 0.1rem;
        z-index: -1;
      }
      .tp {
        width: 0.65rem;
        height: 0.65rem;
        border-radius: 50%;
        position: absolute;
        bottom: 0.21rem;
        left: 0.27rem;
      }
    }
    .name {
      width: 60%;
      font-size: 0.3rem;
      font-weight: 700;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .right {
    width: 40%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 0.6rem;
    font-size: 0.7rem;
    .iconBf {
      margin-right: 0.4rem;
    }
  }
}
</style>
