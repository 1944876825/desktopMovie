import {createApp} from 'vue'
import App from './App.vue'
import router from "./router";

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/css/dark.scss'
// import 'element-plus/theme-chalk/dark/css-vars.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import './assets/css/style.css';

const app = createApp(App)
app.use(ElementPlus, {
    locale: zhCn,
})
app.use(router)
app.mount('#app')
