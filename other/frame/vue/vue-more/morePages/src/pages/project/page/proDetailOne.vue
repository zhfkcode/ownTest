<template>
    <div class="bid-wrap mt20 ml20">
        <table class="table table-bordered">
          <tr>
            <td class="w100">公司名称</td>
            <td>{{tableList.entName}}</td>
            <td>项目名称</td>
            <td>{{tableList.proName}}</td>
          </tr>
          <tr>
            <td>竞标结束日</td>
            <td>{{tableList.biddingDate}}</td>
            <td>项目地址</td>
            <td>{{tableList.addr}}</td>
          </tr>
          <tr>
            <td>项目描述</td>
            <td colspan="3">{{tableList.proInfo}}</td>
          </tr>
          <tr>
            <td>项目介绍</td>
            <td colspan="3">{{tableList.intro}}</td>
          </tr>
        </table>
        <router-link to="/proTwo" class="w100 mt20 ml20 btn btn-primary">下一步</router-link>
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
  created: function() {
    const mockDate = {
      code: "succ",
      data: [
        {
          rowId: "11111111",
          entName: "杭州招财猫网络科技有限公司",
          proName: "安阳项目双扣聚氯乙烯增强管招标采购招标公告",
          biddingDate: " 2018-06-12   23:59:59",
          proInfo: "安阳市城乡一体化示范区14条城市道路PPP项目是安阳市城乡一体化示范区基础设施建设重点项本项目双扣聚氯乙烯增强管已具备招标条件，现进行公",
          addr: "浙江省杭州市江干区",
          intro:'1. 招标条件\n安阳市城乡一体化示范区14条城市道路PPP项目是安阳市城乡一体化示范区基础设施建设重点项目，也是安阳市首批市政工程PPP项目。本项目为由中铁隧道集团有限公司、深圳前海鼎力投资基金管理有限公司、中铁隧道勘测设计院有限公司组成的联合体中标的PPP项目，采取政府和社会资本合作PPP模式。我单位负责本项目施工，本次招标招标人为中铁隧道集团第五建筑有限公司物资采购供应中心，本项目双扣聚氯乙烯增强管已具备招标条件，现进行公开招标。\n2. 项目概况与招标内容\n2.1项目概况\n安阳市城乡一体化示范区14条城市道路PPP项目，是安阳市城乡一体化示范区基础设施建设重点项目，也是安阳市首批市政工程PPP项目，建设总工期约2年，总投资估算12.07亿元，建安费用为5.41亿。14条城市道路主要包括南一路（锦绣路-省道301）、白棉路（南一路-兴邺南路）、工海路（工安路-工兴西路）、工景路（工环二路-工康路）、安澜大道（海兴路-高宝路）、工康路（工兴西路-高宝路）、长江大道（京港澳高速西侧-崇义路）、工环二路（安康大道-海兴路）、黄河大道（海兴路-左辅路）、左辅路（兴邺大道-长江大道）、文昌大道（左辅路-省道301）、海兴路（安澜大道-长江大道北侧村边）、工安路（安康大道-海兴路）、工兴西路（工环二路-海兴路），道路总长25.481km，涉及内容包括道路、给水、排水、照明、电缆沟、绿化、交通、消防给水、绿化灌溉、公交站台广告牌、环卫设施。\n2.2招标内容：\n见附表。\n3. 投标人资格要求\n3.1  本次招标资格审查采用资格后审的方式。\n3.2  本次招标要求投标人须具备以下资格：\n（1）营业范围要求：在中华人民共和国境内依法注册，具有独立法人资格、具有招标物资供应经验的生产厂商或经销商，并且具有合法、有效的营业执照、税务登记证书、组织机构代码证书，注册资金为人民币100万元及其以上。'
        }
      ]
    };
    if (mockDate.code == "succ") {
      this.tableList = mockDate.data[0];
      this.loading = false;
    }
    console.log(this.$route)
  }
};
</script>
y
