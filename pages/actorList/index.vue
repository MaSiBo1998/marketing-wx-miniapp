<template>
	<view class="content">
		<u-loading-page bg-color="#e8e8e8" :loading="loading" loading-text="加载中..."></u-loading-page>
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
		<u-loadmore :status="loadmoreStatus" @loadmore="onLoadmore" :loading-text="loadingText"
			:loadmore-text="loadmoreText" :nomore-text="nomoreText" />
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
				loading: false,
				list: [

				],
				pageNum: 1, // 当前页码
				pageSize: 10, // 每页数量
				loadmoreStatus: 'loadmore', // 状态标识
				loadingText: '努力加载中',
				loadmoreText: '轻轻上拉',
				nomoreText: '没有更多了'
			}
		},
		onPullDownRefresh() { //上拉刷新
			this.list = []
			this.loadmoreStatus = 'loadmore'
			this.getActorList(1, 10)
			uni.stopPullDownRefresh();
		},
		onHide() {
			uni.stopPullDownRefresh();
		},
		onLoad() {
			this.getActorList(1, 10)

		},
		onReachBottom() {
			this.pageNum++
			this.onLoadmore()
		},
		methods: {
			async onLoadmore() {
				if (this.loadmoreStatus === 'loading' || this.loadmoreStatus === 'nomore') return

				this.loadmoreStatus = 'loading'
				try {
					const newData = await this.getActorList(this.pageNum, this.pageSize)
					if (!newData || newData.length === 0) {
						this.loadmoreStatus = 'nomore'
					} else {
						this.loadmoreStatus = 'loadmore'
					}
				} catch (error) {
					console.error('加载失败:', error)
				} finally {}
			},
			toActorDetail(data) {
				uni.setStorageSync('actor_detail', data)
				uni.navigateTo({
					url: '/pages/actorList/actorDetail/index'
				})
			},
			getActorList(pageNum, pageSize) {
				let params = {
					pageSize: pageSize,
					pageNum: pageNum
				}
				this.loading = true
				return getActorList(params).then(res => {
					if(res.dataList.length < 10) {
						this.loadmoreStatus = 'nomore'
					}
					this.list = [...this.list, ...res.dataList]
					this.loading = false
					return res.dataList
				}).catch(err => {
					throw err;
					this.loading = false
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
		background-color: #EEE;

		.actor-item {
			box-sizing: border-box;
			width: 686rpx;
			margin: 0 auto 32rpx;
			background-color: #FFF;
			padding: 16rpx;
			border-radius: 8rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.actor-item-img {
				width: 126rpx;
				height: 126rpx;
				border-radius: 50%;
                margin-right: 16rpx;
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