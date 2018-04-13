const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookie = require('cookie-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookie());

app.use("/",(req,res,next) => {
	let reqUrl = req.headers.origin != null ? req.headers.origin : "*";
	res.set({
		'Access-Control-Allow-Origin':reqUrl,
		'Access-Control-Allow-Methods':'*',
		'Access-Control-Allow-Headers':'Content-Type',
		'Access-Control-MaxAge':'3600',
		'Access-Control-Allow-Credentials':'true',
	});
	next();
})

app.get('/ajax/getJson',(req,res) => {
	let data = {"name":"yilule"};
	res.jsonp(data);
});

app.post('/ajax/postJson',(req,res) => {
	res.jsonp(req.body);
});

app.get('/ajax/getCookie',(req,res) => {
	/*res.set({
		'Set-Cookie':'user=yiluleCookie'
	})*/
	console.log(req.cookies);
	res.jsonp(req.cookies);
});

app.listen(3000,err => {
	if (err) {
		throw new Error('程序出错了');
	}
	console.log('server is running on port 3000');
});

