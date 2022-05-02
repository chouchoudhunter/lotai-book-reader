'use strict';
let {toJson} = require('untils')
exports.main = async (event, context) => {
	const collection=uniCloud.database().collection('source')
	const sources=await collection.where({}).get()
	//返回数据给客户端
	return toJson(sources)
};
