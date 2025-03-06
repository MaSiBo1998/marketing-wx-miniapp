import {
	request
} from '@/util/request.js'
//获取活动预告
export const getActivePreviewList = (data) => request({
	url: '/mini/preview/list',
	method: 'post',
	data
})
//获取经典案例
export const getCaseList = (data) => request({
	url: '/mini/classical/list',
	method: 'post',
	data
})