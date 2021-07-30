<template>
    <div>
        <van-nav-bar
            :title="title"
            left-text="返回"
            left-arrow
            @click-left="back"
            fixed
        />
    </div>
</template>

<script>
import { NavBar } from 'vant'
export default {
    props: {
        title: {
            type: String,
            required: false,
            default: '购物车'
        }
    },
    methods: {
        back: function(){
            this.$router.back()
        }
    },
    components: {
        [NavBar.name]: NavBar
    }
}
</script>

<style lang="scss" scoped>

</style>