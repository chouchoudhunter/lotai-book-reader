const books={
	namespaced: true,
	state:{
		myBooks:[],
		historyBooks:[],
		historySearch:[]
	},
	mutations:{
		ADD_HISTORY_BOOKS:(state,book)=>{
			if(state.historyBooks==50){
				state.historyBooks.splice(0,1)
			}
			const index=state.historyBooks.findIndex(item=>{
				return item.title==book.title && item.author==book.author
			})
			if(index !=-1){
				state.historyBooks.splice(index,1)
			}
			state.historyBooks.push(book)
			uni.setStorageSync('historyBooks',state.myBooks)
		},
		ADD_HISTORY_SEARCH:(state,keyword)=>{
			if(state.historySearch==15){
				state.historySearch.splice(0,1)
			}
			const index=state.historySearch.findIndex(item=>{
				return item==keyword
			})
			if(index !=-1){
				state.historySearch.splice(index,1)
			}
			state.historySearch.push(keyword)
			uni.setStorageSync('historySearch',state.historySearch)
		},
		CLEAR_HISTORY_BOOKS(state){
			state.historyBooks=[]
			uni.setStorageSync('historyBooks',state.historyBooks)
		},
		ADD_MY_BOOKS:(state,book)=>{
			state.myBooks.push(book)
			uni.setStorageSync('myBooks',state.myBooks)
		},
		DELETE_MY_BOOKS:(state,book)=>{
			state.myBooks=state.myBooks.filter(item=>{
				return item.title!=book.title && item.author!=book.author
			})
			uni.setStorageSync('myBooks',state.myBooks)
		},
		CHANGE_MY_BOOKS:(state,book)=>{
			const index=state.myBooks.findIndex(item=>{
				return item.title==book.title && item.author==book.author
			})
			state.myBooks.splice(index,1)
			state.myBooks.push(book)
			uni.setStorageSync('myBooks',state.myBooks)
		},
		INIT_BOOKS:(state,data)=>{
			state.myBooks=data.myBooks
			state.historyBooks=data.historyBooks
			state.historySearch=data.historySearch
		}
	}
}
export default books