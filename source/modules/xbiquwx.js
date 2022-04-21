const host="https://www.xbiquwx.la/"
import request from '@/untils/ajax.js'
import HTMLParser from "@/uni_modules/html-parser/js_sdk/index.js"
import urlencode from "urlencode"

const source={
	isOpen:true,
	desc:'网文',
	getFeature:()=>{
		let data=[]
		let dataTemp={
			title:'推荐',
			books:undefined
		}
		return new Promise((reslove,reject)=>{
			request.get(host).then(res=>{
				const content=new HTMLParser(res.data)
				//推荐
				dataTemp={...dataTemp}
				dataTemp.title="推荐"
				dataTemp.books=[]
				let tj=content.getElementsByClassName('l')[0].innerHTML
				tj=new HTMLParser(tj).getElementsByClassName('item')
				tj.forEach(item=>{
					item=new HTMLParser(item.innerHTML).getElementsByTagName('a')[0].attributes.href
					item=item.split('/')[3]+'/'
					dataTemp.books.push(item)
				})
				data.push(dataTemp)
				//分类推荐
				let novelsList=content.getElementsByClassName('novelslist')
				novelsList.forEach(novels=>{
					const novelTemps=new HTMLParser(novels.innerHTML).getElementsByClassName('content')
					novelTemps.forEach(novelTemp=>{
						const novelTempHtml=new HTMLParser(novelTemp.innerHTML)
						dataTemp={...dataTemp}
						dataTemp.title=novelTempHtml.getElementsByTagName('h2')[0].innerHTML.split('小')[0]
						dataTemp.books=[]
						const bookTemps=novelTempHtml.getElementsByTagName('a')
						bookTemps.forEach((bookTemp,index)=>{
							if(index!=0){
								dataTemp.books.push(bookTemp.attributes.href.split('/')[3]+'/')
							}
						})
						data.push(dataTemp)
					})
				})
				reslove(data)
			}).catch(err=>{
				console.log(err)
				reject(err)
			})
		})
		
	},
	getChapterList:(url='94_94326/')=>{
		return new Promise((reslove,reject)=>{
			request.get(host+url).then(res=>{
				let list=new HTMLParser(res.data)
				list=list.getElementById('list').innerHTML
				list=new HTMLParser(list).getElementsByTagName('dd')
				let chapters=[]
				list.forEach((item)=>{
					let temp={
						title:'',
						type:'',
						url:''
					}
					item=new HTMLParser(item.innerHTML).getElementsByTagName('a')
					temp.title=item[0].attributes.title
					temp.url=item[0].attributes.href
					temp.type='chapter'
					chapters.push(temp)
				})
				reslove(chapters)
			}).catch(err=>{
				console.log(err)
				reject(err)
			})
		})
		
	},
	getSearch:(keyword='猫腻')=>{
		return new Promise((reslove,reject)=>{
			request.get(host+'modules/article/search.php?searchkey='+urlencode(keyword)).then(res=>{
				let list=new HTMLParser(res.data).getElementsByTagName('tr')
				let books=[]
				for(let i=1;i<list.length;i++){
					let item=new HTMLParser(list[i].innerHTML).getElementsByTagName('a')[0]
					books.push(item.attributes.href)
				}
				reslove(books)
			}).catch(err=>{
				console.log(err)
				reject(err)
			})
		})
	},
	getBookInfo:(url='51_51139/')=>{
		return new Promise((reslove,reject)=>{
			request.get(host+url).then(res=>{
				let info={
					img:'',
					title:'',
					author:'',
					desc:'',
					bookUrl:'',
					tags:[]
				}
				const imgHtml=new HTMLParser(res.data).getElementById('fmimg').innerHTML
				info.img=new HTMLParser(imgHtml).getElementsByTagName('img')[0].attributes.src
				const descHtml=new HTMLParser(res.data).getElementById('intro').innerHTML
				info.desc=new HTMLParser(descHtml).getElementsByTagName('p')[0].innerHTML.trim()
				const content=new HTMLParser(res.data).getElementById('info').innerHTML
				let infoHtml=new HTMLParser(content)
				info.title=infoHtml.getElementsByTagName('h1')[0].innerHTML
				infoHtml=infoHtml.getElementsByTagName('p')
				info.author=infoHtml[0].innerHTML.split(':')[1]
				info.tags.push(infoHtml[1].innerHTML.substr(-4,2))
				info.bookUrl=url
				reslove(info)
			}).catch(err=>{
				console.log(err)
				reject(err)
			})
		})
	},
	getChapter:(bookUrl="51_51139/",chapter={url:"24754036.html",title:"20、穿越者的群聊"})=>{
		return new Promise((reslove,reject)=>{
			request.get(host+bookUrl+chapter.url).then(res=>{
				let chapterTemp={
					title:chapter.title,
					text:`<h3>${chapter.title}</h3><br>`,
					status:1,
					success:1
				}
				chapterTemp.text+=new HTMLParser(res.data).getElementById('content').innerHTML
				reslove(chapterTemp)
			}).catch(err=>{
				console.log(err)
				reject(err)
			})
		})
	},
}

export default source