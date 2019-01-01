//js入口

//导入Vue模块
import Vue from 'vue';

//导入MUI
import './lib/mui/css/mui.min.css'

//导入mintui
import { Header } from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.component(Header.name,Header);

//导入App.vue
import  App from "./App.vue";

var vm =  new Vue({
    el:"#app",
    render:c=>c(App)
})

