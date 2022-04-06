'use strict';
let {
	reqGet
} = require('http-request')
let {
	cheerio,
	urlencode
} = require('untils')
const url = 'http://www.530p.com/'
/**
 * 获取书本详细信息
 */
exports.main = async (event, context) => {
	let result=await reqGet(url+event.bookUrl)
	const info=getBookInfo(result)
	return toJson(info)
};

function getBookInfo(html){
	let info={
		img:'',
		title:'',
		author:'',
		desc:''
	}
	let $=cheerio.load(html)
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
	return info
}