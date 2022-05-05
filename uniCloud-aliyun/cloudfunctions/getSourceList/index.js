'use strict';
let {toJson} = require('untils')
exports.main = async (event, context) => {
	const collection=uniCloud.database().collection('source')
	const sources=await collection.where({}).get()
	const feed={
		name:'LoTai源',
		list:sources.data
	}
	//返回数据给客户端
	return toJson(feed)
};
