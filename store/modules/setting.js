import source from '@/source/index.js'
const setting={
	namespaced: true,
	state:{
		nightMode:false,
		readSetting:{
			bgColor: ['rgb(248, 248, 248)', 'rgb(255, 241, 210)', 'rgb(58, 58, 58)'],
			currentBgColor: 'rgb(248, 248, 248)',
			fontSize:20,
			lineHeight:30,
			lightNum:2,
			isFollowSystemLight:true
		},
		systemSetting:{
			defaultSource:0,
			sources:[]
		},
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
				//搜索框背景色
				searchBg:"#e1e1e1"
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
				swiperBg:"#2d2d2d",
				//搜索框背景色
				searchBg:"#414141"
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
			state.readSetting={...readSetting}
			uni.setStorageSync('readSetting',readSetting)
		},
		SET_SYSTEM_SETTING:(state,systemSetting)=>{
			state.systemSetting={...systemSetting}
			uni.setStorageSync('systemSetting',systemSetting)
		},
		SET_SOURCE:(state,sources)=>{
			state.systemSetting.sources={...sources}
			uni.setStorageSync('systemSetting',state.systemSetting)
		},
		INIT_SETTING:(state,data)=>{
			//初始化软件设置
			if(!!data.readSetting){
				state.readSetting=data.readSetting
			}
			state.nightMode=data.nightMode
			//初始化系统设置
			if(!!data.systemSetting){
				let temp={...data.systemSetting}
				// temp.defaultSource=data.systemSetting.defaultSource
				// temp.sources=[]
				state.systemSetting=temp
			}
			// for(let key in source){
			// 	if(source[key].isOpen){
			// 		let temp={
			// 			key:key,
			// 			desc:key+'：'+source[key].desc
			// 		}
			// 		state.systemSetting.sources.push(temp)
			// 	}
			// }
		},
	}
}
export default setting