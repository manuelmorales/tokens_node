express = require('express');

var app = express();

app.get('/', function (req, res) { res.send('hola'); });

app.listen(3000);
