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
  var pictureUrl = pictureEl.querySelector('.picture__img').src;
  pictureUrl = photo.url;
  var pictureLikes = pictureEl.querySelector('.picture__likes').textContent;
  pictureLikes = photo.likes;
  var commentSpanTemplate = pictureEl.querySelector('.picture__comments');
  var commentSpan = commentSpanTemplate.cloneNode(true);
  for (var i = 0; i < photo.comments.length; i++) {
    commentSpan.textContent = photo.comments[i];
    pictureEl.appendChild(commentSpan);
  }
  return pictureEl;
};

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
renderBigPicture();

var renderBigPictureComments = function () {
  var commentsTemplate = document.querySelector('.social__comments').firstElementChild;
  var commentsItem = commentsTemplate.cloneNode(true);
  var commentBigPictureP = commentsItem.querySelector('.social__text');
  for (var i = 0; i < photos[0].comments.length; i++) {
    commentBigPictureP.textContent = photos[0].comments[i];
  }
  var commentBigPictureUserAvatar = commentsItem.querySelector('.social__picture');
  commentBigPictureUserAvatar.src = 'img/avatar-' + getRandomNumber(USER_AVATAR_MIN_ID, USER_AVATAR_MAX_ID) + '.svg';
  return commentsItem;
};

var addBigPictureComments = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photos[0].comments.length; i++) {
    var comment = renderBigPictureComments();
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
