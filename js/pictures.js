'use strict';
var LIKES_MIN = 15;
var LIKES_MAX = 200;


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
    randomComment = array[getRandomNumber(0, 5)];
    return randomComment;
  }
};
var getRandomDescription = function (array) {
  var randomDescription = array[getRandomNumber(0, array.length - 1)];
  return randomDescription;
};


var photos = [
  {
    url: 'photos/' + '.jpg',
    likes: Math.round(LIKES_MIN + Math.random() * (LIKES_MAX - LIKES_MIN)),
    commentsArray: getRandomComment(commentsArray),
    description: getRandomDescription(descriptionsArray)
  },
  {
    url: 'photos/' + '.jpg',
    likes: Math.round(LIKES_MIN + Math.random() * (LIKES_MAX - LIKES_MIN)),
    commentsArray: getRandomComment(commentsArray),
    description: getRandomDescription(descriptionsArray)
  },
  {
    url: 'photos/' + '.jpg',
    likes: Math.round(LIKES_MIN + Math.random() * (LIKES_MAX - LIKES_MIN)),
    commentsArray: getRandomComment(commentsArray),
    description: getRandomDescription(descriptionsArray)
  },
  {
    url: 'photos/' + '.jpg',
    likes: Math.round(LIKES_MIN + Math.random() * (LIKES_MAX - LIKES_MIN)),
    commentsArray: getRandomComment(commentsArray),
    description: getRandomDescription(descriptionsArray)
  }
];

console.log(photos.length);
console.log(photos[0].url);
console.log(photos[0].commentsArray);
console.log(photos[1].likes);
