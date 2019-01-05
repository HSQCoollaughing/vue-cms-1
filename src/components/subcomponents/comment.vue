<template>
    <div class="cms-container">
        <h3>最新评论</h3>
        <hr>
        <textarea placeholder="请输入要BB的内容（做多吐槽120字)" maxlength="120" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
        <div class="cms-list">
            <div class="cms-item" v-for="(item,i) in commentList" :key="item.add_time">
                <div class="cms-title">
                    第{{i + 1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time | dateFormat}}
                </div>
                <div class="cms-body">
                    {{item.content === 'undefined' ? "这个用户太懒了,什么都没有说" : item.content}}
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'

    export default {
        data() {
            return {
                pageIndex: 1,  //页码数
                commentList: [],  //评论列表
                msg: ""  //评论信息
            }
        },
        created() {
            this.getComments();
        },
        methods: {
            getComments: function () {
                this.$http.get('api/getcomments/' + this.id + '?pageindex=' + this.pageIndex).then(result => {
                    if (result.body.status === 0) {

                        this.commentList = this.commentList.concat(result.body.message);

                    } else {
                        Toast("评论数据加载失败...");
                    }
                });
            },
            getMore: function () {
                this.pageIndex++;
                this.getComments();
            },
            postComment: function () {
                //1.校验输入的评论内容是否为空
                if (this.msg.trim().length === 0) {
                    return Toast("评论内容不能为空！");
                }

                //2.发送请求到服务器
                this.$http.post('api/postcomment/' + this.$route.params.id, {
                    content: this.msg
                }).then(result => {
                    if (result.body.status === 0) {
                        //2.1将评论内容封装成一个评论对象
                        var comment = {
                            add_time: Date.now(),
                            user_name: '匿名用户',
                            content: this.msg
                        }
//                        2.2将最新的评论添加到评论列表中
                        this.commentList.unshift(comment);
//                        2.3清空评论框
                        this.msg = '';
                    } else {
                        Toast("发表失败，请稍后再试...");
                    }
                })
            }
        },
        props: ["id"]
    }
</script>

<style lang="scss" scoped>
    .cms-container {
        h3 {
            font-size: 18px;
        }
        textarea {
            font-size: 14px;
            height: 85px;
            margin: 0;
        }
        .cms-list {
            margin: 5px 0;
            .cms-item {
                font-size: 13px;
                .cms-title {
                    background-color: #ccc;
                    line-height: 30px;
                }
                .cms-body {
                    line-height: 35px;
                    text-indent: 2em;
                }
            }
        }

    }
</style>