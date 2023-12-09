<template>
  <view class="page-box">

    <!-- 订单列表 -->
    <view class="order" v-for="(item, index) in list" :key="item.orderId" style="margin-left: 16px">
      <view class="top" style="margin-top: 10px">
        <view class="left">
          <view class="store">{{ item.goods.goodsName }}</view>
        </view>
      </view>
      <view class="item" style="margin-top: 10px">
        <view class="left" >
          <image :src="item.goods.image.split(',')[0]" mode="aspectFill" style="width: 70px; height: 70px"></image>
        </view>
        <view class="content" style="margin-left: 10px">
          <view class="title u-line-2" >{{ item.goods.goodsDesc }}</view>
          <view class="price" style="margin-top: 10px">
            ￥{{ item.price }}
          </view>
          <view class="delivery-time" style="margin-top: 10px">订单时间 {{ item.createTime }}</view>
        </view>
      </view>
      <view class="bottom" style="margin-top: 10px">
        <u-button v-if="item.orderStatus === '3'" @click="evaluate(item)" class="logistics btn" type="info">评价</u-button>
        <u-button v-if="item.orderStatus === '2'" @click="receive(item)" class="logistics btn" type="info">归还</u-button>
        <u-button @click="toLook(item)" class="logistics btn" type="info">查看</u-button>
        <u-button @click="cancelBtn(item)" class="evaluate btn" type="error" v-if="item.orderStatus !== '2' && item.orderStatus !== '3' && item.orderStatus !== '4'">取消</u-button>
      </view>
      <u-divider text="分割线" style="margin-left: 16px; margin-right: 16px"></u-divider>
    </view>

    <!-- 删除提示框 -->
    <u-popup :mask-close-able="false" border-radius="15" width="70%" height="120px" v-model="delete_dialog_show" mode="center">
      <view style="padding: 20px 15px 20px 15px;">
        确定删除订单吗?
      </view>
      <view class="conBtn">
        <u-button @click="cancel" style="margin-right: 15px;" type="info">取消</u-button>
        <u-button @click="confirm" style="margin-left: 15px;" type="error">确定</u-button>
      </view>
    </u-popup>

    <!-- 评价提示框 -->
    <u-popup :mask-close-able="false" border-radius="15" width="85%" height="100px" v-model="evaluateContent_dialog_show" mode="center">
      <view style="padding: 10px 10px 10px 10px;">
        <view>评价</view>
        <u-input v-model="pageData.evaluateContent" placeholder="请输入评价"/>
      </view>
      <view class="conBtn">
        <u-button @click="evaluateContent_dialog_show = false" style="margin-right: 15px;" type="info">取消</u-button>
        <u-button @click="doEvaluate" style="margin-left: 15px;" type="error">确定</u-button>
      </view>
    </u-popup>

    <!-- 归还提示框 -->
    <u-popup :mask-close-able="false" border-radius="15" width="85%" height="100px" v-model="receive_dialog_show" mode="center">
      <view style="padding: 10px 10px 10px 10px;">
        <view>请输入归还单号</view>
        <u-input v-model="pageData.backNo" placeholder="快递单号"/>
      </view>
      <view class="conBtn">
        <u-button @click="receive_dialog_show = false" style="margin-right: 15px;" type="info">取消</u-button>
        <u-button @click="receiveGoods" style="margin-left: 15px;" type="error">确定</u-button>
      </view>
    </u-popup>

  </view>
</template>

<script setup>
import {onReady} from '@dcloudio/uni-app';
import {getMyOrderApi, deleteOrderApi, receiveOrder, evaluateOrder} from '../../api/order.js'
import {ref} from "vue";
import {listCart} from "../../api/cart";

const list = ref([])
const delete_dialog_show = ref(false)
const receive_dialog_show = ref(false)
const evaluateContent_dialog_show = ref(false)

const pageData = {
  selectOrderId: undefined,
  pay_dialog_show: false,
  evaluateContent: '',
  evaluateContent_dialog_show: false,
  backNo: '',
}

//获取列表数据
const getPageList = () => {
  uni.showLoading({title: '加载中'});
  getMyOrderApi().then(res => {
    if (res && res.code === 200) {
      list.value = res.data
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
const toLook = (item) => {
  uni.navigateTo({
    url: "../order/order_detail?goods=" + JSON.stringify(item)
  })
}

const evaluate = (item) => {
  evaluateContent_dialog_show.value = true
  pageData.selectOrderId = item.orderId
}

// 评价
const doEvaluate = () => {
  uni.showLoading({title: '评价中'});
  evaluateOrder(pageData.selectOrderId, pageData.evaluateContent).then(res => {
    if (res && res.code === 200) {
      uni.showToast({title: '评价成功', icon: 'success', duration: 1000})
      getPageList()
      evaluateContent_dialog_show.value = false
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

const receive = (item) => {
  receive_dialog_show.value = true
  pageData.selectOrderId = item.orderId
}

// 收货
const receiveGoods = () => {
  if (!pageData.backNo){
    uni.showToast({title: '请输入归还单号', icon: 'error', duration: 1000})
    return
  }
  uni.showLoading({title: '收货中'});
  receiveOrder(pageData.selectOrderId, pageData.backNo).then(res => {
    if (res && res.code === 200) {
      uni.showToast({title: res.msg, icon: 'success', duration: 1000})
      getPageList()
      receive_dialog_show.value = false
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

const cancelBtn = (order) => {
  console.log('cancelBtn')
  pageData.selectOrderId = order.orderId
  delete_dialog_show.value = true
}

//确定删除
const confirm = async () => {
  let res = await deleteOrderApi(pageData.selectOrderId)
  if (res && res.code == 200) {
    getPageList()
    delete_dialog_show.value = false
  }
}

//取消
const cancel = () => {
  pageData.show = false
}

onReady(() => {
  getPageList()
})

</script>

<style lang="scss">

.conBtn {
  display: flex;
  justify-content: center;
  align-items: center;
}

.order {
  width: 710 rpx;
  background-color: #ffffff;
  margin: 20 rpx auto;
  border-radius: 20 rpx;
  box-sizing: border-box;
  padding: 20 rpx;
  font-size: 28 rpx;

  .top {
    display: flex;
    justify-content: space-between;

    .left {
      display: flex;
      align-items: center;

      .store {
        margin: 0 10 rpx;
        font-size: 32 rpx;
        font-weight: bold;
      }
    }

    .right {
      color: $u-type-warning-dark;
    }
  }

  .item {
    display: flex;
    margin: 20 rpx 0 0;

    .left {
      margin-right: 20 rpx;

      image {
        width: 200 rpx;
        height: 200 rpx;
        border-radius: 10 rpx;
      }
    }

    .content {
      .title {
        font-size: 28 rpx;
        line-height: 50 rpx;
      }

      .type {
        margin: 10 rpx 0;
        font-size: 24 rpx;
        color: $u-tips-color;
      }

      .delivery-time {
        color: #e5d001;
        font-size: 24 rpx;
      }
    }

    .right {
      margin-left: 10 rpx;
      padding-top: 20 rpx;
      text-align: right;

      .decimal {
        font-size: 24 rpx;
        margin-top: 4 rpx;
      }

      .number {
        color: $u-tips-color;
        font-size: 24 rpx;
      }
    }
  }

  .total {
    margin-top: 20 rpx;
    text-align: right;
    font-size: 24 rpx;

    .total-price {
      font-size: 32 rpx;
    }
  }

  .bottom {
    display: flex;
    margin-top: 40 rpx;
    padding: 0 10 rpx;
    justify-content: flex-end;
    align-items: center;

    .btn {
      line-height: 52 rpx;
      width: 160 rpx;
      border-radius: 26 rpx;
      border: 2 rpx solid $u-border-color;
      font-size: 26 rpx;
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
