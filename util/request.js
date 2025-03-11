export const baseURL = 'https://xcxapi.yiwaixiao.net'

export const request = (options) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseURL + options.url, //接口地址：前缀+方法中传入的地址
			method: options.method || 'GET', //请求方法：传入的方法或者默认是“GET”
			data: options.data || {}, //传递参数：传入的参数或者默认传递空集合
			header: {
				'content-type': 'application/json;',
				'token': uni.getStorageSync('token'),// options.token
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
					if(res.data.code == 0){
						resolve(res.data)
					}else if (res.data.code == 301){
						uni.showToast({
							title: '登录已过期,请重新登录',
							icon: 'none',
							duration: 1200
						})
						uni.navigateTo({
							url:'/pages/login/authorize'
						})
					}else{
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 1200
						})
						reject(res.data)
					}
					
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
