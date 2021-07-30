<template>
    <div class="t-user">
        <NavBar :title="'个人中心'"></NavBar>
        
        <div class="logout" @touchstart="logout">退出登录</div>    
    
        <TabBar></TabBar>
    </div>
</template>

<script>
import { TabBar, NavBar } from '@/components'
import { Dialog } from 'vant';
export default {
    computed: {

    },
    components: {
        TabBar,
        NavBar,
        [Dialog.name]: Dialog
    },
    methods: {
        logout(){
            Dialog.confirm({
                title: '退出登录',
                message: '你确定退出登录吗',
            })
            .then(() => {
                localStorage.removeItem('token')
                this.$router.replace('/')
            })

        }
    }
}
</script>

<style lang="scss" scoped>
.logout{
    margin-top: 1.333333rem;
}
</style>