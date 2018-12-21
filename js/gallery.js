'use strict';

// Создание галереи миниатюр
(function () {
  var MAX_NEW_PHOTOS = 10;
  var PHOTOS_QUANTITY = 25;
  var photos = [];
  var picturesElement = document.querySelector('.pictures');
  var copies = [];
  var createPictures = function (photoData) {

    // Убираем фотографии со страницы
    while (picturesElement.contains(picturesElement.querySelector('.picture'))) {
      picturesElement.removeChild(picturesElement.lastChild);
    }
    // Создаем фрагмент и наполняем его фотографиями
    var fragment = document.createDocumentFragment();
    photoData.forEach(function (photo) {
      var picturesTemplate = document.querySelector('#picture').content;
      var picturesTemplateElement = picturesTemplate.querySelector('.picture');
      var pictureElement = picturesTemplateElement.cloneNode(true);
      var pictureUrl = pictureElement.querySelector('.picture__img');
      var pictureLikes = pictureElement.querySelector('.picture__likes');
      var commentSpan = pictureElement.querySelector('.picture__comments');
      if (typeof photo !== 'undefined') {
        pictureUrl.src = photo.url;
        pictureLikes.textContent = photo.likes.toString();
        commentSpan.textContent = photo.comments.length.toString();
      }
      fragment.appendChild(pictureElement);
    });
    picturesElement.appendChild(fragment);
  };

  var renderPictures = function (data) {
    var imgSortElement = document.querySelector('.img-filters');
    var imgSortFormElement = imgSortElement.querySelector('form');

    data.forEach(function (photoInfo) {
      photos.push(photoInfo);
      copies.push(photoInfo);
    });

    createPictures(photos);
    imgSortElement.classList.remove('img-filters--inactive');
    imgSortFormElement.addEventListener('click', sortButtonsClickHandler);
  };

  var pickBigPicture = function (array, src) {
    var pic;
    array.forEach(function (item) {
      if (item.url === src) {
        pic = item;
      }
    });
    return pic;
    /* for (var i = 0; i < PHOTOS_QUANTITY; i++) {
      if (array[i].url === src) {
        return array[i];
      }
    }
    return null;*/
  };

  window.backend.download(renderPictures);

  var picturePreviewClickHandler = function (evt) {
    var src = '';
    if (evt.target.tagName === 'A' && evt.target.classList.contains('picture')) {
      src = evt.target.firstElementChild.attributes.src.nodeValue;
    }
    if (evt.target.tagName === 'IMG' && evt.target.classList.contains('picture__img')) {
      src = evt.target.attributes.src.nodeValue;
    }
    if (src) {
      var elem = pickBigPicture(photos, src);
      window.bigPicture.render(elem);
    }
  };

  // Сортировки "Новые" "Популярные" "Обсуждаемые"
  var sortNewPhotos = function () {
    var randomPhotos = [];
    while (randomPhotos.length < MAX_NEW_PHOTOS) {
      var randomPhoto = window.utility.getRandomArrayElem(copies);
      if (randomPhotos.indexOf(randomPhoto) === -1) {
        randomPhotos.push(randomPhoto);
      }
    }
    createPictures(randomPhotos);
  };

  var sortDiscussed = function () {
    copies.sort(function (a, b) {
      if (a.comments.length < b.comments.length) {
        return 1;
      } else if (a.comments.length > b.comments.length) {
        return -1;
      }
      return 0;
    });
    createPictures(copies);
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

  var picturesPreviewList = document.querySelector('.pictures');
  picturesPreviewList.addEventListener('click', picturePreviewClickHandler);
})();
