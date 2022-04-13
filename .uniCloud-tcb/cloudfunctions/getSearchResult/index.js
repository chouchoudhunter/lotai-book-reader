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
 * 获得搜索出来的书的结果列表
 */
exports.main = async (event, context) => {
	let keyword=urlencode(event.keyword)//转换参数为url编码
	const db=uniCloud.database()
	const collection=db.collection('proxy_pool')
	let ips=await collection.where({}).get()
	ips=ips.data
	let result=''
	for(var i=0;i<ips.length;i++){
		const ip= ips[i].type + "://" + ips[i].ip + ":" + ips[i].port
		result=await reqGet('s/',keyword,ip)
		if(result) break
	}
	let books=[]
	let $=cheerio.load(result)
	$('.conter ul').slice(1).each(async function(index,element){
		let bookUrl=$(element).find('a').attr('href')
		books.push(bookUrl)
	})
	return toJson(books)
};