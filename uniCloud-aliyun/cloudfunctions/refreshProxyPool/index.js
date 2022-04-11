'use strict';
let {superagent,headers} = require('http-request')
let {cheerio} = require('untils')
const url="https://ip.ihuan.me/address/5Lit5Zu9.html"
exports.main = async (event, context) => {
	const res=await getList()
	let $=cheerio.load(res)
	let proxyList=[]
	$(".table tbody tr").each((index,el)=>{
		let proxy={
			ip:'',
			port:''
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
	// console.log(JSON.stringify(proxyList))
	return proxyList
};

const getList=function(){
	return new Promise((resolve,reject)=>{
		superagent.get(url).set(headers).buffer(true).then(res => {
			resolve(res.text)
		}).catch(err=>{
			reject(err)
		})
	})
}