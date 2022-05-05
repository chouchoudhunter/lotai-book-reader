export function request(name='',data={}) {
	return new Promise((resolve,reject)=>{
		uniCloud.callFunction({
			name: name,
			data: data,
		}).then(res=>{
			res=JSON.parse(res.result)
			if(res.status==1){
				resolve(res)
			}else{
				uni.$lotai.toast('错误:'+res.msg,'error');
				resolve(res)
			}
			
		}).catch(err=>{
			uni.$lotai.toast('err:'+JSON.stringify(err),'error');
		})
	})

}
