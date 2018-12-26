<template>
    <div class="mt20 mr20 ml20 fonts">
        <Table  stripe  border :columns="columns" :data="tableList" :loading="loading" :disabled-hover="true"></Table>
         <Page :current="pager.page" :total="pager.count" :page-size="pager.size"  :class-name="'mt20'" @on-change="changePage" show-elevator show-total></Page>
    </div>
</template>
<script>
export default {
  data: function() {
    return {
      columns: [
        {
          title: "ID",
          key: "rowId"
        },
        {
          title: "竞标物资（一级分类）",
          key: "rowNameFir"
        },
        {
          title: "竞标物资（二级分类）",
          key: "rowNameSec"
        },
        {
          title: "所属项目",
          key: "rowPro"
        },
        {
          title: "所属公司",
          key: "rowBlong"
        },
        {
          title: "竞标开始时间",
          key: "rowTimeStar"
        },
        {
          title: "竞标结束时间",
          key: "rowTimeEnd"
        },
        {
          title: "竞标公司数量",
          key: "rowcount"
        },
        {
          title: "操作",
          key: "rowOpera",
          render: (h, params) => {
            return h("div", [
              h("a",{
                  on: {
                    click: () => {
                      this.$router.push({ name: 'biddingDetail', query: { userId: 123 ,status:'a'}})
                    }
                  }
                },"查看")
            ]);
          }
        }
      ],
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
  created: function() {
    const mockDate = {
      code: "succ",
      data: [
        {
          rowId: "11111111",
          rowNameFir: "五金",
          rowNameSec: "双扣聚氯乙烯增强管",
          rowPro: "安阳项目双扣聚氯乙烯增强管招标采购招标公告",
          rowBlong: "杭州招财猫网络科技有限公司",
          rowTimeStar: "2018-05-21  09:45:43",
          rowTimeEnd: "2018-05-21  09:45:43",
          rowcount: " 11",
          id: "1"
        },
        {
          rowId: "11111111",
          rowNameFir: "五金",
          rowNameSec: "双扣聚氯乙烯增强管",
          rowPro: "安阳项目双扣聚氯乙烯增强管招标采购招标公告",
          rowBlong: "杭州招财猫网络科技有限公司",
          rowTimeStar: "2018-05-21  09:45:43",
          rowTimeEnd: "2018-05-21  09:45:43",
          rowcount: " 11",
          id: "1"
        },
        {
          rowId: "11111111",
          rowNameFir: "五金",
          rowNameSec: "双扣聚氯乙烯增强管",
          rowPro: "安阳项目双扣聚氯乙烯增强管招标采购招标公告",
          rowBlong: "杭州招财猫网络科技有限公司",
          rowTimeStar: "2018-05-21  09:45:43",
          rowTimeEnd: "2018-05-21  09:45:43",
          rowcount: " 11",
          id: "1"
        },
        {
          rowId: "11111111",
          rowNameFir: "五金",
          rowNameSec: "双扣聚氯乙烯增强管",
          rowPro: "安阳项目双扣聚氯乙烯增强管招标采购招标公告",
          rowBlong: "杭州招财猫网络科技有限公司",
          rowTimeStar: "2018-05-21  09:45:43",
          rowTimeEnd: "2018-05-21  09:45:43",
          rowcount: " 11",
          id: "1"
        },
        {
          rowId: "11111111",
          rowNameFir: "五金",
          rowNameSec: "双扣聚氯乙烯增强管",
          rowPro: "安阳项目双扣聚氯乙烯增强管招标采购招标公告",
          rowBlong: "杭州招财猫网络科技有限公司",
          rowTimeStar: "2018-05-21  09:45:43",
          rowTimeEnd: "2018-05-21  09:45:43",
          rowcount: " 11",
          id: "1"
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

