<template>
	<view class="u-wrap">
		<!-- 搜索框 -->
		<u-search v-model="keywords" @change="searchBtn" margin="20rpx 0rpx" :show-action="true" action-text="搜索" :animation="true"></u-search>
		<view class="tab-strickt">
			<u-tabs active-color="#FF7670" name="categoryName" count="cate_count" :list="tabList" :is-scroll="true"
				v-model="current" @change="change"></u-tabs>
		</view>
		<!-- 瀑布流列表 -->
		<view v-if="show_wf">
			<u-waterfall v-model="flowList" ref="uWaterfall1">
				<template v-slot:left="{leftList}">
					<view class="demo-warter" v-for="(item, index) in leftList" :key="index">
						<!-- 警告：微信小程序中需要hx2.8.11版本才支持在template中结合其他组件，比如下方的lazy-load组件 -->
						<u-lazy-load @click="toDetail(item)" threshold="-450" border-radius="10" :image="item.image" :index="index">
						</u-lazy-load>
						<view class="demo-title">
							{{item.goodsName}}
						</view>
						<view class="demo-price">
							{{item.goodsPrice}}元
						</view>
						<view class="demo-tag">
							<view v-if="item.type == '0'" class="demo-tag-owner">
								闲置
							</view>
							<view style="margin-left: 0;" v-else class="demo-tag-text">
								求购
							</view>
						</view>
					</view>
				</template>
				<template v-slot:right="{rightList}">
					<view class="demo-warter" v-for="(item, index) in rightList" :key="index">
						<u-lazy-load @click="toDetail(item)" threshold="-450" border-radius="10" :image="item.image" :index="index">
						</u-lazy-load>
						<view class="demo-title">
							{{item.goodsName}}
						</view>
						<view class="demo-price">
							{{item.goodsPrice}}元
						</view>
						<view class="demo-tag">
							<view v-if="item.type == '0'" class="demo-tag-owner">
								闲置
							</view>
							<view style="margin-left: 0;" v-else class="demo-tag-text">
								求购
							</view>
						</view>
					</view>
				</template>
			</u-waterfall>
		</view>
	</view>
</template>

<script setup>
import {onReady, onReachBottom, onShow} from '@dcloudio/uni-app';
  import {
    onUpdated,
    ref
  } from 'vue';
	import {getCateListApi,getUsedListApi} from '../../api/goods.js'
	const tabList = ref([])
	const current = ref(0)
	const uWaterfall1 = ref()
	const loadStatus = ref('loadmore')
	//瀑布流
	const flowList = ref([])
  const isFirst = ref(true)
  const show_wf = ref(true)
	//获取分类数据
	const getCateList = async()=>{
		let res = await getCateListApi()
		if(res && res.code == 200){
			console.log(res)
			tabList.value = res.data;
			//分类数据的第一位添加全部
			tabList.value.unshift({
				categoryId:'',
				categoryName:'全部',
				orderNum:0
			})
		}
	}
	//分类点击事件
	const categoryId = ref('')
	const change = (e)=>{
		categoryId.value = tabList.value[e].categoryId
		console.log(categoryId.value)
		//清空列表数据
		currentPage.value = 1;
		//清空瀑布流的数据
		uWaterfall1.value.clear()
		//调用列表
		getUsedList()
	}
	//获取闲置列表数据
	const currentPage = ref(1)
	const pageSize = ref(1000)
	const keywords = ref('')
	const pages = ref(0)
	const getUsedList = ()=>{
		 getUsedListApi({
			currentPage:currentPage.value,
			pageSize:pageSize.value,
			categoryId:categoryId.value,
			keywords:keywords.value
		}).then(res => {
       if(res && res.code == 200){
         console.log(res)
         //清空瀑布流的数据
         uWaterfall1.value.clear()
         setTimeout(() => {
           flowList.value = res.data.records
           pages.value = res.data.pages
         }, 500)
       }
     }).catch(e => {
       console.log(e)
     })

	}
	//关键字搜索
	const searchBtn = ()=>{
		currentPage.value = 1;
		//清空瀑布流的数据
		uWaterfall1.value.clear()
		//获取数据
		getUsedList()
	}
	//跳转详情页
	const toDetail = (item)=>{
		uni.navigateTo({
			url:"../unused/unused_detail?goods=" + JSON.stringify(item)
		})
	}
  onShow(() => {
    console.log("onSHow called")
    getCateList()
    getUsedList()
    isFirst.value = false
  })
</script>

<style lang="scss">
	.tab-strickt {
		position: sticky;
		z-index: 99;
		top: 0;
		left: 0;
	}

	.demo-warter {
		border-radius: 8px;
		margin: 5px;
		background-color: #ffffff;
		padding: 8px;
		position: relative;
	}

	.u-close {
		position: absolute;
		top: 32rpx;
		right: 32rpx;
	}

	.demo-image {
		width: 100%;
		border-radius: 4px;
	}

	.demo-title {
		font-size: 30rpx;
		margin-top: 5px;
		color: $u-main-color;
	}

	.demo-tag {
		display: flex;
		margin-top: 5px;
	}

	.demo-tag-owner {
		background-color: $u-type-error;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		padding: 4rpx 14rpx;
		border-radius: 50rpx;
		font-size: 20rpx;
		line-height: 1;
	}

	.demo-tag-text {
		border: 1px solid $u-type-primary;
		color: $u-type-primary;
		margin-left: 10px;
		border-radius: 50rpx;
		line-height: 1;
		padding: 4rpx 14rpx;
		display: flex;
		align-items: center;
		border-radius: 50rpx;
		font-size: 20rpx;
	}

	.demo-price {
		font-size: 30rpx;
		color: $u-type-error;
		margin-top: 5px;
	}

	.demo-shop {
		font-size: 22rpx;
		color: $u-tips-color;
		margin-top: 5px;
	}

	.tab-sticky {
		position: sticky;
		z-index: 99;
		top: 0;
		left: 0;
		background-color: #f2f2f2;
		display: flex;
		align-items: center;
	}
	/*去掉tabs选项卡滚动条*/
	scroll-view ::v-deep ::-webkit-scrollbar {
	   width: 0;
	   height: 0;
	   color: transparent
	}
</style>
