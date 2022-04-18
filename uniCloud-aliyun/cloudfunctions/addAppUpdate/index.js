'use strict';
exports.main = async (event, context) => {
	const version=event.version
	const collection=uniCloud.database().collection('app_version')
	await collection.add({
		version:"1.4.5",
		desc:"1、bug修复<br>2、UI优化",
		url:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-e9504ddb-dff5-4426-9522-f3292371e284/8727243a-f865-4732-adac-69718fca39e5.apk",
		type:2
	})
	
	return '添加更新信息成功'
};
