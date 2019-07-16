// 手机号码验证
function meetsTel(str){
	let reg = /^[0-9]{8,11}$/;
	if( str.trim().length === 0 ){
		return true;
	}
	return  reg.test(str);
}
//登錄id驗證
function meetsId(str){
	let reg = /^[a-zA-Z0-9_]{1,15}$/;
	if( str.trim().length === 0 ){
		return true;
	}
	return reg.test(str);
}
//登錄密碼驗證
function meetsPass(str){
	let reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,16}$/;
	if( str.trim().length === 0 ){
		return true;
	}
	return reg.test(str);
}
//邮箱的校验
function meetsEmail(str){
	let reg = /^[A-Za-z\d]+([-_.]+[A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
	if( str.trim().length === 0 ){
		return true;
	}
	return reg.test(str);
}
// 判斷是否是英文
function isChinese(str){
	let reg= /[\u4e00-\u9fa5]/gi;
	if (reg.test(str)){
		return false;
	}
    return true ;
}
//格式化日期时间
function formatTime(time){
	let date = new Date(time*1000);
	let y = date.getFullYear();
	let m = date.getMonth() + 1;
	if( m < 10 ){
		m = '0' + m;
	}
	let s = date.getDate();
	if( s < 10 ){
		s = '0' + s;
	}
	let h = date.getHours();
	if( h < 10 ){
		h = '0' + h;
	}
	let mm = date.getMinutes();
	if( mm < 10 ){
		mm = '0' + mm;
	}
	
	return `${y}-${m}-${s} ${h}:${mm}`;
}
// 价格验证
function pricePass(str){
	let reg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
	if (!reg.test(str)){
		return false;
	}
	return true ;
}
module.exports = {
	meetsTel,
	meetsId,
	meetsPass,
	meetsEmail,
	isChinese,
	formatTime,
	pricePass
}