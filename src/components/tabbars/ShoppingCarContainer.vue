<template>
    <div class="shopcar-container">

        <!--购物车商品列表区域-->
        <div class="goodsList">

            <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">

                        <!--开关-->
                        <mt-switch
                                v-model="$store.getters.getGoodsSelected[item.id]"
                                @change="selectedChange(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>

                        <!--图片-->
                        <img :src="item.thumb_path" alt="">

                        <div class="info">
                            <h1>{{item.title}}</h1>
                            <p>
                                <span class="price">￥{{item.sell_price}}</span>
                                <numberbox style="height: 25px" :initCount="$store.getters.getGoodsCount[item.id]" :goodsId="item.id"></numberbox>

                                <!--如何获取本地的数量数据更新购物车中对应产品的数量-->
                                <!-- 1. 我们可以先创建一个 空对象，然后循环购物车中所有商品的数据，
                                        把 当前循环这条商品的 Id， 作为 对象 的 属性名，count值作为 对象的 属性值，
                                        这样，当把所有的商品循环一遍，就会得到一个对象： { 88: 2, 89: 1, 90: 4 } -->

                                <a href="javascript:;" @click.prevent="remove(item.id,i)">删除</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <!--商品结算区域-->
        <div class="mui-card">

            <div class="mui-card-content">
                <div class="mui-card-content-inner jiesuan">
                   <div class="left">
                       <p>总计(不含运费)</p>
                       <p>已勾选商品 <span class="red">{{$store.getters.getCountAndAmount.count}}</span> 件,总价  <span class="red">￥{{$store.getters.getCountAndAmount.amount}}</span> 元</p>
                   </div>

                    <mt-button type="danger" >去结算</mt-button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import numberbox from '../subcomponents/shopcar_numbox.vue'
    export default{
           data(){
               return {
                   goodslist:[]
               }
           },
            created(){
               this.getGoodsList();
            },
           methods:{
                getGoodsList:function () {
                    //1.获取所有store上存储的商品Id，然后使用逗号拼接一个字符串
                    var idArr =[];
                    this.$store.state.car.forEach(item=>{
                        idArr.push(item.id);
                    });

                    //如果购物车中没有数据
                    if(idArr.length<=0){
                        return;
                    }
                    this.$http.get('api/goods/getshopcarlist/'+idArr.join(",")).then(result=>{
                        if(result.body.status===0) {
                            this.goodslist = result.body.message;
                        }
                    });
                },
               remove(id,index){
                    //需要将goodslist列表中该项去除，同样需要将store中的该项数据去除
                   this.goodslist.splice(index,1);
                    this.$store.commit('removeFormCar',id);
               },
               selectedChange(id,value){
                   this.$store.commit('updateGoodsSelected',{
                       id:id,
                       value:value
                   });
               }
           },
        components:{
               numberbox
        }
    }
</script>

<style lang="scss" scoped>
.shopcar-container{
    background-color: #eee;
    overflow: hidden;
    .goodsList{
        .mui-card-content-inner {
            display: flex;
            align-items: center;

            img{
                width: 60px;
                height: 60px;
            }
            h1{
                font-size: 13px;
            }
            .info{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .price{
                    color: red;
                    font-weight: bold;
                }
            }
        }
    }
    .jiesuan{
        display: flex;
        justify-content: space-between;
        .red{
            color: red;
            font-weight: bold;
        }
    }

}
</style>