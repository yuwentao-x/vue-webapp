import fetch from './fetch'


// 首页商品列表
// size, page, cate, hot
export function fetchGoodList(params){
    return fetch({
        url: 'api/v1/jd/good/list',
        method: 'GET',
        params
    })
}

// 获取品类
export function fetchAllCates(params){
    return fetch({
        url: 'api/v1/jd/cates',
        method: 'GET',
        params
    })
}

// 详情页
export function fetchGoodDetail(params){
    return fetch({
        url: 'api/v1/jd/good/detail',
        method: 'GET',
        params
    })
}

// 登录接口
// { username,password }
export function fetchLogin(data){
    return fetch({
        url: 'api/v1/user/login',
        method: 'POST',
        data
    })
}

// 注册接口
// { username,password,password2 }
export function fetchRegist(data){
    return fetch({
        url: 'api/v1/user/regist',
        method: 'POST',
        data
    })
}

// 添加至购物车
export function fetchAddCart(data){
    return fetch({
        url: 'api/v1/jd/cart/add',
        method: 'POST',
        data
    })
}

// 获取购物车列表
export function fetchCart(params){
    return fetch({
        url: '/api/v1/jd/cart/list',
        method: 'GET',
        params
    })
}

// 删除购物车商品
export function fetchDelCart(params) {
    return fetch({
        url: '/api/v1/jd/cart/del',
        method: 'GET',
        params
    })
}

// 更改购物车商品数量
export function fetchUpdateCart(data){
    return fetch({
        url: '/api/v1/jd/cart/update',
        method: "POST",
        data
    })
}

// 购物车
// {goods: String 用户已勾选的订单_id 连接而成的字符串}
export function fetchSubmitCart(data){
    return fetch({
        url: '/api/v1/jd/cart/submit',
        method: 'POST',
        data
    })
}

export default {
    fetchGoodList,
    fetchAllCates,
    fetchGoodDetail,
    fetchLogin,
    fetchRegist,
    fetchAddCart,
    fetchCart,
    fetchDelCart,
    fetchUpdateCart,
    fetchSubmitCart
}
