const getters = {
	getIsNightMode:state =>state.setting.nightMode,
	getColor:state =>state.setting.nightMode?state.setting.color.night:state.setting.color.light,
	getBookIsInMyBooks:state=>(book)=>{
		return state.books.myBooks.find((item)=> {
			return item.title==book.title && item.author==book.author
		})
	},
	getMyBooks:state=>state.books.myBooks.reverse(),
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
}
export default getters
