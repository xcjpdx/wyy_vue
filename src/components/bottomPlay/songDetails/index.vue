<template>
  <div class="songDetalis">
    <!-- 背景图 -->
    <img :src="songDetail.al.picUrl" alt="" class="backgroundImg" />
    <!-- 头部 -->
    <div class="head">
      <van-icon name="arrow-down" class="arrow-down" @click="updataShow" />
      <div class="songName">
        <Vue3Marquee
          ><p>{{ songDetail.name }}</p></Vue3Marquee
        >
        <div>
          <span v-for="item in songDetail.ar" :key="item.id">{{
            item.name
          }}</span>
        </div>
      </div>
    </div>
    <!-- 中间部分 -->
    <div class="body" v-show="!isShowLyrics" @click="updataShowLyrics">
      <img
        src="../../../assets/cz.png"
        alt=""
        :class="{ cz_zt: isPauseButton, cz_bf: !isPauseButton }"
      />
      <img src="../../../assets/cp.png" alt="" class="cp" />
      <img
        :src="songDetail.al.picUrl"
        alt=""
        class="tp"
        :class="{ tp_end: isPauseButton, tp_run: !isPauseButton }"
      />
    </div>
    <!-- 歌词部分 -->
    <div
      class="body_ShowLyrics"
      ref="body_ShowLyrics"
      v-show="isShowLyrics"
      @click="updataShowLyrics"
    >
      <p
        v-for="item in lyrics"
        :key="item"
        :class="{
          playing:
            currentTime * 1000 >= item.time && currentTime * 1000 <= item.pre,
        }"
      >
        {{ item.lrc }}
      </p>
    </div>
    <!-- 进度条 -->
    <div class="progressBar" v-show="isShowLyrics">
      <input
        type="range"
        min="0"
        :max="duration"
        v-model="currentTime"
        step="0.05"
      />
    </div>
    <!-- 底部 -->
    <div class="foot">
      <svg class="icon" aria-hidden="true" @click="changeSong(-1)">
        <use xlink:href="#icon-48shangyishou"></use>
      </svg>
      <div class="play" @click="play">
        <van-icon name="play" v-if="isPauseButton" />
        <van-icon name="pause" v-else />
      </div>
      <svg class="icon" aria-hidden="true" @click="changeSong(1)">
        <use xlink:href="#icon-49xiayishou"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
//跑马灯组件
import { Vue3Marquee } from "vue3-marquee";
import "vue3-marquee/dist/style.css";
export default {
  name: "songDetails",
  props: ["songDetail", "play", "isPauseButton"],
  components: {
    Vue3Marquee,
  },
  computed: {
    ...mapState("songPlayList", [
      "playListIndex",
      "lyric",
      "currentTime",
      "duration",
    ]),
    //处理歌词
    lyrics() {
      let arr = this.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
        let min = parseInt(item.slice(1, 3));
        let sec = parseInt(item.slice(4, 6));
        let mill = parseInt(item.slice(7, 10));
        let lrc = item.slice(11, item.length);
        let time = min * 60 * 1000 + sec * 1000 + mill;
        return { min, sec, mill, lrc, time };
      });
      arr.forEach((item, i) => {
        if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
          item.pre = 1000000000;
        } else {
          item.pre = arr[i + 1].time;
        }
      });
      return arr;
    },
  },
  data() {
    return {
      isShowLyrics: false,
    };
  },
  methods: {
    //关闭弹出层
    updataShow() {
      this.$store.commit("songPlayList/updataIsShow");
    },
    //切换歌曲
    changeSong(value) {
      let index = this.playListIndex + value;
      if (index < 0) {
        //如果当前是第一首歌，就让上一首歌变成最后一首
        index = this.songDetail.length - 1;
      } else if (index == this.songDetail.length) {
        //如果当前是最后一首歌，就让下一首歌变成第一首
        index = 0;
      }
      this.$store.commit("songPlayList/updataPlayListIndex", index);
    },
    //切换歌词详情页|磁盘界面
    updataShowLyrics() {
      this.isShowLyrics = !this.isShowLyrics;
    },
  },
  watch: {
    currentTime(newValue) {
      let p = document.querySelector("p.playing");
      if (p) {
        if (p.offsetTop >= 150) {
          this.$refs.body_ShowLyrics.scrollTop = p.offsetTop - 150;
        }
      }
      //歌曲播放完后，自动播放下一首
      if (newValue === this.duration) {
        this.changeSong(1);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.songDetalis {
  height: 100%;
  position: relative;
  .backgroundImg {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: -1;
    filter: blur(0.6rem);
  }
  .head {
    display: flex;
    height: 10%;
    .arrow-down {
      width: 10%;
      margin: 0.1rem;
      color: #fff;
      font-size: 0.8rem;
    }
    .songName {
      padding: 0.1rem;
      margin-left: 1rem;
      width: 50%;
      text-align: center;
      p {
        margin-top: 0.1rem;
        color: rgb(253, 249, 249);
        font-size: 0.4rem;
      }
      span {
        color: rgb(216, 209, 209);
        font-size: 0.32rem;
      }
    }
  }
  .body {
    width: 100%;
    height: 9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin-top: 0.6rem;
    .cz_zt {
      width: 2rem;
      height: 3rem;
      position: absolute;
      left: 46%;
      transform-origin: 0 0;
      transform: rotate(-15deg);
      transition: all 2s;
    }
    .cz_bf {
      width: 2rem;
      height: 3rem;
      position: absolute;
      left: 46%;
      transform-origin: 0 0;
      transform: rotate(0deg);
      transition: all 2s;
    }
    .cp {
      width: 5rem;
      height: 5rem;
      position: absolute;
      bottom: 2.3rem;
      z-index: -1;
    }
    .tp {
      width: 3.2rem;
      height: 3.2rem;
      border-radius: 50%;
      position: absolute;
      bottom: 3.14rem;
      animation: tp_rotate 5s linear infinite;
    }
    @keyframes tp_rotate {
      0% {
        transform: rotateZ(0deg);
      }
      100% {
        transform: rotateZ(360deg);
      }
    }
    .tp_run {
      animation-play-state: running;
    }
    .tp_end {
      animation-play-state: paused;
    }
  }
  .body_ShowLyrics {
    position: absolute;
    margin-top: 0.4rem;
    width: 100%;
    height: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: scroll;
    p {
      color: rgb(223, 220, 220);
      margin-top: 0.4rem;
    }
    .playing {
      color: #fff;
      font-size: 0.5rem;
    }
  }
  .progressBar {
    position: absolute;
    bottom: 1.3rem;
    width: 100%;
    height: 5%;
    text-align: center;
    line-height: 1rem;
    input {
      width: 90%;
    }
  }
  .foot {
    width: 100%;
    height: 8%;
    position: absolute;
    bottom: 0.1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    svg {
      font-size: 0.5rem;
      color: #fff;
    }
    .play {
      font-size: 0.8rem;
      color: #fff;
    }
  }
}
</style>
