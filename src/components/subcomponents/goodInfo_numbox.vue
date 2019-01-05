<template>
    <div class="mui-numbox" data-numbox-min='1'>
        <!--最大值需要根据父组件中产品的库存来设置-->
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.min.js'
export default {
    methods:{
        countChanged:function () {

            var value = this.$refs.numbox.value;
            this.$emit("getCount",value);
        }
    },
    props:["max"],
    watch:{
        //属性监听
        max:function (newValue,oldValue) {
            //使用JS API设置最大值
            console.log(newValue);
            mui(".mui-numbox").numbox().setOption('max',parseInt(newValue));
        }
    }
}
</script>
<style lang="scss" scoped>

</style>