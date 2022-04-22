'use strict';
exports.main = async (event, context) => {
	const version=event.version
	const collection=uniCloud.database().collection('app_version')
	await collection.add({
		version:"2.3.0",
		desc:`<h3>更新说明</h3>
		1、修复删除书本后不关闭提示框的bug<br>
		<h3>下个版本预计更新</h3>
		1、发现页面 排行模块开发
		`,
		url:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-e9504ddb-dff5-4426-9522-f3292371e284/f6526194-d6d8-437f-aa59-b48bae7e5a3a.apk",
		type:2
	})
	
	return '添加更新信息成功'
};
