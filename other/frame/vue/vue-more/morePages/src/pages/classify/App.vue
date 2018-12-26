<template>
    <div>
        <Menu>
            <div class="classify-wrap">
               <h3 class="mb10">已通过的分类</h3>
               <div class=" card">
                   <div class="flex">
                       <div class="item ml20">
                            <label>一级分类：</label>
                            <Select v-model="selectModel1" style="width:200px">
                                <Option :value="1">请选择</Option>
                                <Option :value="1">五金</Option>
                                <Option :value="1">建材</Option>
                            </Select>
                        </div>
                        <div class="item">
                            <label>二级分类：</label>
                            <Select v-model="selectModel2" style="width:200px">
                                <Option :value="1">请选择</Option>
                                <Option :value="1">五金</Option>
                                <Option :value="1">建材</Option>
                            </Select>
                            <Button class="fr mr20" type="primary" @click="">导出</Button>
                        </div>
                   </div>
               </div>
               <h3 class="mb10 mt20">待审核的分类</h3>
               <div class=" card card2">
                   <div class="flex  top-name">
                       <div class="item ml20">公司名称：杭州招财猫网络科技有限公司</div>
                       <div class="item">项目名称：钱江大桥招标</div>
                   </div>
                   <div class="flex">
                       <div class="item ml20">
                            <label>一级分类：</label>
                            <Select v-model="selectModel1" style="width:200px">
                                <Option :value="1">请选择</Option>
                                <Option :value="1">五金</Option>
                                <Option :value="1">建材</Option>
                            </Select>
                            <input type="text" class="ml20">
                        </div>
                        <div class="item">
                            <label>二级分类：</label>
                            <Select v-model="selectModel2" style="width:200px">
                                <Option :value="1">请选择</Option>
                                <Option :value="1">五金</Option>
                                <Option :value="1">建材</Option>
                            </Select>
                            <input type="text" class="ml20">
                        </div>
                   </div>
                   <Button class="ml20 mt20" type="primary" @click="addItem">新增</Button>
               </div>
            </div>
            <Modal v-model="modal">
                <p slot="header" class="txt-center">提示</p>
                <p>该分类已存在，是否直接使用</p>
            </Modal>
        </Menu>
    </div>
</template>
<script>
import Menu from "@/components/common/menu.vue";
export default {
  components: {
    Menu
  },
  data: function() {
    return {
     selectModel1: '',
     selectModel2: '',
     modal:false
    };
  },
  methods: {
      addItem(){
          this.modal = true
      }
  }
};
</script>
<style scoped>
.classify-wrap {padding: 20px 30px;}
.flex {display: flex;}
.flex .item {flex: 1;}
.card{padding:30px 0;border:1px solid #eee;}
.card2{padding: 0 0 15px;}
.card2 .top-name{margin-bottom:20px;;line-height: 80px;background: #f2f2f2;}
</style>
