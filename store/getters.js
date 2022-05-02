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
	getSources:state =>state.setting.systemSetting.sources,
	getDefaultSource:state =>state.setting.systemSetting.defaultSource,
	getFeatures:state=>!!state.books.features?state.books.features:[]
}
export default getters
