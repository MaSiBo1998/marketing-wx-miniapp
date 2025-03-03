<template>
	<view class="content">
		<view class="active-detail-top">
			<image class="active-img" src="@/static/active/active-img.png" mode="widthFix"></image>
			<view class="active-box-title">
				活动主题活动主体
			</view>
			<view class="active-box-info">
				本活动内容简介内容简介内容简介本活动内容简介内容简介内容简介本活动内容简介内容简介内容简介简介本活动内容简介内容
			</view>
			<view class="active-box-bottom">
				<view class="active-box-bottom-left">
					活动时间:2025-03-01-04-01 <br>
					报名截止: 2025-02-28
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
				需求人数:55人 | 已录用: 50人 | 剩余5人
			</view>
		</view>
		<view class="detail-box-info">
			华侨城文化演艺有限公司成立于2001年，是中央大型文旅企业华侨城集团文化业务板块核心成员。20多年来，公司围绕主题精品剧目、情景特技秀、大型主题节庆、大型文化晚会等业务方向，创作了一批演艺精品，逐步发展为高品质、独具标识性与市场竞争力的文化演艺企业。在专业化整合的新趋势下，文化演艺公司战略布局内容生产和渠道整合，聚焦演艺经纪和精品演艺两大核心赛道，推动华侨城演艺品牌升级，树立业内标杆，致力于将华侨城演艺打造成为兼具影响力与专业度的文化品牌。
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
				searchVal: '',
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