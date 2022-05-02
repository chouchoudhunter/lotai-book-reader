'use strict';
let {toJson} = require('untils')
exports.main = async (event, context) => {
	const collection=uniCloud.database().collection('source')
	const sources=[]
	event.data.forEach(item=>{
		let temp={
			content:item,
			like:0
		}
		sources.push(temp)
	})
	collection.add(sources)
	//返回数据给客户端
	return toJson([],1,"添加完成")
};
