# server
https is supposed to be required for notification/service worker, but it seems to work without.

for the moment only use http-server with `http-server -S -C cert.pem -p 3443` to run https.

Create certificates with `openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem`

# devops

Travis-ci depends on the .travis.yml. It has an API key for heroku. It was not possible to generate it under Windows, but it worked on the first try on Ubuntu.

Heroku starts by running the Procfile.

