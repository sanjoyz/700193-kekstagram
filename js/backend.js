'use strict';

(function () {
  var URL_GET = 'https://js.dump.academy/kekstagram/data';
  var URL_POST = 'https://js.dump.academy/kekstagram';
  var SUCCESS_RESPONSE_CODE = 200;
  var BAD_REQUEST_RESPONSE_CODE = 400;
  var NOT_FOUND_RESPONSE_CODE = 404;
  var TIMEOUT_VALUE = 10000;
  var getXhr = function (xhr, onLoad, onError) {
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_VALUE;

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case SUCCESS_RESPONSE_CODE:
          onLoad(xhr.response);
          break;
        case BAD_REQUEST_RESPONSE_CODE:
          error = 'Неверный запрос';
          break;
        case NOT_FOUND_RESPONSE_CODE:
          error = 'Ничего не найдено';
          break;
        default:
          error = 'Статус ответа: ' + xhr.status + '' + xhr.statusText;
      }
      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('timeout', function () {
      onError('Превышен лимит ожидания ' + xhr.timeout);
    });
  };

  var upload = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    getXhr(xhr, onLoad, onError);
    xhr.open('POST', URL_POST);
    xhr.send(data);
  };
  var download = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    getXhr(xhr, onLoad, onError);
    xhr.open('GET', URL_GET);
    xhr.send();
  };

  window.backend = {
    upload: upload,
    download: download
  };
})();
