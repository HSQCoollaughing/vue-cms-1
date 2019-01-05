<template>
    <div>

        <!--轮播图区域-->
        <swiper :lunboData="lunboData" :isfull="true"></swiper>

        <!--六宫格导航-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newslist">
                    <img src="../../images/menu1.png" alt="">
                    <div class="mui-media-body">新闻资讯</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/PhotoList">
                    <img src="../../images/menu2.png" alt="">
                    <div class="mui-media-body">图片分享</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/goodsList">
                    <img src="../../images/menu3.png" alt="">
                    <div class="mui-media-body">商品购买</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <img src="../../images/menu4.png" alt="">
                    <div class="mui-media-body">留言反馈</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <img src="../../images/menu5.png" alt="">
                    <div class="mui-media-body">视频专区</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <img src="../../images/menu6.png" alt="">
                    <div class="mui-media-body">联系我们</div>
                </a>
            </li>
        </ul>

    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    import swiper from '../subcomponents/swiper.vue'

    export default {
        data() {
            return {
                lunboData: []  //轮播图的数据
            }
        },
        created() {
            this.getLunboData();
        },
        methods: {
            getLunboData() {
                this.$http.get("api/getlunbo").then(result=>{

                    if(result.body.status===0){
                        //请求成功
                        this.lunboData = result.body.message;

                    }else{
                        //请求失败
                        Toast("轮播图加载失败...");
                    }
                });
            }
        },
        components:{
            swiper
        }
    }
</script>

<style lang="scss" scoped>


    .mui-grid-view.mui-grid-9 {
        border-top: none;
        border-left: none;
        background-color: #fff;

        .mui-table-view-cell {
            border-right:none;
            border-bottom: none;
        }

        img{
            width: 60px;
            height: 60px;
        }
        .mui-media-body{
            font-size: 13px;
        }

    }
</style>