import Vue from "vue"
let vm=new Vue()
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
				vm.$u.toast('错误:'+res.msg, 3000);
				resolve(res)
			}
			
		}).catch(err=>{
			vm.$u.toast('err:'+JSON.stringify(err),3000);
		})
	})

}
