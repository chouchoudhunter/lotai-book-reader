'use strict';
let {toJson} = require('untils')
exports.main = async (event, context) => {
	let updateInfo={
		type:1//无需更新
	}
	const version=event.version
	const collection=uniCloud.database().collection('app_version').orderBy('_id', 'desc')
	const res=await collection.limit(1).get()
	if(event.queryStringParameters && event.queryStringParameters.isWebUrl){
		let temp=res.data[0]
		delete temp._id
		return toJson(temp)
	}
	if(res.data[0]){
		let temp=res.data[0]
		delete temp._id
		if(Number(temp.version.replace(/\./g,''))> Number(version.replace(/\./g,''))){
			updateInfo=temp
		}
	}
	return toJson(updateInfo)
};
