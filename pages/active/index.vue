<template>
	<view class="content">
		<u-loading-page bg-color="#e8e8e8" :loading="loading" loading-text="加载中..."></u-loading-page>
		<u-search shape="round" actionText="搜索" v-model="keyword" @search="getActiveList(1,10)"
			@custom="getActiveList(1,10,'reload')"></u-search>
		<view class="search-box">
			<view :class="[location == ''?'select-item':'']" class="search-box-item" @click="location = '';getActiveList(1,10,'reload')">
				全部
			</view>
			<view class="search-box-item" :class="[location == item?'select-item':'']"
				v-for="item,index in locationList" :key="index" @click="location = item;getActiveList(1,10,'reload')">
				{{item}}
			</view>
		</view>
		<view class="active-box" v-for="item,index in list" :key="index" @click.stop="toActivePage(item)">
			<image class="active-img" :src="item.coverImage" mode="widthFix"></image>
			<view class="active-box-title">
				{{item.name}}
			</view>
			<view class="active-box-info">
				{{item.subject}}
			</view>
			<view class="active-box-bottom">
				<view class="active-box-bottom-left">
					活动时间:{{item.activityStartTime.slice(0,16)}}-{{item.activityEndTime.slice(0,16)}} <br>
					报名截止: {{item.registrationDeadline.slice(0,16)}}
				</view>
				<view class="active-box-bottom-right" @click.stop="toSignUp(item)"
					:class="[item.registrationStatus === null?'sign-bg':'']">
					{{statusFilter(item.registrationStatus)}}
				</view>
			</view>
		</view>
		<u-loadmore :status="loadmoreStatus" @loadmore="onLoadmore" :loading-text="loadingText"
			:loadmore-text="loadmoreText" :nomore-text="nomoreText" />
	</view>
</template>

<script>
	import {
		getActiveList,
		getActiveLocation
	} from '@/api/active.js'
	export default {
		data() {
			return {
				loading: false,
				keyword: '',
				list: [{
					time: '2025-03-01-04-01',
					delineTime: '2025-02-28',
					name: '文艺演出',
					info: '本活动内容简介内容简介内容简介本活动内容简介内容简介内容简介本活动内容简介内容简介内容简介简介本活动内容简介内容'
				}],
				pageNum: 1, // 当前页码
				pageSize: 10, // 每页数量
				loadmoreStatus: 'loadmore', // 状态标识
				loadingText: '努力加载中',
				loadmoreText: '轻轻上拉',
				nomoreText: '没有更多了',
				locationList: [],
				location: ''
			}
		},
		onPullDownRefresh() { //上拉刷新
			this.location = ''
			this.getActiveList(1, 10, 'reload')
			this.getActiveLocation()
			uni.stopPullDownRefresh();
		},
		onHide() {
			uni.stopPullDownRefresh();
		},
        onShow() {
			this.getActiveList(1, 10, 'reload')
			this.getActiveLocation()
        },
		onLoad() {
			this.getActiveList(1, 10, 'reload')
			this.getActiveLocation()
		},
		onReachBottom() {
			this.pageNum++
			this.onLoadmore()
		},
		methods: {
			statusFilter(status) {
				switch (status) {
					case '0':
						console.log('已报名')
						return '已报名'
						break;
					case '1':
						return '报名通过'
						break;
					case '2':
						return '报名拒绝'
						break;
					case '3':
						return '已作废'
						break;
					default:
						return '立即报名'
						break;
				}
			},
			getActiveLocation() {
				getActiveLocation().then(res => {
					console.log(res)
					this.locationList = res.dataList
				})
			},
			async onLoadmore() {
				console.log(this.loadmoreStatus)
				if (this.loadmoreStatus === 'loading' || this.loadmoreStatus === 'nomore') return

				this.loadmoreStatus = 'loading'
				try {
					const newData = await this.getActiveList(this.pageNum, this.pageSize)
					if (!newData || newData.length === 0) {
						this.loadmoreStatus = 'nomore'
					} else {
						this.loadmoreStatus = 'loadmore'
						// this.pageNum++
					}
				} catch (error) {
					console.error('加载失败:', error)
				} finally {

				}
			},
			getActiveList(pageNum, pageSize, type) {
				if (type == 'reload') {
					this.list = []
					this.loadmoreStatus = 'loadmore'
				}
				let params = {
					pageSize: pageSize,
					pageNum: pageNum,
					keyword: this.keyword,
					location: this.location
				}
				this.loading = true
				return getActiveList(params).then(res => {
					if (res.dataList.length < 10) {
						this.loadmoreStatus = 'nomore'
					}
					this.list = [...this.list, ...res.dataList]
					this.loading = false
					console.log(res)
					return res.dataList
				}).catch(err => {
					this.loading = false
					throw err;
				})
			},
			toActivePage(data) {
				uni.setStorageSync('active_detail_id', data.id)
				uni.navigateTo({
					url: '/pages/active/detail/index'
				})

			},
			toSignUp(data) {
				console.log(data)
				let _this = this
				if (data.registrationStatus !== null) {
					uni.showToast({
						title: _this.statusFilter(data.registrationStatus),
						icon: 'none',
						duration: 1200
					})
				} else {
					if (uni.getStorageSync('token')) {
						// uni.navigateTo({
						// 	url: '/pages/active/detail/index'
						// })
						uni.setStorageSync('active_detail_id', data.id)
						uni.navigateTo({
							url: '/pages/user/register/index'
						})
					} else {
						uni.navigateTo({
							url: '/pages/login/authorize'
						})
					}
				}


			}
		},
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

		// /deep/.u-search__action {
		// 	display: none;
		// }

		.search-box {
			width: 750rpx;
			padding: 0 32rpx 16rpx;
			border-bottom: 2rpx solid #f5f5f5;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			flex-wrap: wrap;
			box-sizing: border-box;

			.search-box-item {
				margin: 0 16rpx 8px 0;
				background-color: #f5f5f5;
				border-radius: 32rpx;
				padding: 8rpx 32rpx;
				font-size: 22rpx;
				font-family: "SimSun", "宋体", serif;

			}

			.select-item {
				color: #FFF;
				background: #3D8D7A;
				font-weight: 600;
			}
		}

		.active-box {
			width: 686rpx;
			margin: 0 auto 16rpx;
			border-bottom: 2rpx solid #d8d8d8;
			padding-bottom: 15rpx;
			box-sizing: border-box;

			.active-img {
				width: 686rpx;
				display: block;
				border-radius: 16rpx;
			}

			.active-box-title {
				font-size: 38rpx;
				font-weight: 600;
				width: 686rpx;
				margin: 16rpx 0 6rpx;
				text-align: left;
			}

			.active-box-info {
				font-size: 28rpx;
				width: 686rpx;
				text-align: left;
				font-weight: 500;
				margin: 6rpx 0 16rpx;
				overflow-wrap: break-word;

			}

			.active-box-bottom {
				margin: 0 auto;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.active-box-bottom-left {
					font-size: 22rpx;
					text-align: left;
					font-weight: 500;
				}

				.sign-bg {
					background: #3D8D7A !important;
				}

				.active-box-bottom-right {
					box-sizing: border-box;
					text-align: center;
					background-color: #c7c7c7;
					padding: 0 32rpx;
					height: 64rpx;
					width: 160rpx;
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