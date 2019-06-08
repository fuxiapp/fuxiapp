const API = {
	get(url, token, data = {}, method = 'GET'){ // get请求
		return new Promise((resolve,reject) => {
			// 获取网络类型
			url = ``;
			uni.request({
				url,
				method: method,
				data: data,
				header:{ //自定义请求头信息
					'content-type': 'application/x-www-form-urlencoded',
					'Authorization':  'Bearer '+ token
				},
				success: (res) => {
					if( res.statusCode !== 200 ){
						uni.showToast({
							title:`${res.statusCode}错误`,
							icon: 'none'
						})
						resolve(res);
						return;
					}
					let data = res.data;
					if( data.code === 200 ){
						resolve(data);
					} else {
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
		});
	},
	post(url, token, data = {}){ 	// post请求
		return new Promise((resolve,reject) => {
			// 获取网络类型
			url = ``;
			uni.request({
				url,
				data,
				method: 'POST',
				header:{ //自定义请求头信息
					'content-type': 'application/json',
					'Authorization': token
				},
				success: (res) => {
					if( res.statusCode !== 200 ){
						uni.showToast({
							title:`${res.statusCode}错误`,
							icon: 'none'
						})
						resolve(res);
						return;
					}
					let data = res.data;
					if( data.code === 200 ){
						resolve(data);
					} else{
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
		});
	},
	//图片上传
	upload(success,fail){
		let url = '';
		// 获取网络类型
		url = ``;
		uni.chooseImage({
			count:1,
			 sourceType: ['album', 'camera'],
			success: (chooseImageRes) => {
				const tempFilePaths = chooseImageRes.tempFilePaths;
				uni.uploadFile({
					url: `${url}/upload/img`, 
					filePath: tempFilePaths[0],
					name: 'file',
					success,
					fail
				});
			}
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