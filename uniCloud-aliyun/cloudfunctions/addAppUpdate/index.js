'use strict';
exports.main = async (event, context) => {
	const version=event.version
	const collection=uniCloud.database().collection('app_version')
	await collection.add({
		version:"2.3.3",
		desc:`<h3>更新说明</h3>
		1、修复删除书本后不关闭提示框的bug<br>
		2、修复换源bug<br>
		3、修复检查更新bug<br>
		<h3>下个版本预计更新</h3>
		1、发现页面 排行模块开发
		`,
		url:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-e9504ddb-dff5-4426-9522-f3292371e284/b82ce0d7-4ca6-4f13-a945-9ab7b2fdd0f7.apk",
		type:2
	})
	
	return '添加更新信息成功'
};
