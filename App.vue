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

<style>
	/*每个页面公共css */
	@font-face {
		font-family: iconfont;
		src: url('~@/static/iconfont.ttf');
	}

	page {
		background-color: #F2F2F2;
	}

	/* @font-face {
		font-family: 'iconfont';
		src: url('//at.alicdn.com/t/font_1172835_rjr2d813pm8.eot');
		src: url('//at.alicdn.com/t/font_1172835_rjr2d813pm8.eot?#iefix') format('embedded-opentype'),
			url('//at.alicdn.com/t/font_1172835_rjr2d813pm8.woff2') format('woff2'),
			url('//at.alicdn.com/t/font_1172835_rjr2d813pm8.woff') format('woff'),
			url('//at.alicdn.com/t/font_1172835_rjr2d813pm8.ttf') format('truetype'),
			url('//at.alicdn.com/t/font_1172835_rjr2d813pm8.svg#iconfont') format('svg');
	} */
</style>
