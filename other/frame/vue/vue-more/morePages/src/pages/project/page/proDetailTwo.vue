<template>
  <div class="bid-wrap mt20 ml20">
    <div class="card">
      <ul class="flex lh">
        <li class="item">
          <label>一级分类：</label>
          <select class="input-medium">
            <option value="">五金</option>
            <option value="">建材</option>
          </select>
        </li>
        <li class="item">
          <label>二级分类：</label>
          <select class="input-medium">
            <option value="">五金</option>
            <option value="">建材</option>
          </select>
        </li>
      </ul>
      <div class="flex-ul ">
        <ul class="flex lh40">
          <li>规格描述</li>
          <li>交付时间</li>
          <li>计量单位</li>
          <li>采购数量</li>
          <li>采购价格</li>
        </ul>
      </div>
      <div class="flex-ul" v-for="(cf,k) in classifyList">
        <Icon v-show="k !=0 " type="ios-minus-outline" size='30' class="icon-btn left" @click="minusColumn(k)"></Icon>
        <ul class="flex lh40">
          <li><input type="text" :value="cf.name"></li>
          <li><input type="text" :value="cf.time"></li>
          <li><input type="text" :value="cf.unit"></li>
          <li><input type="text" :value="cf.amount"></li>
          <li><input type="text" :value="cf.price"></li>
        </ul>
        <Icon type="ios-plus-outline" size='30' class="icon-btn right" @click="addColumn(k)"></Icon>
      </div>
    </div>
    <div class="card">
      <ul class="flex lh">
        <li class="item">
          <label>一级分类：</label>
          <select class="input-medium" v-model="addClassFir">
            <option value="">五金</option>
            <option value="">建材</option>
            <option value="other">其他</option>
          </select>
          <input type="text" class="input-medium ml15">
          <a v-show="addClassFir=='other'" class="btn btn-primary w100 ml15" href="classify.html">分类管理</a>
        </li>
        <li class="item">
          <label>二级分类：</label>
          <select class="input-medium" v-model="addClassSec">
            <option value="">五金</option>
            <option value="">建材</option>
            <option value="other">其他</option>
          </select>
           <input type="text" class="input-medium ml15">
            <a v-show="addClassSec=='other'" class="btn btn-primary w100 ml15" href="classify.html">分类管理</a>
        </li>
      </ul>
      <div class="flex-ul ">
        <ul class="flex lh40">
          <li>规格描述</li>
          <li>交付时间</li>
          <li>计量单位</li>
          <li>采购数量</li>
          <li>采购价格</li>
        </ul>
      </div>
      <div class="flex-ul" v-for="(cf,k) in classifyList">
        <Icon v-show="k !=0 " type="ios-minus-outline" size='30' class="icon-btn left" @click="minusColumn(k)"></Icon>
        <ul class="flex lh40">
          <li><input type="text" :value="cf.name"></li>
          <li><input type="text" :value="cf.time"></li>
          <li><input type="text" :value="cf.unit"></li>
          <li><input type="text" :value="cf.amount"></li>
          <li><input type="text" :value="cf.price"></li>
        </ul>
        <Icon type="ios-plus-outline" size='30' class="icon-btn right" @click="addColumn(k)"></Icon>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      loading: true,
      classifyList: [],
      addClassFir:'',
      addClassSec:'',
      pager: {
        page: 1,
        size: 15,
        count: 0
      }
    };
  },
  methods: {
    changePage(n) {},
    minusColumn(k) {
      this.classifyList.splice(k, 1);
    },
    addColumn(k) {
      this.classifyList.splice(k + 1, 0, {
        name: "",
        time: "",
        unit: "",
        amount: 0,
        price: 0
      });
    }
  },
  created: function() {
    var mokeData = {
      code: "SUCC",
      data: [
        {
          name: "双扣聚氯乙烯增强管",
          time: "2018-08-08 12:20:20",
          unit: "件",
          amount: 300,
          price: 1000
        },
        {
          name: "双扣聚氯乙烯增强管",
          time: "2018-08-08 12:20:20",
          unit: "件",
          amount: 300,
          price: 1000
        }
      ]
    };
    if (mokeData.code == "SUCC") {
      this.classifyList = mokeData.data;
    }
  }
};
</script>
<style>
.lh40 {
  line-height: 40px;
}
.card {
  border: 1px solid #eee;
  padding: 0 60px;
}
.lh {
  line-height: 70px;
  border-bottom: 1px solid #eee;
}
.flex {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}
.flex .item {
  flex: 1;
}
.flex-ul {
  padding: 10px 0;
  position: relative;
}
.flex-ul li {
  flex: 0 0 auto;
}
.flex-ul li input {
  width: 100%;
  height: 35px;
}
.flex-ul li:first-child {
  width: 370px;
}
.flex-ul li:nth-child(2) {
  width: 220px;
}
.flex-ul li:nth-child(3) {
  width: 130px;
}
.flex-ul li:nth-child(4) {
  width: 150px;
}
.flex-ul li:nth-child(5) {
  width: 150px;
}
.icon-btn {
  position: absolute;
  top: 15px;
  color: grey;
}
.icon-btn.left {
  left: -40px;
}
.icon-btn.right {
  right: -40px;
}
</style>

