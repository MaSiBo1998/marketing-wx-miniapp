<template>
	<view class="content">
		<view class="actor-box">
			<view class="actor-box-top">
				<view class="actor-box-item-top">

					<image class="home-img" :src="actorDetail.homeImage" mode=""></image>
					<view class="top-right">
						<view class="top-right-item">
							<text class="title">姓名:</text>
							<text class="info">{{actorDetail.name}}</text>
						</view>
						<view class="top-right-item">
							<text class="title">性别:</text>
							<text class="info">{{actorDetail.gender== 1?'男':'女'}}</text>
						</view>
						<view class="top-right-item">
							<text class="title">年龄:</text>
							<text class="info">{{actorDetail.age}}</text>
						</view>
						<view class="top-right-item">
							<text class="title">身高:</text>
							<text class="info">{{actorDetail.height}}</text>
						</view>
					</view>
				</view>
				<view class="actor-box-two">
					<view class="left">
						<text class="title">体重:</text>
						<text class="info">{{actorDetail.weight}}</text>
					</view>
					<view class="right">
						<text class="title">毕业院校:</text>
						<text class="info">{{actorDetail.graduationSchool}}</text>
					</view>

				</view>
				<view class="actor-box-line">
					<text class="title">特长1:</text>
					<text class="info">{{actorDetail.primarySkillCategory}}</text>
				</view>
				<view class="actor-box-line"><text class="title">特长2:</text>
					<text class="info">{{actorDetail.secondarySkillCategory}}</text>
				</view>
				<view class="actor-box-line"><text class="title">特长3:</text>
					<text class="info">{{actorDetail.thirdlySkillCategory}}</text>
				</view>
				<view class="actor-box-line"><text class="title">其他特长:</text>
					<text class="info">{{actorDetail.otherProfessionalCategory}}</text>
				</view>



			</view>
			<view class="actor-detail-title">
				演员过往经历
			</view>
			<view class="actor-detail-info">
				{{actorDetail.pastExperiences}}
			</view>
		</view>

	</view>
</template>

<script>
	import {
		getActorOneDetail
	} from '@/api/actor.js'
	export default {
		onShow(option) {},
		data() {
			return {
				searchVal: '',
				actorDetail: {
					name: null,
					gender: 1,
					age: '',
					height: '',
					weight: '',
					pastExperiences: ''
				}
			}
		},
		computed: {},
		methods: {
			getActorOneDetail() {
				let params = {
					userId: uni.getStorageSync('actor_detail').userId
				}
				getActorOneDetail(params).then(res => {
					console.log(res)
					this.actorDetail = res
					console.log(this.actorDetail)
				})
			}
		},
		onUnload() {},
		onLoad() {
			this.getActorOneDetail()
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 750rpx;
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

			.title {
				display: block;
				font-weight: 600;
				font-size: 28rpx;
				text-align: left;
				margin-right: 10rpx;
			}

			.info {
				display: block;
				color: rgb(153, 153, 153);
				font-size: 32rpx;
			}

			.actor-box-item-top {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 622rpx;

				.home-img {
					width: 50%;
					height: 160rpx;
				}

				.top-right {
					width: 50%;

					.top-right-item {
						margin-bottom: 16rpx;
						height: 40rpx;
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: flex-start;
					}
				}
			}

			.actor-box-two {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 622rpx;
				margin-bottom: 16rpx;

				.left,
				.right {
					height: 40rpx;
					width: 50%;
					display: flex;
					align-items: center;
					justify-content: flex-start;


				}


			}

			.actor-box-line {
				display: flex;
				align-items: center;
				justify-content: flex-start;
				width: 622rpx;
				margin-bottom: 16rpx;
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