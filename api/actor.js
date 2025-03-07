import {
	request
} from '@/util/request.js'
//获取演员列表
export const getActorList = (data) => request({
	url: '/mini/actor/listByUser',
	method: 'post',
	data
})
//新增演员
export const addActor = (data) => request({
	url: '/mini/actor/add',
	method: 'post',
	data
})
//编辑演员
export const editActor = (data) => request({
	url: '/mini/actor/edit',
	method: 'post',
	data
})
//获取演员自己详情
export const getActorOne = (data) => request({
	url: '/mini/actor/getOneByUser',
	method: 'post',
	data
})

//获取演员详情
export const getActorOneDetail = (data) => request({
	url: '/mini/actor/getOne',
	method: 'post',
	data
})