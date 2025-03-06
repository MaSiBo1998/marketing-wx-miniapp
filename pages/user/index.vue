<template>
    <view class="container">
        <!-- 用户信息头部 -->
        <view class="user-header">
            <image class="avatar-img" src="https://img.js.design/assets/img/624fdbbf79ea51291deaea2d.png" mode="">
            </image>
            <view class="user-header-right">
                <view class="user-header-right-name">
                    小橙子
                </view>
                <view class="user-header-right-mobile">
                    150154454545
                </view>
            </view>
        </view>
        <!-- <button @click="toPage()">跳转</button> -->
        <u-input :disabled="!isEdit" v-model="userInfo.gender" border="none" placeholder="请选择性别">
            <view class="input-info" slot="prefix">
                性别：
            </view>
        </u-input>
        <u-input :disabled="!isEdit" v-model="userInfo.mobile" border="none" placeholder="请输入年龄">
            <view class="input-info" slot="prefix">
                年龄：
            </view>
        </u-input>
		<u-collapse ref="collapseRef" :border="false" accordion  :value="activeNames"
		    
		  >
		    <u-collapse-item
		      title="查看更多"
		      name="first"
		    >
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
		      <u-input :disabled="!isEdit" v-model="userInfo.weight" border="none" placeholder="请输入从业年限">
		          <view class="input-info" slot="prefix">
		              从业年限：
		          </view>
		          <view class="input-info" slot="suffix">
		              年
		          </view>
		      </u-input>
		      <view class="user-info-item">
		          <view class="user-info-item-left">
		              特长：
		          </view>
		          <view class="user-info-item-right">
		              <u-checkbox-group :disabled="!isEdit"  :value="userInfo.checkboxList"
		                  @change="handleCheckboxChange">
		                  <u-checkbox :labelDisabled="false" activeColor="#3D8D7A" :customStyle="{marginRight: '8px',marginBottom:'8px'}"
		                      v-for="(item, index) in checkboxList1" :key="index" :label="item.label" :name="item.value">
		                  </u-checkbox>
		              </u-checkbox-group>
		          </view>
		      </view>
		      <u-input :disabled="!isEdit" v-model="userInfo.university" border="none" placeholder="请输入毕业院校">
		          <view class="input-info" slot="prefix">
		              毕业院校：
		          </view>
		      </u-input>
		      <u-input :disabled="!isEdit" v-model="userInfo.university" border="none" placeholder="请输入过往经历">
		          <view class="input-info" slot="prefix">
		              过往经历：
		          </view>
		      </u-input>
		      <u-input :disabled="!isEdit" v-model="userInfo.university" border="none" placeholder="请输入演出案例">
		          <view class="input-info" slot="prefix">
		              演出案例：
		          </view>
		      </u-input>
		      <view class="user-info-item">
		          <view class="user-info-item-left" style="width: 180rpx;">
		              代表图：
		          </view>
		          <view class="user-info-item-right">
		              <u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple
		                  :maxCount="10"></u-upload>
		          </view>
		      </view>
		      <view class="user-info-item">
		          <view class="user-info-item-left" style="width: 180rpx;">
		              视频片段：
		          </view>
		          <view class="user-info-item-right">
		              <u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple
		                  :maxCount="1"></u-upload>
		          </view>
		      </view>
		    </u-collapse-item>
		  </u-collapse>
        
        <view class="login-btn" @click="toSubmit()">
        	{{ !isEdit?"编辑个人信息":'提交'}}
        </view>
		<view class="login-btn" style="background: #B3D8A8;" v-if="isEdit" @click="isEdit = false">
			取消
		</view>
        <!-- 报名状态切换 -->
        <u-tabs style="margin: 32rpx auto;" :list="tabList" :current="currentTab" @change="changeTab"
            activeColor="#3D8D7A" barWidth="60"></u-tabs>

        <!-- 报名列表 -->
        <view class="signup-list">
            <u-list>
                <u-list-item v-for="(item, index) in currentList" :key="index">
                    <u-cell :title="item.title" :value="item.status | statusFilter" :label="item.time"></u-cell>
                </u-list-item>
            </u-list>
        </view>
		<u-toast ref="uToast"></u-toast>
    </view>
</template>

<script>
	import {getActorOne} from '@/api/actor.js'
    export default {
        data() {
            return {
                isEdit: false,
				activeNames: '',
                showDetail: false,
                currentTab: 0,
                avatarUrl: '',
                fileList1:[],
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
                checkboxList1: [{
                        label: '舞蹈1',
                        value: 'dance'
                    },
                    {
                        label: '声乐2',
                        value: 'music'
                    },
                    {
                        label: '表演3',
                        value: 'acting'
                    },
                    {
                        label: '乐器4',
                        value: '1'
                    },
                    {
                        label: '乐器5',
                        value: 'inst2rument'
                    },
                    {
                        label: '乐器6',
                        value: 'instr3ument'
                    },
                    {
                        label: '乐器7',
                        value: '5'
                    }
                ],
                tabList: [{
                        name: '我的报名',
                        count: 2
                    },
                    {
                        name: '已参与',
                        count: 5
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
        onShow() {
          this.isEdit = false  
        },
		onLoad() {
			this.getActorOne()
		},
        filters: {
            statusFilter(status) {
                return status ? '已参与' : '未参与'
            }
        },
        methods: {
			getActorOne(){
				let params = {
					
				}
				getActorOne(params).then(res =>{
					console.log(res)
                    this.userInfo = res.data
                    console.log(this.userInfo)
				})
			},
            toPage() {
                uni.navigateTo({
                    url: '/pages/login/authorize'
                })
            },
            handleCheckboxChange(selectedValues) {
                
              if (selectedValues.length > 3) {
				// let arr = selectedValues.slice(0, 3)
				// this.$set(this.userInfo,'checkboxList', selectedValues.slice(0, 3))
				this.userInfo.checkboxList.splice(3)
				uni.showToast({
					title: '最多选择三个',
					icon:'none',
					duration: 1500
				});
				return 

              }else{
				  // 正常更新数据
				  this.userInfo.checkboxList = selectedValues;
			  }
              
            },
            toSubmit(){
				// this.activeNames = this.activeNames.includes('first') ? [] : ['first'],
				this.$nextTick(() => {
				    this.activeNames = 'first'
				    setTimeout(() => this.$refs.collapseRef.init(), 200);
				  });
				// this.tagName[0] = 1
				console.log(this.activeNames)
              if(!this.isEdit){
                  this.isEdit = !this.isEdit
              }else{
                  
              }
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
            changeTab(data) {
                this.currentTab = data.count
                // 这里根据tab切换列表数据
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        background-color: #FFF;
        // min-height: 100vh;
        padding-top: 80rpx;
        box-sizing: border-box;
    }
    .login-btn {
    	margin: 16rpx auto 0 ;
    	width: 586rpx;
    	height: 88rpx;
    	line-height: 88rpx;
    	border-radius: 36rpx;
    	background: #3D8D7A;
    	text-align: center;
    	color: #FFF;
    }

    .user-header {
        width: 686rpx;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: flex-start;

        .avatar-img {
            width: 166rpx;
            height: 166rpx;
            border-radius: 50%;
            margin-right: 20rpx;
        }

        .user-header-right {

            .user-header-right-name {
                font-size: 46rpx;
                font-weight: 600;
                color: rgba(51, 51, 51, 1);
                margin-bottom: 16rpx;
            }

            .user-header-right-mobile {
                color: rgba(153, 153, 153, 1);
                font-size: 32rpx;
            }
        }
    }

    /deep/.u-input {
        width: 686rpx;
        height: 100rpx;
        margin: 0 auto;
        border-radius: 0;
        box-sizing: border-box;
        padding: 32rpx 32rpx 32rpx 0 !important;
        background: #FFF !important;
        border-bottom: 1rpx solid rgb(213, 212, 218);
    }
	/deep/.u-collapse-item {
		width: 686rpx;
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
		width: 686rpx;
		 
	}

    .input-info {
        padding-right: 20rpx;

        .code-img {
            width: 56rpx;
        }
    }

    .user-info-item {
        width: 686rpx;
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

    .signup-list {
        margin-top: 30rpx;
        background: #fff;
        border-radius: 16rpx;

        /deep/ .u-cell {
            padding: 28rpx 32rpx;
        }
    }
</style>