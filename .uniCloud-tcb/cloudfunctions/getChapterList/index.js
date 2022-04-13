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
	const db=uniCloud.database()
	const collection=db.collection('proxy_pool')
	let ips=await collection.where({}).get()
	ips=ips.data
	let result=''
	for(var i=0;i<ips.length;i++){
		const ip= ips[i].type + "://" + ips[i].ip + ":" + ips[i].port
		result=await reqGet(bookUrl,'',ip)
		if(result) break
	}
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