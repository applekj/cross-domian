const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname,'public')));

app.listen(3001,err => {
	if (err) {
		throw new Error('程序出错了');
	}
	console.log('front project is running on port 3001');
});
