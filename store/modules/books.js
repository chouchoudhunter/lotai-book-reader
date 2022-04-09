const books={
	namespaced: true,
	state:{
		myBooks:[],
		historyBooks:[]
	},
	mutations:{
		ADD_MY_BOOKS:(state,book)=>{
			state.myBooks.push(book)
			uni.setStorageSync('myBooks',state.myBooks)
		},
		DELETE_MY_BOOKS:(state,book)=>{
			state.myBooks=state.myBooks.filter(item=>{
				return item.bookUrl!=book.bookUrl
			})
			uni.setStorageSync('myBooks',state.myBooks)
		},
		CHANGE_MY_BOOKS:(state,book)=>{
			const index=state.myBooks.findIndex(item=>{
				return item.bookUrl==book.bookUrl
			})
			state.myBooks[index].readIndex=book.readIndex
			state.myBooks[index].readPage=book.readPage
			uni.setStorageSync('myBooks',state.myBooks)
		},
		INIT_BOOKS:(state,data)=>{
			state.myBooks=data.myBooks
		}
	}
}
export default books