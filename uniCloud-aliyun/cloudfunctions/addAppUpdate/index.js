'use strict';
exports.main = async (event, context) => {
	const version=event.version
	const collection=uniCloud.database().collection('app_version')
	await collection.add({
		version:"2.0.0",
		desc:`<h4>更新说明</h4>
		1、bug修复<br>
		2、UI优化<br>
		3、添加额外两个网文源<br>
		4、换源功能大致完成<br><br>
		<h4>下个版本预计更新</h4>
		1、添加出版文学图书源<br>
		2、发现页面 排行模块开发
		<h3 style="color:red">此版本缓存结构发生变化，请务必删除我的书架里的书(长按书本可以删除)，且清空浏览记录</h3>
		`,
		url:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-e9504ddb-dff5-4426-9522-f3292371e284/b4f5c576-dc62-4da4-af3b-1ba1a0aa1d21.apk",
		type:2
	})
	
	return '添加更新信息成功'
};
