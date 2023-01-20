<template>
  <div>
    <!-- 上半部分 -->
    <div class="top">
      <van-icon name="arrow-left" class="arrow-left" @click="$router.go(-1)" />
      <div class="SearchBox">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
        <input
          type="text"
          v-model="songName"
          @keydown.enter="searchSong(songName)"
        />
      </div>
      <span @click="searchSong(songName)">搜索</span>
    </div>
    <!-- 历史记录 -->
    <div class="History">
      <div class="head">
        <p>历史</p>
        <van-icon name="delete-o" @click="cleanSearchHistoryList" />
      </div>
      <div class="value">
        <span
          v-for="item in searchHistoryList"
          :key="item"
          @click="ClickHistorySearch(item)"
          >{{ item }}</span
        >
      </div>
    </div>
    <!-- 底部 展示搜索歌曲结果 -->
    <div class="bottoms">
      <div>
        <ul>
          <li v-for="(item, index) in songs" :key="item.id" class="songListUl">
            <div class="songNo">{{ index + 1 }}</div>
            <div class="author" @click="playmusic(item)">
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
// 引入vant的Dialog弹出框组件
import { showDialog } from "vant";
import "vant/es/dialog/style";
import { mapState } from "vuex";
export default {
  name: "search",
  mounted() {
    this.searchHistoryList =
      JSON.parse(localStorage.getItem("searchHistoryList")) || [];
  },
  data() {
    return {
      //搜索历史
      searchHistoryList: [],
      //搜索的歌曲名
      songName: "起风了",
    };
  },
  computed: {
    ...mapState("search", ["songs"]),
    ...mapState("songPlayList", ["playList"]),
  },
  methods: {
    //搜索歌曲,并添加搜索历史
    searchSong(value) {
      if (value) {
        this.searchHistoryList.unshift(this.songName);
        //去重 防止出现重名 歌曲|歌手
        this.searchHistoryList = [...new Set(this.searchHistoryList)];
        //只展示五个搜索历史，多余的清除掉
        if (this.searchHistoryList.length > 5) {
          this.searchHistoryList.pop();
        }
        //将搜索历史保存到localStorage中
        localStorage.setItem(
          "searchHistoryList",
          JSON.stringify(this.searchHistoryList)
        );
        //获取搜索信息
        this.$store.dispatch("search/getCloudsearch", value);
        this.songName = "";
      } else {
        showDialog({
          message: "请输入歌手名或歌曲名，请不要为空！",
        });
      }
    },
    //清空搜索历史
    cleanSearchHistoryList() {
      this.searchHistoryList = [];
      localStorage.removeItem("searchHistoryList");
    },
    //通过点击历史记录进行搜索歌曲
    ClickHistorySearch(value) {
      this.$store.dispatch("search/getCloudsearch", value);
    },
    //点击歌曲后，将歌单中歌曲信息传入底部播放组件
    playmusic(item) {
      this.$store.commit("songPlayList/pushPlayList", item);
      this.$store.commit(
        "songPlayList/updataPlayListIndex",
        this.playList.length - 1
      );
    },
  },
};
</script>

<style lang="less" scoped>
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem;
  .arrow-left {
    width: 10%;
    font-size: 0.5rem;
  }
  .SearchBox {
    display: flex;
    align-items: center;
    background-color: rgb(231, 229, 229);
    border: 2px solid rgb(231, 229, 229);
    border-radius: 0.5rem;
    .icon {
      font-size: 0.4rem;
      margin: 0.1rem;
    }
    input {
      background-color: rgb(231, 229, 229);
    }
  }
  span {
    width: 15%;
    font-size: 0.4rem;
    font-weight: 700;
    text-align: center;
  }
}
.History {
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.3rem;
    font-size: 0.35rem;
    font-weight: 700;
  }
  .value {
    span {
      padding: 0.1rem 0.2rem;
      margin: 0.1rem 0.2rem;
      background-color: rgb(231, 229, 229);
      border: 2px solid rgb(231, 229, 229);
      border-radius: 0.5rem;
      display: inline-block;
    }
  }
}
//底部 展示搜索歌曲结果
.bottoms {
  width: 100%;
  background-color: #fff;
  padding-bottom: 1.5rem;
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
</style>
