const getters = {
	getIsNightMode:state =>state.setting.nightMode,
	getColor:state =>state.setting.nightMode?state.setting.color.night:state.setting.color.light,
	getBookIsInMyBooks:state=>(book)=>{
		return state.books.myBooks.find((item)=> {
			return item.title==book.title && item.author==book.author
		})
	},
	getMyBooks:state=>state.books.myBooks,
	getHistoryBooks:state=>(num=0)=>{
		let temp=[...state.books.historyBooks]
		if(num){
			return temp.reverse().slice(0,num)
		}else{
			return temp.reverse()
		}
	},
	getHistorySearch:state=>{
		let temp=[...state.books.historySearch]
		return temp.reverse()
	},
	getReadSetting:state =>state.setting.readSetting,
	getSystemSetting:state =>state.setting.systemSetting,
	getFeeds:state =>state.setting.systemSetting.feeds,
	getOpenSources:state =>{
		const sources=[]
		state.setting.systemSetting.feeds.forEach(feed=>{
			feed.list.forEach(source=>{
				source.name=source.content.info.title
				source.feed=feed.name
				if(source.content.info.isOpen) sources.push(source)
			})
		})
		return sources
	},
	getBookSource:state=>bookSource=>{
		const feed=state.setting.systemSetting.feeds.find(item=>{
			return item.name==bookSource.feedName
		})
		const source=feed.list.find(item=>{
			return item.content.info.host==bookSource.sourceHost
		})
		return source
	},
	getDefaultSource:state =>{
		const feed=state.setting.systemSetting.feeds.find(item=>{
			return item.name==state.setting.systemSetting.defaultSource.feedName
		})
		const source=feed.list.find(item=>{
			return item.content.info.host==state.setting.systemSetting.defaultSource.sourceHost
		})
		source.source=state.setting.systemSetting.defaultSource
		return source
	},
	getFeatures:state=>!!state.books.features?state.books.features:[]
}
export default getters
