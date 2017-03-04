var http=require('http')

var querystring=require('querystring')

var postData=querystring.stringify({
	'content':'老师声音好听...测试测试2233',
	'mid':8837
})

var options={
	hostname:'www.imooc.com',
	port:80,
	path:'/course/docomment',
	method:'POST',
	headers:{
		'Accept':'application/json, text/javascript, */*; q=0.01',
		'Accept-Encoding':'gzip, deflate',
		'Accept-Language':'zh-CN,zh;q=0.8',
		'Connection':'keep-alive',
		'Content-Length':postData.length,
		'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
		'Cookie':'imooc_uuid=739cea01-bf0f-4a41-affe-007bb7b5d218; imooc_isnew_ct=1487675263; loginstate=1; apsid=M2NmI0MzU5ZDVhMWVlMzNjNzE1YTI5OTA0ZGQ1M2QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMzEwODQ4MgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAyOTE4MDg5NDU0QHFxLmNvbQAAAAAAAAAAAAAAAAAAADRjYmY4NTJhYzNkMTAyNmRjMmQ1MTY2NjA4ZWQxYzY5tCCsWLQgrFg%3DMT; last_login_username=2918089454%40qq.com; PHPSESSID=vtr6kn7bsc7jkoru5cechg8h53; channel=491b6f5ab9637e8f6dffbbdd8806db9b_phpkecheng; IMCDNS=0; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1488532795,1488549714,1488555431,1488605128; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1488630988; imooc_isnew=2; cvde=58ba4fac220aa-179',
		'Host':'www.imooc.com',
		'Origin':'http://www.imooc.com',
		'Referer':'http://www.imooc.com/video/8837',
		'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36',
		'X-Requested-With':'XMLHttpRequest'
	}
}

var req=http.request(options,function(res){
	console.log('Status:'+res.statusCode)
	console.log('headers:'+JSON.stringify(res.headers))

	res.on('data',function(chunk){
		console.log(Buffer.isBuffer(chunk))
		console.log(typeof chunk)
	})

	res.on('end',function(){
		console.log('评论完毕！')
	})


})
	req.on('error',function(){
		console.log('Error:'+e.message)
	})

	req.write(postData)
	req.end();