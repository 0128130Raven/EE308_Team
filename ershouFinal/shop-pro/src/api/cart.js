import http from '../common/http.js'
//提交交易
export const addOrder = (goodsId) => {
    let param = {
        userId: uni.getStorageSync("userId"),
        goodsId: goodsId.value
    }
    return http.post('/api/cart/add', param)
}

export const listCart = () => {
    let userId = uni.getStorageSync("userId")
    return http.get(`/api/cart/getList/${userId}`)
}

export const removeCart = (goodsId) => {
    let userId = uni.getStorageSync("userId")
    return http.post(`/api/cart/remove/${userId}/${goodsId}`, null)
}

export const payCart = (param) => {
    return http.post(`/api/cart/pay`, param)
}