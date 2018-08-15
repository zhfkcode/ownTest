<template>
    <div class="bid-wrap mt20 ml20">
        <Button style="background:#333;color:#fff;border:none;">查看竞标物资</Button>
        <div class="mt20 fonts">
            <Table  stripe  border :columns="columns" :data="tableList" :loading="loading" :disabled-hover="true"></Table>
            <Page :current="pager.page" :total="pager.count" :page-size="pager.size"  :class-name="'mt20'" @on-change="changePage" show-elevator show-total></Page>
        </div>
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
          title: "竞标公司",
          key: "rowCon"
        },
        {
          title: "竞标总价",
          key: "rowTotal"
        },
        {
          title: "首付款",
          key: "rowPay"
        },
        {
          title: "服务费",
          key: "rowSerPay"
        },
        {
          title: "最新竞标时间",
          key: "rowTimeRes"
        },
        {
          title: "联系人姓名",
          key: "rowContName"
        },
        {
          title: " 联系人手机号",
          key: "rowCountPhone"
        },
        {
          title: "操作",
          key: "rowOpera",
          render: (h, params) => {
              var status = params.row.bidStat
              if(status == '1'){
                 return h("div", [
                            h("Button",{
                                style:{
                                    background: '#333',
                                    color: '#fff',
                                    border: 'none'
                                },
                                on: {
                                    click: () => {
                                    this.hasBidding()
                                    }
                                }
                                },"中标")
                            ]);
              }else if( status == '2'){
                  return h('div',[
                      h('a',{
                          attr:{
                              href:''
                          }
                      },'查看合同')
                  ])
              }else if(status == '3'){
                  return h('div','未中标')
              }
           
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

      },
      hasBidding(){
        this.$Modal.confirm({
          title:'中标提示',
          content:'<p class="text-center mb10">中标后，立即生成合同</p><p class="text-center ft14">确认“杭州招财猫网络科技有限公司”中标吗?</p>',
          onOk:()=>{

          }
        })
      }
  },
  created: function() {
    const mockDate = {
      code: "succ",
      data: [
        {
          rowId: "11111111",
          rowCon: "杭州招财猫网络科技有限公司",
          rowTotal: "1029444",
          rowPay: "10%",
          rowSerPay: "2321",
          rowTimeRes: "2018-05-21  09:45:43",
          rowContName: " 隔壁老王",
          rowCountPhone: "13712345678",
          id: "1",
          bidStat:'1'
        },
        {
          rowId: "11111111",
          rowCon: "杭州招财猫网络科技有限公司",
          rowTotal: "1029444",
          rowPay: "10%",
          rowSerPay: "2321",
          rowTimeRes: "2018-05-21  09:45:43",
          rowContName: " 隔壁老王",
          rowCountPhone: "13712345678",
          id: "1",
          bidStat:'2'
        },
        {
          rowId: "11111111",
          rowCon: "杭州招财猫网络科技有限公司",
          rowTotal: "1029444",
          rowPay: "10%",
          rowSerPay: "2321",
          rowTimeRes: "2018-05-21  09:45:43",
          rowContName: " 隔壁老王",
          rowCountPhone: "13712345678",
          id: "1",
          bidStat:'3'
        },
        {
          rowId: "11111111",
          rowCon: "杭州招财猫网络科技有限公司",
          rowTotal: "1029444",
          rowPay: "10%",
          rowSerPay: "2321",
          rowTimeRes: "2018-05-21  09:45:43",
          rowContName: " 隔壁老王",
          rowCountPhone: "13712345678",
          id: "1",
          bidStat:'1'
        },
        {
          rowId: "11111111",
          rowCon: "杭州招财猫网络科技有限公司",
          rowTotal: "1029444",
          rowPay: "10%",
          rowSerPay: "2321",
          rowTimeRes: "2018-05-21  09:45:43",
          rowContName: " 隔壁老王",
          rowCountPhone: "13712345678",
          id: "1",
           bidStat:'2'
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

