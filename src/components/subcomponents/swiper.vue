<template>
    <div>

        <mt-swipe :auto="4000">
            <!--谁需要使用轮播图组件需要向其传递lunboData-->
            <mt-swipe-item v-for="item in lunboData" :key="item.id">
                <a :href="item.url">
                    <img :src="item.img" alt="" :class="{'full':isfull}">
                </a>
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
    export default {
        props:['lunboData','isfull']
    }
</script>

<style lang="scss" scoped>

    .mint-swipe {
        height: 200px;
        .mint-swipe-item {

            a {
                display: block;
                width: 100%;
                height: 100%;
                text-align: center;
                img {

                    height: 100%;
                }
            }
        }
    }

    .full{
        width: 100%;
    }

</style>