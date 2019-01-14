const express = require('express');

const app = express();

app.get('/', function (req, res) {
	res.sendfile('public/index.html');
});

const port = process.env.port || 5000;
app(port, ()=> console.log(`Server started on port ${port}`));