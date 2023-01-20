function remSize() {
  // 获取设备的宽度
  var deviceWidth = document.documentElement.clientWidth || window.innerWidth;
  // 控制设备宽度的最大 | 最小值
  if (deviceWidth > 750) {
    deviceWidth = 750;
  }
  if (deviceWidth < 320) {
    deviceWidth = 320;
  }
  // 设置rem的大小(除7.5是为了让rem换算的px是整数100,这样方便计算)
  // 750px --> 1rem=100px
  // 375px --> 1rem=50px
  document.documentElement.style.fontSize = deviceWidth / 7.5 + "px";
  // 设置字体大小
  document.querySelector("body").style.fontSize = 0.3 + "rem";
}
remSize();
window.onresize = function () {
  remSize();
};
