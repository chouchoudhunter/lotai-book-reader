import source from '@/source/index.js'
import sourceParser from '@/untils/sourceParser.js';
import { request } from '@/untils/http.js';
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
			defaultSource:{
				feedName:'LoTai源',
				sourceHost:'https://www.kankezw.com/'
			},
			feeds:[{
				name:'LoTai源',
				list:[]
			},{
				name:'自定义源',
				list:[]
			}],
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
		SET_DEFAULT_SOURCE:(state,data)=>{
			state.systemSetting.defaultSource.feedName=data.feedName
			state.systemSetting.defaultSource.sourceHost=data.sourceHost
			uni.setStorageSync('systemSetting',state.systemSetting)
		},
		SET_FEED:(state,data)=>{
			state.systemSetting.feeds[data.feedIndex]={...data.feed}
			state.systemSetting={...state.systemSetting}
			uni.setStorageSync('systemSetting',state.systemSetting)
		},
		DELETE_SOURCE:(state,data)=>{
			state.systemSetting.feeds[data.feedIndex].list.splice(data.sourceIndex,1)
			uni.setStorageSync('systemSetting',state.systemSetting)
		},
		ADD_SOURCE:(state,source)=>{
			state.systemSetting.feeds[1].list.push(source)
			uni.setStorageSync('systemSetting',state.systemSetting)
		},
		CHANGE_SOURCE:(state,data)=>{
			state.systemSetting.feeds[data.index.feedIndex].list[data.index.sourceIndex].content={...data.source}
			uni.setStorageSync('systemSetting',state.systemSetting)
		},
		CHANGE_SOURCE_OPEN:(state,list)=>{
			list.forEach(item=>{
				state.systemSetting.feeds[item.feedIndex].list[item.sourceIndex].content.info.isOpen=!state.systemSetting.feeds[item.feedIndex].list[item.sourceIndex].content.info.isOpen
			})
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
				state.systemSetting=temp
			}
		},
	},
	actions:{
		getLotaiFeed:(store,data)=>{
			if(data.force){
				request('getSourceList').then(res => {
					store.commit('SET_FEED', {feed:res.data,feedIndex:0});
					data.success()
				});	
			}else if(!store.state.systemSetting.feeds[0].list.length){
				request('getSourceList').then(res => {
					store.commit('SET_FEED', {feed:res.data,feedIndex:0});
					data.success()
				});				
			}else{
				 data.success()
			}

		}
	}
}
export default setting