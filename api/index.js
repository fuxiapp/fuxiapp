const API = {
	get(url, data = {}, method = 'GET'){ // get请求
		return new Promise((resolve,reject) => {
			// 获取网络类型
			url = `http://116.55.248.84:9090${url}`;
			let tokenId = '';
			uni.getStorage({
				key: 'fuxiUserInfo',
				success: (res) => {
					console.log(res.data.onlineId);
					tokenId = res.data.onlineId;
				}
			})
			setTimeout(() => {
				uni.request({
					url,
					method: method,
					data: data,
					header:{ //自定义请求头信息
						'content-type': 'application/x-www-form-urlencoded',
						"tokenId": tokenId
					},
					success: (res) => {
						let data = res.data;
						if(data.code === 'success') {
							resolve(data);
						} else if (data.code === 'no-login') {
							uni.navigateTo({
								url: '../../login/login'
							});
						} else {
							console.log(JSON.stringify(data));
							uni.showToast({
								title: '' + data.msg,
								icon: 'none'
							});
							resolve(data);
						}	
					},
					fail: (err) => {
						uni.showToast({
							title:'请求异常',
							icon: 'none'
						});
						reject(err);
					}
				});
			}, 10);
		
		});
	},
	post(url, data = {}, method ='POST'){ 	// post请求
		return new Promise((resolve,reject) => {
			// 获取网络类型
			url = `http://116.55.248.84:9090${url}`;
			let tokenId = '';
			uni.getStorage({
				key: 'fuxiUserInfo',
				success: (res) => {
					tokenId = res.data.onlineId;
				}
			});
			setTimeout(() => {
				uni.request({
					url,
					data,
					method: method,
					header:{ //自定义请求头信息
						'content-type': 'application/json',
						"tokenId": tokenId
					},
					success: (res) => {
						let data = res.data;
						if( data.code === 'success' ){
							resolve(data);
						} else if (data.code === 'no-login') {
							uni.navigateTo({
								url: '../../login/login'
							});
						}  else{
							uni.showToast({
								title: '' + data.message,
								icon: 'none'
							});
							resolve(data);
						}	
					},
					fail: (err) => {
						uni.showToast({
							title:'请求异常',
							icon: 'none'
						});
						reject(err);
					}
				});
			}, 10);
		});
	},
	//图片上传
	upload(goodsCode=1){
		return new Promise((resolve,reject) => {
			let url = `http://116.55.248.84:9090/fuxi/common/upload-image?goodsCode=${goodsCode}`;
			// 获取网络类型
			uni.chooseImage({
				count: 1,
			    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], //从相册选择
				success: (res) => {
					let imageSrc = res.tempFilePaths[0]
					uni.uploadFile({
						url: url,
						filePath: imageSrc,
						fileType: 'image',
						name: 'file',
						success: (res) => {
							res.imageSrc = imageSrc;
							resolve(res);
						},
						fail: (err) => {
							resolve(err);
						}
					});
				},
				fail: (err) => {
					reject(err);
				}
			})
		});
	},
	// 底部导航栏切换
	tab(url){
		return new Promise( (resolve,reject) => {
			uni.switchTab({
				url,
				success:(res) =>{
					resolve(res);
				},
				fail:(err) =>{
					reject(err);
				}
			});
		});
	},
	// 页面跳转
	to(url){
		return new Promise( (resolve,reject) =>{
			uni.navigateTo({
				url,
				success:(res) =>{
					resolve(res);
				},
				fail:(err) =>{
					reject(err);
				}
			})
		});
	},
	//页面后退
	bank(delta = 1){
		uni.navigateBack({
			delta
		});
	},
	// 设置本地缓存
	setStorage(key,data){
		return new Promise( (resolve,reject) =>{
			uni.setStorage({
				key,
				data,
				success:(res) =>{
					resolve(res);
				},
				fail:(err) =>{
					reject(err);
				}
			})
		})  
	},
	// 获取本地缓存
	getStorage(key){
		return new Promise( (resolve,reject) =>{
			uni.getStorage({
				key,
				success:(res) =>{
					resolve(res);
				},
				fail:(err) =>{
					reject(err);
				}
			})
		})
	},
	//删除本地缓存
	removeStorage(key){
		return new Promise( (resolve,reject) =>{
			uni.removeStorage({
				key,
				success:(res) =>{
					resolve(res);
				},
				fail:(err) =>{
					reject(err);
				}
			});
		})
	},
	//设置标题
	setTitle(title){
		uni.setNavigationBarTitle({
			title,
		});
	},
	disLeftNav(){
		let pages = getCurrentPages();
		let page = pages[pages.length - 1];
		let currentWebview = page.$getAppWebview();
		let titleObj = currentWebview.getStyle().titleNView;
		titleObj.autoBackButton = false;
		currentWebview.setStyle({
			titleNView: titleObj
		});
	}
};
export default API;