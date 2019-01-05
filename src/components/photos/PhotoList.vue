<template>
    <div>
        <div id="slider" class="mui-slider ">
            <div id="sliderSegmentedControl"
                 class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item',item.id===0?'mui-active':'']" href="#item1mobile" data-wid="tab-top-subpage-1.html" v-for="item in categoryList" :key="item.id" @click="getPhotoListByCateId(item.id)">
                        {{item.title}}
                    </a>
                </div>
            </div>
        </div>


        <!--图片列表-->
        <ul class="img-list">
            <router-link v-for="item in list" :key="item.id" :to="'/home/photoInfo/'+item.id" tag="li">
                <img v-lazy="item.img_url">
                <div class="img-info">
                    <h1 class="img-title">{{item.title}}</h1>
                    <p class="img-body">{{item.zhaiyao}}</p>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>

    import {Toast} from 'mint-ui'
    //1.导入mui的js
    import mui from '../../lib/mui/js/mui.js';


    export default {

        data() {
            return {
                categoryList: [],
                list:[]
            }
        },
        created(){
            this.getAllCategory();

            this.getPhotoListByCateId(0);
        },
        mounted() {
            //2.初始化scroll
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },
        methods: {
            getAllCategory: function () {
                this.$http.get('api/getimgcategory').then(result => {
                    console.log(result.body);
                    if (result.body.status === 0) {
                        this.categoryList = result.body.message;
                        this.categoryList.unshift({
                            title: "全部",
                            id: 0
                        });
                    } else {
                        Toast("数据加载失败,请刷新后再试...")
                    }
                });
            },
            getPhotoListByCateId:function (cateId) {
                console.log("aaa");
                this.$http.get('api/getimages/'+cateId).then(result=>{

                    if(result.body.status===0){
                        //请求成功
                        this.list=result.body.message;
                    }else{
                        Toast("数据加载失败,请刷新后重试...");
                    }
                });
            }

        }

    }

</script>

<style lang="scss" scoped>
    * {
        touch-action: none;
    }

    .img-list{
        list-style: none;
        padding: 0;
        margin: 0;
        text-align: center;
        li{
            background-color: #ccc;
            box-shadow: 0 0 9px #999;
            margin-bottom: 10px;
            position: relative;
            img {
                width: 100%;
                vertical-align: middle;
            }

            img[lazy=loading] {
                width: 40px;
                height: 300px;
                margin: auto;
            }

            .img-info{
                position: absolute;
                max-height: 84px;
                color: #fff;
                text-align: left;
                bottom: 0;
                background-color: rgba(0,0,0,0.4);
                overflow: hidden;
                .img-title{
                    font-size: 14px;
                }
                .img-body{
                    color: #fff;
                    font-size: 13px;
                }
            }
        }
    }

</style>