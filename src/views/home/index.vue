<template>
  <div>
    <!-- 头部 -->
    <div class="heard">
      <div class="heardLeft">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-danlieliebiao"></use>
        </svg>
      </div>
      <div class="heardCentre" @click="this.$router.push({ name: 'search' })">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
        <span>大家都在搜 耍把戏</span>
      </div>
      <div class="heardRight">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-tinggeshiqu"></use>
        </svg>
      </div>
    </div>
    <!-- 推荐歌单 -->
    <div class="recommendedSongList">
      <p class="title">推荐歌单</p>
      <div class="Carousel">
        <van-swipe
          :loop="false"
          :width="100"
          :height="200"
          :show-indicators="false"
        >
          <van-swipe-item
            v-for="item in personalized"
            :key="item.id"
            class="singleCarousel"
          >
            <div @click="jumpPlayList(item.id)">
              <img :src="item.picUrl" alt="" />
              <p>{{ item.name }}</p>
              <div class="upperRightCorner">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-play"></use>
                </svg>
                <span>{{ Math.round(item.playCount / 10000) }}万</span>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <!-- 底部播放 -->
    <bottomPlay :bottomPosition="1.5" />
    <!-- 底部导航 -->
    <bottomNavigation v-show="!isShow" />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "home",
  mounted() {
    this.$store.dispatch("home/getpersonalized");
  },
  computed: {
    ...mapState("home", ["personalized"]),
    ...mapState("songPlayList", ["isShow"]),
  },
  methods: {
    jumpPlayList(id) {
      this.$router.push({ name: "songList", query: { id } });
    },
  },
};
</script>

<style lang="less" scoped>
// 头部
.heard {
  width: 100%;
  height: 1rem;
  padding: 0.4rem 0.1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  svg {
    font-size: 0.5rem;
  }
  background-color: rgb(251, 232, 250);
  .heardLeft {
    width: 10%;
  }
  .heardCentre {
    width: 70%;
    border: 0.04rem solid rgb(182, 180, 184);
    background-color: rgba(196, 232, 243, 0.5);
    border-radius: 0.5rem;
    text-align: center;
    svg {
      padding-top: 0.1rem;
      width: 0.4rem;
      height: 0.4rem;
    }
    span {
      font-size: 0.2rem;
    }
  }
  .heardRight {
    width: 10%;
  }
}
//推荐歌单
.recommendedSongList {
  margin: 0.4rem;
  .title {
    font-weight: 700;
  }
  .Carousel {
    .singleCarousel {
      position: relative;
      margin: 0.2rem 0.5rem 0 0;
      img {
        width: 2rem;
        background-color: rgba(196, 232, 243, 0.5);
        border-radius: 0.2rem;
      }
      p {
        font-size: 0.25rem;
      }
      .upperRightCorner {
        position: absolute;
        top: 0;
        right: 0;
        span {
          color: rgb(254, 253, 253);
          font-size: 0.24rem;
        }
        svg {
          font-size: 0.25rem;
          color: #fff;
        }
      }
    }
  }
}
</style>
