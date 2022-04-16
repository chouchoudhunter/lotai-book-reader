'use strict';
exports.main = async (event, context) => {
	const version=event.version
	const collection=uniCloud.database().collection('app_version')
	await collection.add({
		version:"1.4.0",
		desc:"1、bug修复<br>2、UI优化<br>3、白屏优化",
		url:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-e9504ddb-dff5-4426-9522-f3292371e284/53adb867-d453-46a8-9130-9c227b566231.apk",
		type:2
	})
	
	return '添加更新信息成功'
};
