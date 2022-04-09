const getters = {
	getIsNightMode:state =>state.setting.nightMode,
	getBookIsInMyBooks:state=>(book)=>{
		return !!state.books.myBooks.find((item)=> {
			return item.bookUrl===book.bookUrl
		})
	},
	getMyBooks:state=>state.books.myBooks
}
export default getters
