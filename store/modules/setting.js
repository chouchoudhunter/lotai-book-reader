const setting={
	namespaced: true,
	state:{
		nightMode:false,
		readSetting:{
			bgColor: ['rgb(248, 248, 248)', 'rgb(255, 241, 210)', 'rgb(58, 58, 58)'],
			currentBgColor: 'rgb(248, 248, 248)',
			fontSize:20,
			lineHeight:30,
			lightNum:20
		},
		systemSetting:{},
		color:{
			light:{
				//页面背景色
				bgPage:"#fff",
				//普通文字颜色
				normalText:"#000",
				//二级文字颜色
				secText:"#a3a3a3",
				//卡片背景色
				cardBg:"#f3f3f3",
				//滑块背景
				swiperBg:"#f3f3f3",
			},
			night:{
				//页面背景色
				bgPage:"#101010",
				//普通文字颜色
				normalText:"#c7c7c7",
				//二级文字颜色
				secText:"#9e9e9e",
				//卡片背景色
				cardBg:"#272727",
				//滑块背景
				swiperBg:"#282828",
			}
		}
	},
	mutations:{
		SET_NIGHT:(state)=>{
			state.nightMode=!state.nightMode
			uni.setTabBarStyle({
				backgroundColor:state.nightMode?"#101010":"#fff",
				borderStyle:state.nightMode ? 'black' : 'white'
			})
			uni.setStorageSync('nightMode',state.nightMode)
		},
		SET_READ_SETTING:(state,readSetting)=>{
			state.readSetting=readSetting
			uni.setStorageSync('readSetting',readSetting)
		},
		INIT_SETTING:(state,data)=>{
			state.readSetting=data.readSetting
			state.nightMode=data.nightMode
		},
	}
}
export default setting