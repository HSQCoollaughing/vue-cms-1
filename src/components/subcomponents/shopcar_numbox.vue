<template>
    <div class="mui-numbox" data-numbox-min='1' data-numbox-step='1'>
        <!--最大值需要根据父组件中产品的库存来设置-->
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value ="initCount" ref="numbox"  readonly  @change="countChanged"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.min.js'

    export default {
        mounted(){
            mui(".mui-numbox").numbox();
        },
        methods:{
            countChanged:function () {
                //每当数值改变，立即将更新的数据放到store中
                var goodInfo={
                    id:this.goodsId,
                    count:this.$refs.numbox.value
                }
                this.$store.commit('updateCar',goodInfo);
            }
        },
        props:["initCount","goodsId"],
        watch:{

        }
    }
</script>
<style lang="scss" scoped>

</style>