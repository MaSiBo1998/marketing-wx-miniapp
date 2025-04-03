<template>
	<view class="container">
        <u-loading-page v-if="loading" bg-color="#e8e8e8" :loading="loading" loading-text="加载中..."></u-loading-page>
		<view class="card" v-else>
			<view class="user-info-item">
				<view class="user-info-item-left" style="width: 150rpx;">
					头像：
				</view>
				<view class="user-info-item-right" v-if="!isEdit">
					<u-album singleSize="45" multipleSize="45" :urls="[userInfo.homeImage]" :maxCount="9"></u-album>
				</view>
				<view class="user-info-item-right" v-else>
					<u-upload :fileList="fileList3" @afterRead="afterRead" @delete="deletePic" name="3" multiple
						:maxCount="1"></u-upload>
				</view>
			</view>

			<u-input :disabled="!isEdit" v-model="userInfo.name" border="none" placeholder="请输入姓名">
				<view class="input-info" slot="prefix">
					姓名：
				</view>
			</u-input>
			<u-input :disabled="!isEdit" v-model="userInfo.phoneNumber" border="none" placeholder="请输入手机号码"
				type="number">
				<view class="input-info" slot="prefix">
					手机号码：
				</view>
			</u-input>
			<view class="user-info-item" style="align-items: center;">
				<view class="user-info-item-left" style="width: 120rpx;">
					性别：
				</view>
				<view class="user-info-item-right" v-if="!isEdit">
					{{userInfo.gender==1 ?'男':'女'}}
				</view>
				<view class="user-info-item-right" v-else>
					<u-radio-group v-model="userInfo.gender" placement="row">
						<u-radio style="margin-right: 15rpx;" activeColor="#3D8D7A" label="男" :name="1"></u-radio>
						<u-radio activeColor="#3D8D7A" label="女" :name="0"></u-radio>
					</u-radio-group>
				</view>
			</view>
			<!-- <button @click="toPage()">跳转</button> -->
			<u-input :disabled="!isEdit" v-model="userInfo.age" border="none" placeholder="请输入年龄">
				<view class="input-info" slot="prefix">
					年龄：
				</view>
			</u-input>
			<u-input :disabled="!isEdit" v-model="userInfo.height" border="none" placeholder="请输入身高">
				<view class="input-info" slot="prefix">
					身高：
				</view>
				<view class="input-info" slot="suffix">
					cm
				</view>
			</u-input>
			<u-input :disabled="!isEdit" v-model="userInfo.weight" border="none" placeholder="请输入体重">
				<view class="input-info" slot="prefix">
					体重：
				</view>
				<view class="input-info" slot="suffix">
					kg
				</view>
			</u-input>
            <u-input :disabled="!isEdit" v-model="userInfo.graduationSchool" border="none" placeholder="请输入毕业院校">
            	<view class="input-info" slot="prefix">
            		毕业院校：
            	</view>
            </u-input>
			
			<view class="user-info-item" @click="open(0)">
				<view class="user-info-item-left" style="width: 150rpx;">
					专业：
				</view>
				<view class="user-info-item-right">
					{{userInfo.primarySkillCategory}}
				</view>
			</view>
            <u-input :disabled="!isEdit" v-model="userInfo.workingYears" border="none" placeholder="请输入从业年限">
            	<view class="input-info" slot="prefix">
            		从业年限：
            	</view>
            	<view class="input-info" slot="suffix">
            		年
            	</view>
            </u-input>
			<!-- <view class="user-info-item" @click="open(1)">
				<view class="user-info-item-left" style="width: 150rpx;">
					特长2：
				</view>
				<view class="user-info-item-right">
					{{userInfo.secondarySkillCategory}}
				</view>
			</view>
			<view class="user-info-item" @click="open(2)">
				<view class="user-info-item-left" style="width: 150rpx;">
					特长3：
				</view>
				<view class="user-info-item-right">
					{{userInfo.thirdlySkillCategory}}
				</view>
			</view> -->
			<u-input :disabled="!isEdit" v-model="userInfo.otherProfessionalCategory" border="none" placeholder="请输入特长">
				<view class="input-info" slot="prefix">
					其他特长：
				</view>
			</u-input>
			
			<u-input :disabled="!isEdit" v-model="userInfo.pastExperiences" border="none" placeholder="请输入获奖或行业资质">
				<view class="input-info" slot="prefix">
					获奖或行业资质：
				</view>
			</u-input>
			<u-input :disabled="!isEdit" v-model="userInfo.performanceCases" border="none" placeholder="请输入演出(业绩)案例">
				<view class="input-info" slot="prefix">
					演出(业绩)案例：
				</view>
			</u-input>
			<!-- <view class="user-info-item">
				<view class="user-info-item-left" style="width: 150rpx;">
					代表图：
				</view>
				<view class="user-info-item-right" v-if="!isEdit">
					<u-album singleSize="45" multipleSize="45" :urls="userInfo.coverImage" :maxCount="9"></u-album>
				</view>
				<view class="user-info-item-right" v-else>
					<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple
						:maxCount="9"></u-upload>
				</view>
			</view>
			<view class="user-info-item">
				<view class="user-info-item-left" style="width: 200rpx;">
					视频片段：
				</view>
				<view class="user-info-item-right" v-if="!isEdit">
					<u-album singleSize="50" multipleSize="50" :urls="[userInfo.videoClipUrl]"></u-album>
				</view>
				<view class="user-info-item-right" v-else>
					<u-upload accept="video" :fileList="fileList2" @afterRead="afterRead" @delete="deletePic" name="2" multiple
						:maxCount="1"></u-upload>
				</view>
			</view> -->
			<!-- 代表图 -->
			<view class="video-box">
				<u-tabs @click="changeTabImg" :list="list" lineWidth="30" lineColor="#3D8D7A" :activeStyle="{
                            color: '#3D8D7A',
                            fontWeight: 'bold',
                            transform: 'scale(1.05)'
                        }" :inactiveStyle="{
                            color: '#606266',
                            transform: 'scale(1)'
                        }" itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;">
				</u-tabs>
				<view v-if="tabIndex == 0" style="margin-top: 16rpx;">
					<view class="user-info-item-right" v-if="!isEdit">
						<u-album :urls="userInfo.coverImage" :maxCount="9"></u-album>
					</view>
					<view class="user-info-item-right" v-else>
						<u-upload :previewFullImage="true" :fileList="fileList1" @afterRead="afterRead"
							@delete="deletePic" name="1" multiple :maxCount="9"></u-upload>
					</view>
				</view>
				<view v-else style="margin-top: 16rpx;">
					<view class="user-info-item-right" v-if="!isEdit">
						<video id="video" :src="userInfo.videoClipUrl" controls></video>
					</view>
					<view class="user-info-item-right" v-else>
						<u-upload accept="video" :fileList="fileList2" @afterRead="afterRead" @delete="deletePic"
							name="2" multiple :maxCount="1"></u-upload>
					</view>
				</view>
			</view>
			<view class="bottom-card">
				<view v-if="type == 'register'" class="login-btn" @click="toSubmit()">
					立即注册
				</view>
				<view v-else>
					<view v-if="isAlreadyRegister">
						<view class="login-btn" style="background: #B3D8A8;" @click="toSignUp()">
							立即报名
						</view>
						<view @click="toSubmit()" class="login-btn" style="background: #B3D8A8;">
							{{ !isEdit?"编辑个人信息":'提交'}}
						</view>
						<view @click="isEdit = false" class="login-btn" style="background: #A3D1C6;" v-if="isEdit">
							取消编辑
						</view>
					</view>
					<view v-else>
						<view class="login-btn" style="background: #B3D8A8;" @click="toSignUp('sign')">
							立即注册并报名
						</view>
					</view>

				</view>
			</view>

			<u-toast ref="uToast"></u-toast>
			<u-picker confirmColor="#3D8D7A" ref="multiPicker" :show="showPicker" :columns="columns"
				@change="handleColumnChange" @confirm="confirm" @cancel="showPicker = false" keyName="label" />
		</view>
	</view>
</template>

<script>
	import {
		baseURL
	} from '@/util/request.js'
	import {
		getActorOne,
		editActor
	} from '@/api/actor.js'
	import {
		toSignUp
	} from '@/api/active.js'
	export default {
		data() {
			return {
				isEdit: false,
				activeNames: '',
				showDetail: false,
				fileList1: [],
				fileList2: [],
				fileList3: [],
				userInfo: {
					name: '张三',
					gender: '男',
					age: 31,
					height: '170',
					weight: '62',
					mobile: 123213123123,
					university: '清华',
					skills: [],
					images: [],
					checkboxList: [],
					video: []
				},
				showPicker: false,
				skillIndex: 0,
				columns: [
					["歌手类", "乐队类", "舞蹈", "非遗", "器乐", "戏曲", "特技/绝技绝活", "杂技", "魔术", "武术", "戏剧表演", "舞美设计", "灯光师",
						"音响师", "服装设计", "服装管理", "多媒体", "场务","播音主持"
					],
					["音乐剧", "通俗", "美声", "民歌", "民族", "流行", "说唱"]
				], // 动态列数据
				columnData: [
					["歌手类", "乐队类", "舞蹈", "非遗", "器乐", "戏曲", "特技/绝技绝活", "杂技", "魔术", "武术", "戏剧表演"],

					["民乐", "流行音乐","西洋古典"],
					["民族舞", "古典舞", "芭蕾舞", "爵士舞", "现代舞", "流行热舞"],
					["国家级", "省级", "其他"],

					["西洋乐器", "中国民乐"],
					[], // 戏曲无子类
					[], // 特技无子类
					["高空", "传统"],
					["大型魔术", "近景魔术", "互动魔术"],
					["武术套路", "拳", "太极", "剑", "刀", "棍", "枪"],
					[], // 戏剧表演无子类
					[],
					['灯光设计', '灯光技师'],
					['音响设计', '音响技师'],
					[],
					[],
					[],
					[],
                    [],
				],
				type: '', //register注册,sign //报名
				isAlreadyRegister: false,
				list: [{
					name: '代表图'
				}, {
					name: '代表视频'
				}],
				tabIndex: 0,
                loading:true
			}
		},
		onShow() {

		},
		onLoad(options) {
			this.isEdit = false
			this.getActorOne()
		},
		methods: {
			changeTabImg(e) {
				console.log(e)
				this.tabIndex = e.index
			},
			open(index) {
				if (!this.isEdit) {
					return false
				}
				this.skillIndex = index
				this.showPicker = true
			},
			confirm(e) {
				let str = ''
				if (e.value.length == 2 && e.value[1]) {
					str = e.value[0] + '-' + e.value[1]
				} else {
					str = e.value[0]
				}
				console.log(str)
				switch (this.skillIndex) {
					case 0:
						this.userInfo.primarySkillCategory = str
						break;
					case 1:
						this.userInfo.secondarySkillCategory = str
						break;
					case 2:
						this.userInfo.thirdlySkillCategory = str
						break;

				}
				this.showPicker = false
			},
			handleColumnChange(e) {
				const {
					columnIndex,
					value,
					values, // values为当前变化列的数组内容
					index,
					// 微信小程序无法将picker实例传出来，只能通过ref操作
					picker = this.$refs.multiPicker
				} = e
				// 当第一列值发生变化时，变化第二列(后一列)对应的选项
				if (columnIndex === 0) {
					// picker为选择器this实例，变化第二列对应的选项
					picker.setColumnValues(1, this.columnData[index])
				}
			},
			getActorOne() {
				uni.showLoading({
					title: '加载中'
				});
				getActorOne().then(res => {
					console.log(res)
					this.userInfo = res
                    this.loading = false
					this.userInfo.coverImage = res.coverImage.split(',')
					this.isAlreadyRegister = res.name ? true : false
					if (res.coverImage != '') {
						this.userInfo.coverImage.forEach(item => {
							this.fileList1.push({
								url: item
							})
						})
					}
					if (res.videoClipUrl != '') {
						this.fileList2 = [{
							url: res.videoClipUrl
						}]
					}
					if (res.homeImage != '') {
						this.fileList3 = [{
							url: res.homeImage
						}]
					}
					if (this.isAlreadyRegister == 'register') {
						uni.setNavigationBarTitle({
							title: '立即注册'
						});
					} else {
						uni.setNavigationBarTitle({
							title: '立即报名'
						});
					}
					uni.setStorageSync('userInfo', res)
					console.log(this.userInfo)
				})
			},
			toSignUp(type) {
				let params = {
					activityId: uni.getStorageSync('active_detail_id')
				}
				if (this.isEdit) {
					uni.showToast({
						title: '请先提交编辑信息后,再报名',
						icon: 'none',
						duration: 2000
					})
					return false
				}
				uni.showLoading({
					title: '报名中...'
				});
				toSignUp(params).then(res => {
					console.log(res)
					uni.requestSubscribeMessage({
						//此处填写刚才申请模板的模板ID
						tmplIds: ['WIx0_ZMSAD4R0gFACK2djg7DQW-GN-QtFZ6EmKJHIbM'],
						success(res) {
							uni.switchTab({
								url: '/pages/active/index'
							})
						}
					})
					
				}).catch(err => {
					uni.showToast({
						title: err.msg,
						icon: 'none',
						duration: 1200
					})
				})
			},

			toSubmit() {
				if (!this.isEdit) {
					this.isEdit = !this.isEdit
				} else {
					let params = {
						...this.userInfo
					}
					let arr = []
					this.fileList1.forEach(item => {
						arr.push(item.url)
					})
					params.videoClipUrl = this.fileList2.length > 0 ? this.fileList2[0].url : ''
					params.homeImage = this.fileList3.length > 0 ? this.fileList3[0].url : ''
					params.coverImage = arr.length > 0 ? arr.join(',') : ''
					uni.showLoading({
						title: '加载中'
					});
					editActor(params).then(res => {
						this.getActorOne()
						this.isEdit = false
					})
				}
			},
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file);
				let fileListLen = this[`fileList${event.name}`].length;
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: "uploading",
						message: "上传中",
					});
				});
				for (let i = 0; i < lists.length; i++) {
					let result = ''
					if (event.name == 1) {
						result = await this.uploadFilePromise(lists[i].url);
					} else if (event.name == 3) {
						result = await this.uploadFilePromise(lists[i].url);
					} else {
						result = await this.uploadFileVideoPromise(lists[i].url);
					}
					console.log(result)
					let item = this[`fileList${event.name}`][fileListLen];
					this[`fileList${event.name}`].splice(
						fileListLen,
						1,
						Object.assign(item, {
							status: result ? "success" : 'error',
							message: "",
							url: result ? result : '',
						})
					);
					fileListLen++;
					if (!result) {
						this[`fileList${event.name}`].splice(event.index, 1)
					}
				}
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: baseURL + "/upload/uploadImages",
						filePath: url,
						name: "file",
						header: {
							token: uni.getStorageSync('token')
						},
						success: (res) => {
							let ret = JSON.parse(res.data)
							if (ret.code != 0) {
								uni.showToast({
									title: '上传失败',
									icon: 'none',
									duration: 1200
								})
								resolve(false)
							} else {
								resolve(ret.data.httpPath)
							}

						},
					});
				});
			},
			uploadFileVideoPromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: baseURL + "/upload/uploadVideo",
						filePath: url,
						name: "file",
						header: {
							token: uni.getStorageSync('token')
						},
						success: (res) => {
							let ret = JSON.parse(res.data)
							if (ret.code != 0) {
								uni.showToast({
									title: '上传失败',
									icon: 'none',
									duration: 1200
								})
								resolve(false)
							} else {
								resolve(ret.data.httpPath)
							}

						},
					});
				});
			},

		}
	}
</script>

<style lang="scss" scoped>
	.container {
		background: rgba(246, 247, 250, 1);
		// min-height: 100vh;
		padding-top: 26rpx;
		padding-bottom: 400rpx;
		box-sizing: border-box;

		.card {
			width: 686rpx;
			margin: 0 auto;
			padding: 32rpx;
			box-sizing: border-box;
			border-radius: 32rpx;
			border-radius: 16rpx;
			background: rgba(255, 255, 255, 1);
		}
	}

	.bottom-card {
		position: fixed;
		bottom: 0;
		z-index: 999;
		left: 0;
		background-color: rgb(255, 255, 255);
		width: 750rpx;
		padding-bottom: 50rpx;
		padding-top: 40rpx;
		box-sizing: border-box;

		.login-btn {
			margin: 16rpx auto 0;
			width: 586rpx;
			height: 88rpx;
			line-height: 88rpx;
			border-radius: 36rpx;
			background: #3D8D7A;
			text-align: center;
			color: #FFF;
		}
	}


	/deep/.u-input {
		width: 622rpx;
		height: 100rpx;
		margin: 0 auto;
		border-radius: 0;
		box-sizing: border-box;
		padding: 32rpx 32rpx 32rpx 0 !important;
		background: #FFF !important;
		border-bottom: 1rpx solid rgb(213, 212, 218);
	}

	/deep/.u-collapse-item {
		width: 622rpx;
		margin: 0 auto;
	}

	/deep/.u-cell__body {
		padding: 32rpx 0 !important;
		border-bottom: 1rpx solid rgb(213, 212, 218);

	}

	/deep/.u-collapse-item__content__text {
		padding: 0 !important;
	}

	/deep/.u-line {
		width: 622rpx;

	}

	.input-info {
		padding-right: 20rpx;

		.code-img {
			width: 56rpx;
		}
	}

	#video {
		width: 622rpx;
	}

	.user-info-item {
		width: 622rpx;
		margin: 0 auto;
		border-bottom: 1rpx solid rgb(213, 212, 218);
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
		// height: 100rpx;
		padding: 32rpx 32rpx 32rpx 0 !important;
		background: #FFF !important;

		.user-info-item-left {
			width: 120rpx;
			box-sizing: border-box;
		}

		.user-info-item-right {
			width: 560rpx;

			/deep/.u-checkbox-group {
				flex-wrap: wrap;

			}
		}
	}

	.video-box {
		/deep/.u-tabs__wrapper__nav__item {
			box-sizing: border-box;
			width: 50%;
		}

		/deep/.u-album__row {
			justify-content: space-around;
		}

		/deep/.u-album__row__wrapper {
			width: 180rpx;
			height: 300rpx;
			box-sizing: border-box;
			margin-right: 0 !important;
			justify-content: space-around;

			image {
				width: 180rpx !important;
				height: 300rpx !important;
				border-radius: 16rpx;
				box-sizing: border-box;
			}

			uni-image {
				width: 180rpx !important;
				height: 300rpx !important;
				border-radius: 16rpx;
				box-sizing: border-box;
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
</style>