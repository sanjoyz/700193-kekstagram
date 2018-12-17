'use strict';

/**
* Создание галереи миниатюр
*/
(function () {
  var PHOTOS_QUANTITY = 25;
  var photos = [];
  /*
** getPicture - принимает объект "фото", создает из него миниатюру
** фотографии в галерее
*/
  var getPicture = function (photoData) {
    var picturesTemplate = document.querySelector('#picture').content;
    var pictureEl = picturesTemplate.cloneNode(true);
    var pictureUrl = pictureEl.querySelector('.picture__img');
    pictureUrl.src = photoData.url;
    var pictureLikes = pictureEl.querySelector('.picture__likes');
    pictureLikes.textContent = photoData.likes;
    var pictureInfo = pictureEl.querySelector('.picture__info');
    var commentSpan = pictureEl.querySelector('.picture__comments');
    //  for (var i = 0; i < photoData.comments.length; i++) {
    commentSpan.textContent = photoData.comments.length;
    pictureInfo.appendChild(commentSpan);
    return pictureEl;
  };

  /*
** renderPicturesArray - принимает массив объектов из серверного запроса
** каждый объект передает в getPicture и записывает результат в док.фрагмент
** после добавляет весь фрагмент в контейнер для фотографий
*/
  var renderPicturesArray = function (data) {
    var picturesContainer = document.querySelector('.pictures');
    var pictureFragment = document.createDocumentFragment();
    for (var i = 0; i < PHOTOS_QUANTITY; i++) {
      pictureFragment.appendChild(getPicture(data[i]));
      photos.push(data[i]);
    }
    picturesContainer.appendChild(pictureFragment);
  };


  var picturesPreviewList = document.querySelector('.pictures');


  var picturePreviewClickHandler = function (evt) {
    var src = '';
    if (evt.target.tagName === 'A' && evt.target.classList.contains('picture')) {
      src = evt.target.firstElementChild.attributes.src.nodeValue;
    }
    if (evt.target.tagName === 'IMG' && evt.target.classList.contains('picture__img')) {
      src = evt.target.attributes.src.nodeValue;
    }
    if (src) {
      window.bigPicture.renderBigPicture(bigPicturePicker(photos, src));
    }
  };

  var bigPicturePicker = function (array, src) {
    for (var i = 0; i < PHOTOS_QUANTITY; i++) {
      if (array[i].url === src) {
        return array[i];
      }
    }
    return null;
  };

  window.backend.download(renderPicturesArray);
  picturesPreviewList.addEventListener('click', picturePreviewClickHandler);
})();
