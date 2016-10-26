/**
 * Created by baoyinghai on 10/18/16.
 */

const self = {};
/* eslint-disable */
(function() {
  'use strict';

  function headers(xhr) {
    const head = new Headers();
    var pairs = xhr.getAllResponseHeaders().trim().split('\n');
    pairs.forEach(function(header) {
      const split = header.trim().split(':')
      const key = split.shift().trim();
      const value = split.join(':').trim();
      head.append(key, value);
    });
    return head;
  }

  var support = {
    blob: typeof FileReader === 'function' && typeof Blob === 'function' && (function() {
      try {
        new Blob();
        return true;
      } catch (e) {
        return false;
      }
    })(),
    formData: typeof FormData === 'function',
    arrayBuffer: typeof ArrayBuffer === 'function'
  };

  self.fetch = function(input, init, timeout) {
    let request;
    let timeoutTimer
    if (Request.prototype.isPrototypeOf(input) && !init) {
      request = input;
    } else {
      request = new Request(input, init);
    }

    return new Promise(function(resolve, reject) {
      const xhr = new XMLHttpRequest();

      function responseURL() {
        if ('responseURL' in xhr) {
          return xhr.responseURL;
        }

        // Avoid security warnings on getResponseHeader when not allowed by CORS
        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
          return xhr.getResponseHeader('X-Request-URL');
        }

        return;
      }

      function cleanTimeoutTimer() {
        window.clearTimeout( timeoutTimer );
      }

      xhr.onload = function() {
        cleanTimeoutTimer();
        const status = (xhr.status === 1223) ? 204 : xhr.status;
        if (status < 100 || status > 599) {
          reject(new TypeError('Network request failed'));
          return;
        }
        const options = {
          status: status,
          statusText: xhr.statusText,
          headers: headers(xhr),
          url: responseURL()
        }
        const body = 'response' in xhr ? xhr.response : xhr.responseText;
        resolve(new Response(body, options));
      };

      xhr.onerror = function(err) {
        cleanTimeoutTimer();
        reject(new TypeError('Network request failed'));
      };

      xhr.open(request.method, request.url, true);

      if (request.credentials === 'include') {
        xhr.withCredentials = true;
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob';
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value);
      });

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);

      timeoutTimer = setTimeout(() => {
        xhr.abort();
        reject(new TypeError('timeout'));
      }, timeout);

    });
  };
  self.fetch.polyfill = true;
})();

export default self;
