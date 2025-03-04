<template>
	<view class="content">
		<view class="active-detail-top">
			<image class="active-img" :src="detail.coverImage" mode="widthFix"></image>
			<view class="active-box-title">
				{{detail.name}}
			</view>
			<view class="active-box-info">
				{{detail.subject}}
			</view>
			<view class="active-box-bottom">
				<view class="active-box-bottom-left">
					活动时间:{{detail.activityStartTime}}-{{detail.activityEndTime}}<br>
					报名截止: {{detail.registrationDeadline}}
				</view>
			</view>
		</view>
		<view class="time-line">
			<view class="time-line-left">
				时效 <text>长期有效</text>
			</view>
			<u-icon name="share-square" size="28"></u-icon>

		</view>
		<view class="detail-box-top">
			<view class="detail-box-top-left">
				详情
			</view>
			<view class="detail-box-top-right">
				需求人数:{{detail.requiredTotalNumber}}人 | 已录用: {{detail.requiredMaleNumber}}人 | 剩余{{detail.requiredFemaleNumber}}人
			</view>
		</view>
		<view class="detail-box-info">
			{{detail.detailDesc}}
		</view>
		<view class="subtim-bottom">
			<view class="subtim-bottom-left">
				<u-icon name="server-fill" size="24" color="rgb(153, 153, 153)"></u-icon>
				客服
			</view>
			<view class="subtim-bottom-btn">
				立即报名
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
				detail:{},
			}
		},
		computed: {},
		methods: {

		},
		onUnload() {
			uni.removeStorageSync('active_detail')


		},
		onLoad() {
			console.log(uni.getStorageSync('active_detail'))
			uni.setNavigationBarTitle({
				title: uni.getStorageSync('active_detail').name
			});
			this.detail = uni.getStorageSync('active_detail')
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		background-color: #EEE;
		min-height: 100vh;

		.active-detail-top {
			background-color: #FFF;
			padding: 32rpx;
			box-sizing: border-box;

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
			}
		}

		.time-line {
			margin: 15rpx auto;
			padding: 32rpx;
			box-sizing: border-box;
			background-color: #FFF;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.time-line-left {
				color: rgb(153, 153, 153);

				text {
					padding-left: 15rpx;
					color: black;
				}
			}
		}

		.detail-box-top {
			padding: 32rpx;
			box-sizing: border-box;
			background-color: #FFF;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1rpx solid rgb(153, 153, 153);

			.detail-box-top-left {

				font-weight: 600;
				text-align: left;
			}

			.detail-box-top-right {
				color: rgb(153, 153, 153);
				font-size: 26rpx;
			}
		}

		.detail-box-info {
			padding: 16rpx 32rpx;
			box-sizing: border-box;
			background-color: #FFF;
			font-size: 26rpx;
			font-weight: 600;
			color: black;
			line-height: 1.6;
			overflow-wrap: break-word;
		}

		.subtim-bottom {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 750rpx;
			background-color: #FFF;
			padding: 32rpx 32rpx 64rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.subtim-bottom-left {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				color: rgb(153, 153, 153);
				font-size: 20rpx;
			}

			.subtim-bottom-btn {
				width: 630rpx;
				background-color: rgb(182, 152, 128);
				height: 96rpx;
				border-radius: 48rpx;
				text-align: center;
				line-height: 96rpx;
				color: #FFF;
				font-size: 32rpx;
			}
		}
	}
</style>