import { fetchGoodList } from '@/utils/api'

export default {
    namespaced: true,
    state:{
        goodObj: {}
    },
    mutations: {
        updateGoodObj(state, payload){
            state.goodObj[payload.k] = payload.v
            // 深拷贝
            state.goodObj = JSON.parse(JSON.stringify(state.goodObj))
        },
        delGoodObj(state){
            state.goodObj = {}
        }
    },
    actions: {
        fetchList(store,params){   
            fetchGoodList(params).then(res=>{
                console.log('当前品类下的商品列表',res);
                let payload = {
                    k: params.index,
                    v: res.list
                }
                store.commit('updateGoodObj', payload)
            })
        }
    }
}