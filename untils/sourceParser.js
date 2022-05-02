import xpath from 'xpath'
import request from '@/untils/ajax.js'
import urlencode from "urlencode"
import { DOMParser } from '@xmldom/xmldom'

function parse(source, type, data) {
	if (type === 'search') {
		return getSearchRes(source.operation[0], source.info, data)
	} else if (type === 'info') {
		return getBookInfo(source.operation[1], source.info, data)
	} else if (type === 'list') {
		return getChapterList(source.operation[2], source.info, data)
	} else if (type === 'chapter') {
		return getChapter(source.operation[3], source.info, data)
	}
}
async function getChapter(operation, info, data) {
	return new Promise(async (reslove, reject) => {
		let chapterTemp={
			title:'',
			text:'',
			status:1,
			success:1
		}
		let requestUrl = info.host + operation.url.replace("{{bookUrl}}", data.bookUrl)
		requestUrl=requestUrl.replace("{{chapterUrl}}", data.chapterUrl)
		const tempHtml = await getHtml(requestUrl, operation.method)
		const doc = new DOMParser().parseFromString(tempHtml)
		operation.xpaths.forEach(tempXpath => {
			if (tempXpath.type === 'title') {
				let nodes = xpath.select(tempXpath.xpath, doc);
				let str=getString(nodes[0]).trim()
				if(tempXpath.reg){
					str = str.match(new RegExp(tempXpath.reg))
				}
				chapterTemp.title=str
			}
			else if(tempXpath.type === 'text') {
				let nodes = xpath.select(tempXpath.xpath, doc);
				let str=nodes.toString()
				if(tempXpath.reg){
					str = str.match(new RegExp(tempXpath.reg))
				}
				chapterTemp.text=str
			}
		})
		reslove(chapterTemp)
	})
}
async function getChapterList(operation, info, data) {
	return new Promise(async (reslove, reject) => {
		let chapters = []
		const requestUrl = info.host + operation.url.replace("{{bookUrl}}", urlencode(data.bookUrl))
		const tempHtml = await getHtml(requestUrl, operation.method)
		const doc = new DOMParser().parseFromString(tempHtml)
		operation.xpaths.forEach(tempXpath => {
			if (tempXpath.type === 'chapter') {
				let nodes = xpath.select(tempXpath.xpath, doc);
				nodes.forEach(node => {
					let temp = {
						title: '',
						type: '',
						url: ''
					}
					const nodeDoc = new DOMParser().parseFromString(node.toString())
					temp.title = getString(xpath.select("//text()", nodeDoc)[0])
					if (tempXpath.reg) {
						temp.title = temp.title.match(new RegExp(tempXpath.reg))
					}
					temp.url = getString(xpath.select("//a/@href", nodeDoc)[0])
					if (temp.url) {
						temp.type = "chapter"
					} else {
						temp.type = "group"
					}
					chapters.push(temp)
				})
				reslove(chapters)
			}
		})
	})
}
async function getBookInfo(operation, info, data) {
	return new Promise(async (reslove, reject) => {
		let bookInfo = {
			img: '',
			title: '',
			author: '',
			desc: '',
			bookUrl: '',
			tags: []
		}
		const requestUrl = info.host + operation.url.replace("{{bookUrl}}", data.bookUrl)
		const tempHtml = await getHtml(requestUrl, operation.method)
		const doc = new DOMParser().parseFromString(tempHtml)
		operation.xpaths.forEach(tempXpath => {
			const nodes = xpath.select(tempXpath.xpath, doc);
			if (tempXpath.type === "tags") {
				nodes.forEach(node => {
					let str = getString(node)
					if (tempXpath.reg) {
						str = str.match(new RegExp(tempXpath.reg))
					}
					bookInfo[tempXpath.type].push(str)
				})
			} else {
				let str = getString(nodes[0])
				if (tempXpath.reg) {
					str = str.match(new RegExp(tempXpath.reg))[0]
				}
				if (tempXpath.type == "img") {
					str = str.indexOf('http') != -1 ? str : info.host + str
				}
				bookInfo[tempXpath.type] = str
			}
		})
		reslove(bookInfo)
	})
}

async function getSearchRes(operation, info, data) {
	return new Promise(async (reslove, reject) => {
		let books = []
		const requestUrl = info.host + operation.url.replace("{{key}}", urlencode(data.keyword))
		const tempHtml = await getHtml(requestUrl, operation.method)
		const doc = new DOMParser().parseFromString(tempHtml)
		operation.xpaths.forEach(tempXpath => {
			if (tempXpath.type === 'bookUrl') {
				const nodes = xpath.select(tempXpath.xpath, doc);
				nodes.forEach(node => {
					books.push(getString(node))
				})
				reslove(books)
			}
		})
	})
}

function getString(node) {
	if (node.nodeType === 2) {
		return node.value
	} else if (node.nodeType === 3) {
		return node.data
	}
}

function getHtml(url, method) {
	return new Promise((reslove, reject) => {
		request({
			method: method,
			url: url
		}).then(res => {
			const content = res.data.replace(/<html\s.*?>/g, "<html>").replace(/&.*?;/g,' ')
			reslove(content)
		}).catch(err => {
			console.log(err)
			reject(err)
		})
	})
}
export default parse
