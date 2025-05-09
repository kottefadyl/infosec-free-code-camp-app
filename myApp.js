const express = require('express');
const helmet = require('helmet');
const app = express();


// app.use(helmet.hidePoweredBy())
// app.use(helmet.frameguard({ action: 'deny' }))
// helmet.hidePoweredBy()// here is the commend to remove the X-Powered-By: Express in the header off responses of the api which can be an indication or a guide that help hacker

// //1-4 xss mitigate the risks
// app.use(helmet.xssFilter());
// app.use(helmet.noSniff());
// app.use(helmet.ieNoOpen())

// //Ask Browsers to Access Your Site via HTTPS Only with helmet.hsts()
// const timeInSeconds = 90 * 24 * 60 * 60
// app.use(helmet.hsts({maxAge:timeInSeconds, force: true}))

// // Désactiver le DNS Prefetching
// app.use(helmet.dnsPrefetchControl());

// //Set a Content Security Policy with helmet.contentSecurityPolicy()
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'"], // tout vient du site lui-même
//       scriptSrc: ["'self'", 'trusted-cdn.com'], // scripts autorisés : mon site + trusted-cdn
//     },
//   })
// );

app.use(helmet({
  frameguard: {
    action: 'deny'
  },
  contentSecurityPolicy:{
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'",'trusted-cdn.com' ],
    }
  },
  dnsPrefetchControl: false,
  noCache: true
}))



app.use(helmet.noCache())































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
