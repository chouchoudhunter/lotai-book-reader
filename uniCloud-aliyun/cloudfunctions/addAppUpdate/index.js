'use strict';
exports.main = async (event, context) => {
	const version=event.version
	const collection=uniCloud.database().collection('app_version')
	await collection.add({
		version:"2.6.0 ",
		desc:`<h3>更新说明</h3>
		1、ui优化<br>
		2、优化错误提示<br>
		3、软件分享功能<br>
		<h3 style="color:red">此版本会强制清空所有缓存！！！（目前依然处于测试阶段，无法避免缓存结构的变化导致版本更新会清除缓存）</h3>
		<h3>下个版本预计更新</h3>
		1、阅读滑动翻页<br>
		2、分享APP功能<br>
		`,
		url:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-e9504ddb-dff5-4426-9522-f3292371e284/68fbc17b-f8aa-412d-9880-18986dcdaf09.apk",
		type:2
	})
	
	return '添加更新信息成功'
};
