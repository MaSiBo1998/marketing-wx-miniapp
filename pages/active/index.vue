<template>
	<view class="content">
		<u-search shape="round" actionText="" v-model="searchVal"></u-search>
		<view class="search-box">
			<view class="search-box-item">
				全部
			</view>
			<view class="search-box-item">
				全部分类
			</view>
			<view class="search-box-item">
				全部分类
			</view>
		</view>
		<view class="active-box" v-for="item,index in list" :key="index">
			<image class="active-img" src="@/static/active/active-img.png" mode="widthFix"></image>
			<view class="active-box-title">
				{{item.name}}
			</view>
			<view class="active-box-info">
				{{item.info}}
			</view>
			<view class="active-box-bottom">
				<view class="active-box-bottom-left">
					活动时间:{{item.time}} <br>
					报名截止: {{item.delineTime}}
				</view>
				<view class="active-box-bottom-right" @click="toActivePage(item)">
					立即报名
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getMyInfoData,
		getAddressBylat,
		loginOut
	} from '@/util/api.js'
	export default {
		onShow(option) {},
		data() {
			return {
				searchVal: '',
				list:[{
					time:'2025-03-01-04-01',
					delineTime:'2025-02-28',
					name:'文艺演出',
					info: '本活动内容简介内容简介内容简介本活动内容简介内容简介内容简介本活动内容简介内容简介内容简介简介本活动内容简介内容'
				}],
			}
		},
		computed: {},
		created() {},
		methods: {
			toActivePage(data) {
				uni.setStorageSync('active_detail',data)
				uni.navigateTo({
					url:'/pages/active/detail/index'
				})
			}
		},
		onLoad() {

		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 750rpx;
		padding-bottom: 20rpx;

		/deep/.u-search {
			width: 686rpx !important;
			margin: 16rpx auto !important;
		}

		/deep/.u-search__content {
			width: 686rpx !important;
			margin: 0 auto;
			border-radius: 12rpx !important;
		}

		/deep/.u-search__action {
			display: none;
		}

		.search-box {
			margin-bottom: 32rpx;
			width: 750rpx;
			padding: 0 32rpx 16rpx;
			border-bottom: 2rpx solid #f5f5f5;
			display: flex;
			align-items: center;
			justify-content: flex-start;

			.search-box-item {
				margin-right: 16rpx;
				background-color: #f5f5f5;
				border-radius: 32rpx;
				padding: 8rpx 16rpx;
				font-family: "SimSun", "宋体", serif;
				font-size: 18rpx;
			}
		}

		.active-box {
			width: 686rpx;
			margin: 0 auto 16rpx;
			border-bottom: 2rpx solid #f5f5f5;

			.active-img {
				width: 686rpx;
				display: block;
			}

			.active-box-title {
				font-size: 36rpx;
				font-weight: 600;
				margin: 16rpx 0 6rpx;
				text-align: left;
			}

			.active-box-info {
				font-size: 22rpx;
				text-align: left;
				font-weight: 500;
			}

			.active-box-bottom {
				margin: 16rpx auto;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.active-box-bottom-left {
					font-size: 22rpx;
					text-align: left;
					font-weight: 500;
				}

				.active-box-bottom-right {
					background-color: rgb(51, 51, 51);
					padding: 0 32rpx;
					height: 64rpx;
					line-height: 64rpx;
					font-size: 22rpx;
					color: #FFF;
					border-radius: 56rpx;
					font-weight: 600;
				}
			}
		}
	}
</style>