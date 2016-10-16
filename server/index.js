#!/usr/bin/env node
const express = require('express'),
    app = express(),
    http = require('http'),
    port = process.env.PORT || 3000;

app.use(express.static('public'));

app.listen(port, () => console.log('mdworld-pwa-demo listening at http://localhost:3000') );
