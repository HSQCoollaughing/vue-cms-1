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
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoList from './components/photos/PhotoList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'
import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'
import GoodsDesc from './components/goods/GoodsDesc.vue'
import GoodsComment from './components/goods/GoodsComment.vue'

//3.定义VueRouter实例
var router = new VueRouter({
    routes:[
        {path:"/",redirect:"/home"},
        {path:"/home",component:HomeContaier},
        {path:"/member",component:MemberContainer},
        {path:"/shopcar",component:ShoppingCarContainer},
        {path:"/search",component:SearchContainer},
        {path:"/home/newslist",component:NewsList},
        {path:"/home/newsInfo/:id",component:NewsInfo},
        {path:"/home/PhotoList",component:PhotoList},
        {path:"/home/photoInfo/:id",component:PhotoInfo},
        {path:"/home/goodsList",component:GoodsList},
        {path:"/home/goodsInfo/:id",component:GoodsInfo},
        {path:"/home/goodsdesc/:id",component:GoodsDesc,name:'gooddesc'},
        {path:"/home/goodscomment/:id",component:GoodsComment,name:'goodcomment'},
    ],
    linkActiveClass:"mui-active"
});

export default router;