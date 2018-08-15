<template>
    <div class="mt20 mr20 ml20 fonts">
       <table class="table table-striped ">
         <thead>
           <tr>
             <th>项目ID</th>
             <th>项目名称</th>
             <th>企业名称</th>
             <th>申请时间</th>
             <th>审核状态</th>
             <th>操作</th>
           </tr>
         </thead>
         <tbody v-if="tableList.length">
           <tr v-for="ta in tableList">
             <td>{{ta.rowId}}</td>
             <td>{{ta.rowName}}</td>
             <td>{{ta.entName}}</td>
             <td>{{ta.timer}}</td>
             <td :class="{'c-f00':ta.status == 1}">{{ta.status | statusFilter}} 
               <span v-if="ta.status == 4">
                 <Tooltip :content="ta.failReson" placement="bottom">
                    <Icon type="android-alert" size="15"></Icon>
                </Tooltip>
               </span>
               </td>
             <td>
              <router-link to="/proOne">查看</router-link>
              <router-link to="/proOne">合同</router-link>
             </td>
           </tr>
         </tbody>
         <tbody v-else>
           <tr>
             <td colspan="6">未找到数据。。。。</td>
           </tr>
         </tbody>
       </table>
       </div>
</template>
<script>
export default {
  data: function() {
    return {
      loading: true,
      tableList: [],
      pager:{
          page:1,
          size:15,
          count: 0
      }
    };
  },
  methods: {
      changePage(n){

      }
  },
  filters:{
    statusFilter(val){
      if(val == 1){
        return '待审核'
      }else if(val == 2){
        return '发布中'
      }else if(val == 3){
         return '已结束'
      }else if(val == 4){
         return '审核失败'
      }
    }
  },
  created: function() {
    const mockDate = {
      code: "succ",
      data: [
        {
          rowId: "11111111",
          rowName: "安阳项目双扣聚氯乙烯增强管招标采购招标公告",
          entName: "杭州招财猫网络科技有限公司",
          timer: " 2018-05-21  09:45:43",
          status: 1,
          code:'1010as'
        },
        {
          rowId: "11111111",
          rowName: "安阳项目双扣聚氯乙烯增强管招标采购招标公告",
          entName: "杭州招财猫网络科技有限公司",
          timer: " 2018-05-21  09:45:43",
          status: 2,
          code:'1010as'
        },
        {
          rowId: "11111111",
          rowName: "安阳项目双扣聚氯乙烯增强管招标采购招标公告",
          entName: "杭州招财猫网络科技有限公司",
          timer: " 2018-05-21  09:45:43",
          status: 3,
          code:'1010as'
        },
        {
          rowId: "11111111",
          rowName: "安阳项目双扣聚氯乙烯增强管招标采购招标公告",
          entName: "杭州招财猫网络科技有限公司",
          timer: " 2018-05-21  09:45:43",
          status: 4,
          failReson:'提交失败原因！',
          code:'1010as'
        },
        {
          rowId: "11111111",
          rowName: "安阳项目双扣聚氯乙烯增强管招标采购招标公告",
          entName: "杭州招财猫网络科技有限公司",
          timer: " 2018-05-21  09:45:43",
          status: 4,
          failReson:'逗比原因！',
          code:'1010as'
        }
      ]
    };
    if (mockDate.code == "succ") {
      this.tableList = mockDate.data;
      this.loading = false;
    }
    console.log(this.$route)
  }
};
</script>
<style>
.ivu-table{font-size: 14px;}
</style>

