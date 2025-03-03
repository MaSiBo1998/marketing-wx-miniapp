<template>
	<view class="content">
		<view class="actor-item" v-for="item,index in list" :key="index" @click="toActorDetail(item)">
			<image class="actor-item-img" :src="item.img" mode=""></image>
			<view class="actor-item-info">
				<view class="actor-item-info-name">
{{item.name}}
				</view>
				<view class="actor-item-info-detail">
{{item.detail}}
				</view>
			</view>
			<u-icon name="arrow-right" size="20"></u-icon>
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
				money: 123,
				list: [{
						name: '张三',
						detail: '点击罚款猎杀对决法拉第随机发打卡了生发剂阿萨到啦',
						img: '../../static/tabIcon/active-user.png'
					},
					{
						name: '张三',
						detail: '点击罚款猎杀对决法拉第随机发打卡了生发剂阿萨到啦',
						img: '../../static/tabIcon/active-user.png'
					},
					{
						name: '张三',
						detail: '点击罚款猎杀对决法拉第随机发打卡了生发剂阿萨到啦',
						img: '../../static/tabIcon/active-user.png'
					},
					{
						name: '张三',
						detail: '点击罚款猎杀对决法拉第随机发打卡了生发剂阿萨到啦',
						img: '../../static/tabIcon/active-user.png'
					}

				],
			}
		},
		created() {},
		methods: {
			toActorDetail(data){
				uni.setStorageSync('actor_detail',data)
				uni.navigateTo({
					url:'/pages/actorList/actorDetail/index'
				})
			}

		},
		onLoad() {
			uni.authorize({
			    scope: 'uni.getUserInfo',
			    success() {
			        
			    }
			})


		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding-top: 20rpx;
		min-height: 100vh;
		background-color: rbg(244, 244, 244);

		.actor-item {
			box-sizing: border-box;
			width: 686rpx;
			margin: 0 auto 32rpx;
			background-color: #FFF;
			padding: 16rpx;
			border-radius: 16rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.actor-item-img {
				width: 96rpx;
				height: 96rpx;
				border-radius: 50%;
			}

			.actor-item-info {
				width: 500rpx;
				.actor-item-info-name {
					font-size: 36rpx;
					font-weight: 600;
					text-align: left;
					margin-bottom: 16rpx;
				}
				.actor-item-info-detail {
					font-size: 24rpx;
					color: rgb(153, 153, 153);
				}
			}
		}
	}
</style>