<template>
	<view class="page-box">
<!--    <view style="width: 100%; height: 90vh; display: flex; justify-content: center">-->
<!--      <u-image src="../../static/bg_empty.png" width="150px" height="150px" style="margin-top: 60px"/>-->
<!--    </view>-->
		<view class="order" v-for="(item, index) in pageData.list" :key="item.goodsId">
			<view class="top">
				<view class="left">
					<view class="store">{{ item.goodsName }}</view>
				</view>
			</view>
			<view class="item">
				<view class="left">
					<image :src="item.image.split(',')[0]" mode="aspectFill" style="width: 60px; height: 60px"></image>
				</view>
				<view class="content">
					<view class="title u-line-2">{{ item.goodsDesc }}</view>
					<view class="delivery-time">发布时间 {{ item.createTime }}</view>
				</view>
				<view class="right">
					<view class="price">
						￥{{ item.goodsPrice }}
					</view>
				</view>
			</view>
			<view class="bottom">
				<view @click="toPay(item.goodsId)" class="logistics btn">支付</view>
				<view @click="remove(item.goodsId)" class="logistics btn" style="background-color: red; color: white">移除</view>
			</view>
		</view>
	</view>

  <!-- 支付确认窗口 -->
  <u-popup :mask-close-able="false" border-radius="15" width="85%" height="200px" v-model="pageData.pay_dialog_show" mode="center">
    <view style="padding: 10px 10px 10px 10px;">
      <view>请输入收货地址</view>
      <u-input v-model="pageData.receiveAddress" placeholder="地址"/>
      <view>请选择支付方式：</view>
      <radio-group @change="radioChange">
        <view style="margin-top: 10px">
          <radio value="zfb" />支付宝
        </view>
        <view style="margin-top: 10px">
          <radio value="wx" />微信
        </view>
      </radio-group>
    </view>
    <view class="conBtn">
      <u-button @click="pageData.pay_dialog_show = false" style="margin-right: 15px;" type="info">取消</u-button>
      <u-button @click="confirmPay" style="margin-left: 15px;" type="error">确定支付</u-button>
    </view>
  </u-popup>

</template>

<script setup>
import {onLaunch, onLoad, onPullDownRefresh, onReachBottom, onReady, onShow} from '@dcloudio/uni-app';
import { reactive, ref } from 'vue';
import {getSellOrderApi} from '../../api/order.js'
import {addOrder, listCart, payCart, removeCart} from "../../api/cart";
import UImage from "../../uni_modules/vk-uview-ui/components/u-image/u-image.vue";

//列表参数
const pageData = reactive({
	userId:uni.getStorageSync("userId"),
	currentPage:1,
	pageSize:10,
  list: [],
  pay_dialog_show: false,
  receiveAddress: '',
  radioChange: undefined,
  currentSelectGood: undefined,
  selectPay: undefined
})
//总页数
const pages = ref(0)
//获取列表数据
const getMyCollect = () =>{
  uni.showLoading({title: '加载中'});
  listCart().then(res => {
    if (res && res.code === 200) {
      pageData.list = res.data
    } else {
      uni.showToast({title: res.msg, icon: 'error', duration: 1000})
    }
  }).catch(error => {
    console.log(error)
    uni.showToast({title: '网络出错', icon: 'error', duration: 1000})
  }).finally(() => {
    uni.hideLoading()
  })
}

// 支付选择
const radioChange = (value) => {
  pageData.selectPay = value
}

// 去支付
const toPay = (goodId) => {
  pageData.pay_dialog_show = true
  pageData.currentSelectGood = goodId
}

const remove = (goodId) => {
  uni.showLoading({title: '移除中'});
  removeCart(goodId).then(res => {
    if (res && res.code == 200) {
      getMyCollect()
    } else {
      uni.showToast({title: res.msg, icon: 'error', duration: 1000})
    }
  }).catch(error => {
    console.log(error)
    uni.showToast({title: '网络出错', icon: 'error', duration: 1000})
  }).finally(() => {
    uni.hideLoading()
  })
}

const confirmPay = () => {
  if (pageData.currentSelectGood === undefined){
    return
  }
  if (!pageData.receiveAddress){
    uni.showToast({title:'请输入收货地址', icon:"none", mask:true, duration:1000})
    return;
  }
  if (pageData.selectPay == null){
    uni.showToast({title:'请选择支付方式', icon:"none", mask:true, duration:1000})
    return;
  }
  uni.showLoading({title: '支付中'});

  let userId = uni.getStorageSync("userId")
  let param = {
    userId : userId,
    goodsId: pageData.currentSelectGood,
    address: pageData.receiveAddress,
    payType: pageData.selectPay.detail.value
  }
  payCart(param).then(res => {
    if (res && res.code == 200) {
      pageData.pay_dialog_show = false
      getMyCollect()
    } else {
      uni.showToast({title: res.msg, icon: 'error', duration: 1000})
    }
  }).catch(error => {
    console.log(error)
    uni.showToast({title: '网络出错', icon: 'error', duration: 1000})
  }).finally(() => {
    uni.hideLoading()
  })
}

//查看
const toLook = (item)=>{
	if(item.type == '0'){//跳转闲置
		uni.navigateTo({
			url:"../look_unused/look_unused?goods=" + JSON.stringify(item)
		})
	}else{//跳转求购
		uni.navigateTo({
			url:"../look_buy/look_buy?goods=" + JSON.stringify(item)
		})
	}
}
onLoad(()=>{
	getMyCollect()
})

onPullDownRefresh(() => {
  getMyCollect()
})

</script>

<style lang="scss">
.conBtn{
		display: flex;
		justify-content: center;
		align-items: center;
	}
.order {
	width: 710rpx;
	background-color: #ffffff;
	margin: 20rpx auto;
	border-radius: 20rpx;
	box-sizing: border-box;
	padding: 20rpx;
	font-size: 28rpx;
	.top {
		display: flex;
		justify-content: space-between;
		.left {
			display: flex;
			align-items: center;
			.store {
				margin: 0 10rpx;
				font-size: 32rpx;
				font-weight: bold;
			}
		}
		.right {
			color: $u-type-warning-dark;
		}
	}
	.item {
		display: flex;
		margin: 20rpx 0 0;
		.left {
			margin-right: 20rpx;
			image {
				width: 200rpx;
				height: 200rpx;
				border-radius: 10rpx;
			}
		}
		.content {
			.title {
				font-size: 28rpx;
				line-height: 50rpx;
			}
			.type {
				margin: 10rpx 0;
				font-size: 24rpx;
				color: $u-tips-color;
			}
			.delivery-time {
				color: #e5d001;
				font-size: 24rpx;
			}
		}
		.right {
			margin-left: 10rpx;
			padding-top: 20rpx;
			text-align: right;
			.decimal {
				font-size: 24rpx;
				margin-top: 4rpx;
			}
			.number {
				color: $u-tips-color;
				font-size: 24rpx;
			}
		}
	}
	.total {
		margin-top: 20rpx;
		text-align: right;
		font-size: 24rpx;
		.total-price {
			font-size: 32rpx;
		}
	}
	.bottom {
		display: flex;
		margin-top: 40rpx;
		padding: 0 10rpx;
		justify-content: flex-end;
		align-items: center;
		.btn {
			line-height: 52rpx;
			width: 160rpx;
			border-radius: 26rpx;
			border: 2rpx solid $u-border-color;
			font-size: 26rpx;
			text-align: center;
			color: $u-type-info-dark;
			margin-right: 10px;
		}
		.evaluate {
			color: $u-type-warning-dark;
			border-color: $u-type-warning-dark;
		}
	}
}
</style>
