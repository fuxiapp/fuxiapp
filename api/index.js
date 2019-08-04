const API = {
	get(url, data = {}, method = 'GET'){ // get请求
		return new Promise((resolve,reject) => {
			console.log(JSON.stringify(data));
			// 获取网络类型
			url = `http://116.55.248.84:9090${url}`;
			let tokenId = '';
			uni.getStorage({
				key: 'fuxiUserInfo',
				success: (res) => {
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
						console.log(JSON.stringify(res));
						if(data.code === 'success') {
							resolve(data);
						} else if (data.code === 'no-login') {
							uni.navigateTo({
								url: '../../login/login'
							});
						} else if (data.status === 500) {
							uni.showToast({
								title: '' + data.message,
								icon: 'none'
							});
							resolve(data);
						} else {
							uni.showToast({
								title: '' + data.msg,
								icon: 'none'
							});
							resolve(data);
						}	
					},
					fail: (err) => {
						console.log(err);
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
			console.log(data);
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
						console.log(JSON.stringify(res));
						if( data.code === 'success' ){
							resolve(data);
						} else if (data.code === 'no-login') {
							uni.navigateTo({
								url: '../../login/login'
							});
						} else if (data.status === 500) {
							uni.showToast({
								title: '' + data.message,
								icon: 'none'
							});
							resolve(data);
						} else {
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
	//选择图片
	uploadChooseImage(){
		return new Promise((resolve,reject) => {
			// 获取网络类型
			uni.chooseImage({
				count: 1,
			    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], //从相册选择
				success: (res) => {
					let imageSrc = res.tempFilePaths[0];
					resolve(imageSrc);
				},
				fail: (err) => {
					reject(err);
				}
			})
		});
	},
	//图片上传
	upload(goodsCode=1, imageSrc){
		return new Promise((resolve,reject) => {
			console.log('上传图片code = ' + goodsCode);
			let url = `http://116.55.248.84:9090/fuxi/common/upload-image?goodsCode=${goodsCode}`;
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
	// 关闭当前页面跳转
	rto(url){
		return new Promise( (resolve,reject) =>{
			uni.redirectTo({
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
	},
	generateNo () { // 生成流水号(部门编码+年月日+两位流水号 departmentNo)
		return new Promise( (resolve,reject) =>{
			// 获取部门编号
			let departmentNo = '';
			uni.getStorage({
				key: 'fuxiUserInfo',
				success:(res) =>{
					departmentNo = res.data.departmentNo;
				}
			});
			setTimeout(() => {
				// 获取当前时间
				let dd = new Date();
				let y = dd.getFullYear();
				let m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1; // 获取当前月份的日期，不足10补0
				let d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate(); // 获取当前几号，不足10补0
				let day =  y +  m + d;
				// 流水号
				let no = Math.floor(Math.random()*10);
				let no2 = Math.floor(Math.random()*10);
				let val = departmentNo + '' +day + '' + no + '' +no2;
				resolve(val);
			}, 20);
		});
	},
	fmtDateInfo (date) { // 格式化日期
		if (date === '' || date === undefined || date === null) {
			return '';
		}
		let arr = date.split('-');
		let month = arr[1];
		let strDate = arr[2];
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		return arr[0] + '-' + month + '-' + strDate;
	},
	fmtSelData (arr, type) { // 格式化弹框选择
		let list = [];
		if (arr.length === 0) {
			return list;
		}
		switch  (type) {
			case 1: // 查询年份 /fuxi/select/query-age
				for (let i = 0; i < arr.length; i++) {
					let info = {id: arr[i].age, name: arr[i].age, flg: false};
					list.push(info);
				}
				break;
			case 2: // 查询品牌 /fuxi/select/query-brand 
				for (let i = 0; i < arr.length; i++) {
					let info = {id: arr[i].brandId, name: arr[i].brand, flg: false};
					list.push(info);
				}
				break;
			case 3: // 查询颜色 /fuxi/select/query-color
				for (let i = 0; i < arr.length; i++) {
					let info = {id: arr[i].colorId, name: arr[i].color, flg: false};
					list.push(info);
				}
				break;
			case 4: // 查询客户 /fuxi/select/query-customer
				for (let i = 0; i < arr.length; i++) {
					let info = {id: arr[i].customerId, name: arr[i].customer, flg: false, departmentId:  arr[i].departmentId};
					list.push(info);
				}
				break;
			case 5: // 查询客户类别 /fuxi/select/query-customer-type
				for (let i = 0; i < arr.length; i++) {
					let info = {id: arr[i].customerTypeId, name: arr[i].customerType, flg: false};
					list.push(info);
				}
				break;
			case 6: // 查询部门 /fuxi/select/query-department
				for (let i = 0; i < arr.length; i++) {
					let info = {id: arr[i].departmentId, name: arr[i].department, flg: false};
					list.push(info);
				}
				break;
			case 7: // 查询店仓类别 /fuxi/select/query-department-type
				for (let i = 0; i < arr.length; i++) {
					let info = {id: arr[i].departmentTypeId, name: arr[i].departmentType, flg: false};
					list.push(info);
				}
				break;
			case 8: // 查询店仓类型 /fuxi/select/query-dept-type
				for (let i = 0; i < arr.length; i++) {
					let info = {id: arr[i].deptType, name: arr[i].deptType, flg: false};
					list.push(info);
				}
				break;
			case 9: // 查询区域 /fuxi/select/query-district
				for (let i = 0; i < arr.length; i++) {
					let info = {id: arr[i].districtId, name: arr[i].district, flg: false};
					list.push(info);
				}
				break;
			case 10: // 查询员工(经手人)  /fuxi/select/query-employee 
				for (let i = 0; i < arr.length; i++) {
					let info = {id: arr[i].employeeId, name: arr[i].name, flg: false};
					list.push(info);
				}
				break;
			case 11: // 查询货品类别  /fuxi/select/query-goods-type
				for (let i = 0; i < arr.length; i++) {
					let info = {id: arr[i].goodsTypeId, name: arr[i].goodsType, flg: false};
					list.push(info);
				}
				break;
			case 12: // 查询季节  /fuxi/select/query-season
				for (let i = 0; i < arr.length; i++) {
					let info = {id: arr[i].season, name: arr[i].season, flg: false};
					list.push(info);
				}
				break;
			case 13:// 查询厂商  /fuxi/select/query-supplier
				for (let i = 0; i < arr.length; i++) {
					let info = {id: arr[i].supplierId, name: arr[i].supplier, flg: false};
					list.push(info);
				}
				break;
			case 14:// 查询仓库  /fuxi/select/query-warehouse 
				for (let i = 0; i < arr.length; i++) {
					let info = {id: arr[i].departmentId, name: arr[i].department, flg: false};
					list.push(info);
				}
				break;
			case 15: // 查询会员类别   /fuxi/select/query-vip-type
				for (let i = 0; i < arr.length; i++) {
					let info = {id: arr[i].vipTypeId, name: arr[i].vipType, flg: false};
					list.push(info);
				}
				break;
			case 16: // 查询厂商类别  /fuxi/select/query-supplier-type
					for (let i = 0; i < arr.length; i++) {
						let info = {id: arr[i].supplierTypeId, name: arr[i].supplierType, flg: false};
						list.push(info);
					}
					break;
			case 17:  // 查询销售类别  fuxi/select/query-sales-Type 
					for (let i = 0; i < arr.length; i++) {
						let info = {id: arr[i].Name, name: arr[i].Name, flg: false};
						list.push(info);
					}
					break;		
			case 18:  // 查询支付方式  /fuxi/select/query-payment-Type 
					for (let i = 0; i < arr.length; i++) {
						let info = {id: arr[i].PaymentTypeID, name: arr[i].Name, flg: false};
						list.push(info);
					}
					break;				
		}	
		return list;
	},
	fmtClearTime (dete) { // 去除日期后面的时分秒
		if (dete === '' || dete === null || dete === undefined) {
			return dete;
		}
		let newDate = dete.split('T');
		return newDate[0];
	}
};
export default API;