<template>
    <div class="newsinfo-container">

        <!--新闻标题-->
        <h3 class="title">{{newsInfo.title}}</h3>

        <!--新闻子标题-->
        <p class="subtitle">
            <span>发表时间:{{newsInfo.add_time|dateFormat}}</span>
            <span>点击{{ newsInfo.click }}次</span>
        </p>

        <hr>
        <!--新闻内容-->
        <div class="newsContent" v-html=newsInfo.content >

        </div>


        <!--评论区域-->
        <comment-box :id="id"></comment-box>
    </div>
</template>

<script>
    import comment from '../subcomponents/comment.vue'

    export default{
        data(){
            return {
               id:this.$route.params.id,
                newsInfo:{}
            }
        },
        created(){
          this.getNewInfo();
        },
        methods:{
            getNewInfo:function () {
                this.$http.get('api/getnew/'+this.id).then(result=>{

                    if(result.body.status===0){
                        this.newsInfo = result.body.message[0];
                    }else{
                        Toast("该新闻信息加载失败...");
                    }
                })
            }
        },
        components:{
            "comment-box":comment
        }
    }
</script>

<style lang="scss" >
    .newsinfo-container{
        padding: 0 4px;
        .title{
            font-size: 16px;
            text-align: center;
            line-height: 24px;
        }

        .subtitle{
            font-size: 13px;
            color: #226aff;
            display: flex;
            justify-content: space-between;
        }

        .newsContent{
                img{
                    width: 100%;
                }
        }
    }
</style>