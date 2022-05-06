'use strict';
exports.main = async (event, context) => {
	const version=event.version
	const collection=uniCloud.database().collection('app_version')
	await collection.add({
		version:"2.4.5",
		desc:`<h3>更新说明</h3>
		1、修复再次搜索没有刷新结果的bug<br>
		2、修复搜索页tabs显示问题<br>
		<h3 style="color:red">此版本会强制清空所有缓存！！！（目前依然处于测试阶段，无法避免缓存结构的变化导致版本更新会清除缓存）</h3>
		<h3>下个版本预计更新</h3>
		1、阅读滑动翻页<br>
		2、分享APP功能<br>
		`,
		url:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-e9504ddb-dff5-4426-9522-f3292371e284/fe838008-b8d5-494a-99f8-b03209ed32b3.apk",
		type:2
	})
	
	return '添加更新信息成功'
};
