<template>
    <div class="goods-list">

        <!--页面中实现跳转有两种方式-->
        <!--1. a链接的跳转-->
        <!--2.使用windows.loaction.href的形式叫做编程式导航-->
       <div class="goods-item" v-for="item in goodsList" :key="item.id" @click="goDetail(item.id)">
           <img :src="item.img_url" alt="">
           <h1 class="title">{{item.title}}</h1>
           <div class="info">
               <p class="price">
                   <span class="now">¥{{item.sell_price}}</span>
                   <span class="old">¥{{item.market_price}}</span>
               </p>
               <p class="sell">
                   <span>热卖中</span>
                   <span>剩余{{item.stock_quantity}}件</span>
               </p>
           </div>
       </div>

        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    export  default {
        data(){
            return {
                pageIndex:1,
                goodsList:[]

            }
        },
        created(){
            this.getGoodsList();
        },
        methods:{
            getGoodsList:function () {
                this.$http.get('api/getgoods?pageindex='+this.pageIndex).then(result=>{
                    if(result.body.status===0){
                            this.goodsList=this.goodsList.concat(result.body.message);

                    }else{
                        Toast("数据加载失败,刷新后重试....");
                    }
                });
            },
            getMore:function () {
                this.pageIndex++;
                this.getGoodsList();
            },
            goDetail:function (id) {
                //使用js的方式进行路由导航

                //注意区分：
                //this.$route  这个是路由【参数对象】,所有路由参数，params和query都属于他
                //this.$router 这个是路由【导航对象】,使用它可以进行路由的前进后退跳转到某一个链接

                //1.
                 this.$router.push('/home/goodsInfo/'+id);
                
            }
        }
    }
</script>


<style lang="scss" scoped>
    .goods-list{
        display:flex;
        flex-wrap: wrap;
        padding: 7px;
        justify-content: space-between;
        .goods-item{
            width: 49%;
            border:1px solid #ccc;
            box-shadow: 0 0 7px #ccc;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 273px;
            padding: 2px;
            img{
                width: 100%;
            }
            .title{
                font-size: 16px;
            }
            .info{
                background: #eee;
                p{
                    margin: 0;
                    line-height: 24px;
                }
                .price{
                    .now{
                        color: red;
                        font-size: 16px;
                        font-weight: bold;
                    }
                    .old{
                        font-size: 12px;
                        margin-left: 10px;
                        text-decoration: line-through;
                    }
                }
                .sell{
                    display: flex;
                    justify-content: space-between;
                    font-size: 13px;
                }
            }
        }
    }
</style>