<template>
    <div class="acDetail-wrap">
        <table class="table table-bordered">
            <tbody>
               <tr>
                   <td class="tdleft">活动名称</td>
                   <td><input type="text" v-model="active_name"> </td>
                   <td class="tdleft">显示时间</td>
                   <td>
                       <DatePicker v-model="star_date" type="datetime" placement="bottom" placeholder="请输入开始时间"></DatePicker>
                   </td>
               </tr> 
               <tr>
                   <td class="tdleft">添加banner</td>
                   <td>
                       <div v-if="!!image">
                            <img :src="image" alt="" width="100">
                       </div>
                       <input type="file" @change="fileChange">
                   </td>
                   <td class="tdleft">消失时间</td>
                   <td>
                        <DatePicker v-model="end_date" type="datetime" placement="bottom" placeholder="请输入结束时间"></DatePicker>
                   </td>
               </tr> 
               <tr>
                   <td class="tdleft">活动地址</td>
                   <td><textarea v-model="addr"></textarea></td>
                   <td class="tdleft">扩展颜色</td>
                   <td><input v-model="color" type="text"></td>
               </tr> 
            </tbody>
        </table>
        <Button type="primary" @click="subBtn" class="mt20 w100">添加</Button>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                activeList: [],
                star_date:'',
                end_date:'',
                active_name:'',
                addr:'',
                color:'',
                image:'',
                filesObj:''
            }
        },
        methods:{
            fileChange(e){
                var file = e.target.files
                this.filesObj = file
                if (window.createObjectURL != undefined) {
                    this.image = window.createObjectURL(file[0]);
                } else if (window.URL != undefined) {
                    this.image = window.URL.createObjectURL(file[0]);
                } else if (window.webkitURL != undefined) {
                    this.image = window.webkitURL.createObjectURL(file[0]);
                };
            },
            subBtn(){
                var formdata = new FormData();
                formdata.append('active_name',this.active_name)
                formdata.append('files',this.filesObj)
            }
        },
        created(){
        }
    }
</script>
<style scoped>
.acDetail-wrap{padding:30px;}
.acDetail-wrap table{width:1200px;}
</style>
