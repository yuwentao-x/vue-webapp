<template>
    <div class="t-cart">

        <NavBar></NavBar>
        <div class="no-good" v-if="list.length==0">
            <img :src="$img.NoCart" alt="">
            <div>你还没有添加商品</div>
        </div>

        <van-swipe-cell v-for="item in list" :key="item._id">
            <van-row type="flex" align="center">
                <van-col span="4">
                    <van-checkbox v-model="item.checked" @change="rowChange"></van-checkbox>
                </van-col>
                <van-col span="20">
                    <van-card
                        :num="item.num"
                        :price="item.good.price"
                        :desc="item.good.desc"
                        :title="item.good.name"
                        :thumb="$img.imgBaseUrl+item.good.img"
                    >
                        <template #tags>
                            <van-tag plain type="danger">标签</van-tag>
                            <van-tag plain type="danger">标签</van-tag>
                        </template>
                        <template #footer>
                            <van-button size="mini" @touchstart='update( item, "add")'>+</van-button>
                            <van-button size="mini" @touchstart='update( item )'>-</van-button>
                        </template>                       
                    </van-card>
                    
                </van-col>
            </van-row>
            <template #right>
                <van-button @touchstart="remove(item)" square text="删除" type="danger" class="delete-button" />
            </template>
            <van-divider />
        </van-swipe-cell>
        
        <van-submit-bar :price="total" button-text="提交订单" @submit="onSubmit" :disabled="isDisabled">
            <van-checkbox v-model="fullChecked" @click="fullChange">全选</van-checkbox>
            <template #tip>
                你的收货地址不支持同城送, <span @click="skipToAddr">修改地址</span>
            </template>
        </van-submit-bar>
    </div>
</template>

<script>
import { NavBar } from '@/components/'
import { 
    Card, 
    Tag, 
    button, 
    SwipeCell, 
    Col, 
    Row, 
    Checkbox, 
    CheckboxGroup, 
    Divider, 
    SubmitBar,
    Dialog ,
    Toast
} from 'vant';
export default {
    name: 'cart',
    data: function(){
        return {
            fullChecked: false,
            list: [],
            timer: null,
            isDisabled: false
        }
    },
    mounted(){
        this.init()
    },
    computed: {
        total: function(){
            let allPrice = 0
            this.list.map(ele=>{
                if(ele.checked) allPrice += (ele.num*ele.good.price)*100
            })
            return allPrice
        }
    },
    components: {
        NavBar,
        [Toast.name]: Toast,
        [Card.name]: Card,
        [Tag.name]: Tag,
        [button.name]: button,
        [SwipeCell.name]: SwipeCell,
        [Col.name]: Col,
        [Row.name]: Row,
        [Checkbox.name]: Checkbox,
        [CheckboxGroup.name]: CheckboxGroup,
        [Divider.name]: Divider,
        [SubmitBar.name]: SubmitBar,
        [Dialog.name]: Dialog 
    },
    methods: {
        init(){         
            this.$api.fetchCart({}).then(res=>{
                this.list = res
                if(this.list.length==0) this.fullChecked = false
            })
            console.log(this.total);
            this.total ? this.isDisabled = false : this.isDisabled = true
        },
        onSubmit: function(){
            console.log('付款');
            let goods = ''
            this.list.map(ele=>{
                if(ele.checked) goods += ';' + ele._id
            })
            this.$api.fetchSubmitCart({goods}).then(()=>{
                Toast('下单成功');
                this.timer = setTimeout(()=>{
                    this.init()
                },1000)
            })
        },
        skipToAddr: function(){
            Toast('修改地址还没写呢')
        },
        fullChange(){
            this.list.map((ele,index,arr)=>{
                arr[index].checked = this.fullChecked
            })
            this.list = JSON.parse(JSON.stringify(this.list))
        },
        rowChange(bol){
            console.log('rowChange',bol);
            this.list.every(ele=>ele.checked) ? this.fullChecked=true : this.fullChecked=false
            this.total ? this.isDisabled = false : this.isDisabled = true
        },
        remove(item){
            console.log(item._id);
            Dialog.confirm({
                title: '提示',
                message: `你确定要删除 ${item.good.name} 商品吗`,
            })
            .then(() => {
                this.$api.fetchDelCart({id:item._id}).then(()=>{
                    this.init()
                })
            })
        },
        update(item,flag){
            flag ? item.num++ : item.num--
            if(item.num < 1){
                item.num = 1
                return Toast('商品数量不能少于1')
            }else{
                let data = {
                    id: item._id,
                    num: item.num
                }
                this.$api.fetchUpdateCart(data).then(()=>{
                    console.log('数量修改成功');
                    // this.init()
                    this.list = JSON.parse(JSON.stringify(this.list))
                })
            }
        },
        beforeDestory() {
            clearTimeout(this.timer)
        }
    }
}
</script>

<style lang="scss" scoped>
.t-cart{
    padding-top: 1.226667rem;
    padding-bottom: 1.333333rem;

    .no-good {
        text-align: center;
        font-size: 0.4rem;
        color: #666666;
        img{
            width: 5.333333rem;
            height: 5.333333rem;
        }
    }
    
    .delete-button {
        height: 100%;
    }
    .van-button{
        padding: 0 0.2rem;
    }
    .van-swipe-cell{
        background: white;
    }
    .van-card{
        padding-left: 0;
        background: white;
    }
    
}

</style>