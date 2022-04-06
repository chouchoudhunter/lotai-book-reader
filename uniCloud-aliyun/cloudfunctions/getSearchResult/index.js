'use strict';
let {
	request,
	superagent,
	charset
} = require('http-request')
let {
	cheerio
} = require('untils')
// charset(superagent);
exports.main = async (event, context) => {
	//event为客户端上传的参数
	// console.log('event : ', event)
	// const url="https://www.qbiqu.com/modules/article/search.php?searchkey=%D2%B9%B5%C4%C3%FC%C3%FB%CA%F5"
	const url = 'http://news.baidu.com/'
	// const url='http://www.biquger.net/html/36/36569/index.html'
	superagent.get(url).end(function(err, res) {
		if (err) {
			console.log(err)
		} else {
			console.log(JSON.stringify(res))
	        
		}
	});
	return 'eee'
};
