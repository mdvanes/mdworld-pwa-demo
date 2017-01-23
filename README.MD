# Progressive Web App Demo

A showcase for Progressive Web Apps by using:

* Homescreen
* Service Worker Notifications
* Service Worker Cache API.

This should work on Chrome and Chrome Mobile.

For more details see public/index.html or visit the running web app at https://mdworld-pwa-demo.herokuapp.com


# Usage

* Run development server and watch ```npm run devserver``` and open http://localhost:3000/ (Service workers 
requires HTTPS, but an exception is made for localhost)
* Build for production ```npm run dist```
* Run production server ```npm start```


# DevOps

Travis-ci depends on the .travis.yml. It has an API key for heroku. It was not possible to generate it under Windows, 
but it worked on the first try on Ubuntu.

Heroku starts by running the Procfile. When deploying an HTTP server on Heroku, apparently it's automatically also 
accessible over https: https://mdworld-pwa-demo.herokuapp.com/


# Debugging

* Inspect/unregister service workers: chrome://serviceworker-internals/ Sometimes, when updates are not shown it will
help to unregister the service worker.
* Information about Push Notifications: https://developers.google.com/web/fundamentals/getting-started/codelabs/push-notifications/
* Cloud messaging console (source of the API webkey): https://console.firebase.google.com/project/my-homescreen-push-test/settings/general/
* Service Worker offline information: https://mobiforge.com/design-development/taking-web-offline-service-workers, https://jakearchibald.com/2014/offline-cookbook/, https://www.udacity.com/course/offline-web-applications--ud899


# TODO

* Webpack: uglify gives warnings
* Fix server side routing (usecase: http://localhost:3000/swnotification, then F5)
* Look at Web Push: https://www.npmjs.com/package/web-push


# Outscoped improvements

* Web socket for updating "show notifications"
* Cache API: reconnect subscribe when connection is re-established
* Use webpack dev server with proxy
