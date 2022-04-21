'use strict';
exports.main = async (event, context) => {
	const version=event.version
	const collection=uniCloud.database().collection('app_version')
	await collection.add({
		version:"2.1.6",
		desc:`<h3>更新说明(2.1.0版本紧急更新补丁)</h3>
		1、bug修复<br>
		2、UI优化<br>
		3、添加了一个有名著的源<br>
		<h3>下个版本预计更新</h3>
		1、发现页面 排行模块开发
		`,
		url:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-e9504ddb-dff5-4426-9522-f3292371e284/c917cbca-d145-471c-9019-fe0e36bbec35.apk",
		type:2
	})
	
	return '添加更新信息成功'
};
