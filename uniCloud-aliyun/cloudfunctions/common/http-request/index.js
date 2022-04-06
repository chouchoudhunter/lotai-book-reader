const request=require('request')
const superagent=require('superagent')
const charset=require('superagent-charset')
module.exports = {
	request:request,
	superagent:superagent,
	charset:charset
}
