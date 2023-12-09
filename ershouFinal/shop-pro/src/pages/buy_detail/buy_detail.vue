<template>
  <view style="overflow-y: auto;">
    <u-swiper name='image' border-radius='1' :duration='duration' :interval='interval' :height="height"
              :list="swipperList">
    </u-swiper>
    <view class="header">
      <view class="title">
        {{ goodsName }}
      </view>
      <view class="price">
        ￥{{ goodsPrice }}
      </view>
    </view>
    <view class="info-fa">
      <view class="fa-left"></view>
      <view class="goodsInfo">
        物品简介
      </view>
    </view>
    <view class="info">
      <view class="title-desc">
        {{ goodsDesc }}
      </view>
    </view>
    <view class="info-fa">
      <view class="fa-left"></view>
      <view class="goodsInfo">
        物品位置
      </view>
    </view>
    <view class="info">
      <view class="title-desc">
        {{ address }}
      </view>
    </view>
<!--    <view class="info-fa">-->
<!--      <view class="fa-left"></view>-->
<!--      <view class="goodsInfo">-->
<!--        交易流程-->
<!--      </view>-->
<!--    </view>-->
<!--    <view class="info">-->
<!--      <u-steps active-color="#FF7670" style="width: 100%;" mode="number" :list="numlist" :current="4"></u-steps>-->
<!--    </view>-->
    <view class="info-fa">
      <view class="fa-left"></view>
      <view class="goodsInfo">
        交易方式
      </view>
    </view>
    <view class="info">
      <view class="title-desc">
        自行协商.自提|送货上门|约定交易点|当面验货交易|快递
      </view>
    </view>
    <view class="info-fa">
      <view class="fa-left"></view>
      <view class="goodsInfo">
        发布时间
      </view>
    </view>
    <view class="info">
      <view class="title-desc">
        {{ createTime }}
      </view>
    </view>
    <view class="info-fa">
      <view class="fa-left"></view>
      <view class="goodsInfo">
        联系方式
      </view>
    </view>
    <view class="useinfo">
      <view class="title-desc">
        电话:{{ phone }}
      </view>
      <view class="title-desc">
        微信:{{ wxNum }}
      </view>
    </view>
    <view class="navigation">
      <view class="left">
        <view @click="toHome" class="item">
          <u-icon name="home" :size="40"></u-icon>
          <view class="text u-line-1">首页</view>
        </view>
        <view @click="collectBtn" class="item">
          <u-icon v-if="hasStatus == '0'" :size="40" name="star"></u-icon>
          <u-icon v-if="hasStatus == '1'" color="#FF7670" :size="40" name="star"></u-icon>
          <view v-if="hasStatus == '0'" class="text u-line-1">收藏</view>
          <view v-if="hasStatus == '1'" style="color:#FF7670" class="text u-line-1">收藏</view>
        </view>
        <view @click="toRepory" class="item car">
          <u-icon v-if="hasReportStatus == '0'" name="info-circle" :size="40"></u-icon>
          <u-icon v-if="hasReportStatus == '1'" style="color:#F3AF28" name="info-circle" :size="40"></u-icon>
          <view v-if="hasReportStatus == '0'" class="text u-line-1">举报</view>
          <view v-if="hasReportStatus == '1'" style="color:#F3AF28" class="text u-line-1">举报</view>
        </view>
      </view>
<!--      <view class="right">-->
<!--        <view @click="addCart" class="cart btn u-line-1">加入购物车</view>-->
<!--      </view>-->
    </view>
    <!-- 举报 -->
    <u-popup :mask-close-able="false" border-radius="15" width="85%" height="200px" v-model="reportShow" mode="center">
      <view style="padding: 50px 15px 30px 15px;">
        <u-form label-width="auto" :model="reportModel" ref="form1">
          <u-form-item label="请输入举报原因" prop="reason">
            <u-input v-model="reportModel.reason"/>
          </u-form-item>
        </u-form>
      </view>
      <view class="conBtn">
        <u-button @click="reportCancel" style="margin-right: 15px;" type="info">取消举报</u-button>
        <u-button @click="reportConfirm" style="margin-left: 15px;" :custom-style="customStyle" type="error">确定举报
        </u-button>
      </view>
    </u-popup>
  </view>
</template>

<script setup>
import {
  onLoad
} from '@dcloudio/uni-app';
import {
  ref,
  reactive
} from 'vue';
import {collectApi, hasCollectApi, reportApi, hasReportApi} from '../../api/unused.js'
import {addOrder} from "../../api/cart";
//轮播图高度
const height = ref('350')
//是否显示面板指示点
const indicatorDots = ref(true)
//是否自动播放
const autoplay = ref(true)
//自动切换时间间隔
const interval = ref(2000)
//滑动动画时长
const duration = ref(500)
const swipperList = ref([])
const numlist = ref([{
  name: '发布信息'
}, {
  name: '电话/微信沟通'
}, {
  name: '当面交易'
}, {
  name: '交易完成'
}])
const goodsId = ref('')
//名称
const goodsName = ref('')
//价格
const goodsPrice = ref('')
//简介
const goodsDesc = ref('')
//位置
const address = ref('')
const wxNum = ref('')
const phone = ref('')
const customStyle = reactive({
  background: '#FF7670'
})
//发布时间
const createTime = ref('')
//跳转首页
const toHome = () => {
  uni.switchTab({
    url: "../index/index"
  })
}
//收藏按钮
const collectBtn = async () => {
  let res = await collectApi({
    userId: uni.getStorageSync("userId"),
    goodsId: goodsId.value
  })
  if (res && res.code == 200) {
    console.log(res)
    hasCollect()
  }
}
//查询是否收藏
const hasStatus = ref('0')
const hasCollect = async () => {
  let res = await hasCollectApi({
    userId: uni.getStorageSync("userId"),
    goodsId: goodsId.value
  })
  if (res && res.code == 200) {
    console.log(res)
    hasStatus.value = res.data
  }
}
//举报按钮
const reportShow = ref(false)
const toRepory = () => {
  reportShow.value = true;
}
const reportModel = reactive({
  reason: "",
  goodsId: '',
  reportUser: uni.getStorageSync("userId")
})
//取消举报
const reportCancel = () => {
  reportShow.value = false;
}
//确定举报
const reportConfirm = async () => {
  if (!reportModel.reason) {
    uni.showToast({
      title: '请填写举报原因',
      icon: "none",
      mask: true,
      duration: 3000
    })
    return;
  }
  reportModel.goodsId = goodsId.value
  let res = await reportApi(reportModel)
  if (res && res.code == 200) {
    console.log(res)
    hasReport()
    reportShow.value = false;
  }
}
//查询是否举报
const hasReportStatus = ref('0')
const hasReport = async () => {
  let res = await hasReportApi({
    goodsId: goodsId.value,
    userId: uni.getStorageSync("userId")
  })
  if (res && res.code == 200) {
    hasReportStatus.value = res.data;
  }
}
onLoad((options) => {
  const goods = JSON.parse(options.goods)
  console.log(goods)
  goodsId.value = goods.goodsId;
  //物品的图片:轮播图数据
  if (goods.image) {
    swipperList.value = goods.image.split(",");
  }
  goodsName.value = goods.goodsName;
  goodsDesc.value = goods.goodsDesc;
  address.value = goods.address;
  goodsPrice.value = goods.goodsPrice
  createTime.value = goods.createTime
  phone.value = goods.phone
  wxNum.value = goods.wxNum
  //查询是否收藏
  hasCollect()
  //是否举报
  hasReport()
})
</script>

<style lang="scss">
.conBtn {
  display: flex;
  justify-content: center;
  align-items: center;
}

.header {
  display: flex;
}

.title {
  color: #303133;
  font-weight: bold;
  padding: 20 rpx;
  font-size: 30 rpx;
}

.price {
  color: #FF7670;
  padding: 20 rpx;
  font-size: 30 rpx;
}

.info-fa {
  display: flex;
  align-items: center;
}

.fa-left {
  width: 1px;
  height: 12px;
  border-left: 3px solid #FF7670;
  margin-left: 10px;
}

.goodsInfo {
  padding: 5px;
  color: #F3AF28;
}

.info {
  display: flex;
  align-items: center;
  background-color: #FFF;
  margin-bottom: 25px;
  padding: 0px 20px;
}

.useinfo {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-bottom: 80px;
}

.navigation {
  display: flex;
  margin-top: 100 rpx;
  border: solid 2 rpx #f2f2f2;
  background-color: #ffffff;
  padding: 16 rpx 0;
  position: fixed;
  width: 100%;
  bottom: 0;

  .left {
    display: flex;
    font-size: 20 rpx;

    .item {
      margin: 0 30 rpx;

      &.car {
        text-align: center;
        position: relative;

        .car-num {
          position: absolute;
          top: -10rpx;
          right: -10rpx;
        }
      }
    }
  }

  .right {
    display: flex;
    font-size: 28 rpx;
    align-items: center;

    .btn {
      line-height: 66 rpx;
      padding: 0 30 rpx;
      border-radius: 36 rpx;
      color: #ffffff;
    }

    .cart {
      background-color: #FF7670;
      margin-right: 30 rpx;
    }

    .buy {
      background-color: #F3AF28;
    }
  }
}
</style>
