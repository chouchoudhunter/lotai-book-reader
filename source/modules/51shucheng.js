const host="https://www.51shucheng.net/"
import request from '@/untils/ajax.js'
import HTMLParser from "@/uni_modules/html-parser/js_sdk/index.js"
import urlencode from "urlencode"

const source={
	isOpen:true,
	desc:'部分名著及出版文学(无封面图)',
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
				let tj=content.getElementsByClassName('hot-con')[0].innerHTML
				tj=new HTMLParser(tj).getElementsByTagName('a')
				tj.forEach(item=>{
					dataTemp.books.push(item.attributes.href)
				})
				data.push(dataTemp)
				//分类推荐
				let novelsList=content.getElementsByClassName('box')
				const title=['青春文学','历史军事','盗墓科幻','无','推理/外国','官场','名著诗词','武侠']
				novelsList.forEach((novels,i)=>{
					if(i==3){
						return
					}
					const novelsHtml=new HTMLParser(novels.innerHTML)
					dataTemp={...dataTemp}
					dataTemp.books=[]
					dataTemp.title=title[i]
					const list=novelsHtml.getElementsByTagName('li')
					list.forEach(item=>{
						const href=new HTMLParser(item.innerHTML).getElementsByTagName('a')[0].attributes.href
						dataTemp.books.push(href)
					})
					data.push(dataTemp)
				})
				console.log(data)
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
				let list=new HTMLParser(res.data).getElementsByClassName('catalog')[0].innerHTML
				list=new HTMLParser(list).getElementsByClassName('mulu-title,mulu-list')
				let chapters=[]
				list.forEach((item,index)=>{
					if(index==list.length-1){
						return
					}
					if(item.attributes.class.indexOf('mulu-title')!=-1){
						let temp={title:'',type:'',url:''}
						temp.title=new HTMLParser(item.innerHTML).getElementsByTagName('h2')[0].innerHTML
						temp.type='group'
						if(temp.title.indexOf('全集在线阅读')!=-1){
							return
						}else{
							chapters.push(temp)
						}
					}else{
						let list=new HTMLParser(item.innerHTML).getElementsByTagName('a')
						list.forEach(item=>{
							let temp={title:'',type:'',url:''}
							temp.title=item.innerHTML
							temp.type='chapter'
							temp.url=item.attributes.href.split(url)[1]
							chapters.push(temp)
						})
					}
				})
				reslove(chapters)
			}).catch(err=>{
				console.log(err)
				reject(err)
			})
		})
		
	},
	getSearch:(keyword='人间失格')=>{
		return new Promise((reslove,reject)=>{
			request.get(host+'search?q='+urlencode(keyword)).then(res=>{
				let list=new HTMLParser(res.data).getElementsByClassName('search_result')[0].innerHTML
				list=new HTMLParser(list).getElementsByTagName('a')
				let books=[]
				for(let i=0;i<list.length;i++){
					const item=list[i].attributes.href.split('.net/')[1]
					books.push(item)
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
				const contentHtml=new HTMLParser(res.data)
				const descHtml=contentHtml.getElementsByClassName('intro')[0].innerHTML
				info.desc=new HTMLParser(descHtml).getElementsByTagName('p')[0].innerHTML.trim()
				info.title=contentHtml.getElementsByTagName('h1')[0].innerHTML
				// request.get("https://book.qq.com/api/booksearch/query?keyWord="+urlencode(info.title)+"&pageNo=1&pageSize=1").then(res=>{
				// 	request.get("https://book.qq.com/book-detail/"+res.data.data.bookList[0].bid).then(res=>{
				// 		const HtmlT=new HTMLParser(res.data).getElementsByClassName('ypc-book-cover')[0].attributes.src
				// 		info.img=HtmlT
				// 		console.log(HtmlT)
				// 	})
				// })
				const infoHtml=contentHtml.getElementsByClassName('info')[0].innerHTML
				info.tags.push(new HTMLParser(infoHtml).getElementsByTagName('a')[0].attributes.title)
				//
				info.author=new HTMLParser(infoHtml).getElementsByTagName('a')[1]
				if(info.author){
					info.author=info.author.attributes.title
				}else{
					info.author=infoHtml.split('作者：')[1]
				}
				
				//
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
				chapterTemp.text+=new HTMLParser(res.data).getElementById('neirong').innerHTML.trim()
				reslove(chapterTemp)
			}).catch(err=>{
				console.log(err)
				reject(err)
			})
		})
	},
}

export default source