const express = require('express');
const helmet = require('helmet');
const app = express();

app.use(helmet.hidePoweredBy())
app.use(helmet.frameguard({ action: 'deny' }))
helmet.hidePoweredBy()// here is the commend to remove the X-Powered-By: Express in the header off responses of the api which can be an indication or a guide that help hacker

//1-4 xss mitigate the risks
app.use(helmet.xssFilter());


































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Useful programmer info security app started on port ${PORT}`);
});
