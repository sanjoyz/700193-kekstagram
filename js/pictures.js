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
      comments: getRandomComment(commentsArray),
      description: getRandomDescription(descriptionsArray)
    };
    photos.push(photo);
  }
  return photos;
};
var photos = makePhotosArray(MAX_PHOTOS);
/* [
  {
    url: 1,
    likes: getRandomNumber(LIKES_MIN, LIKES_MAX),
    comments: getRandomComment(commentsArray),
    description: getRandomDescription(descriptionsArray)
  },
  {
    url: 2,
    likes: getRandomNumber(LIKES_MIN, LIKES_MAX),
    comments: getRandomComment(commentsArray),
    description: getRandomDescription(descriptionsArray)
  },
  {
    url: 3,
    likes: getRandomNumber(LIKES_MIN, LIKES_MAX),
    comments: getRandomComment(commentsArray),
    description: getRandomDescription(descriptionsArray)
  },
  {
    url: 4,
    likes: getRandomNumber(LIKES_MIN, LIKES_MAX),
    comments: getRandomComment(commentsArray),
    description: getRandomDescription(descriptionsArray)
  },
  {
    url: 5,
    likes: getRandomNumber(LIKES_MIN, LIKES_MAX),
    comments: getRandomComment(commentsArray),
    description: getRandomDescription(descriptionsArray)
  },
  {
    url: 6,
    likes: getRandomNumber(LIKES_MIN, LIKES_MAX),
    comments: getRandomComment(commentsArray),
    description: getRandomDescription(descriptionsArray)
  }

];*/
// Добавление элемента в DOM;

var getPicture = function (photo) {
  var picturesTemplate = document.querySelector('#picture').content;
  var pictureEl = picturesTemplate.cloneNode(true);
  pictureEl.querySelector('.picture__img').src = 'photos/' + photo.url + '.jpg';
  pictureEl.querySelector('.picture__likes').textContent = photo.likes;
  pictureEl.querySelector('.picture__comments').textContent = photo.comments;

  return pictureEl;
};
var picturesContainer = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();
for (var i = 0; i < photos.length; i++) {
  fragment.appendChild(getPicture(photos[i]));
}
picturesContainer.appendChild(fragment);
