<template>
    <div class="t-home">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-sticky>
                <!-- 通知框 -->
                <van-notice-bar
                    left-icon="volume-o"
                    :text="msg"
                    mode= 'closeable'
                />
                
                <!-- 搜索框 -->
                <van-search
                    shape="round"
                    show-action
                    background="#e43130"
                    :placeholder="placeText"
                    disabled
                >
                    <template #action>
                        <div class="login" @touchstart="skipToLogin">登录</div>
                    </template>
                </van-search>
            </van-sticky>
            

            <!-- 轮播图 -->
            <van-swipe :autoplay="3000">
                <van-swipe-item v-for="item in images" :key="item.id">
                    <img v-lazy="item.src" />
                </van-swipe-item>
            </van-swipe>

            <!-- 商品列表提示图 -->
            <div class="good-list-tip">
                <van-image src="//img12.360buyimg.com/img/s750x70_jfs/t1/124583/37/16524/12470/5f9bc181E48c91215/cac00c52cb0b2fa4.png" />
            </div>

            <!-- 商品列表 -->
            
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                :immediate-check='false'
                offset="80"
            >
                <van-cell v-for="item in length" :key="item" >
                    <GoodItem :good="goodArr[2*item-2]"></GoodItem>
                    <GoodItem :good="goodArr[2*item-1]"></GoodItem>
                </van-cell>
            </van-list>
        </van-pull-refresh>
       
        <TabBar></TabBar>
    </div>
</template>

<script>

import { TabBar, GoodItem } from '@/components'
import {
    Search,
    NoticeBar,
    Swipe, 
    SwipeItem,
    Image,
    List,
    PullRefresh,
    cell,
    Sticky 
} from 'vant'
export default {
    data: function(){
        return {
            msg: '京东双12，全场1折，老板和小姨子跑路了，清仓大甩卖，大甩卖',
            hotGoods: [
                { id: 1, name: '针式打印机'},
                { id: 2, name: '行车记录仪'},
                { id: 3, name: '云南白药'},
                { id: 4, name: 'iphone12'},
                { id: 5, name: '直升机'}
            ],
            images: [
                { id: 1, src: '//m.360buyimg.com/mobilecms/s700x280_jfs/t1/145336/33/10675/145172/5f8428edE5f6510a9/1253f6a276347223.jpg!q70.jpg.dpg' },
                { id: 2, src: '//m.360buyimg.com/mobilecms/s700x280_jfs/t1/124903/37/18639/144338/5faf7845Ed611723f/9c081e9662617d2a.jpg!q70.jpg.dpg' },
                { id: 3, src: '//m.360buyimg.com/mobilecms/s700x280_jfs/t1/114190/16/6192/349617/5eb88730E3a8337be/59622b3e9911e5ac.jpg!cr_1125x445_0_171!q70.jpg.dpg' }
            ],
            // timeid:null,
            placeText:'',
            loading: false,  // 每次触底加载后，都要重置为false
            finished: false,  // 这个只用表示数据库已经没有数据了
            refreshing: false,  // 控制下拉刷新
            goodArr: [],
            page: 1,
            total: 0,
            timer: null
        }
    },
    computed: {
        length:function(){
            return Math.floor(this.goodArr.length/2)
        }

        // placeText: function(){
            
        //     // return this.hotGoods[Math.floor(Math.random()*this.hotGoods.length)]
        // }
    },
    components: {
        TabBar,
        GoodItem,
        [NoticeBar.name]: NoticeBar, 
        [Search.name]: Search,
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
        [Image.name]: Image,
        [List.name]: List,
        [PullRefresh.name]: PullRefresh,
        [cell.name]: cell,
        [Sticky.name]: Sticky
    },
    methods: {
        getList(){
            let params = {
                size: 6,
                page: this.page,
                // hot: true,
            }
            this.$api.fetchGoodList(params).then(res=>{
                console.log('首页商品列表',res);
                // 分页，追加数据
                this.total = res.total

                // 下拉刷新是重置
                if(params.page==1){
                    this.goodArr = res.list
                    this.refreshing = false
                    this.finished = false
                    this.loading = false
                }else{
                    // 触底分页，追加数据
                    this.goodArr = [...this.goodArr,...res.list]
                    this.loading = false
                }
            })
        },
        skipToLogin(){
            this.$router.push('/login')
        },
        onRefresh(){
            console.log('下拉刷新');
            this.page=1
            this.getList()
            // setTimeout(()=>{
            //     this.goodArr = 20
            //     this.loading = false
            //     this.refreshing = false
            // },2000)
        },
        onLoad(){
            console.log('触底加载');
            console.log(this.goodArr.length);
            if(this.goodArr.length < this.total){
                this.page++
                this.getList()
            }else{
                this.finished = true
            }
        }
    },
    created(){
        
    },
    mounted(){
        this.getList()
        let index = 0
        this.placeText=this.hotGoods[index].name
        this.timer = setInterval(() => {
            index++
            if(index==this.hotGoods.length){
                index = 0
            }
            this.placeText=this.hotGoods[index].name
        }, 2000);
    },
    beforeDestory(){
        clearInterval(this.timer)
    }
}

</script>

<style lang="scss" scoped>
.t-home{
    padding-bottom: 1.333333rem;
    .login{
        color: white;
    }
    .van-swipe{
        height: 3.733333rem;
        width: 100%;
        img{
            width: 100%;
            display: block;
        }
    }
    .good-list-tip{
        .van-image{
            display: block;
            height: 0.933333rem;
            width: 100%;
            margin-top: 0.5rem;
        }
    }
    .van-cell{
        background: transparent;
        padding: 0 0.133333rem;
        &>div{
            display: flex;
            &>div{
                flex: 1;
            }
        }
    }
}
</style>