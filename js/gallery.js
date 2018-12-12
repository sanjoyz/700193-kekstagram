'use strict';

/**
  *Добавление элемента в DOM
  */
(function () {
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
      commentSpan.textContent = photo.comments[i];
      pictureInfo.appendChild(commentSpan);
    }
    return pictureEl;
  };
  /**
  *
  */
  var photos = window.getData.photos;
  var renderPictures = function () {
    var picturesContainer = document.querySelector('.pictures');
    var pictureFragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      pictureFragment.appendChild(getPicture(photos[i]));
    }
    picturesContainer.appendChild(pictureFragment);
  };
  renderPictures();
})();
