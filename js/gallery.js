'use strict';

/**
  * Создание галереи миниатюр
*/
(function () {
  var PHOTOS_QUANTITY = 25;

  var getPicture = function (photo) {
    var picturesTemplate = document.querySelector('#picture').content;
    var pictureEl = picturesTemplate.cloneNode(true);
    var pictureUrl = pictureEl.querySelector('.picture__img');
    pictureUrl.src = photo.url;
    var pictureLikes = pictureEl.querySelector('.picture__likes');
    pictureLikes.textContent = photo.likes;
    var pictureInfo = pictureEl.querySelector('.picture__info');
    var commentSpan = pictureEl.querySelector('.picture__comments');
    for (var i = 0; i < photo.comments.length; i++) {
      commentSpan.textContent = photo.comments[i].message;
      pictureInfo.appendChild(commentSpan);
    }
    return pictureEl;
  };

  var renderPictures = function (photos) {
    var picturesContainer = document.querySelector('.pictures');
    var pictureFragment = document.createDocumentFragment();
    for (var i = 0; i < PHOTOS_QUANTITY; i++) {
      pictureFragment.appendChild(getPicture(photos[i]));
    }
    picturesContainer.appendChild(pictureFragment);
  };

  window.backend.download(renderPictures);

})();
