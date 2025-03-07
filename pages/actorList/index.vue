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
                nomoreText: '实在没有了'
            }
        },
        onPullDownRefresh() { //上拉刷新
            this.getActorList()
            uni.stopPullDownRefresh();
        },
        onHide() {
            uni.stopPullDownRefresh();
        },
        onLoad() {
            this.getActorList()

        },
        methods: {
            async onLoadmore() {
                if (this.loadmoreStatus === 'loading' || this.loadmoreStatus === 'nomore') return

                this.loadmoreStatus = 'loading'
                try {
                    const newData = await this.getActorList(this.pageNum, this.pageSize)
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
                getActorList(params).then(res => {
                    console.log(res)
                    this.list = res.dataList
                    this.loading = false
                    return res.dataList
                }).catch(err => {
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