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
	let result=await reqGet(bookUrl)
	let $=cheerio.load(result)
	chapter.title=$('#cps_title').text()
	chapter.text=$('#cp_content').html()
	return toJson(chapter)
};