const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const cookie = require('cookie-parser');//将cookie字符串解析为对象

app.use(cookie());
//bodyParser将req发送的json字符串转换为json,
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

//node只能针对url拦截，不能拦截请求类型，all是完全匹配，use是模糊匹配
app.use('/',(req,res,next) => {
	let reqUrl = req.get('Origin') != null ? req.get('Origin') : "";
	let reqHeader = req.get('Access-Control-Request-Headers') != null ? req.get('Access-Control-Request-Headers') : "";
	res.set({
		'Access-Control-Allow-Origin':reqUrl,//允许所有url跨域请求
		'Access-Control-Allow-Methods':'*',//允许所有方法
		'Access-Control-Allow-Credentials':'true',//支持cookie的跨域
		'Access-Control-Allow-Headers':reqHeader,//非简单请求头的Content-Type和自定义头
		'Access-Control-Max-Age':'3600' //非简单请求预检命令允许缓存1小时
	});
	next();
});

app.get('/ajax/getJson',(req,res) => {
	let data = {"name":"yilule"};
	res.jsonp(data); 
});

app.post('/ajax/postJson',(req,res) => {
	let data = req.body;
	res.jsonp(data);
});

app.get('/ajax/getCookie',(req,res) => {
	/*res.set({
		'Set-Cookie':'user=yiluleCookie'  //服务端设置cookie，页面第一次访问没有cookie，第二次访问有cookie
	});*/
	//req.headers.cookie 也能获取到cookie
	res.send(req.cookies);
});

app.get('/ajax/getHeader',(req,res) => {
	let data = {"name":"yiluleHeader"};
	res.jsonp(data);
})

app.listen(3000,err => {
	if (err) {
		throw new Error('程序出错了');
	}
	console.log('server is running on port 3000');
});

