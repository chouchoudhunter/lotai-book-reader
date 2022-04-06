'use strict';
let {
	reqGet
} = require('http-request')
let {
	cheerio,
	urlencode,
	toJson
} = require('untils')
const url = 'http://www.530p.com/'
/**
 * 获得搜索出来的书的结果列表
 */
exports.main = async (event, context) => {
	//event为客户端上传的参数
	// const url='http://www.ddxsku.com/search/'
	// await superagent.post(url).send("searchkey=夜的命名术").set(headers).then(res => {
	// 	// fs.writeFile('./index.html', res.text, (err) => {
	// 	// 	if (err) return console.log('HTML保存失败')
	// 	// 	console.log('HTML保存成功')
	// 	// })
	// 	console.log(res.text)
	// }).catch(err=>{
	// 	console.log('err:'+JSON.stringify(err))
	// })
	let keyword=urlencode(event.keyword)//转换参数为url编码
	let result=await reqGet(url+'s/',keyword)
	let books=[]
	let $=cheerio.load(result)
	$('.conter ul').slice(1).each(async function(index,element){
		let bookUrl=$(element).find('a').attr('href')
		books.push(bookUrl)
	})
	return toJson(books)
};