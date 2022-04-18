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
 * 获取章节列表
 */
exports.main = async (event, context) => {
	let chapters=[]
	let item={
		title:'',
		type:'',
		url:''
	}
	const bookUrl=event.bookUrl
	let result=''
	result=await reqGet(bookUrl)
	let $=cheerio.load(result)
	$('.conter div').each((index,element)=>{
		let $el=$(element)
		let temp={...item}
		if($el.attr('class')=='clc'){
			temp.title=$el.text()
			temp.type="chapter"
			temp.url=$el.find('a').attr('href')
			chapters.push(temp)
		}else if($el.attr('class')=='clct'){
			temp.title=$el.text()
			temp.type="group"
			chapters.push(temp)
		}
	})
	return toJson(chapters)
};