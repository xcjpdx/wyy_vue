import api from "./axios";

// 获取推荐歌单数据
export const reqgetpersonalized = () =>
  api({
    url: `/personalized?limit=10`,
    method: "get",
  });

// 获取歌单详情
export const reqGetPlayListDetail = (id) =>
  api({
    url: `/playlist/detail?id=${id}`,
    method: "get",
  });

// 获取歌单所有歌曲
export const reqGetPlayList = (id) =>
  api({
    url: `/playlist/track/all?id=${id}`,
    method: "get",
  });

// 获取歌词
export const reqGetLyric = (id) =>
  api({
    url: `/lyric?id=${id}`,
    method: "get",
  });

// 通过搜索获取歌曲
export const reqGetCloudsearch = (value) =>
  api({
    url: `/cloudsearch?keywords=${value}`,
    method: "get",
  });

// 用户登录
export const login = (value) =>
  api({
    url: `/login/cellphone?phone=${value.phone}&captcha=${value.verificationCode}`,
    method: "get",
  });

// 发送验证码
const cookie = "myCookie";
export const captcha = (value) =>
  api({
    url: `/captcha/sent?phone=${value}`,
    method: "get",
    header: { Cookie: cookie },
  });
