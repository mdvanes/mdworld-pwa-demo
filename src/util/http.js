/*
 @example:
 import http from './util/http';
 http.get('http://localhost:3000/getuptime')
    .then(function(data) {
        console.log('success', data);
    })
    .catch(function(data) {
        console.error('error', data);
    });
 */
// Alternatively use a promise library from npm like browser-request
function get(url) {
    return new Promise( (resolve, reject) => {
        //const url = 'http://localhost:3000/uptime';
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
            //callback(this.responseText)
            if (this.status === 200) {
                // Performs the function "resolve" when this.status is equal to 200
                resolve(this.response);
            } else {
                // Performs the function "reject" when this.status is different than 200
                reject(this.statusText);
            }
        };
        xhr.open('GET', url, true);
        xhr.send();
    });
}

export default {get};