'use strict';

/**
  * Создание галереи миниатюр
*/
(function () {
  var PHOTOS_QUANTITY = 25;
  var photos = [];
  var pictureElements = document.querySelector('.pictures');
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

  var renderPictures = function (pic) {
    var picturesContainer = document.querySelector('.pictures');
    var pictureFragment = document.createDocumentFragment();
    for (var i = 0; i < PHOTOS_QUANTITY; i++) {
      pictureFragment.appendChild(getPicture(pic[i]));
    }
    picturesContainer.appendChild(pictureFragment);
  };

  var bigPicturePicker = function (array, src) {
    for (var i = 0; i < PHOTOS_QUANTITY; i++) {
      if (array[i].url === src) {
        return array[i];
      }
    }
    return 0;
  };

  var picturePreviewClickHandler = function (evt) {
    var src = evt.target.attributes.src.nodeValue;
    window.bigPicture.renderBigPicture(bigPicturePicker(photos, src));
  };


  window.backend.download(renderPictures);
  pictureElements.addEventListener('click', picturePreviewClickHandler);

})();
