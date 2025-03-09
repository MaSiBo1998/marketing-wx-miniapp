import {
	request
} from '@/util/request.js'
//微信登录
export const wxLoginCode = (data) => request({
	url: '/user/miniUser/login',
	method: 'post',
	data
})
//绑定手机号
export const wxGetMobile = (data) => request({
	url: '/weixin/api/getPhone',
	method: 'post',
	data
})

