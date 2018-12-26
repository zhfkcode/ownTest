<template>
    <div class="detail">
        <ul class="pics-wrap">
            <li v-for="mg in regList">
                <img :src="mg.url">
                <p class="title">{{mg.title}}</p>
            </li>
        </ul>
        <table class="table text-center">
            <tr>
                <td>公司名称</td>
                <td></td>
                <td>营业执照编码</td>
                <td></td>
                <td>营业执照有效期</td>
                <td></td>
                <td>证件类型</td>
                <td></td>
            </tr>
            <tr>
                <td>证件号码</td>
                <td></td>
                <td>注册地址</td>
                <td></td>
                <td>法人手机号</td>
                <td></td>
                <td>企业法人姓名</td>
                <td></td>
            </tr>
            <tr>
                <td>企业常用地址</td>
                <td colspan="7"></td>
            </tr>
        </table>
        <div class="bts mt20">
            <Button  type="primary" class="mr20 w100" @click="passBtn">通过</Button>
            <Button type="error" class="w100" @click="faliBox = true">不通过</Button>
        </div>
        <Modal v-model="faliBox" >
            <p slot="header" style="font-size:16px;text-align:center">认证失败原因</p>    
            <div>
                 <Input v-model="textValue" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="请详细说明认证失败原因"></Input>
                <span v-show="tipText" class="c-f00">请写明具体原因！</span>
            </div>
            <p slot="footer" style="margin-top:15px;text-align:center;">
                <Button  type="primary" class="mr20" @click="failReason">确认</Button>
            <Button  @click="faliBox = false">取消</Button>
            </p>
        </Modal> 
    </div>
</template>
<script>
export default {
  data: function() {
    return {
      regList: [],
      tipText: false,
      textValue: "",
      faliBox: false
    };
  },
  methods: {
    failReason() {
      var text = this.textValue;
      if (!!text) {
        this.$http.post("", {}, { emulateJSON: true }).then(
          function(res) {
            // if(res.code == 'succ'){
            this.$router.push({ name: "companyList", query: { a: "a" } });
            // }
          },
          function(err) {
            this.$Message.error("查询出错！");
          }
        );
      } else {
        this.tipText = true;
      }
    },
    passBtn() {
      this.$http.post("", {}, { emulateJSON: true }).then(
        function(res) {
          // if(res.code == 'succ'){
          this.$router.push({ name: "companyList", query: { a: "a" } });
          // }
        },
        function(err) {
          this.$Message.error("查询出错！");
        }
      );
    }
  },
  created() {
    const regMock = {
      code: "succ",
      data: [
        {
          title: "营业执照",
          url: require("@/assets/images/logo.png")
        },
        {
          title: "组织机构代码证",
          url: require("@/assets/images/aa.gif")
        },
        {
          title: "税务登记证",
          url: require("@/assets/images/downLoad.jpg")
        },
        {
          title: "法人代表身份证正面",
          url: require("@/assets/images/otherFile.jpg")
        },
        {
          title: "法人代表身份证反面",
          url: require("@/assets/images/downLoad.jpg")
        },
        {
          title: "银行开户许可证",
          url: require("@/assets/images/logo.png")
        }
      ]
    };
    if (regMock.code == "succ") {
      this.regList = regMock.data;
    }
  }
};
</script>
<style scoped>
.detail {
  margin: 10px 20px;
}
.pics-wrap {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}
.pics-wrap li {
  flex: 0 0 180px;
  margin-right: 20px;
}
.pics-wrap .title {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
}
.pics-wrap img {
  width: 100%;
  height: 100px;
}
.table {
  margin-top: 50px;
}
.table td {
  border: 1px solid #ddd;
  min-width: 100px;
}
</style>

