'use strict';
let {
	reqGet
} = require('http-request')
let {
	cheerio,
	urlencode,
	toJson
} = require('untils')
/**
 * 获取特定章节
 */
exports.main = async (event, context) => {
	let chapter={
		title:'',
		text:'',
		status:1
	}
	const bookUrl=event.bookUrl
	const db=uniCloud.database()
	const collection=db.collection('proxy_pool')
	let ips=await collection.where({type:'http'}).get()
	ips=ips.data
	let result=''
	for(var i=0;i<ips.length;i++){
		const ip= ips[i].type + "://" + ips[i].ip + ":" + ips[i].port
		result=await reqGet(bookUrl,'',ip).catch((err)=>console.log(err))
		if(result>600) break
	}
	let $=cheerio.load(result)
	chapter.title=$('#cps_title').text()
	chapter.text=$('#cp_content').html()
	return toJson(chapter)
};