import { createStore } from "vuex";
import home from "./modules/home";
import songPlayList from "./modules/songPlayList";
import search from "./modules/search";
import login from "./modules/login";

export default createStore({
  modules: {
    home,
    songPlayList,
    search,
    login,
  },
});
