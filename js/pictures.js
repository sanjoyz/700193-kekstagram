'use strict';
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var MAX_PHOTOS = 25;

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
  var randomNumber = Math.round(min + Math.random() * (max - min));
  return randomNumber;
};

var getRandomComment = function (array) {
  if (Math.random() > Math.random()) {
    var randomComment = '' + array[getRandomNumber(0, array.length - 1)] + ' ' + array[getRandomNumber(0, array.length - 1)];
    return randomComment;
  } else {
    randomComment = array[getRandomNumber(0, array.length - 1)];
    return randomComment;
  }
};

var getCommentsArray = function (number) {
  var commentsArr = [];
  for (var i = 0; i < number; i++) {
    commentsArr[i] = getRandomComment(commentsArray);
  }
  return commentsArr;
};

var getRandomDescription = function (array) {
  var randomDescription = array[getRandomNumber(0, array.length - 1)];
  return randomDescription;
};

var makePhotosArray = function (photosQuantity) {
  var photos = [];
  for (var i = 1; i < photosQuantity + 1; i++) {
    var photo = {
      url: i,
      likes: getRandomNumber(LIKES_MIN, LIKES_MAX),
      comments: getCommentsArray(getRandomNumber(1, 10)),
      description: getRandomDescription(descriptionsArray)
    };
    photos.push(photo);
  }
  return photos;
};
var photos = makePhotosArray(MAX_PHOTOS);

// Добавление элемента в DOM;

var getPicture = function (photo) {
  var picturesTemplate = document.querySelector('#picture').content;
  var pictureEl = picturesTemplate.cloneNode(true);
  pictureEl.querySelector('.picture__img').src = 'photos/' + photo.url + '.jpg';
  pictureEl.querySelector('.picture__likes').textContent = photo.likes;
  for (var i = 0; i < photo.comments.length; i++) {
    var commentSpan = pictureEl.querySelector('.picture__comments').cloneNode(true);
    commentSpan.textContent = photo.comments[i];
    pictureEl.appendChild(commentSpan);
  }
  return pictureEl;
};
var renderPicture = function () {
  var picturesContainer = document.querySelector('.pictures');
  var pictureFragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    pictureFragment.appendChild(getPicture(photos[i]));
  }
  picturesContainer.appendChild(pictureFragment);
};
renderPicture();


var bigPictureContainer = document.querySelector('.big-picture');
bigPictureContainer.classList.remove('hidden');
var bigPictureImg = document.querySelector('.big-picture__img').firstElementChild;
bigPictureImg.src = 'photos/' + photos[0].url + '.jpg';
var bigPictureLikes = document.querySelector('.likes-count');
bigPictureLikes.textContent = photos[0].likes;
var bigPictureCommentsCount = document.querySelector('.comments-count');
bigPictureCommentsCount.textContent = photos[0].comments.length;

var renderBigPictureComments = function () {
  var commentsItem = document.querySelector('.social__comments').firstElementChild.cloneNode(true);
  for (var i = 0; i < photos[0].comments.length; i++) {
    var commentBigPictureSpan = commentsItem.querySelector('.social__text').cloneNode(true);
    commentBigPictureSpan.textContent = photos[0].comments[i];
    commentsItem.appendChild(commentBigPictureSpan);
  }
  commentsItem.querySelector('.social__picture').src = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
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
