import { createApp } from 'vue'
//import './style.css'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import myconfirm from './utils/myconfirm'
//国际化
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//引入Pinia构造函数
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
//引入按钮权限
import { permission } from './directives/permission'
// 实例化 Pinia
const pinia = createPinia()
pinia.use(piniaPersist)
const app = createApp(App);
app.use(router).use(ElementPlus, {
  locale: zhCn,
}).use(pinia).mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
//注册自定义指令
app.directive('permission',permission)
//全局挂载
app.config.globalProperties.$myconfirm = myconfirm;