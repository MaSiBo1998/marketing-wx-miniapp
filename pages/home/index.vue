<template>
    <view class="content">
        <u-loading-page bg-color="#e8e8e8" :loading="loading" loading-text="加载中..."></u-loading-page>
        <!-- 轮播图 -->
        <u-swiper imgMode="heightFix" keyName="coverImage" @click="bannerClick"  height="240"
            interval="3000" duration="300" :list="bannerList"></u-swiper>
        <view class="notice-box" v-if="noticeString">
            <view class="notice-box-in">
                <view class="notic-box-left">
                    正在演出
                </view>
                <u-notice-bar fontSize="18" color="black" icon="" :text="noticeString"></u-notice-bar>
            </view>
        </view>
        <view class="company-detail">
            <image class="company-detail-img" src="http://edmfile.yiwaixiao.net/weixin/images/11_20250309210005714.png"
                mode="widthFix"></image>
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
                <view class="case-info-tips" v-html="item.detailDesc">
                </view>
            </view>
            <image class="case-img" :src="item.coverImage"></image>
        </view>
    </view>
</template>

<script>
    import {
        getActivePreviewList,
        getCaseList,
        getBannerList
    } from '@/api/home.js'
    export default {
        onLoad(options) {

        },
        onPullDownRefresh() { //上拉刷新
            this.initData()
            uni.stopPullDownRefresh();
        },
        onHide() {
            uni.stopPullDownRefresh();
        },
        //页面滚动到底部的事件
        onReachBottom() {

        },
        data() {
            return {
                loading: false,
                previewList: [],
                caseList: [],
                searchValue: '', //搜索值
                list: [

                ], //渲染列表
                bannerList: []

            }
        },
        computed: {
            noticeString() {
                let arr = []
                let string = ''
                let timestamp = Date.now();
                if(this.previewList &&this.previewList.length>0){
                    this.previewList.forEach(item => {
                        if (this.toTimestamp(item.activityStartTime) < timestamp && timestamp < this.toTimestamp(
                                item.activityEndTime)) {
                    
                            string += (item.location + '  ' + item.subject + '(时间:' + item.activityStartTime.slice(0,16) + '-' +
                                item.activityEndTime.slice(0,16) + ')') + '   '
                        }
                    })
                    console.log(string)
                    return string
                }else{
                    return ''
                }
                
            },
        },
        onLoad() {
            this.initData()
        },
        methods: {
            // 点击banner轮播图
            bannerClick(index) {
                console.log(index)
                var bannerData = ''
                var isJump = ''
                bannerData = this.bannerList[index] // banner 信息
                // 跳转类型0:app内跳转,1:第三方链接,2:不跳转
                isJump = bannerData.routeType
                console.log(isJump)
                if (isJump == 1) { // app内跳转
                    uni.setStorageSync('active_detail_id', bannerData.activityId)
                    uni.navigateTo({
                        url: '/pages/active/detail/index'
                    })
                } else if (isJump == 2) { // 第三方链接
                    plus.runtime.openURL(bannerData.pageUrl)

                } else { // 不跳转
                    return false
                }
            },
            initData() {
                this.getActivePreviewList()
                this.getCaseList()
                this.getBannerList()
            },
            toTimestamp(timeString) {
                let date = new Date(timeString.replace(' ', 'T') + 'Z'); // 转为ISO格式
                return date.getTime();
            },
            getActivePreviewList() {
                getActivePreviewList().then(res => {
                    this.previewList = res.dataList
                })
            },
            getBannerList() {
                let params = {
                    pageSize: 100,
                    pageNum: 1
                }
                getBannerList(params).then(res => {
                    console.log(res.dataList)
                    this.bannerList = res.dataList
                }).catch(err => {

                })
            },
            getCaseList() {
                let params = {
                    pageSize: 8,
                    pageNum: 1
                }
                this.loading = true
                getCaseList(params).then(res => {
                    console.log(res)
                    this.caseList = res.dataList
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                })
            },
        }


    }
</script>

<style lang="scss" scoped>
    .content {
        padding-bottom: 10rpx;
        box-sizing: border-box;

        /deep/.u-swiper {
            margin: 0 auto 16rpx;
            width: 750rpx;
          
            border-radius: 0;
            background: none !important;
        }

        .home-top-banner {
            width: 750rpx;
            display: block;
        }

        .notice-box {
            width: 750rpx;
            background-color: rgb(152, 4, 236);
            padding: 8rpx;
            box-sizing: border-box;

            .notice-box-in {
                display: flex;
                align-items: center;
                justify-content: space-between;
                background-color: #FFF;
                padding: 16rpx;

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
                    height: 62rpx;
                    line-height: 62rpx;

                    display: flex;
                    align-items: center;
                    background-color: #FFF !important;

                }

                /deep/.u-notice {
                    width: 100%;

                }

                /deep/.u-icon__icon {
                    display: none !important;
                }
            }

        }

        .company-detail {
            width: 750rpx;
            margin: 36rpx auto;

            .company-detail-img {
                width: 700rpx;
                display: block;
                margin: 0 auto;
            }

            .company-tips {
                padding: 24rpx 24rpx 0;
                font-size: 26rpx;
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
                max-height: 250rpx;

                .case-info-title {
                    font-size: 24rpx;
                    font-weight: 600;
                    font-family: "SimSun", "宋体", serif;
                    margin-bottom: 24rpx;
                }

                .case-info-tips {
                    width: 340rpx;
                    max-width: 340rpx;
                    /* 可选：限制最大宽度（适合小程序） */
                    overflow: hidden;
                    /* 直接隐藏溢出内容 */
                    word-wrap: break-word;
                    /* 长单词或URL换行 */
                    white-space: normal;
                    /* 覆盖默认 nowrap */
                    font-size: 24rpx;
                }
            }

            .case-img {
                width: 330rpx !important;
                max-height: 250rpx;
                border-radius: 32rpx;
            }
        }
    }
</style>