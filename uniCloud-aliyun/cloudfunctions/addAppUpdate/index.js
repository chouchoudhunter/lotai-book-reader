'use strict';
exports.main = async (event, context) => {
	const version=event.version
	const collection=uniCloud.database().collection('app_version')
	await collection.add({
		version:"2.3.7",
		desc:`<h3>更新说明</h3>
		1、添加音量键翻页<br>
		<h3>下个版本预计更新</h3>
		1、发现页面 排行模块开发<br>
		2、阅读滑动翻页<br>
		3、分享APP功能<br>
		`,
		url:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-e9504ddb-dff5-4426-9522-f3292371e284/67395844-48a7-41d8-bff7-969e649b8810.apk",
		type:2
	})
	
	return '添加更新信息成功'
};
