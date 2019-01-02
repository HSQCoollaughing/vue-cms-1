//js入口

//导入Vue模块
import Vue from 'vue'

//1.导入Vue-Router
import VueRouter from 'vue-router'
//2.在Vue中添加VueRouter
Vue.use(VueRouter)

//导入MUI
import './lib/mui/css/mui.min.css'

//导入icons-extra的样式
import './lib/mui/css/icons-extra.css'

//导入mintui
import { Header,Swipe, SwipeItem} from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.component(Header.name,Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)

//导入App.vue
import  App from "./App.vue";

//导入Vue-rescource
import VueRescource from 'vue-resource'
Vue.use(VueRescource)

import router from './router.js'

var vm =  new Vue({
    el:"#app",
    render:c=>c(App),
    router
})

