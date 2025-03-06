import {
	request
} from '@/util/request.js'
//获取招募列表
export const getActiveList = (data) => request({
	url: '/mini/activity/list',
	method: 'post',
	data
})
//获取招募详情
export const getActiveOne = (data) => request({
	url: '/mini/activity/getOne',
	method: 'post',
	data
})
//立即报名
export const toSignUp = (data) => request({
	url: '/mini/registration/add',
	method: 'post',
	data
})