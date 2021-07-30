<template>
    <div class="t-tabbar">
      <van-tabbar route active-color="#c82519">
        <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item to="/find" icon="search" >发现</van-tabbar-item>
        <van-tabbar-item to="/cart" icon="friends-o" :badge="cartNum">购物车</van-tabbar-item>
        <van-tabbar-item :to="isLogin?'/user':'login'" icon="setting-o" >{{isLogin?'我的':'登录'}}</van-tabbar-item>
      </van-tabbar>
    </div>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex';
import { 
  Tabbar, 
  TabbarItem
} from 'vant';

export default {
  name:'TabBar',
  components:{
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  data(){
    return {
      isLogin: localStorage.getItem('token'),
      // cartNum: null
    }
  },
  activated(){
    this.isLogin = localStorage.getItem('token')
    this.init()
  },
  computed:{
    ...mapState('tabbar',['cartNum'])
  },
  methods: {
    ...mapActions('tabbar',['fetchNum']),
    ...mapMutations('tabbar',['update']),
    init(){
      if(!this.isLogin){
        // this.cartNum = null
        this.update(null)
      }else{
        this.fetchNum({})
        // this.$api.fetchCart({}).then(res=>{
        //   this.cartNum = res.length
        // })
      }
    }
  },
  created(){
    this.init()    
  }
    
}
</script>

<style lang="scss" scoped>

</style>