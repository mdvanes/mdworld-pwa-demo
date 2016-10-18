#!/usr/bin/env node
/* jshint esnext:true */
const express = require('express');
const app = express();
const spdy = require('spdy');
const http = require('http');
const https = require('https');
const fs = require('fs');
const port = process.env.PORT || 3000;

const options = {
    key: fs.readFileSync(__dirname + '/key.pem'),
    cert:  fs.readFileSync(__dirname + '/cert.pem')
};

app.use(express.static('public'));

// HTTP (only works on localhost) disable for production
http.createServer(app).listen(port, 
    () => console.log('mdworld-pwa-demo listening at http://localhost:'+port)
);
// HTTPS (same problem as HTTP/2, can't retrieve the serviceworker.js)
// Might work: Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --user-data-dir=/tmp/foo --ignore-certificate-errors --unsafely-treat-insecure-origin-as-secure=https://your.insecure.site
// See https://bugs.chromium.org/p/chromium/issues/detail?id=561820
// https.createServer(options, app).listen(port,
//     () => console.log('mdworld-pwa-demo listening at https://localhost:' + port)
// );
// HTTP/2
/*
TODO might just need this:
    if(path.extname(filename) == '.js'){
      res.setHeader('content-type', 'application/javascript');
    }
But when I call https://localhost:3000/serviceworker.js I see this is already the content-type 
*/
// spdy
//     .createServer(options, app)
//     .listen(port, error => {
//         if (error) {
//           console.error(error);
//           return process.exit(1);
//         } else {
//           console.log('mdworld-pwa-demo listening at https://localhost:' + port);
//         }
//     });
