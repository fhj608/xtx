import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import pinia from './stores'

import '@/styles/common.scss'

// 图片懒加载插件
import { imgLazyPlugin } from '@/directives'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(imgLazyPlugin)
app.mount('#app')
