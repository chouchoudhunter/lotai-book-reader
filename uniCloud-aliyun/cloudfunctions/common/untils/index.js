const cheerio=require('cheerio')
const urlencode=require('urlencode')
//统一返回格式
const toJson=function(data=[],status=1,msg=""){
	const temp={
		data:data,
		status:status,
		msg:msg
	}
	return JSON.stringify(temp)
}
module.exports = {
	cheerio:cheerio,
	urlencode:urlencode,
	toJson:toJson
}
