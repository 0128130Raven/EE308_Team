import http from '../common/http.js'
//提交交易
export const replaceOrderApi = (parm)=>{
	return http.post('/api/goodsOrder/replaceOrder',parm)
}
//我的订单
export const getMyOrderApi = ()=>{
	let userId = uni.getStorageSync("userId")
	return http.get(`/api/goodsOrder/getMyOrder/${userId}`, null)
}
//出售订单
export const getSellOrderApi = ()=>{
	let userId = uni.getStorageSync("userId")
	return http.get(`/api/goodsOrder/getSellOrder/${userId}`,null)
}

export const postOrder = (goodsId, sendNo)=>{
	let param = {
		orderId : goodsId,
		sendNo : sendNo
	}
	return http.post(`/api/goodsOrder/postOrder`,param)
}

export const evaluateOrder = (orderId, comment)=>{
	let param = {
		orderId : orderId,
		evaluate : comment
	}
	return http.post(`/api/goodsOrder/evaluate`,param)
}

export const receiveOrder = (goodsId, backNo)=>{
	let param = {
		orderId : goodsId,
		backNo : backNo
	}
	return http.post(`/api/goodsOrder/receiveOrder`,param)
}

//删除
export const deleteOrderApi = (orderId)=>{
	let parm = {
		orderId : orderId
	}
	return http.post('/api/goodsOrder/deleteOrder',parm)
}