<template>
    <div>
        <Menu>
            <keep-alive include="companyList">
                <router-view></router-view>
            </keep-alive>
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
        return {}
    }
}
</script>