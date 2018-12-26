<template>
    <div class="activity-wrap">
        <div class="text-right mt20 mb20">
            <Button type="primary" @click="addItem" class="mr20 input-mini">添加</Button>
        </div>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>ID编号</th>
                    <th>图片</th>
                    <th>活动名称</th>
                    <th>显示时间</th>
                    <th>消失时间</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="activeList.length">
                    <tr v-for="v in activeList">
                        <td>{{v.id}}</td>
                        <td>
                            <img :src="v.imgurl" width="240" height='50px'>
                            </td>
                        <td>{{v.name}}</td>
                        <td>{{v.showTime}}</td>
                        <td>{{v.hideTime}}</td>
                        <td>{{v.status}}</td>
                        <td><a href="">查看</a></td>
                    </tr>
                </template>
                <template v-else>
                    <tr>
                        <td colspan="7">没有数据。。。</td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                activeList: [],
            }
        },
        methods:{
            addItem(){
                this.$router.push({name:'activityDetail'})
            }
        },
        created(){
            var mokeData = {
                code: 'SUCC',
                data: [
                    {
                        id: 101,
                        imgurl:require('@/assets/images/active.png'),
                        name:'开业大吉',
                        showTime:'2018-01-02 19:51:32',
                        hideTime:'2018-01-02 19:51:32',
                        status:'进行中'
                    },
                    {
                        id: 101,
                        imgurl:require('@/assets/images/active.png'),
                        name:'开业大吉',
                        showTime:'2018-01-02 19:51:32',
                        hideTime:'2018-01-02 19:51:32',
                        status:'进行中'
                    },
                    {
                        id: 101,
                        imgurl:require('@/assets/images/active.png'),
                        name:'开业大吉',
                        showTime:'2018-01-02 19:51:32',
                        hideTime:'2018-01-02 19:51:32',
                        status:'进行中'
                    }
                ]
            }
            if(mokeData.code == 'SUCC'){
                this.activeList = mokeData.data
            }
        }
    }
</script>
<style scoped>
.activity-wrap{padding:0 10px;}
</style>
