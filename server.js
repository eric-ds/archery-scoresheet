const express = require('express');

const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.sendFile('../public/index.html', { root: __dirname });
});

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Server started on port ${port}`));