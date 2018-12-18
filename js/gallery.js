'use strict';

/**
* Создание галереи миниатюр
*/
(function () {
  var MAX_NEW_PHOTOS = 10;
  var PHOTOS_QUANTITY = 25;
  var photos = [];
  var picturesElement = document.querySelector('.pictures');
  var copy = [];
  var createPictures = function (photoData) {

    // убрать фотографии со страницы
    while (picturesElement.contains(picturesElement.querySelector('.picture'))) {
      picturesElement.removeChild(picturesElement.lastChild);
    }

    var fragment = document.createDocumentFragment();
    photoData.forEach(function (photo) {
      var picturesTemplate = document.querySelector('#picture').content;
      var picturesTemplateElement = picturesTemplate.querySelector('.picture');
      var pictureElement = picturesTemplateElement.cloneNode(true);
      var pictureUrl = pictureElement.querySelector('.picture__img');
      pictureUrl.src = photo.url;
      var pictureLikes = pictureElement.querySelector('.picture__likes');
      pictureLikes.textContent = photo.likes;
      var commentSpan = pictureElement.querySelector('.picture__comments');
      commentSpan.textContent = photo.comments.length;
      fragment.appendChild(pictureElement);
    });
    picturesElement.appendChild(fragment);
  };

  var renderPictures = function (data) {
    var imgSortElement = document.querySelector('.img-filters');
    var imgSortFormElement = imgSortElement.querySelector('form');

    for (var i = 0; i < PHOTOS_QUANTITY; i++) {
      var photoInfo = data[i];
      photos.push(photoInfo);
      copy.push(photoInfo);
    }
    createPictures(photos);
    imgSortElement.classList.remove('img-filters--inactive');
    imgSortFormElement.addEventListener('click', sortButtonsClickHandler);

  };

  var bigPicturePicker = function (array, src) {
    for (var i = 0; i < PHOTOS_QUANTITY; i++) {
      if (array[i].url === src) {
        return array[i];
      }
    }
    return null;
  };

  window.backend.download(renderPictures);
  var picturesPreviewList = document.querySelector('.pictures');

  /*
* клик срабатывает только на превью картинки
*/
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

  var sortNewPhotos = function (arr) {
    var randomImages = window.utility.shuffleArray(arr).slice(0, MAX_NEW_PHOTOS);
    createPictures(randomImages);
  };

  var sortDiscussed = function () {
    copy.sort(function (a, b) {
      if (a.comments.length < b.comments.length) {
        return 1;
      } else if (a.comments.length > b.comments.length) {
        return -1;
      } else {
        return 0;
      }
    });
    createPictures(copy);
  };

  var sortButtonsClickHandler = function (evt) {
    var clickedButton = evt.target;
    var buttons = document.querySelectorAll('.img-filters__button');
    var activeClass = 'img-filters__button--active';
    buttons.forEach(function (button) {
      if (button.classList.contains(activeClass)) {
        button.classList.remove(activeClass);
      }
    });
    clickedButton.classList.add(activeClass);

    switch (clickedButton.getAttribute('id')) {
      case 'filter-popular':
        window.debounce(createPictures(photos));
        break;
      case 'filter-new':
        window.debounce(sortNewPhotos);
        break;
      case 'filter-discussed':
        window.debounce(sortDiscussed);
        break;

    }
  };


  picturesPreviewList.addEventListener('click', picturePreviewClickHandler);

  window.gallery = {

  };
})();
