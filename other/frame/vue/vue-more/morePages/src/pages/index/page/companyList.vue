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
          key: "rowId",
          align: "center"
        },
        {
          title: "手机号",
          key: "phone",
          align: "center"
        },
        {
          title: "企业名称/姓名",
          key: "rowName",
          align: "center"
        },
        {
          title: "注册时间",
          key: "rowTime",
          align: "center"
        },
        {
          title: "账号类型",
          key: "rowType",
          align: "center"
        },
        {
          title: "审核状态",
          key: "rowStatus",
          align: "center",
          render: (h, params) => {
            if (params.row.rowStatus == "认证失败") {
              return h("div", [
                h("span", "认证失败"),
                h(
                  "Tooltip",
                  {
                    props: {
                      placement: "bottom",
                      content: params.row.failInfo
                    }
                  },
                  [
                    h("Icon", {
                      props: {
                        type: "android-alert",
                        size: "15"
                      },
                      class: {
                        ml5: true
                      },
                      style: {
                        cursor: "pointer",
                        verticalAlign: "middle"
                      }
                    })
                  ]
                )
              ]);
            } else {
              return h("span", params.row.rowStatus);
            }
          }
        },
        {
          title: "操作",
          key: "rowOpera",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("a",{
                  on: {
                    click: () => {
                      this.$router.push({ name: 'companyDetail', query: { userId: 123 ,status:'a'}})
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
          phone: "13712345678",
          rowName: "杭州招财猫网络科技有限公司",
          rowTime: "2018-05-21",
          rowType: "供应商",
          rowStatus: "审核中",
          id: "1"
        },
        {
          rowId: "11111111",
          phone: "13712345678",
          rowName: "杭州招财猫网络科技有限公司",
          rowTime: "2018-05-21",
          rowType: "供应商",
          rowStatus: "已注册",
          id: "4"
        },
        {
          rowId: "11111111",
          phone: "13712345678",
          rowName: "杭州招财猫网络科技有限公司",
          rowTime: "2018-05-21",
          rowType: "供应商",
          rowStatus: "已认证",
          id: "5"
        },
        {
          rowId: "11111111",
          phone: "13712345678",
          rowName: "杭州招财猫网络科技有限公司",
          rowTime: "2018-05-21",
          rowType: "供应商",
          rowStatus: "认证失败",
          failInfo: "提交的信息不符",
          id: "6"
        },
        {
          rowId: "11111111",
          phone: "13712345678",
          rowName: "杭州招财猫网络科技有限公司",
          rowTime: "2018-05-21",
          rowType: "供应商",
          rowStatus: "认证失败",
          failInfo: "提交的信息taichou",
          id: "7"
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

