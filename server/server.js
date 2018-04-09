const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

//bodyParser将req发送的json字符串转换为json,
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

//node只能针对url拦截，不能拦截请求类型，all是完全匹配，use是模糊匹配
app.all('/ajax/postJson',(req,res,next) => {
	res.set({
		'Access-Control-Allow-Origin':'http://localhost:3001',//允许http://localhost:3001跨域请求
		'Access-Control-Allow-Methods':'*',
		'Access-Control-Allow-Headers':'Content-Type',//非简单请求头的Content-Type字段
		'Access-Control-Max-Age':'3600' //非简单请求预检命令允许缓存1小时
	});
	next();
});

app.get('/ajax',(req,res) => {
	res.set({
		'Access-Control-Allow-Origin':'http://localhost:3001',//允许http://localhost:3001跨域请求
		'Access-Control-Allow-Methods':'*',
	});
	let data = {"name":"yilule"};
	res.jsonp(data); 
});

app.post('/ajax/postJson',(req,res) => {
	let data = req.body;
	res.jsonp(data);
})

app.listen(3000,err => {
	if (err) {
		throw new Error('程序出错了');
	}
	console.log('server is running on port 3000');
});

