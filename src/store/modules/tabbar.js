import {fetchCart} from '@/utils/api.js'
export default{
    namespaced:true,
    state:{
        cartNum:null
    },
    mutations:{
        update(state,payload){
            if(payload===0){
                state.cartNum = null
            }else{
                state.cartNum = payload
            }
        }
    },
    actions:{
        fetchNum(store,payload){
            fetchCart(payload).then(res=>{
                store.commit('update',res.length)
            })
        }
    }
}