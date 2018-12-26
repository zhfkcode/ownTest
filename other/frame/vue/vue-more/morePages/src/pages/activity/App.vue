<template>
    <div>
        <Menu>
            <router-view></router-view>
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
        }
    }
}
</script>
