<template>

    <div class="gooddesc-container">
        <h3>
            {{goodDesc.title}}
        </h3>
        <hr>
        <div class="content" v-html="goodDesc.content"></div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    export  default {
        data(){
            return{
                id:this.$route.params.id,
                goodDesc:{}
            }
        },
        created(){
            this.getGoodDesc();
        },
        methods:{
            getGoodDesc:function () {
                this.$http.get('api/goods/getdesc/'+this.id).then(result=>{
                        if(result.body.status===0){
                            this.goodDesc = result.body.message[0];
                        }else{
                            Toast("数据加载失败，请刷新后重试...");
                        }
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .gooddesc-container{
        padding: 4px;
        h3{
            font-size: 16px;
            color: #226aff;
            text-align: center;
            margin: 15px 0;
        }
        .content{
            img{
                width:100%;
            }
        }
    }
</style>