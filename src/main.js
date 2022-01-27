import { createApp } from "vue";
import App from "./Theme.vue";
import router from "./router";
import store from "./store";
import 'axios';

createApp(App).use(router).use(store).mount("#app");
