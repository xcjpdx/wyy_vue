<template>
  <!-- 歌单列表 -->
  <div class="songList">
    <!-- 顶部 -->
    <div class="top">
      <div class="songListText" :class="{ isbgc: isClass }" v-show="!isShow">
        <svg class="icon" aria-hidden="true" @click="back">
          <use xlink:href="#icon-fanhui"></use>
        </svg>
        <span>歌单</span>
      </div>
      <!-- 背景图 -->
      <img :src="playListDetail.coverImgUrl" alt="" class="backgroundImg" />
    </div>
    <!-- 中间部分 -->
    <div class="center">
      <div class="top">
        <div class="left">
          <img :src="playListDetail.coverImgUrl" alt="" class="img" />
        </div>
        <div class="right">
          <p class="introduction">{{ playListDetail.name }}</p>
        </div>
      </div>
      <div class="bottom">
        <div>
          <van-icon name="share" color="#fff" size=".5rem" />
          <span>{{ playListDetail.shareCount }}</span>
        </div>
        <div>
          <van-icon name="chat" color="#fff" size=".5rem" />
          <span>{{ playListDetail.commentCount }}</span>
        </div>
        <div style="background-color: rgb(244, 46, 46)">
          <van-icon name="shop-collect" color="#fff" size=".5rem" />
          <span>{{ playListDetail.subscribedCount }}</span>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="bottoms">
      <div class="up" :class="{ isfixed: isClass }" v-show="!isShow">
        <div class="svg">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-play"></use>
          </svg>
        </div>
        <span class="bfqb">播放全部</span>
        <span class="songNum">({{ playlist.length }})</span>
      </div>
      <div>
        <ul>
          <li
            v-for="(item, index) in playlist"
            :key="item.id"
            class="songListUl"
          >
            <div class="songNo">{{ index + 1 }}</div>
            <div class="author" @click="playmusic(index)">
              <p>{{ item.name }}</p>
              <span v-for="item1 in item.ar" :key="item1.id">
                {{ item1.name }}&nbsp;&nbsp;
              </span>
            </div>
            <div class="svg" v-show="item.mv">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofangMV"></use>
              </svg>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 底部播放 -->
    <bottomPlay :bottomPosition="0" />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "songList",
  data() {
    return {
      isClass: false,
    };
  },
  mounted() {
    this.$store.dispatch("home/GetPlayListDetail", this.$route.query.id);
    this.$store.dispatch("home/GetPlayList", this.$route.query.id);
    // 滚动条的获取
    window.addEventListener("scroll", this.handleScrollx, true);
  },
  computed: {
    ...mapState("home", ["playListDetail"]),
    ...mapState("home", ["playlist"]),
    ...mapState("songPlayList", ["isShow"]),
  },
  methods: {
    //返回上一页
    back() {
      this.$router.go(-1);
    },
    //控制滑动样式
    handleScrollx() {
      if (Math.ceil(window.pageYOffset / 50) >= 5) {
        this.isClass = true;
      } else {
        this.isClass = false;
      }
    },
    //点击歌曲后，将歌单中歌曲信息传入底部播放组件
    playmusic(index) {
      this.$store.commit("songPlayList/updataPlayList", this.playlist);
      this.$store.commit("songPlayList/updataPlayListIndex", index);
    },
  },
};
</script>

<style lang="less" scoped>
.songList {
  position: relative;
  //顶部
  .top {
    position: fixed;
    width: 100%;
    height: 1.5rem;
    position: relative;
    .songListText {
      width: 100%;
      position: fixed;
      z-index: 2;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      svg {
        margin: 0.5rem;
        font-size: 0.7rem;
        color: rgb(255, 254, 254);
      }
      span {
        font-size: 0.4rem;
        font-weight: 700;
        color: rgb(255, 254, 254);
      }
    }
    .backgroundImg {
      width: 100%;
      height: 6rem;
      position: fixed;
      z-index: -1;
      filter: blur(0.6rem);
    }
  }
  //中间部分
  .center {
    width: 100%;
    height: 5rem;
    .top {
      height: 60%;
      display: flex;
      .left {
        margin: 0 0.3rem 0 0.5rem;
        width: 25%;
        .img {
          width: 100%;
        }
      }
      .right {
        padding-right: 0.4rem;
        .introduction {
          font-size: 0.3rem;
          font-weight: 700;
          color: rgb(255, 254, 254);
        }
      }
    }
    .bottom {
      display: flex;
      justify-content: space-evenly;
      div {
        width: 2rem;
        height: 1rem;
        border-radius: 0.5rem;
        background-color: rgb(112, 110, 110);
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          margin-left: 0.1rem;
          font-size: 0.3rem;
          color: #fff;
        }
      }
    }
  }
  //底部
  .bottoms {
    width: 100%;
    background-color: #fff;
    padding-bottom: 1.5rem;
    .up {
      padding: 0.3rem;
      padding-top: 0.5rem;
      height: 1rem;
      display: flex;
      justify-content: flex-start;
      align-items: stretch;
      .svg {
        background: #f53f3f;
        border-radius: 50%;
        height: 1.5em;
        width: 1.5em;
        text-align: center;
        padding-left: 0.08rem;
        svg {
          font-size: 0.3rem;
          color: #fff;
        }
      }
      .bfqb {
        margin: 0 0.2rem 0 0.4rem;
        font-size: 0.35rem;
        font-weight: 700;
        color: rgb(18, 17, 17);
      }
      .songNum {
        font-size: 0.35rem;
      }
    }
    .songListUl {
      display: flex;
      align-items: center;
      padding: 0.4rem;
      .songNo {
        width: 10%;
        font-size: 0.35rem;
      }
      .author {
        width: 80%;
      }
      .svg {
        width: 10%;
        font-size: 0.5rem;
      }
    }
  }
}
.isfixed {
  width: 100%;
  position: fixed;
  top: 1.5rem;
  z-index: 2;
  background-color: #fff;
}
.isbgc {
  background-color: rgb(245, 71, 112);
  z-index: 2;
}
</style>
