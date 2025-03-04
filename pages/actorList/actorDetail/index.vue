<template>
	<view class="content">
		<view class="actor-box">
			<view class="actor-box-top">
				<view class="actor-box-top-left">
					<view class="actor-box-item">
						<view class="actor-box-item-left">
							<text class="title">姓名:</text>
							<text class="info">张三</text>
						</view>
						<view class="actor-box-item-right">
							<text class="title">性别:</text>
							<text class="info">男</text>
						</view>
						
					</view>
					<view class="actor-box-item">
						<view class="actor-box-item-left">
							<text class="title">年龄:</text>
							<text class="info">18</text>
						</view>
						<view class="actor-box-item-right">
							<text class="title">身高:</text>
							<text class="info">180</text>
						</view>
						
					</view>
					<view class="actor-box-item">
						<view class="actor-box-item-left">
							<text class="title">体重:</text>
							<text class="info">130</text>
						</view>
						<view class="actor-box-item-right">
							<text class="title">特长:</text>
							<text class="info">唱歌</text>
						</view>
						
					</view>
				
				</view>
				<image class="actor-box-top-right" src="" mode="widthFix"></image>
				
			</view>
			<view class="actor-detail-title">
				演员详细资料
			</view>
			<view class="actor-detail-info">
				详细资料详细资料详细资料详细资料详细资料详细资料详细资料详细资料详细资料详细资料详细资料详细资料详细资料详细资料详细资料详细资料详细资料详细资料详细资料
				详细资料
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
			}
		},
		computed: {},
		methods: {

		},
		onUnload() {
			uni.removeStorageSync('actor_detail')


		},
		onLoad() {
			console.log(uni.getStorageSync('actor_detail'))
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 750rpx;
		height: 582rpx;
		background: linear-gradient(7.73deg, rgba(255, 255, 255, 0) 7.45%, rgba(255, 106, 12, 1) 61.97%, rgba(255, 106, 12, 1) 95.12%) no-repeat;
		background-size: 750rpx 582rpx;
		background-color: #EEE;
		min-height: 100vh;
		padding-top: 20rpx;
		box-sizing: border-box;

		.actor-box {
			width: 686rpx;
			margin: 0 auto;
			box-sizing: border-box;
			padding: 48rpx 32rpx;
			border-radius: 24rpx;
			background: rgba(255, 255, 255, 1);
			min-height: 80vh;
			.actor-box-item {
				display: flex;
				align-items: center;
				justify-content: flex-start;
				width: 436rpx;
				margin-bottom: 16rpx;
				.actor-box-item-left,.actor-box-item-right {
					width: 218rpx;
				}
				.title {
					font-weight: 600;
					font-size: 26rpx;
					text-align: left;
				}
				.info {
					color: rgb(153, 153, 153);
					font-size: 32rpx;
				}
			}
			.actor-box-top {
				display: flex;
				align-items: flex-start;
				justify-content: space-between;
				.actor-box-top-left {

				}
				.actor-box-top-right {
					width: 218rpx;
					display: block;
				}
			}
			.actor-detail-title {
				padding: 15rpx 0;
				border-top: 1rpx solid #EEE;
				font-size: 26rpx;
				font-weight: 600;
				margin: 16rpx 0 6rpx;
				text-align: left;
			}
			.actor-detail-info {
				font-size: 22rpx;
				text-align: left;
				font-weight: 500;
				color: rgb(153, 153, 153);
			}
		}
	}
</style>