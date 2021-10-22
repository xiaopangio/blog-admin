import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./premission.js"
import store from "./store";
import ElementPlus from 'element-plus'
import 'normalize-css'
import 'element-plus/dist/index.css'
import './setRem.js'
const app = createApp(App)
app.use(ElementPlus)
app.use(store)
app.use(router)
app.mount("#app");
