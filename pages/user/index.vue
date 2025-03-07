<template>
    <view class="container">
        <!-- 用户信息头部 -->
        <view class="user-header">
            <image class="avatar-img" src="https://img.js.design/assets/img/624fdbbf79ea51291deaea2d.png" mode="">
            </image>
            <view class="user-header-right">
                <view class="user-header-right-name">
                    {{userInfo.name}}
                </view>
                <view class="user-header-right-mobile">
                    {{userInfo.phoneNumber}}
                </view>
            </view>
        </view>

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
<!--        <button class="btn" open-type="chooseAvatar" @click="getUserProfile">头像</button>
        <button open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber">手机号</button> -->
        <!-- <button @click="getUserProfile()">跳转</button> -->
        <u-input :disabled="!isEdit" v-model="userInfo.age" border="none" placeholder="请输入年龄">
            <view class="input-info" slot="prefix">
                年龄：
            </view>
        </u-input>
        <u-collapse ref="collapseRef" :border="false" accordion :value="activeNames">
            <u-collapse-item title="查看更多" name="first">
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
                <u-input :disabled="!isEdit" v-model="userInfo.workingYears" border="none" placeholder="请输入从业年限">
                    <view class="input-info" slot="prefix">
                        从业年限：
                    </view>
                    <view class="input-info" slot="suffix">
                        年
                    </view>
                </u-input>
                <view class="user-info-item" @click="open(0)">
                    <view class="user-info-item-left">
                        特长1：
                    </view>
                    <view class="user-info-item-right">
                        {{userInfo.primarySkillCategory}}
                    </view>
                </view>
                <view class="user-info-item" @click="open(1)">
                    <view class="user-info-item-left">
                        特长2：
                    </view>
                    <view class="user-info-item-right">
                        {{userInfo.secondarySkillCategory}}
                    </view>
                </view>
                <view class="user-info-item" @click="open(2)">
                    <view class="user-info-item-left">
                        特长3：
                    </view>
                    <view class="user-info-item-right">
                        {{userInfo.thirdlySkillCategory}}
                    </view>
                </view>
                <u-input :disabled="!isEdit" v-model="userInfo.otherProfessionalCategory" border="none"
                    placeholder="请输入特长">
                    <view class="input-info" slot="prefix">
                        其他特长：
                    </view>
                </u-input>
                <u-input :disabled="!isEdit" v-model="userInfo.graduationSchool" border="none" placeholder="请输入毕业院校">
                    <view class="input-info" slot="prefix">
                        毕业院校：
                    </view>
                </u-input>
                <u-input :disabled="!isEdit" v-model="userInfo.pastExperiences" border="none" placeholder="请输入过往经历">
                    <view class="input-info" slot="prefix">
                        过往经历：
                    </view>
                </u-input>
                <u-input :disabled="!isEdit" v-model="userInfo.performanceCases" border="none" placeholder="请输入演出案例">
                    <view class="input-info" slot="prefix">
                        演出案例：
                    </view>
                </u-input>
                <view class="user-info-item">
                    <view class="user-info-item-left" style="width: 150rpx;">
                        代表图：
                    </view>
                    <view class="user-info-item-right" v-if="!isEdit">
                        <u-album singleSize="50" multipleSize="50" :urls="userInfo.coverImage" :maxCount="9"></u-album>
                    </view>
                    <view class="user-info-item-right" v-else>
                        <u-upload :previewFullImage="true" :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple 
                            :maxCount="9"></u-upload>
                    </view>
                </view>
                <view class="user-info-item">
                    <view class="user-info-item-left" style="width: 180rpx;">
                        视频片段：
                    </view>
                    <view class="user-info-item-right" v-if="!isEdit">
                        <u-album singleSize="50" multipleSize="50" :urls="[userInfo.videoClipUrl]"></u-album>
                    </view>
                    <view class="user-info-item-right" v-else>
                       <u-upload :fileList="fileList2" @afterRead="afterRead" @delete="deletePic" name="2" multiple
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
        <u-picker confirmColor="#3D8D7A" ref="multiPicker" :show="showPicker" :columns="columns"
            @change="handleColumnChange" @confirm="confirm" @cancel="showPicker = false" keyName="label" />
        <u-toast ref="uToast"></u-toast>
    </view>
</template>

<script>
    import {baseURL} from '@/util/request.js'
    import {
        getActorOne,
        editActor
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
                fileList2: [],
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
                imgList:[],
                showPicker: false,
                skillIndex: 0,
                columns: [
                    ["歌手类", "乐队类", "舞蹈", "非遗", "器乐", "戏曲", "特技/绝技绝活", "杂技", "魔术", "武术", "戏剧表演", "舞美设计", "灯光师",
                        "音响师", "服装设计", "服装管理", "多媒体", "场务"
                    ],
                    ["音乐剧", "通俗", "美声", "民歌", "民族", "流行", "说唱"]
                ], // 动态列数据
                columnData: [
                    ["歌手类", "乐队类", "舞蹈", "非遗", "器乐", "戏曲", "特技/绝技绝活", "杂技", "魔术", "武术", "戏剧表演"],

                    ["民乐", "流行音乐"],
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
                ],
                fileList:[]
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
            open(index) {
                if (!this.isEdit) {
                    return false
                }
                this.skillIndex = index
                this.showPicker = true
            },
            confirm(e) {
                console.log('confirm', e)
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
            onGetPhoneNumber(e) {
                console.log(e)
                let str = ''
                if (e.value.length == 2) {
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
            },
            getUserProfile() {
                let that = this
                uni.getUserProfile({
                    desc: "用于完善用户信息",
                    success: (res1) => {
                        console.log(res1)
                        uni.showToast({
                            icon: "none",
                            title: '获取成功'
                        })
                    },
                    fail: (err) => {
                        console.log(err)
                        uni.showToast({
                            icon: "none",
                            title: '用户拒绝获取'
                        })
                    }
                })
            },
            getActorOne() {
                getActorOne().then(res => {
                    console.log(res)
                    this.userInfo = res
                    this.userInfo.coverImage = res.coverImage.split(',')
                    if(res.coverImage != ''){
                        this.userInfo.coverImage.forEach(item =>{
                            this.fileList1.push({
                                url:item
                            })
                        })
                    }
                    if(res.videoClipUrl != ''){
                        this.fileList2 = [{
                            url:res.videoClipUrl
                        }]
                    }
                    // this.fileList1 = this.userInfo.coverImage
                    uni.setStorageSync('userInfo', res)
                })
            },
            toPage() {
                uni.navigateTo({
                    url: '/pages/login/authorize'
                })
            },

            toSubmit() {
                this.$nextTick(() => {
                    this.activeNames = 'first'
                    setTimeout(() => this.$refs.collapseRef.init(), 200);
                });
                console.log(this.activeNames)
                if (!this.isEdit) {
                    this.isEdit = !this.isEdit
                } else {
                    let params = {
                        ...this.userInfo
                    }
                    let arr = []
                    this.fileList1.forEach(item =>{
                        arr.push(item.url)
                    })
                    params.videoClipUrl = this.fileList2[0].url
                    params.coverImage = arr.join(',')
                    uni.showLoading({
                        title: '加载中'
                    });
                    editActor(params).then(res => {
                        this.getActorOne()
                        this.isEdit = false
                    })
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
            // 切换tab
            changeTab(data) {
                this.currentTab = data.count
                // 这里根据tab切换列表数据
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
                    if(event.name == 1){
                         result = await this.uploadFilePromise(lists[i].url);
                    }else{
                          result = await this.uploadFileVideoPromise(lists[i].url);
                    }
                    let item = this[`fileList${event.name}`][fileListLen];
                    this[`fileList${event.name}`].splice(
                        fileListLen,
                        1,
                        Object.assign(item, {
                            status: "success",
                            message: "",
                            url: result,
                        })
                    );
                    fileListLen++;
                }
            },
            uploadFilePromise(url) {
                return new Promise((resolve, reject) => {
                    let a = uni.uploadFile({
                        url: baseURL+"/upload/uploadImages",
                        filePath: url,
                        name: "file",
                        header:{
                            token:uni.getStorageSync('token')
                        },
                        success: (res) => {
                            let ret = JSON.parse(res.data)
                            if(ret.code != 0 ){
                                uni.showToast({
                                	title: '上传失败',
                                	icon: 'none',
                                	duration: 1200
                                })
                            }else{
                                resolve(ret.data.httpPath)
                            }
                            
                        },
                    });
                });
            },
            uploadFileVideoPromise(url) {
                return new Promise((resolve, reject) => {
                    let a = uni.uploadFile({
                        url: baseURL+"/upload/uploadVideo",
                        filePath: url,
                        name: "file",
                        header:{
                            token:uni.getStorageSync('token')
                        },
                        success: (res) => {
                            let ret = JSON.parse(res.data)
                            if(ret.code != 0 ){
                                uni.showToast({
                                	title: '上传失败',
                                	icon: 'none',
                                	duration: 1200
                                })
                            }else{
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
    img {
        display: block;
    }
    .container {
        background-color: #FFF;
        // min-height: 100vh;
        padding-top: 80rpx;
        box-sizing: border-box;
    }

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