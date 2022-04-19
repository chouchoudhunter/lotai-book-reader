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
	let result=''
	try{
		result=await reqGet(bookUrl,'')
	}catch(err){
		chapter.success=-1
		console.log(JSON.stringify(err))
		return toJson(chapter,err.status,'获取章节失败')
	}
	let $=cheerio.load(result)
	chapter.title=$('#cps_title').text()
	chapter.text=$('#cp_content').html()
	return toJson(chapter)
};