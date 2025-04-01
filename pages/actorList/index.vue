<template>
    <view class="content">
        <u-loading-page bg-color="#e8e8e8" :loading="loading" loading-text="加载中..."></u-loading-page>
        <view class="input-search">
            <view style="width: 500rpx;" @click.stop="open()">
               <text>专业筛选:</text>  {{searchVal?searchVal:'点击选择专业'}}

            </view>
            <u-icon color="#b9b9b9" v-if="searchVal" name="close-circle" size="24" @click.stop="clear()"></u-icon>
            <u-icon name="search" size="24" @click.stop="search"></u-icon>
        </view>
        <view class="actor-card">

            <view class="actor-item" v-for="item,index in list" :key="index" @click="toActorDetail(item)">
 
                <image class="actor-item-img" :src="item.homeImage" mode=""></image>
                <!-- <view class="actor-item-info">
            		<view class="actor-item-info-name">
            			{{item.name}}
            		</view>
            		<view class="actor-item-info-detail">
            			{{item.pastExperiences}}
            		</view>
            	</view>
            	<u-icon name="arrow-right" size="20"></u-icon> -->
                <view class="actor-item-info-name">
                	{{item.name}}
                </view>
            </view>
        </view>

        <u-loadmore :status="loadmoreStatus" @loadmore="onLoadmore" :loading-text="loadingText"
            :loadmore-text="loadmoreText" :nomore-text="nomoreText" />
        <u-picker confirmColor="#3D8D7A" ref="multiPicker" :show="showPicker" :columns="columns"
            @change="handleColumnChange" @confirm="confirm" @cancel="showPicker = false" keyName="label" />
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
                showPicker: false,
                pageNum: 1, // 当前页码
                pageSize: 10, // 每页数量
                loadmoreStatus: 'loadmore', // 状态标识
                loadingText: '努力加载中',
                loadmoreText: '轻轻上拉',
                nomoreText: '没有更多了',
                searchVal: '',
                columns: [
                    ["歌手类", "乐队类", "舞蹈", "非遗", "器乐", "戏曲", "特技/绝技绝活", "杂技", "魔术", "武术", "戏剧表演", "舞美设计", "灯光师",
                        "音响师", "服装设计", "服装管理", "多媒体", "场务", "播音主持"
                    ],
                    ["音乐剧", "通俗", "美声", "民歌", "民族", "流行", "说唱"]
                ], // 动态列数据
                columnData: [
                    ["歌手类", "乐队类", "舞蹈", "非遗", "器乐", "戏曲", "特技/绝技绝活", "杂技", "魔术", "武术", "戏剧表演"],

                    ["民乐", "流行音乐", "西洋古典"],
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
            clear() {
                this.searchVal = ''
                this.list = []
                this.loadmoreStatus = 'loadmore'
                this.getActorList(1, 10)
            },
            open() {
                this.showPicker = true
            },
            search() {
                if (!this.searchVal) {
                    uni.showToast({
                        title: '请先选择专业!',
                        icon: 'none',
                        duration: 1200
                    })
                    return false
                }
                this.list = []
                this.loadmoreStatus = 'loadmore'
                this.getActorList(1, 10)
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
                this.searchVal = str
                this.showPicker = false
                this.search()
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
                    pageNum: pageNum,
                    skillKey: this.searchVal
                }
                this.loading = true
                return getActorList(params).then(res => {
                    if (res.dataList.length < 10) {
                        this.loadmoreStatus = 'nomore'
                    }
                    this.list = [...this.list, ...res.dataList]
                    setTimeout(() =>{
                         this.loading = false
                    },600)
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
        min-height: 100vh;
        box-sizing: border-box;
        background-color: #EEE;

        .input-search {
            border-top: 2rpx solid #eee;
            height: 76rpx;
            padding: 0 32rpx;
            box-sizing: border-box;
            background-color: #FFF;
            line-height: 76rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #b9b9b9;
            text {
                color: #646464;
                padding-right: 10rpx;
            }
        }

        .actor-card {
            width: 686rpx;
            margin: 15rpx auto 0;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: start;

            .actor-item:nth-child(3n) {
                margin-right: 0 !important;
            }

            .actor-item {
                width: 220rpx;
                // height: 350rpx;
                margin-right: 13rpx;
                margin-bottom: 15rpx;
                box-sizing: border-box;
                .actor-item-img {
                    width: 220rpx;
                    height: 350rpx;
                    border-radius: 15rpx;

                }
                .actor-item-info-name {
                    font-size: 36rpx;
                    font-weight: 500;
                    text-align: center;
                    margin-top: 10rpx;
                }

                .actor-item-info {
                    width: 500rpx;

                    

                    .actor-item-info-detail {
                        font-size: 24rpx;
                        color: rgb(153, 153, 153);
                    }
                }
            }
        }

    }
</style>