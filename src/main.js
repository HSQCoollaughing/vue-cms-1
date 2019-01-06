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
// import { Header,Swipe, SwipeItem,Button} from 'mint-ui'
// import 'mint-ui/lib/style.css'
// Vue.component(Header.name,Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button)

import Mintui from 'mint-ui';
import 'mint-ui/lib/style.css'

Vue.use(Mintui)

//导入App.vue
import App from "./App.vue";

//导入Vue-rescource
import VueRescource from 'vue-resource'

Vue.use(VueRescource)

Vue.http.options.root = 'http://www.liulongbin.top:3005/'
Vue.http.options.emulateJSON = true


//导入preview
import VuePreview from 'vue-preview'

Vue.use(VuePreview)

import momoent from 'moment'
//定义时间格式化过滤器
Vue.filter('dateFormat', function (data, pattern = 'YYYY-MM-DD HH:mm:ss') {

    return momoent(data).format(pattern);
})

import router from './router.js'


//导入vuex
import Vuex from 'vuex'

Vue.use(Vuex)

//每次进入网站一定会先执行main.js
const car = JSON.parse(localStorage.getItem('car'))||[];
const store = new Vuex.Store({
    state: { //this.$store.state.***
        car: car  //将购物车中商品的数据使用数组存储起来
        //暂定商品数据的结构设计成{id:商品的id,count:要购买的数量,price:商品的单价，selected:是否被选中}
    },
    mutations: { //this.$store.commit('方法名')
        //点击加入购物车，将商品信息添加到购物车中
        addToCar: function (state, goodInfo) {
            //分析：
            //添加的商品在购物车中已存在

            var flag = false;
            state.car.some(item => {
                if (item.id === goodInfo.id) {
                    item.count += parseInt(goodInfo.count);
                    flag = true;
                    return true;
                }
            });

            //添加的商品在购物车中不存在
            if(!flag){
                state.car.push(goodInfo);
            }

            //将购物车中的数据保存到本地存储中
            localStorage.setItem('car',JSON.stringify(state.car));

        },
        //更新购物车
        updateCar:function (state, goodInfo) {
            state.car.some(item => {
                if (item.id === goodInfo.id) {
                    item.count = parseInt(goodInfo.count);
                    return true;
                }
            });

            //将购物车中的数据保存到本地存储中
            localStorage.setItem('car',JSON.stringify(state.car));
        },
        //删除商品
        removeFormCar:function (state,id) {
            state.car.some((item,i)=> {
                if (item.id === id) {
                   state.car.splice(i,1);
                    return true;
                }
            });

            //将购物车中的数据保存到本地存储中
            localStorage.setItem('car',JSON.stringify(state.car));
        },
        updateGoodsSelected:function (state,selectObj) {

            state.car.some((item,i)=> {
                if (item.id === selectObj.id) {
                   item.selected = selectObj.value;
                    return true;
                }
            });
            //将购物车中的数据保存到本地存储中
            localStorage.setItem('car',JSON.stringify(state.car));
        }
    },
    getters: { //$store.getters.***
        getAllCount(state){
            var total = 0;
            state.car.forEach(item=>{
                total+= parseInt(item.count);
            });
            return total;
        },
        getGoodsCount(state){
            var countObj = {};
            state.car.forEach(item=>{
                countObj[item.id] = item.count;
            });
            return countObj;
        },
        getGoodsSelected(state){

            var selectedObj = {};
            state.car.forEach(item=>{
                selectedObj[item.id] = item.selected;
            });
            return selectedObj;
        },
        getCountAndAmount(state){
            var obj = {
                count:0,
                amount:0
            };

            state.car.forEach(item=>{
                if(item.selected){
                 obj.count+=item.count;
                 obj.amount +=item.price;
                }

            });
            console.log(obj);
            return obj;
        }
    }
});

var vm = new Vue({
    el: "#app",
    render: c => c(App),
    router,
    store
})

