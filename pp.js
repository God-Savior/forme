var express = require('express');
var cors = require('cors');
const axios = require('axios');
var app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // 允许携带 Cookie
}));

app.use(express.json({
  limit: '1mb'
}));
app.use(express.urlencoded({ 
    extended: true,
	limit: '1mb'
}))
app.use(express.text({ type: 'text/plain' }));

app.post('/pnew',function(req,res){
	//console.log(req.body);
	var arg = req.body;
	if(arg.head){head1=JSON.parse(arg.head);}else{head1={"a":"b"}};
	//var post1 = eval('('+decodeURIComponent(arg.post)+')');
	//console.log(head1);
	const config = {
		method: 'post',
		url: decodeURIComponent(arg.url1), // 目标URL
		headers: head1,
		data: arg.post,
		withCredentials: true, // 允许发送cookies
		maxRedirects: 0 // 防止自动跟随重定向
	};
	
	axios(config)
	.then(response => {
		//console.log(response);
		console.log(response.request._header);
		console.log(response.headers);
		console.log(response.data);
		headers1 = Buffer.from(String(response.request._header)).toString('base64');
		//console.log(headers1);
		headers2 = Buffer.from(JSON.stringify(response.headers)).toString('base64');
		//console.log(headers2);
		data1 = Buffer.from(JSON.stringify(response.data), 'utf-8').toString('base64');
		//console.log(data1);
		res.send('{"code":"' + data1 + '"}');
	})
	.catch(error => {
		console.error('Error:', error);
		res.send(error);
	});
	
})

app.listen(666, function () {
    console.log('CORS-enabled web server listening on port 666');
})
