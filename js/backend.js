'use strict';

(function () {
  var URL_GET = 'https://js.dump.academy/kekstagram/data';
  var URL_POST = 'https://js.dump.academy/kekstagram';
  /*
* DRY
*/
  var getXhr = function (xhr, onLoad, onError) {
    xhr.responseType = 'json';
    xhr.timeout = '10000';

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;
        case 400:
          error = 'Неверный запрос';
          break;
        case 404:
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
