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
		status:1,
		success:1
	}
	const bookUrl=event.bookUrl
	// const db=uniCloud.database()
	// const collection=db.collection('proxy_pool')
	// let ips=await collection.where({}).get()
	// ips=ips.data
	let result=''
	try{
		result=await reqGet(bookUrl)
	}catch(err){
		chapter.success=-1
		return toJson(chapter,err.status,'获取章节失败')
	}
	
	// for(var i=0;i<ips.length;i++){
	// 	const ip= ips[i].type + "://" + ips[i].ip + ":" + ips[i].port
	// 	result=await reqGet(bookUrl,'',ip)
	// 	if(result) break
	// }
	let $=cheerio.load(result)
	chapter.title=$('#cps_title').text()
	chapter.text=$('#cp_content').html()
	return toJson(chapter)
};