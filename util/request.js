export const baseURL = 'http://xcxapi.yiwaixiao.net'

export const request = (options) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseURL + options.url, //接口地址：前缀+方法中传入的地址
			method: options.method || 'GET', //请求方法：传入的方法或者默认是“GET”
			data: options.data || {}, //传递参数：传入的参数或者默认传递空集合
			header: {
				'content-type': 'application/json;',
				'token': '86aee16367f349f28c8cc11a7f37a744',// options.token
			},
			success: (res) => {
				uni.hideLoading();
				if (res.data.code == 0 ) {
					resolve(res.data.data)
				} else if (res.data.code == 600){
					resolve(res.data)
				}
				else {
					if (res.data.code == 301) { //token过期
						// uni.showToast({
						// 	title: '更多功能,请先登录',
						// 	icon: 'none',
						// 	duration: 1200
						// })
						// setTimeout(()=> {
						// 	uni.navigateTo({
						// 		url: '/pages/login/authorize'
						// 	})
						// },1000)
						return false
						
					}
					reject(res.data.msg)
				}
			},
			// 这里的接口请求，如果出现问题就输出接口请求失败
			fail: (err) => {
				uni.hideLoading();
				reject(err)
			}
		})
	})
}
