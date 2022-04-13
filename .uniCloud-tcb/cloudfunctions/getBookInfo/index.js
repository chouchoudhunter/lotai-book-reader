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
 * 获取书本详细信息
 */
exports.main = async (event, context) => {
	const db=uniCloud.database()
	const collection=db.collection('proxy_pool')
	let ips=await collection.where({}).get()
	ips=ips.data
	let result=''
	for(var i=0;i<ips.length;i++){
		const ip= ips[i].type + "://" + ips[i].ip + ":" + ips[i].port
		result=await reqGet(event.bookUrl,'',ip)
		if(result) break
	}
	let info={
		img:'',
		title:'',
		author:'',
		desc:'',
		bookUrl:''
	}
	info.bookUrl=event.bookUrl
	let $=cheerio.load(result)
	info.title=$('.tna a').text()
	$('.ffw tr').each((index,element)=>{
		if(index==0){
			$(element).find('td').each((i,e)=>{
				switch(i){
					case 0:info.img=$(e).find('img').attr('src');break
					case 2:info.author=$(e).text();break
				}
			})
		}else if(index==3){
			info.desc=$(element).find('td').contents().last().text()
		}
	})
	return toJson(info)
};