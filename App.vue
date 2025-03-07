<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
            uni.setStorageSync('token','76714670b04f4fcb9beffb8305aa4b9e')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "@/uni_modules/uview-ui/index.scss";
	* {
		box-sizing: border-box;
	}
	/*每个页面公共css */
</style>
