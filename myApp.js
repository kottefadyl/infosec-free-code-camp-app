const express = require('express');
const helmet = require('helmet');
const app = express();

app.use(helmet.hidePoweredBy())
app.use(helmet.frameguard({ action: 'deny' }))
helmet.hidePoweredBy()// here is the commend to remove the X-Powered-By: Express in the header off responses of the api which can be an indication or a guide that help hacker

//1-4 xss mitigate the risks
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen())

//Ask Browsers to Access Your Site via HTTPS Only with helmet.hsts()
const timeInSeconds = 90 * 24 * 60 * 60
app.use(helmet.hsts({maxAge:timeInSeconds, force: true}))
































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
