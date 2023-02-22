import xpath from 'xpath'
import request from '@/untils/ajax.js'
import urlencode from "urlencode"
import {
	DOMParser
} from '@xmldom/xmldom'

function parse(source, type, data) {
	if (type === 'search') {
		return getSearchRes(source.operation[0], source.info, data)
	} else if (type === 'info') {
		return getBookInfo(source.operation[1], source.info, data)
	} else if (type === 'list') {
		return getChapterList(source.operation[2], source.info, data)
	} else if (type === 'chapter') {
		return getChapter(source.operation[3], source.info, data)
	} else if (type === 'discord') {
		return getDiscord(source.operation[4], source.info)
	}
}
async function getDiscord(operation, info) {
	return new Promise(async (reslove, reject) => {
		let data = {
			select: [],
			tags: []
		}
		const requestUrl = info.host + operation.url
		const tempHtml = await getHtml(requestUrl, operation.method)
		const doc = new DOMParser().parseFromString(tempHtml)
		operation.xpaths.forEach(tempXpath => {
			if (tempXpath.xpath) {
				if (tempXpath.type === 'select') {
					let nodes = xpath.select(tempXpath.xpath, doc);
					nodes.forEach(node => {
						data.select.push(doReg(tempXpath.reg, getString(node)))
					})
				} else if (tempXpath.type === 'tag') {
					let dataTemp = {
						name: tempXpath.name,
						books: []
					}
					let nodes = xpath.select(tempXpath.xpath, doc);
					nodes.forEach(node => {
						dataTemp.books.push(doReg(tempXpath.reg, getString(node)))
					})
					data.tags.push(dataTemp)
				}
			}
		})
		reslove(data)
	})
}
async function getChapter(operation, info, data) {
	return new Promise(async (reslove, reject) => {
		let chapterTemp = {
			title: '',
			text: '',
			status: 1,
			success: 1
		}
		let requestUrl = info.host + operation.url.replace("{{bookUrl}}", data.bookUrl)
		requestUrl = requestUrl.replace("{{chapterUrl}}", data.chapterUrl)
		const tempHtml = await getHtml(requestUrl, operation.method)
		const doc = new DOMParser().parseFromString(tempHtml)
		let isPrevJ=true//上一段结尾是否是句号
		operation.xpaths.forEach(tempXpath => {
			if (tempXpath.xpath) {
				if (tempXpath.type === 'title') {
					let nodes = xpath.select(tempXpath.xpath, doc);
					let str = getString(nodes[0]).trim()
					str = doReg(tempXpath.reg, str)
					chapterTemp.title = str
				} else if (tempXpath.type === 'text') {
					let nodes = xpath.select(tempXpath.xpath, doc);
					nodes.forEach(node => {
						let str = getString(node)
						str = doReg(tempXpath.reg, str).trim()
						const endChar=str.charAt(str.length-1)
						if (str) {
							if(isPrevJ){
								chapterTemp.text +='<br><p>'
							}
							chapterTemp.text +=str
							if(endChar.match(/[。！”…]/)){
								isPrevJ=true
								chapterTemp.text += '</p>'
							}else{
								isPrevJ=false
							}
							
						}
					})
				}
			}
		})
		chapterTemp.text = `<h3>${chapterTemp.title}</h3>` + chapterTemp.text
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
			if (tempXpath.xpath) {
				if (tempXpath.type === 'chapter') {
					let nodes = xpath.select(tempXpath.xpath, doc);
					nodes.forEach(node => {
						let temp = {
							title: '',
							type: '',
							url: ''
						}
						const nodeDoc = new DOMParser().parseFromString(node.toString())
						let tempNode = xpath.select("//text()", nodeDoc)
						tempNode = tempNode.find(item => {
							return getString(item).trim()
						})
						temp.title = getString(tempNode)
						temp.title = doReg(tempXpath.reg, temp.title).trim()
						temp.url = getString(xpath.select("//a/@href", nodeDoc)[0])
						if (temp.url) {
							temp.type = "chapter"
						} else {
							temp.type = "group"
						}
						chapters.push(temp)
					})
				}
			}
		})
		reslove(chapters)
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
			if (tempXpath.xpath) {
				const nodes = xpath.select(tempXpath.xpath, doc);
				if (tempXpath.type === "tags") {
					nodes.forEach(node => {
						let str = getString(node)
						str = doReg(tempXpath.reg, str)
						bookInfo[tempXpath.type].push(str)
					})
				} else {
					let str = getString(nodes[0])
					str = doReg(tempXpath.reg, str)
					if (tempXpath.type == "img") {
						str = str.indexOf('http') != -1 ? str : info.host + str
					}
					bookInfo[tempXpath.type] = str
				}
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
			if (tempXpath.xpath) {
				if (tempXpath.type === 'bookUrl') {
					const nodes = xpath.select(tempXpath.xpath, doc);
					nodes.forEach(node => {
						let str = getString(node)
						str = doReg(tempXpath.reg, str)
						books.push(str)
					})
				}
			}
		})
		reslove(books)
	})
}

function getString(node) {
	if (node) {
		if (node.nodeType === 2) {
			return node.value
		} else if (node.nodeType === 3) {
			return node.data
		} else {
			return node.toString()
		}
	} else {
		return ''
	}

}

function getHtml(url, method) {
	return new Promise((reslove, reject) => {
		request({
			method: method,
			url: url,
			sslVerify:false
		}).then(res => {
			const content = res.data.replace(/<html\s.*?>/g, "<html>").replace(/&.*?;/g, ' ')
			reslove(content)
		}).catch(err => {
			console.log(err)
			reject(err)
		})
	})
}

// function postHtml(url, method,) {
// 	return new Promise((reslove, reject) => {
// 		request({
// 			method: method,
// 			params:
// 			url: url
// 		}).then(res => {
// 			const content = res.data.replace(/<html\s.*?>/g, "<html>").replace(/&.*?;/g, ' ')
// 			reslove(content)
// 		}).catch(err => {
// 			console.log(err)
// 			reject(err)
// 		})
// 	})
// }

function doReg(reg, str) {
	try {
		if (reg) {
			const tempReg = reg.split('::')
			const flag = tempReg[0].split(',')[1] ? tempReg[0].split(',')[1] : 'g'
			reg = tempReg[1] ? tempReg[1] : tempReg[0]
			if (tempReg[0].indexOf("replace") != -1) {
				const replaceStr = tempReg[0].split(',')[2] ? tempReg[0].split(',')[2] : ''
				str = str.replace(new RegExp(reg, flag), replaceStr)
			} else {
				const strTemp = str.match(new RegExp(reg, flag))
				if (strTemp && strTemp[0]) {
					str = strTemp[0]
				}
			}
		}
	} catch (e) {
		uni.$lotai.toast(e.name+':'+e.message,'error')
	}
	return str
}
export default parse
