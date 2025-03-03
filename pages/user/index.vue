<template>
	<view class="container">
		<!-- 用户信息头部 -->
		<view class="user-header">
			<u-avatar :src="avatarUrl" size="120" mode="aspectFill" @click="uploadAvatar" class="avatar"></u-avatar>
			<view class="user-info">
				<view class="user-name" @click="handleBind">
					{{ userInfo.name || '点击绑定微信/手机' }}
					<u-icon name="edit-pen" color="#666" size="28"></u-icon>
				</view>
			</view>
		</view>
		<button @click="toPage()">跳转</button>

		<!-- 基本信息卡片 -->
		<u-card :title="'基本信息'" :border="false" margin="20rpx 0">
			<view slot="body">
				<u-cell-group :border="false">
					<u-cell title="性别" :value="userInfo.gender || '未填写'" :arrow="false"></u-cell>
					<u-cell title="年龄" :value="userInfo.age + '岁'" :arrow="false"></u-cell>
					<u-cell title="查看详细信息" :isLink="true" @click="showDetail = !showDetail">
						<u-icon :name="showDetail ? 'arrow-up' : 'arrow-down'" slot="right-icon"></u-icon>
					</u-cell>
				</u-cell-group>

				<!-- 详细信息展开 -->
				<view v-if="showDetail" class="detail-section">
					<u-form :model="userInfo" labelWidth="160">
						<u-form-item label="身高" prop="height">
							<u-input v-model="userInfo.height" placeholder="请输入身高" suffix="cm" />
						</u-form-item>
						<u-form-item label="体重" prop="weight">
							<u-input v-model="userInfo.weight" placeholder="请输入体重" suffix="kg" />
						</u-form-item>
						<u-form-item label="特长" prop="skills">
							<u-checkbox-group v-model="userInfo.skills" :max="3">
								<u-checkbox v-for="(item, index) in skillOptions" :key="index"
									:name="item.value">{{ item.label }}</u-checkbox>
							</u-checkbox-group>
						</u-form-item>
						<u-form-item label="代表图" prop="images">
							<u-upload :fileList="userInfo.images" @afterRead="handleImageUpload"
								@delete="handleImageDelete" multiple :maxCount="10" previewFullImage></u-upload>
						</u-form-item>
						<u-form-item label="视频片段" prop="video">
							<u-upload :fileList="userInfo.video" @afterRead="handleVideoUpload"
								@delete="handleVideoDelete" :maxCount="1" accept="video"></u-upload>
						</u-form-item>
					</u-form>
				</view>
			</view>
		</u-card>

		<!-- 报名状态切换 -->
		<u-tabs :list="tabList" :current="currentTab" @change="changeTab" activeColor="#2979ff" barWidth="60"></u-tabs>

		<!-- 报名列表 -->
		<view class="signup-list">
			<u-list>
				<u-list-item v-for="(item, index) in currentList" :key="index">
					<u-cell :title="item.title" :value="item.status | statusFilter" :label="item.time"></u-cell>
				</u-list-item>
			</u-list>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showDetail: false,
				currentTab: 0,
				avatarUrl: '',
				userInfo: {
					name: '张三',
					gender: '男',
					age: 31,
					height: '170',
					weight: '62',
					skills: [],
					images: [],
					video: []
				},
				skillOptions: [{
						label: '舞蹈',
						value: 'dance'
					},
					{
						label: '声乐',
						value: 'music'
					},
					{
						label: '表演',
						value: 'acting'
					},
					{
						label: '乐器',
						value: 'instrument'
					}
				],
				tabList: [{
						name: '已参与',
						count: 2
					},
					{
						name: '未参与',
						count: 5
					}
				],
				currentList: [{
						title: '音乐会演出',
						status: 1,
						time: '2023-08-15'
					},
					{
						title: '话剧表演',
						status: 0,
						time: '2023-09-01'
					}
				]
			}
		},
		filters: {
			statusFilter(status) {
				return status ? '已参与' : '未参与'
			}
		},
		methods: {
			toPage(){
				uni.navigateTo({
					url:'/pages/login/authorize'
				})
			},
			// 上传头像
			uploadAvatar() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						this.avatarUrl = res.tempFilePaths[0]
					}
				})
			},
			// 绑定操作
			handleBind() {
				uni.showActionSheet({
					itemList: ['微信绑定', '手机绑定'],
					success: (res) => {
						console.log('绑定方式:', res.tapIndex)
					}
				})
			},
			// 图片上传处理
			handleImageUpload(event) {
				// 这里处理上传逻辑
				this.userInfo.images = event.file
			},
			// 视频上传处理
			handleVideoUpload(event) {
				// 这里处理上传逻辑
				this.userInfo.video = event.file
			},
			// 切换tab
			changeTab(index) {
				this.currentTab = index
				// 这里根据tab切换列表数据
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		background-color: #f5f7fa;
		min-height: 100vh;
		padding: 30rpx;
	}

	.user-header {
		background: #ffffff;
		border-radius: 20rpx;
		padding: 40rpx;
		display: flex;
		align-items: center;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);

		.avatar {
			margin-right: 40rpx;
			border: 4rpx solid #fff;
			box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.1);
		}

		.user-name {
			font-size: 36rpx;
			font-weight: 600;
			color: #303133;
			display: flex;
			align-items: center;
			gap: 20rpx;
		}
	}

	.detail-section {
		padding: 20rpx 0;

		/deep/ .u-form-item {
			padding: 24rpx 0;
			border-bottom: 1rpx solid #ebeef5;

			&:last-child {
				border-bottom: none;
			}
		}
	}

	.signup-list {
		margin-top: 30rpx;
		background: #fff;
		border-radius: 16rpx;

		/deep/ .u-cell {
			padding: 28rpx 32rpx;
		}
	}

	.u-card {
		border-radius: 16rpx !important;
		overflow: hidden;

		/deep/ .u-body {
			padding: 0 !important;
		}
	}
</style>