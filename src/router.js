import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const Home = ()=>import('./pages/home/Home.vue')
const Find = ()=>import('./pages/find/Find.vue')
const Cart = ()=>import('./pages/cart/Cart.vue')
const User = ()=>import('./pages/user/User.vue')
const Login = ()=>import('./pages/user/Login.vue')
const Regist = ()=>import('./pages/user/Regist.vue')
const GoodDetail = ()=>import('./pages/home/GoodDetail.vue')

const router = new VueRouter({
    mode: 'hash',
    routes: [
        { path: '/', components: { alive: Home }},
        { path: '/find', component: Find},
        { path: '/cart', component: Cart},
        { path: '/user', component: User},
        { path: '/login', component: Login},
        { path: '/regist', component: Regist},
        { path: '/good/detail/:id', component: GoodDetail},
        { path: '/*', redirect: '/'}
    ]
})

router.beforeEach((to,from,next)=>{
    console.log('to',to);
    console.log('from',from);
    let token = localStorage.getItem('token')
    // 第一重判断：判断哪些页面需要路由守卫（保护）
    let pageArr = ['/cart', '/user']
    if( pageArr.includes(to.path) ) {
        if(token){
            next()
        }else{
            next('/login')
        }
    } else{
        next()
    }
})

export default router