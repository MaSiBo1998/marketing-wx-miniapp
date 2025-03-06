<template>
	<view class="content">
		<image class="home-top-banner" src="" mode="widthFix"></image>
		<view class="notice-box" v-if="noticeString">
			<view class="notice-box-in">
				<view class="notic-box-left">
					正在演出
				</view>
				<u-notice-bar color="black" icon="" :text="noticeString"></u-notice-bar>
			</view>
		</view>
		<view class="company-detail">
			<image class="company-detail-img" src="" mode="widthFix"></image>
			<view class="company-tips">
				华侨城文化演艺有限公司成立于2001年，是中央大型文旅企业华侨城集团文化业务板块核心成员。20多年来，公司围绕主题精品剧目、情景特技秀、大型主题节庆、大型文化晚会等业务方向，创作了一批演艺精品，逐步发展为高品质、独具标识性与市场竞争力的文化演艺企业。在专业化整合的新趋势下，文化演艺公司战略布局内容生产和渠道整合，聚焦演艺经纪和精品演艺两大核心赛道，推动华侨城演艺品牌升级，树立业内标杆，致力于将华侨城演艺打造成为兼具影响力与专业度的文化品牌。
			</view>
		</view>
		<view class="case-title">
			经典案例
		</view>
		<view class="case-box" v-for="item,index in caseList" :key="index">
			<view class="case-info">
				<view class="case-info-title">
					{{item.subject}}
				</view>
				<view class="case-info-tips">
					{{item.detailDesc}}
				</view>
			</view>
			<image class="case-img" :src="item.coverImage" mode="widthFix"></image>
		</view>

	</view>
</template>

<script>
	import {
		getActivePreviewList,
		getCaseList
	} from '@/api/home.js'
	export default {
		onLoad(options) {

		},
		onPullDownRefresh() { //上拉刷新
			// // uni.startPullDownRefresh();
			// if (this.isToken) {
			// 	this.getAllOrder('refresh')
			// } else {
			// 	uni.hideLoading()
			// }
			uni.stopPullDownRefresh();
		},
		//页面滚动到底部的事件
		onReachBottom() {

		},
		data() {
			return {
				previewList: [],
				caseList: [],
				isToken: false, //是否有token
				searchValue: '', //搜索值
				activeColor: '#6EB46C',
				current: 0,
				styleType: 'text',
				list: [

				], //渲染列表
				// 一口价订单
				cardList: [],

				// 附近订单
				nearbyList: [],
				avatar: '/static/c1.png',
				directionStr: '垂直',
				horizontal: 'right',
				vertical: 'bottom',
				direction: 'horizontal',
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
					buttonColor: '#007AFF',
					iconColor: '#fff'
				},
				location: {
					longitude: '',
					latitude: ''
				},
				pageNum: 1, //大厅页码
				pageNumNearby: 1, //附近页码
				loadingType: 0,
				more: 'more',
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '正在加载中',
					contentnomore: '没有更多数据了'
				},
			}
		},
		computed: {
			noticeString() {
				let arr = []
				let string = ''
				let timestamp = Date.now();
				this.previewList.forEach(item => {
					console.log(this.toTimestamp(item.activityStartTime), timestamp, this.toTimestamp(item
						.activityEndTime))
					if (this.toTimestamp(item.activityStartTime) < timestamp && timestamp < this.toTimestamp(item
							.activityEndTime)) {
						// arr.push(item)
						string += item.subject
					}
				})
				console.log(arr)
				return string
			},
			textList() {

			}
		},
		onLoad() {
			this.getActivePreviewList()
			this.getCaseList()

		},
		methods: {
			toTimestamp(timeString) {
				let date = new Date(timeString.replace(' ', 'T') + 'Z'); // 转为ISO格式
				return date.getTime();
			},
			getActivePreviewList() {
				getActivePreviewList().then(res => {
					console.log(res)
					this.previewList = res.dataList

					// console.log(this.noticeList)
				})
			},
			getCaseList() {
				let params = {
					pageSize: 8,
					pageNum: 1
				}
				getCaseList(params).then(res => {
					console.log(res)
					this.caseList = res.dataList

					// console.log(this.noticeList)
				})
			},
			getmoreData() {
				uni.showNavigationBarLoading();
				if (this.current === 0) {
					this.pageNum++
				} else {
					this.pageNumNearby++
				}
				this.getAllOrder()
			},

			getAllOrder(str) {
				if (str == 'refresh') {
					this.pageNum = 1
					this.pageNumNearby = 1
					this.list = []
					this.cardList = []
					this.nearbyList = []
				}
				let params = {
					token: this.$store.state.userInfo.token,
					pageSize: 10,
					pageNum: this.pageNum
				}
				let param = {
					token: this.$store.state.userInfo.token,
					pageSize: 10,
					pageNum: this.pageNumNearby,
					city: this.$store.state.userInfo.detailsAddress.city,
					area: this.$store.state.userInfo.detailsAddress.area,
				}
				// 获取大厅数据
				getDatingOrder(params).then(res => {
					uni.hideNavigationBarLoading();
					setTimeout(() => {
						uni.hideLoading();
					}, 600)
					if (this.current === 0) {
						if (res.dataList.length == 10) {
							this.more = 'more';
						} else {
							this.more = 'noMore';
						}
						this.cardList.push(...res.dataList)
						this.list = this.cardList
					}
					this.getOrderdistance()

				})
				// 获取附近数据
				getDatingNearbyOrder(param).then(res => {
					uni.hideNavigationBarLoading();
					if (this.current == 1) {
						if (res.dataList.length == 10) {
							this.more = 'more';
						} else {
							this.more = 'noMore';
						}
						this.nearbyList.push(...res.dataList)
						this.list = this.nearbyList
					}
					this.getNearOrderdistance()
				})

			},
			goOrderDetail(id, orderStatus) { //跳转订单详情页面,携带订单号
				if (id === 8888) {
					uni.showToast({
						title: '登录后,可查看',
						icon: 'none',
						duration: 1200
					})
					return false
				}
				uni.navigateTo({
					url: `/pages/orderDetails/index?id=${id}&orderStatus=${orderStatus}`,
				})
			},
			toUserPage() { // 
				uni.navigateTo({
					url: '/pages/call/index?id=14&name=masibo',
					events: {
						dating: function(data) {
							console.log('主页面的事件', data)
						}
					},
					success(res) {
						res.eventChannel.emit('dating', {
							data: '跳转成功发送,大厅传递的数据'
						})
					}
				})

			},
			onClickItem(e) {
				if (this.current != e.currentIndex) {
					this.current = e.currentIndex;
				}
				this.getAllOrder('refresh')
				this.$forceUpdate()
			},
			//发送请求获取你要得到那个地方的经度纬度（要根据根本后端来反馈--虚拟的接口）
			getList() {
				index().then(res => {
					this.dataList = res.rows
					this.dataList.forEach(item => {
						var s = this.distance(item.location.split(',')[1], item.location.split(',')[
							0]) //调用计算方法（经度，纬度）传值
						this.$set(item, 'jl', s) //把距离存储到dataList中
					})
				})
			},
			//获取当前位置
			getLocation() {
				let that = this;
				uni.getLocation({
					type: 'wgs84',
					geocode: true,
					accuracy: "best", // 精度值为20m
					success: function(res) {
						that.location.longitude = res.longitude
						that.location.latitude = res.latitude
						let val = {}
						val.lat = res.latitude
						val.lng = res.longitude
						that.$store.commit("userInfo/setAddress", val)
						let param = {
							token: this.$store.state.userInfo.token,
							lat: this.$store.state.userInfo.address.lat,
							lng: this.$store.state.userInfo.address.lng,
						}
						// 通过位置获取所在省市区
						getAddressBylat(param).then(res => {
							let val = {}
							val.province = res.province
							val.city = res.city
							val.area = res.area
							this.$store.commit("userInfo/setDetailsAddress", val)
						})
					}
				})
			},
			//根据经纬度计算距离
			distance(lat1, lng1) {
				let lat2 = this.$store.state.userInfo.address.lat;
				let lng2 = this.$store.state.userInfo.address.lng;
				let rad1 = lat1 * Math.PI / 180.0;
				let rad2 = lat2 * Math.PI / 180.0;
				let a = rad1 - rad2;
				let b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
				let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(
					rad2) * Math.pow(
					Math.sin(b / 2), 2)));
				s = s * 6378.137;
				s = Math.round(s * 10000) / 10000;
				s = s.toString();
				s = s.substring(0, s.indexOf('.') + 2);
				return s; //返回距离
			},
			getOrderdistance() { //获取距离每个订单的位置
				let that = this
				this.cardList.forEach(item => {
					item.distance = that.distance(item.latitude, item.longitude)
				})
			},
			getNearOrderdistance() { //附近订单获取距离每个订单的位置
				let that = this
				this.nearbyList.forEach(item => {
					item.distance = that.distance(item.latitude, item.longitude)
				})
			},
			masterGetOrder(id) { //师傅接单
				if (id === 8888) {
					uni.showToast({
						title: '登录后,可接单',
						icon: 'none',
						duration: 1200
					})
					return false
				}
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				let params = {
					token: this.$store.state.userInfo.token,
					id: id
				}
				masterToAcceptOrder(params).then(res => {
					console.log(res)
					uni.showToast({
						title: '接单成功',
						icon: 'none',
						duration: 1200
					})
					uni.hideLoading();
					this.getAllOrder('refresh')
				}).catch((err => {
					uni.showToast({
						title: err,
						icon: 'none',
						duration: 1200
					})
					uni.hideLoading();
				}))
			},
		}


	}
</script>

<style lang="scss" scoped>
	.content {
		padding-bottom: 10rpx;

		.home-top-banner {
			width: 750rpx;
			display: block;
		}

		.notice-box {
			width: 750rpx;
			background-color: rgb(152, 4, 236);
			padding: 16rpx;
			box-sizing: border-box;

			.notice-box-in {
				display: flex;
				align-items: center;
				justify-content: space-between;
				background-color: #FFF;
				padding: 0 16rpx;

				.notic-box-left {
					writing-mode: vertical-rl;
					text-orientation: upright;
					font-size: 24rpx;
					margin-right: 12rpx;
					font-weight: 600;
					color: rgb(152, 4, 236);
				}

				/deep/.u-notice-bar {
					padding: 0;
					height: 124rpx;
					line-height: 124rpx;
					display: flex;
					align-items: center;
					background-color: #FFF !important;

				}

				/deep/.u-icon__icon {
					display: none !important;
				}
			}

		}

		.company-detail {
			width: 686rpx;
			margin: 36rpx auto;

			.company-detail-img {
				width: 686rpx;
			}

			.company-tips {
				padding: 24rpx 24rpx 0;
				font-size: 18rpx;
				line-height: 1.6;
				font-family: "SimSun", "宋体", serif;
			}
		}

		.case-title {
			text-align: center;
			margin: 0 auto 32rpx;
			font-size: 36rpx;
			font-weight: 600;
			color: rgb(152, 4, 236);
			font-family: "SimSun", "宋体", serif;
		}

		.case-box:nth-child(odd) {
			flex-direction: row-reverse;
		}

		.case-box {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 686rpx;
			margin: 0 auto 18rpx;

			.case-info {
				width: 340rpx;

				.case-info-title {
					font-size: 20rpx;
					font-weight: 600;
					font-family: "SimSun", "宋体", serif;
					margin-bottom: 24rpx;
				}

				.case-info-tips {
					font-size: 16rpx;
					line-height: 1.8;
					font-family: "SimSun", "宋体", serif;
				}
			}

			.case-img {
				width: 330rpx;
				border-radius: 32rpx;
			}
		}
	}
</style>