<template>
	<view class="content">
		<view class="actor-item" v-for="item,index in list" :key="index" @click="toActorDetail(item)">
			<image class="actor-item-img" :src="item.homeImage" mode=""></image>
			<view class="actor-item-info">
				<view class="actor-item-info-name">
{{item.name}}
				</view>
				<view class="actor-item-info-detail">
{{item.pastExperiences}}
				</view>
			</view>
			<u-icon name="arrow-right" size="20"></u-icon>
		</view>
	</view>
</template>

<script>
	import {
		getActorList
	} from '@/api/actor.js'
	export default {
		onShow(option) {},
		data() {
			return {
				money: 123,
				list: [

				],
			}
		},
		onLoad() {
			this.getActorList()
		
		},
		methods: {
			toActorDetail(data){
				uni.setStorageSync('actor_detail',data)
				uni.navigateTo({
					url:'/pages/actorList/actorDetail/index'
				})
			},
			getActorList(){
				let params = {
					pageSize:10,
					pageNum: 1
				}
				getActorList(params).then(res =>{
					console.log(res)
					this.list = res.dataList
				})
			}

		},
		
	}
</script>

<style lang="scss" scoped>
	.content {
		padding-top: 20rpx;
		min-height: 100vh;
		box-sizing: border-box;
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