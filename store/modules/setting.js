const setting={
	namespaced: true,
	state:{
		nightMode:false,
		readSetting:{},
		systemSetting:{}
	},
	mutations:{
		SET_NIGHT:(state,isNight)=>{
			state.nightMode=isNight
			uni.setStorageSync('nightMode',isNight)
		},
		INIT_SETTING:(state,data)=>{
			
		},
	}
}
export default setting