'use strict';
exports.main = async (event, context) => {
	const version=event.version
	const collection=uniCloud.database().collection('app_version')
	await collection.add({
		version:"2.2.7",
		desc:`<h3>更新说明</h3>
		1、bug修复<br>
		2、目录自动跳转<br>
		3、发现页面的预加载<br>
		4、read页面文字缩小bug<br>
		<h3>下个版本预计更新</h3>
		1、发现页面 排行模块开发
		`,
		url:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-e9504ddb-dff5-4426-9522-f3292371e284/87880ecd-ee9f-4b3a-b29e-5972458a0bbb.apk",
		type:2
	})
	
	return '添加更新信息成功'
};
