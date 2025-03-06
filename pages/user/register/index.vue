<template>
    <view class="container">
        <view class="card">


            <u-input v-model="userInfo.age" border="none" placeholder="请输入姓名">
                <view class="input-info" slot="prefix">
                    姓名：
                </view>
            </u-input>
            <u-input v-model="userInfo.phoneNumber" border="none" placeholder="请输入手机号码" type="number">
                <view class="input-info" slot="prefix">
                    手机号码：
                </view>
            </u-input>
            <view class="user-info-item" style="align-items: center;">
                <view class="user-info-item-left" style="width: 120rpx;">
                    性别：
                </view>
                <view class="user-info-item-right">
                    <u-radio-group v-model="userInfo.gender" placement="row">
                        <u-radio style="margin-right: 15rpx;" activeColor="#3D8D7A" label="男" :name="1"></u-radio>
                        <u-radio activeColor="#3D8D7A" label="女" :name="0"></u-radio>
                    </u-radio-group>
                </view>
            </view>
            <!-- <button @click="toPage()">跳转</button> -->
            <u-input v-model="userInfo.age" border="none" placeholder="请输入年龄">
                <view class="input-info" slot="prefix">
                    年龄：
                </view>
            </u-input>
            <u-input v-model="userInfo.height" border="none" placeholder="请输入身高">
                <view class="input-info" slot="prefix">
                    身高：
                </view>
                <view class="input-info" slot="suffix">
                    cm
                </view>
            </u-input>
            <u-input v-model="userInfo.weight" border="none" placeholder="请输入体重">
                <view class="input-info" slot="prefix">
                    体重：
                </view>
                <view class="input-info" slot="suffix">
                    kg
                </view>
            </u-input>
            <u-input v-model="userInfo.workingYears" border="none" placeholder="请输入从业年限">
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
                    <u-checkbox-group :value="userInfo.checkboxList" @change="handleCheckboxChange">
                        <u-checkbox :labelDisabled="false" activeColor="#3D8D7A"
                            :customStyle="{marginRight: '8px',marginBottom:'8px'}"
                            v-for="(item, index) in checkboxList1" :key="index" :label="item.label" :name="item.value">
                        </u-checkbox>
                    </u-checkbox-group>
                </view>
            </view>
            <u-input v-model="userInfo.graduationSchool" border="none" placeholder="请输入毕业院校">
                <view class="input-info" slot="prefix">
                    毕业院校：
                </view>
            </u-input>
            <u-input v-model="userInfo.pastExperiences" border="none" placeholder="请输入过往经历">
                <view class="input-info" slot="prefix">
                    过往经历：
                </view>
            </u-input>
            <u-input v-model="userInfo.performanceCases" border="none" placeholder="请输入演出案例">
                <view class="input-info" slot="prefix">
                    演出案例：
                </view>
            </u-input>
            <view class="user-info-item">
                <view class="user-info-item-left" style="width: 180rpx;">
                    代表图：
                </view>
                <view class="user-info-item-right" v-if="!isEdit">
                    <u-album :urls="userInfo.coverImage.split(',')"></u-album>
                </view>
                <view class="user-info-item-right" v-else>
                    <u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple
                        :maxCount="10"></u-upload>
                </view>
            </view>
            <view class="user-info-item">
                <view class="user-info-item-left" style="width: 180rpx;">
                    视频片段：
                </view>
                <view class="user-info-item-right" v-if="!isEdit">
                    <u-album :urls="userInfo.videoClipUrl"></u-album>
                </view>
                <view class="user-info-item-right" v-else>
                    <u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple
                        :maxCount="10"></u-upload>
                </view>
            </view>
            <view class="bottom-card">
                <view class="login-btn" @click="toSubmit()">
                    {{ !isEdit?"编辑个人信息":'提交'}}
                </view>
            </view>

            <u-toast ref="uToast"></u-toast>
        </view>
    </view>
</template>

<script>
    import {
        getActorOne
    } from '@/api/actor.js'
    export default {
        data() {
            return {
                isEdit: false,
                activeNames: '',
                showDetail: false,
                currentTab: 0,
                avatarUrl: '',
                fileList1: [],
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
            getActorOne() {
                let params = {

                }
                getActorOne(params).then(res => {
                    console.log(res)
                    this.userInfo = res
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
                        icon: 'none',
                        duration: 1500
                    });
                    return

                } else {
                    // 正常更新数据
                    this.userInfo.checkboxList = selectedValues;
                }

            },
            toSubmit() {
                // this.activeNames = this.activeNames.includes('first') ? [] : ['first'],
                this.$nextTick(() => {
                    this.activeNames = 'first'
                    setTimeout(() => this.$refs.collapseRef.init(), 200);
                });
                // this.tagName[0] = 1
                console.log(this.activeNames)
                if (!this.isEdit) {
                    this.isEdit = !this.isEdit
                } else {

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
        background: rgba(246, 247, 250, 1);
        // min-height: 100vh;
        padding-top: 26rpx;
        padding-bottom: 250rpx;
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

    .signup-list {
        margin-top: 30rpx;
        background: #fff;
        border-radius: 16rpx;

        /deep/ .u-cell {
            padding: 28rpx 32rpx;
        }
    }
</style>