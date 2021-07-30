<template>
    <div class="t-find">
        <div class="tf-left">
            <van-sidebar v-model="activeKey">
                <van-sidebar-item  
                    v-for="item in cateArr" 
                    :key="item.id" 
                    :title="item.cate_zh" />
                
            </van-sidebar>
        </div>

        <div class="tf-right">
            <van-grid :border="false" :column-num="3">
                <van-grid-item v-for="item in goodObj[activeKey]" :key="item._id">
                    <img :src="$img.imgBaseUrl+item.img" />
                    <span v-text="item.name"></span>
                </van-grid-item>
            </van-grid>
        </div>
        <TabBar></TabBar>
    </div>
</template>

<script>
import { TabBar } from '@/components'
import { mapActions, mapState, mapMutations } from 'vuex'
import { 
    Sidebar, 
    SidebarItem,
    Grid, 
    GridItem
} from 'vant';
export default {
    data: function(){
        return {
            activeKey: 0,
            cateArr: []
        }
    },
    computed: {
        ...mapState('good',['goodObj'])
    },
    watch: {
        activeKey: function(){
            let arr = this.goodObj[this.activeKey]
            if(!(arr&&arr.length>0)){
                let params = {
                    cate: this.cateArr[this.activeKey].cate,
                    size: 10000,
                    index: this.activeKey
                }
                this.fetchList(params)
            }
        }
    },
    components: {
        TabBar,
        [Sidebar.name]: Sidebar,
        [SidebarItem.name]: SidebarItem,
        [Grid.name]: Grid,
        [GridItem.name]: GridItem
    },
    mounted(){
        // 页面初始化
        this.init()
        
    },
    methods: {
        ...mapActions('good', ['fetchList']),
        ...mapMutations('good', ['delGoodObj']),
        async init() {
            // 第一步，获取品类列表
            const res = await this.$api.fetchAllCates({})
            this.cateArr = res.list
            // 第二步，根据第一个品类，获取商品列表
            let params = {
                cate: this.cateArr[0].cate,
                size: 10000,
                index: this.activeKey
            }
            // 触发actions
            this.fetchList(params)
        }
    },
    beforeDestroy(){
        // 清除缓存
        this.delGoodObj()
    }
}
</script>

<style lang="scss" scoped>
.t-find{
    .tf-left{
        position: absolute;
        top: 0;
        bottom: 1.333333rem;
        left: 0;
        width: 2.4rem;
        overflow: auto;
    }
    .tf-right{
        position: absolute;
        top: 0;
        bottom: 1.333333rem;
        right: 0;
        left: 2.13rem;
        overflow: auto;
        .van-grid-item__content{
            img{
                width: 1.866667rem;
                height: 1.866667rem;
            }   
            span{
                font-size: 0.4rem;
            }
        }
    }
    
}
</style>