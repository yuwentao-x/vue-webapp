<template>
    <div class="t-goodDetail">
        <NavBar :title="'商品详情'"></NavBar>
        
        <div v-text="info.name"></div>
        <div class="img">
            <img :src="$img.imgBaseUrl+info.img" alt="">
        </div>
        <div v-text="info.price"></div>

        <van-goods-action>
            <van-goods-action-icon icon="chat-o" text="客服" color="#07c160" />
            <van-goods-action-icon icon="cart-o" text="购物车" @click="skipToCart" />
            <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
            <van-goods-action-button type="warning" text="加入购物车" @click="addToCart" />
            <van-goods-action-button type="danger" text="立即购买" />
        </van-goods-action>
    </div>
</template>

<script>
import {NavBar} from '@/components/index.js'
import { GoodsAction, GoodsActionIcon, GoodsActionButton, Toast } from 'vant';
export default {
    components:{
        NavBar,
        [GoodsAction.name]: GoodsAction,
        [GoodsActionIcon.name]: GoodsActionIcon,
        [GoodsActionButton.name]: GoodsActionButton,
        [Toast.name]: Toast
    },
    data: function(){
        return {
            info: {}
        }
    },
    created(){
        console.log(this.$route);
        let id = this.$route.params.id
        this.$api.fetchGoodDetail({id}).then(res=>{
            console.log(res);
            this.info = res
        })
    },
    methods: {
        // init(){
        //     let token = localStorage.getItem('token')
        //     console.log(token);
        //     if(!token) return this.$router.push('/login')
        // },
        addToCart(){
            // this.init()
            let token = localStorage.getItem('token')
            console.log(token);
            if(!token) return this.$router.push('/login')
            let data = {
                good_id: this.info._id,
                num: 1
            }
            this.$api.fetchAddCart(data).then(res=>{
                console.log('加入购物车成功',res);
                Toast.success('加入成功');
            })
        },
        skipToCart(){
            // this.init()
            this.$router.push('/cart')
        }
    }
}
</script>

<style lang="scss" scoped>
.t-goodDetail{
    .img{
        img {
            width: 8rem;
            height: 8rem;
        }
    }
}
</style>