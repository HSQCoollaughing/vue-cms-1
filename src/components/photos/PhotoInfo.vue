<template>
    <div class="photoinfo-container">
        <h3 class="photoInfo-title">{{ photoInfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间:{{photoInfo.add_time | dateFormat}}</span>
            <span>点击:{{photoInfo.click}}次</span>
        </p>
        <hr>

        <!--缩略图-->
        <div class="thumbs">
            <img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100" @click="$preview.open(index, list)" :key="item.src">
            <!--<vue-preview :slides="slide1"  height="100"  @close="handleClose"></vue-preview>-->
        </div>
        <!--图片区域-->
        <div class="content" v-html="photoInfo.content"></div>

        <!--放置一个现成的子评论组件-->
        <cms-box :id="id"></cms-box>
    </div>
</template>


<script>

    //1.导入评论子组件
    import comment from '../subcomponents/comment.vue'

    import {Toast} from 'mint-ui'

    export default {
        data() {
            return {
                id: this.$route.params.id,  //图片Id
                photoInfo: {},  //图片详情
                list: [] //缩略图
            }
        },
        created() {
            this.getPhotoInfo();
            this.getThumbs(this.id);
        },
        methods: {
            getPhotoInfo: function (imgId) {
                this.$http.get('api/getimageInfo/' + this.id).then(result => {
                    if (result.body.status === 0) {
                        this.photoInfo = result.body.message[0];
                    } else {
                        Toast('数据加载失败,请刷新重试...');
                    }
                });

            },
            getThumbs: function (id) {
                this.$http.get('api/getthumimages/' + this.id).then(result => {
                    if (result.body.status === 0) {
                        //请求数据成功
                        result.body.message.forEach(item => {
                            item.msrc = item.src;
                            item.w = 600,
                            item.h = 400
                        });
                        console.log(result.body.message);
                        this.list = result.body.message;
                    } else {
                        //请求数据失败
                        Toast('图片加载失败,请刷新后重试....');
                    }
                });
            },
            handleClose: function () {
                console.log('close event')
            }
        },
        components: {
            'cms-box': comment
        }


    }
</script>

<style lang="scss" scoped>
    .photoinfo-container {
        padding: 3px;
        h3 {
            color: #26a2ff;
            font-size: 15px;
            text-align: center;
            margin: 15px 0;
        }

        .subtitle {
            display: flex;
            justify-content: space-between;
            font-size: 13px;
        }
        .content {
            font-size: 13px;
            line-height: 30px;
        }

        .thumbs{
            img{
                height: 100px;
                margin: 5px 2px;
            }
        }
    }
</style>
