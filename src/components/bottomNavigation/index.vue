<template>
  <!-- 底部导航 -->
  <div class="bottomNavigation">
    <ul>
      <li>
        <div
          class="iconbox"
          @click="switchAndJump(0)"
          :class="{ ischange: is == 0 }"
        >
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-yinle1"></use>
          </svg>
        </div>
        <p @click="switchAndJump(0)" :class="{ ischange2: is == 0 }">发现</p>
      </li>
      <li>
        <div
          class="iconbox"
          @click="switchAndJump(1)"
          :class="{ ischange: is == 1 }"
        >
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-guanzhu"></use>
          </svg>
        </div>
        <p @click="switchAndJump(1)" :class="{ ischange2: is == 1 }">播客</p>
      </li>
      <li>
        <div
          class="iconbox"
          @click="switchAndJump(2)"
          :class="{ ischange: is == 2 }"
        >
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-yinle"></use>
          </svg>
        </div>
        <p @click="switchAndJump(2)" :class="{ ischange2: is == 2 }">我的</p>
      </li>
      <li>
        <div
          class="iconbox"
          @click="switchAndJump(3)"
          :class="{ ischange: is == 3 }"
        >
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-yiguanzhu"></use>
          </svg>
        </div>
        <p @click="switchAndJump(3)" :class="{ ischange2: is == 3 }">关注</p>
      </li>
      <li>
        <div
          class="iconbox"
          @click="switchAndJump(4)"
          :class="{ ischange: is == 4 }"
        >
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shequ"></use>
          </svg>
        </div>
        <p @click="switchAndJump(4)" :class="{ ischange2: is == 4 }">社区</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "bottomNavigation",
  data() {
    return {
      is: 0,
    };
  },
  watch: {
    is() {
      if (!this.is) {
        this.is = 0;
      }
    },
  },
  mounted() {
    this.is = this.$route.query.is;
  },
  methods: {
    //切换图标样式并路由跳转
    switchAndJump(i) {
      this.is = i;
      switch (i) {
        case 0:
          this.$router.push({ name: "home", query: { is: this.is } });
          break;
        case 1:
          this.$router.push({ name: "podcast", query: { is: this.is } });
          break;
        case 2:
          this.$router.push({ name: "my", query: { is: this.is } });
          break;
        case 3:
          this.$router.push({ name: "follow", query: { is: this.is } });
          break;
        case 4:
          this.$router.push({ name: "community", query: { is: this.is } });
          break;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.bottomNavigation {
  position: fixed;
  bottom: 0.2rem;
  width: 100%;
  ul {
    display: flex;
    justify-content: space-around;
    li {
      text-align: center;
      .iconbox {
        width: 0.7rem;
        height: 0.7rem;
        border-radius: 50%;
        text-align: center;
        line-height: 0.7rem;
        svg {
          font-size: 0.5rem;
        }
      }
      p {
        font-size: 0.2rem;
      }
    }
  }
}
.ischange {
  color: rgb(253, 250, 250);
  background-color: rgb(248, 13, 13);
}
.ischange2 {
  margin-top: 0.1rem;
  color: rgb(248, 13, 13);
  font-weight: 700;
}
</style>
