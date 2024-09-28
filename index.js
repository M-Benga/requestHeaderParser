// @ts-nocheck
// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();
var os = require('os');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204




// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

function getClientIp(req) {
  let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
  //  let ip = req.ip || req.connection.remoteAddress;
  
  if (ip) {
    // Check if it's an IPv4 address mapped to IPv6
    if (ip.substr(0, 7) === "::ffff:") {
      ip = ip.substr(7);
    }
  }
  
  return ip;
};

app.get('/api/whoami', (req, res, next) => {
  // const ip = req.ip || req.connection.remoteAddress;IP Adress: ::1

  const ip = getClientIp(req);
  const prefferedLanguage = req.headers['accept-language'];
  const userAgent = req.headers['user-agent'];
  
  res.json({ipaddress: ip, language: prefferedLanguage, software: userAgent});
})

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
