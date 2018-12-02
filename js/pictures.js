'use strict';
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var PHOTOS_QUANTITY = 25;
var COMMENTS_MIN = 1;
var COMMENTS_MAX = 10;
var USER_AVATAR_MIN_ID = 1;
var USER_AVATAR_MAX_ID = 6;
//  url: 'photos/' + index + '.jpg', // {{i}} - 1-25
//  likes: Math.round(LIKES_MIN + Math.random() * (LIKES_MAX - LIKES_MIN)),
var commentsArray = [
  'Всё отлично.',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var descriptionsArray = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var getRandomNumber = function (min, max) {
  return Math.round(min + Math.random() * (max - min));
};

var getRandomComment = function (array) {
  var randomComment = array[getRandomNumber(0, array.length - 1)];
  var isLong = !!getRandomNumber(0, 1);
  if (isLong) {
    randomComment += ' ' + array[getRandomNumber(0, array.length - 1)];
  }
  return randomComment;
};

var getCommentsArray = function (number) {
  var commentsArr = [];
  for (var i = 0; i < number; i++) {
    commentsArr.push(getRandomComment(commentsArray));
  }
  return commentsArr;
};

var getRandomDescription = function (array) {
  return array[getRandomNumber(0, array.length - 1)];
};

var makePhotosArray = function (photosQuantity) {
  var photos = [];
  for (var i = 1; i <= photosQuantity; i++) {
    var photo = {
      url: 'photos/' + i + '.jpg',
      likes: getRandomNumber(LIKES_MIN, LIKES_MAX),
      comments: getCommentsArray(getRandomNumber(COMMENTS_MIN, COMMENTS_MAX)),
      description: getRandomDescription(descriptionsArray)
    };
    photos.push(photo);
  }
  return photos;
};
var photos = makePhotosArray(PHOTOS_QUANTITY);

/**
  *Добавление элемента в DOM
  */

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
*Добавить шаблон для больших фотографий в разметку
*/

var renderPictures = function () {
  var picturesContainer = document.querySelector('.pictures');
  var pictureFragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    pictureFragment.appendChild(getPicture(photos[i]));
  }
  picturesContainer.appendChild(pictureFragment);
};
renderPictures();

var renderBigPicture = function () {
  var bigPictureContainer = document.querySelector('.big-picture');
  bigPictureContainer.classList.remove('hidden');
  var bigPictureImg = document.querySelector('.big-picture__img').firstElementChild;
  bigPictureImg.src = photos[0].url;
  var bigPictureLikes = document.querySelector('.likes-count');
  bigPictureLikes.textContent = photos[0].likes;
  var bigPictureCommentsCount = document.querySelector('.comments-count');
  bigPictureCommentsCount.textContent = photos[0].comments.length.toString();
};

var renderBigPictureComments = function (text) {
  var commentsTemplate = document.querySelector('.social__comments').firstElementChild;
  var commentsItem = commentsTemplate.cloneNode(true);
  var commentBigPictureP = commentsItem.querySelector('.social__text');
  commentBigPictureP.textContent = text;
  var commentBigPictureUserAvatar = commentsItem.querySelector('.social__picture');
  commentBigPictureUserAvatar.src = 'img/avatar-' + getRandomNumber(USER_AVATAR_MIN_ID, USER_AVATAR_MAX_ID) + '.svg';
  return commentsItem;
};

var addBigPictureComments = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photos[0].comments.length; i++) {
    var comment = renderBigPictureComments(photos[0].comments[i]);
    fragment.appendChild(comment);
  }
  var commentsList = document.querySelector('.social__comments');
  commentsList.appendChild(fragment);
};
addBigPictureComments();

var commentCountBlock = document.querySelector('.social__comment-count');
var commentLoaderBlock = document.querySelector('.comments-loader');
commentCountBlock.classList.add('visually-hidden');
commentLoaderBlock.classList.add('visually-hidden');

/*
* Загрузка фотографий
**/

var editForm = document.querySelector('.img-upload__overlay');
var buttonUploadCanel = editForm.querySelector('#upload-cancel');
var uploadFileField = document.querySelector('#upload-file');
var openPopup = function () {
  editForm.classList.remove('hidden');
  uploadFileField.value = '';
};
var closePopup = function () {
  editForm.classList.add('hidden');
  imgUploadPreview.firstElementChild.className = '';
};


uploadFileField.addEventListener('change', openPopup);
document.addEventListener('keyup', function (evt) {
  if (evt.keyCode === 27) {
    editForm.classList.add('hidden');
    imgUploadPreview.firstElementChild.className = '';
  }
});
buttonUploadCanel.addEventListener('click', closePopup);

/*
* Фильтры
**/
var filterPin = document.querySelector('.effect-level__pin');

filterPin.addEventListener('mouseup', function () {});

/* Кликаю по инпут id="effect-chrome"
img внутри img-upload__preview добавляется класс effects__preview--chrome
*/
var imgUploadEffects = document.querySelector('.effects__list');
var imgUploadPreview = document.querySelector('.img-upload__preview');
// var chromeEffect = imgUploadEffects.querySelector('#effect-chrome');

/*  var imgEffectsClickHandler = function (evt) {
  if (evt.target === document.querySelector('#effect-chrom')) {
    imgUploadPreview.firstElementChild.classList.add('effects__preview--chrome');
  }
};  */
imgUploadEffects.addEventListener('click', function (evt) {

  if (evt.target === document.querySelector('.effects__preview--chrome')) {
    imgUploadPreview.firstElementChild.className = '';
    imgUploadPreview.firstElementChild.classList.add('effects__preview--chrome');
  } else if (evt.target === document.querySelector('.effects__preview--none')) {
    imgUploadPreview.firstElementChild.className = '';
    imgUploadPreview.firstElementChild.classList.add('effects__preview--none');
  } else if (evt.target === document.querySelector('.effects__preview--sepia')) {
    imgUploadPreview.firstElementChild.className = '';
    imgUploadPreview.firstElementChild.classList.add('effects__preview--sepia');
  } else if (evt.target === document.querySelector('.effects__preview--marvin')) {
    imgUploadPreview.firstElementChild.className = '';
    imgUploadPreview.firstElementChild.classList.add('effects__preview--marvin');
  } else if (evt.target === document.querySelector('.effects__preview--phobos')) {
    imgUploadPreview.firstElementChild.className = '';
    imgUploadPreview.firstElementChild.classList.add('effects__preview--phobos');
  } else if (evt.target === document.querySelector('.effects__preview--heat')) {
    imgUploadPreview.firstElementChild.className = '';
    imgUploadPreview.firstElementChild.classList.add('effects__preview--heat');
  }
});
