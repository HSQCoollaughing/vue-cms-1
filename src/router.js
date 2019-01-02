/**
 * Created by wuyaru
 * Author: wuyaru
 * Date: 2019/1/1
 * Time: 13:35
 *
 */

//1.导入vueRouter模块
import VueRouter from 'vue-router';

//2.导入组件
import HomeContaier from './components/tabbars/HomeContainer.vue'
import MemberContainer from './components/tabbars/MemberContainer.vue'
import ShoppingCarContainer from './components/tabbars/ShoppingCarContainer.vue'
import SearchContainer from './components/tabbars/SearchContainer.vue'

//3.定义VueRouter实例
var router = new VueRouter({
    routes:[
        {path:"/",redirect:"/home"},
        {path:"/home",component:HomeContaier},
        {path:"/member",component:MemberContainer},
        {path:"/shopcar",component:ShoppingCarContainer},
        {path:"/search",component:SearchContainer},
    ],
    linkActiveClass:"mui-active"
});

export default router;