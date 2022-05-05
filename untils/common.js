const $lotai={
	waitTime:(time = 1000)=>{
		return new Promise((reslove, reject) => {
			setTimeout(() => {
				reslove();
			}, time);
		});
	},
	toast:(content='',type='primary',duration='long')=>{
		//#ifdef APP-PLUS
		let color='#fff'
		const richText=`<font color="${color}">${content}</font>`
		let styles={
			align:'center',
			verticalAlign:'center',
			background:'#5e5e5e',
			duration:duration,
			type:'richtext',
			icon:'/static/common/info.png',
			iconWidth:'16px',
			iconHeight:'16px',
			style:'inline',
			richTextStyle:{
				align:'center'
			}
		}
		if(type==='success'){
			styles.background='#2970ff'
			styles.icon='/static/common/success.png'
		}else if(type==='error'){
			styles.background='#fa3534'
			styles.icon='/static/common/error.png'
		}
		plus.nativeUI.toast(richText, styles);
		//#endif
		//#ifdef H5
		switch(duration){
			case 'long':duration=3500;break;
			case 'short':duration=2000;break;
		}
		uni.$u.toast(content,duration);
		//#endif
	}
}
uni.$lotai=$lotai
const install = Vue => {
	Vue.prototype.$lotai = $lotai
}
export default{
	install
}