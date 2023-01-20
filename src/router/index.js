import { createRouter, createWebHistory } from "vue-router";
// Dialog
import { showDialog } from "vant";
import "vant/es/dialog/style";

const home = () => import("@/views/home");
const community = () => import("@/views/community");
const follow = () => import("@/views/follow");
const my = () => import("@/views/my");
const podcast = () => import("@/views/podcast");
const songList = () => import("@/views/songList");
const search = () => import("@/views/search");
const login = () => import("@/views/login");

const routes = [
  { path: "/", redirect: "/home" },
  {
    path: "/home",
    component: home,
    name: "home",
  },
  {
    path: "/community",
    component: community,
    name: "community",
  },
  {
    path: "/follow",
    component: follow,
    name: "follow",
  },
  {
    path: "/my",
    component: my,
    name: "my",
  },
  {
    path: "/podcast",
    component: podcast,
    name: "podcast",
  },
  {
    path: "/songList",
    component: songList,
    name: "songList",
  },
  {
    path: "/search",
    component: search,
    name: "search",
  },
  {
    path: "/login",
    component: login,
    name: "login",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path == "/my") {
    if (localStorage.getItem("token")) {
      next();
    } else {
      showDialog({
        message: "请先登录！",
      });
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
