'use strict';


//  var URL_POST = 'https://js.dump.academy/kekstagram';
var URL_GET = 'https://js.dump.academy/kekstagram/data';
/*
  var upload = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', URL_POST);
    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
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
      } else {
        onLoad(xhr.response);
      }
    });
    xhr.send(data);
  };
*/

var download = function (onLoad) {
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.open('GET', URL_GET);
  xhr.addEventListener('load', function () {
    onLoad(xhr.response);
  });
  xhr.send();
};

window.backend = {
  // ulpoad: upload,
  download: download
};
