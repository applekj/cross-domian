const express = require('express');
const app = express();
const path = require('path');

app.get('/ajax',(req,res) => {
	let data = {"name":"yilule"};
	/*res.append('Access-Control-Allow-Origin','http://localhost:3001');
	res.append('Access-Control-Allow-Methods','GET');*/
	res.append('Access-Control-Allow-Origin','*');
	res.append('Access-Control-Allow-Methods','*');
	res.jsonp(data);
});

app.post('/ajax/postJson',(req,res) => {
	res.append('Access-Control-Allow-Origin','*');
	res.append('Access-Control-Allow-Methods','*');
	console.log(req.params);
	res.jsonp(req.params)
})

app.listen(3000,err => {
	if (err) {
		throw new Error('程序出错了');
	}
	console.log('server is running on port 3000');
});

