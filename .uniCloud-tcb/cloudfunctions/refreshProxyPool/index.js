'use strict';
let {
	superagent,
	headers,
	superagentProxy
} = require('http-request')
let {
	cheerio
} = require('untils')
const url = "https://ip.ihuan.me/address/5Lit5Zu9.html"
const testUrl = "https://www.baidu.com/"
superagentProxy(superagent)

let proxyList = []
let okproxyList=[]

exports.main = async (event, context) => {
	const res=await getList()
	let $=cheerio.load(res)
	$(".table tbody tr").each((index,el)=>{
		let proxy={
			ip:'',
			port:'',
			type:'http'
		}
		const temp=$(el).find('td').each((index,el)=>{
			if(index==0){
				proxy.ip=$(el).text()
			}else if(index==1){
				proxy.port=$(el).text()
			}
		})
		proxyList.push(proxy)

	})
	var testArray = []
	proxyList.forEach((el, i) => {
		const ip = el.type + "://" + el.ip + ":" + el.port
		testArray.push(check(ip,el))
	})
	await Promise.all(testArray).then((res) => {
		console.log("测试完成")
	})
	const db=uniCloud.database()
	const collection=db.collection('proxy_pool')
	await collection.where({type:'http'}).remove()
	await collection.add(okproxyList)
	return okproxyList
};

const getList = function() {
	return new Promise((resolve, reject) => {
		superagent.get(url).set(headers).buffer(true).then(res => {
			resolve('结果' + res.text)
		}).catch(err => {
			reject(err)
		})
	})
}
const check = function(ip = '',el) {
	return new Promise((resolve, reject) => {
		superagent.get("http://www.530p.com/")
			.proxy(ip)
			.set(headers)
			.buffer(true)
			.timeout(3000)
			.then(res => {
				okproxyList.push(el)
				console.log(ip+'成功：')
				resolve()
			}).catch(err => {
				console.log(ip+'失败：')
				resolve(err)
			})
	})
}
