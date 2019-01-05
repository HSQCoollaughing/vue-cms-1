<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in newsListData" :key="item.id">
                <router-link href="javascript:;" :to="'/home/newsInfo/'+item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h1>{{item.title}}</h1>
                        <p class='mui-ellipsis'>
                            <span>创建时间:{{item.add_time | dateFormat}}</span>
                            <span>点击{{item.click}}次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>

    </div>
</template>

<script>

    import {Toast} from 'mint-ui'
    export default {
        data(){
            return {
                newsListData:[]
            }
        },
        created(){
          this.getNewsList();
        },
        methods:{
            getNewsList:function () {
                this.$http.get('api/getnewslist').then(result=>{

                    if(result.body.status==0){
                        //获取新闻列表数据成功
                        this.newsListData = result.body.message;
                    }else{
                        Toast("加载新闻列表数据失败...");
                    }
                })
            }


        }
    }
</script>

<style lang="scss" scoped>
    .mui-media-body{
        h1{
            font-size: 14px;
        }
        .mui-ellipsis{
            font-size: 12px;
            color: #226aff;
            display: flex;
            justify-content: space-between;
        }
    }
</style>