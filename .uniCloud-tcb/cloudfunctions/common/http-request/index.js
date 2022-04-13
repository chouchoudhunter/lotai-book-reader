const superagent=require('superagent')
const charset=require('superagent-charset')
const superagentProxy=require('superagent-proxy')
superagentProxy(superagent)
const headers={
	'user-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.60 Safari/537.36'
}
charset(superagent);
const host = 'http://www.530p.com/'
const reqGet=function(url='',keyword='',proxy=''){
	if(proxy){
		return new Promise((resolve,reject)=>{
			superagent.get(host+url+keyword).proxy(proxy).charset('gbk').set(headers).buffer(true).then(res => {
				resolve(res.text)
			}).catch(err=>{
				reject(err)
			})
		})
	}else{
		return new Promise((resolve,reject)=>{
			superagent.get(host+url+keyword).charset('gbk').set(headers).buffer(true).then(res => {
				resolve(res.text)
			}).catch(err=>{
				reject(err)
			})
		})
	}

}
module.exports = {
	superagent:superagent,
	charset:charset,
	reqGet:reqGet,
	headers:headers,
	superagentProxy:superagentProxy
}
