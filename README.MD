# The goal of this demo

Visit the running web app at http://mdworld-pwa-demo.herokuapp.com

A showcase for Homescreen, Service Worker Notifications, Service Worker Cache API.
This should work on Chrome and Chrome Mobile.

Homescreen can be tested by...
Notifications can be tested by...
CacheAPI can be tested by...


# Server

https is supposed to be required for notification/service worker, but it seems to work without.

Tried for the moment only use http-server with `http-server -S -C cert.pem -p 3443` to run https.
Create certificates with `openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem`
But Heroku doesn't support SSL on free dynos, nor HTTP/2.

Now trying simple Express http server instead.


# DevOps

Travis-ci depends on the .travis.yml. It has an API key for heroku. It was not possible to generate it under Windows, but it worked on the first try on Ubuntu.

Heroku starts by running the Procfile.


# TODO

* rename repo to match Heroku