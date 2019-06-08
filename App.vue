<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
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
	/*每个页面公共css */
	@font-face {
		font-family: iconfont;
		src: url('~@/static/iconfont.ttf');
	}

	page {
		background-color: #F2F2F2;
	}
</style>
