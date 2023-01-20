import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

const app = createApp(App);

//注册全局组件
import bottomNavigation from "@/components/bottomNavigation";
app.component(bottomNavigation.name, bottomNavigation);
import bottomPlay from "@/components/bottomPlay";
app.component(bottomPlay.name, bottomPlay);

app.use(store).use(router).mount("#app");
