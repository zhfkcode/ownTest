<template>
    <div>
        <Menu>
            <div class="pay-wrap">
                <div class="mt20 flex">
                    <div class="item">
                        <ul class="inline-ul">
                            <li><label>首付款1是否显示：</label><a :class="{'btn-primary':payRate1.cur==1}" class="btn mr20" @click="isNess('payRate1',1)">是</a><a :class="{'btn-primary':payRate1.cur==2}" class="btn mr20" @click="isNess('payRate1',2)">否</a></li>
                            <li><label>首付款1比例：</label><input type="text" class="input-small">%</li>
                            <li><label>服务费率：</label><input type="text" class="input-small">%</li>
                        </ul>
                    </div>
                    <div class="item">
                        <ul class="inline-ul">
                            <li><label>首付款2是否显示：</label><a :class="{'btn-primary':payRate2.cur==1}" class="btn mr20" @click="isNess('payRate2',1)">是</a><a :class="{'btn-primary':payRate2.cur==2}" class="btn mr20" @click="isNess('payRate2',2)">否</a></li>
                            <li><label>首付款2比例：</label><input type="text" class="input-small">%</li>
                            <li><label>服务费率：</label><input type="text" class="input-small">%</li>
                        </ul>
                    </div>
                    <div class="item">
                        <ul class="inline-ul">
                            <li><label>首付款3是否显示：</label><a :class="{'btn-primary':payRate3.cur==1}" class="btn mr20" @click="isNess('payRate3',1)">是</a><a :class="{'btn-primary':payRate3.cur==2}" class="btn mr20" @click="isNess('payRate3',2)">否</a></li>
                            <li><label>首付款3比例：</label><input type="text" class="input-small">%</li>
                            <li><label>服务费率：</label><input type="text" class="input-small">%</li>
                        </ul>
                    </div>
                </div>
                <Button type="primary" class="w100 mt10 ml20" @click="submitRate">提交</Button>
            </div>
        </Menu>
    </div>
</template>
<script>
import Menu from '@/components/common/menu.vue'
export default {
    components:{
        Menu
    },
    data:function(){
        return {
            payRate1:{
                cur: 1,
                scale:'',
                fee:''
            },
            payRate2: {
                cur: 1,
                scale:'',
                fee:''
            },
            payRate3: {
                cur: 1,
                scale:'',
                fee:''
            },

        }
    },
    methods:{
        isNess:function(type,num){
           this[type].cur = num
        },
        submitRate(){
            if(this.checkRate(this.checkRate)){
                
            }
        },
        checkRate(obj){
            if(!obj.scale || !obj.fee){
                this.$Message.error('请补全选择填写的首付款信息！')
            }
        }
    }
}
</script>
<style scoped>
.flex{display: flex;background-color: #f2f2f2;}
.flex .item{flex:1;}
.inline-ul{padding:10px 0 30px;font-size: 14px;}
.inline-ul li{margin-top:20px;}
.inline-ul label{display:inline-block;width:200px;text-align: right;margin-right:10px;}
</style>
