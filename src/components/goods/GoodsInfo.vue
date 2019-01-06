<template>
    <div class="goodInfo-container">

        <!--购物球-->
        <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>


        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :lunboData="lunboData" :isfull="false"></swiper>
                </div>
            </div>
        </div>

        <div class="mui-card">
            <div class="mui-card-header">{{goodInfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价:
                        <del>¥ {{ goodInfo.market_price }}</del>&nbsp;&nbsp; 销售价: <span
                            class="now_price">¥{{goodInfo.sell_price}}</span>
                    </p>
                    <p>
                        购买数量:
                        <numberbox @getCount="getCount" :max="goodInfo.stock_quantity"></numberbox>

                        <!--小球需要获取numberbox中的数量，涉及子组件向父组件传值-->
                    </p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToCar">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>

        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{goodInfo.goods_no}}</p>
                    <p>库存情况：{{goodInfo.stock_quantity}}</p>
                    <p>上架时间：{{goodInfo.add_time | dateFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    import swiper from '../subcomponents/swiper.vue'
    import numberbox from '../subcomponents/goodInfo_numbox.vue'

    export default {
        data() {
            return {
                id: this.$route.params.id,
                lunboData: [],
                goodInfo: {},
                ballFlag:false , //控制小球的隐藏和显示
                numberCount:1
            }
        },
        created() {
            this.getLunboData();
            this.getGoodInfo();
        },
        methods: {
            getLunboData: function () {
                this.$http.get('api/getthumimages/' + this.id).then(result => {
                    if (result.body.status === 0) {
                        result.body.message.forEach(item => {
                            item.img = item.src;
                            item.id = item.src;
                        });
                        this.lunboData = result.body.message;
                    } else {
                        Toast('数据加载失败，请刷新后重试...');
                    }
                });
            },
            getGoodInfo: function () {
                this.$http.get('api/goods/getinfo/' + this.id).then(result => {
                    if (result.body.status === 0) {
                        this.goodInfo = result.body.message[0];
                    } else {
                        Toast("数据加载失败，请刷新后重试...");
                    }
                })
            },
            goDesc: function (id) {
                this.$router.push({name: "gooddesc", params: id});
            },
            goComment: function (id) {
                this.$router.push({name: "goodcomment", params: id});
            },
            addToCar:function () {
                this.ballFlag = !this.ballFlag;

                //将商品信息组织成需要饿格式
                var  product = {
                    id:this.goodInfo.id,
                    count:this.numberCount,
                    price:this.goodInfo.sell_price,
                    selected:true
                };


                this.$store.commit('addToCar',product);


            },
            beforeEnter:function (el) {
                el.style.transform='translate(0,0)';
            },
            enter:function (el,done) {

             // 小球动画优化思路：
             // 1. 先分析导致 动画 不准确的 本质原因： 我们把 小球 最终 位移到的 位置，已经局限在了某一分辨率下的 滚动条未滚动的情况下；
             // 2. 只要分辨率和 测试的时候不一样，或者 滚动条有一定的滚动距离之后， 问题就出现了；
             // 3. 因此，我们经过分析，得到结论： 不能把 位置的 横纵坐标 直接写死了，而是应该 根据不同情况，动态计算这个坐标值；
             // 4. 经过分析，得出解题思路： 先得到 徽标的 横纵 坐标，再得到 小球的 横纵坐标，然后 让 y 值 求差， x 值也求 差，得到 的结果，就是横纵坐标要位移的距离
             // 5. 如何 获取 徽标和小球的 位置？？？   domObject.getBoundingClientRect()

                el.offsetWidth;

                //获取小球的起始位置

                const starPosition = this.$refs.ball.getBoundingClientRect();

                //获取小球应该结束的位置
                const endPosition = document.querySelector("#badge").getBoundingClientRect();

                const xDistance = endPosition.left - starPosition.left;
                const yDistance = endPosition.top - starPosition.top;

                el.style.transform=`translate(${xDistance}px,${yDistance}px)`;
                el.style.transition='all 0.3s cubic-bezier(.4,-0.3,1,.68)';
                done();
            },
            afterEnter:function (el) {
                this.ballFlag=false;
            },
            getCount(count){
                this.numberCount = count;
            }
        },
        components: {
            swiper,
            numberbox
        }
    }
</script>

<style lang="scss" scoped>
    .goodInfo-container {
        .now_price {
            color: red;
            font-size: 16px;
            font-weight: bold;
        }
        .mui-card-footer {
            display: block;
            button {
                margin: 15px 0;
            }
        }

        .ball {
            width: 15px;
            height: 15px;
            background: red;
            border-radius: 50%;
            position: absolute;
            left: 142px;
            top: 408px;
            z-index: 999;
        }
    }


</style>