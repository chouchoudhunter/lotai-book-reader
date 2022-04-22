'use strict';
exports.main = async (event, context) => {
	const version=event.version
	const collection=uniCloud.database().collection('app_version')
	await collection.add({
		version:"2.2.7",
		desc:`<h3>更新说明</h3>
		1、bug修复<br>
		2、加大阅读底部按钮触发范围<br>
		3、去除章节前后多余的空格<br>
		4、加载目录的时候也显示加载logo<br>
		5、图片缓存清理功能<br>
		6、亮度功能优化<br>
		7、read页加载动画颜色匹配阅读背景色<br>
		<h3>下个版本预计更新</h3>
		1、发现页面 排行模块开发
		`,
		url:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-e9504ddb-dff5-4426-9522-f3292371e284/87880ecd-ee9f-4b3a-b29e-5972458a0bbb.apk",
		type:2
	})
	
	return '添加更新信息成功'
};
