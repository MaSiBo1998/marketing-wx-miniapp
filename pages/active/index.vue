<template>
    <view class="content">
        <u-loading-page bg-color="#e8e8e8" :loading="loading" loading-text="加载中..."></u-loading-page>
        <u-search shape="round" actionText="" v-model="searchVal"></u-search>
        <view class="search-box">
            <view class="search-box-item">
                全部
            </view>
            <view class="search-box-item">
                全部分类
            </view>
            <view class="search-box-item">
                全部分类
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
                    活动时间:{{item.activityStartTime}}-{{item.activityEndTime}} <br>
                    报名截止: {{item.registrationDeadline}}
                </view>
                <view class="active-box-bottom-right" @click.stop="toSignUp(item)">
                    立即报名
                </view>
            </view>
        </view>
        <u-loadmore :status="loadmoreStatus" @loadmore="onLoadmore" :loading-text="loadingText"
            :loadmore-text="loadmoreText" :nomore-text="nomoreText" />
    </view>
</template>

<script>
    import {
        getActiveList
    } from '@/api/active.js'
    export default {
        data() {
            return {
                loading: false,
                searchVal: '',
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
                nomoreText: '实在没有了'
            }
        },
        onPullDownRefresh() { //上拉刷新
            this.getActiveList(1, 10)
            uni.stopPullDownRefresh();
        },
        onHide() {
            uni.stopPullDownRefresh();
        },
        onLoad() {
            this.getActiveList(1, 10)
        },
        methods: {
            async onLoadmore() {
                if (this.loadmoreStatus === 'loading' || this.loadmoreStatus === 'nomore') return

                this.loadmoreStatus = 'loading'
                try {
                    const newData = await this.getActiveList(this.pageNum, this.pageSize)
                    if (newData.length === 0) {
                        this.loadmoreStatus = 'nomore'
                    } else {
                        this.list = [...this.list, ...newData]
                        this.pageNum++
                    }
                } catch (error) {
                    console.error('加载失败:', error)
                } finally {
                    this.loadmoreStatus = 'loadmore'
                }
            },
            getActiveList(pageNum, pageSize) {
                let params = {
                    pageSize: pageSize,
                    pageNum: pageNum
                }
                this.loading = true
                getActiveList(params).then(res => {
                    this.list = res.dataList
                    this.loading = false
                    return res.dataList
                }).catch(err => {
                    this.loading = false
                })
            },
            toActivePage(data) {
                uni.setStorageSync('active_detail', data)
                uni.navigateTo({
                    url: '/pages/active/detail/index'
                })
            },
            toSignUp(data) {
                uni.setStorageSync('active_detail', data)
                uni.navigateTo({
                    url: '/pages/user/register/index?type=sign'
                })
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

        /deep/.u-search__action {
            display: none;
        }

        .search-box {
            margin-bottom: 32rpx;
            width: 750rpx;
            padding: 0 32rpx 16rpx;
            border-bottom: 2rpx solid #f5f5f5;
            display: flex;
            align-items: center;
            justify-content: flex-start;

            .search-box-item {
                margin-right: 16rpx;
                background-color: #f5f5f5;
                border-radius: 32rpx;
                padding: 8rpx 16rpx;
                font-family: "SimSun", "宋体", serif;
                font-size: 18rpx;
            }
        }

        .active-box {
            width: 686rpx;
            margin: 0 auto 16rpx;
            border-bottom: 2rpx solid #f5f5f5;
            padding-bottom: 15rpx;
            box-sizing: border-box;

            .active-img {
                width: 686rpx;
                display: block;
            }

            .active-box-title {
                font-size: 36rpx;
                font-weight: 600;
                width: 686rpx;
                margin: 16rpx 0 6rpx;
                text-align: left;
            }

            .active-box-info {
                font-size: 22rpx;
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

                .active-box-bottom-right {
                    background: #3D8D7A;
                    padding: 0 32rpx;
                    height: 64rpx;
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