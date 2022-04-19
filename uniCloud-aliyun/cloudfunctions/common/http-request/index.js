const superagent = require('superagent')
const charset = require('superagent-charset')
const superagentProxy = require('superagent-proxy')
superagentProxy(superagent)


function range(lowerValue, upperValue) {
	let total = upperValue - lowerValue + 1
	return Math.floor(Math.random() * total + lowerValue)
}
const userAgents = [
	'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:34.0) Gecko/20100101 Firefox/34.0',
	'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.60 Safari/537.36',
	'Opera/9.80 (Macintosh; Intel Mac OS X 10.6.8; U; en) Presto/2.8.131 Version/11.11',
	'Opera/9.80 (Windows NT 6.1; U; en) Presto/2.8.131 Version/11.11',
	'Opera/9.80 (Android 2.3.4; Linux; Opera Mobi/build-1107180945; U; en-GB) Presto/2.8.149 Version/11.10',
	'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:34.0) Gecko/20100101 Firefox/34.0',
	'Mozilla/5.0 (X11; U; Linux x86_64; zh-CN; rv:1.9.2.10) Gecko/20100922 Ubuntu/10.10 (maverick) Firefox/3.6.10',
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv,2.0.1) Gecko/20100101 Firefox/4.0.1',
	'Mozilla/5.0 (Windows NT 6.1; rv,2.0.1) Gecko/20100101 Firefox/4.0.1'
]
const headers = {
	'user-agent': userAgents[range(0, userAgents.length - 1)]
}
charset(superagent);
const host = 'http://www.530p.com/'
const reqGet = function(url = '', keyword = '', proxy = false) {
	if (proxy) {
		return new Promise((resolve, reject) => {
			superagent.get('http://124.220.152.148:5010/get/').then(res => {
				const proxyUrl = 'http://' + JSON.parse(res.text).proxy
				superagent.get(host + url + keyword).proxy(proxyUrl).charset('gbk').timeout(7000)
					.set(headers).buffer(true).then(res => {
						resolve(res.text)
					}).catch(err => {
						reject(err)
					})
			}).catch(err => {
				reject(err)
			})
		})
	} else {
		return new Promise((resolve, reject) => {
			superagent.get(host + url + keyword).charset('gbk').set(headers).buffer(true).then(res => {
				resolve(res.text)
			}).catch(err => {
				reject(err)
			})
		})
	}

}
module.exports = {
	superagent: superagent,
	charset: charset,
	reqGet: reqGet,
	headers: headers,
	superagentProxy: superagentProxy
}
