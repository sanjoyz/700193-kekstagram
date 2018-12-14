'use strict';


(function () {

  var LIKES_MIN = 15;
  var LIKES_MAX = 200;
  var COMMENTS_MIN = 1;
  var COMMENTS_MAX = 10;
  var PHOTOS_QUANTITY = 25;
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
  /* var getRandomComment = function (array) {
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
  */
  var makePhotosArray = function (data) {
    var photos = [];
    for (var i = 0; i < PHOTOS_QUANTITY; i++) {
      var photo = {
        url: data[i]['url'],
        likes: data[i]['likes'],
        comments: data[i]['comments']
      };
      photos.push(photo);
    }
    return photos;
  };

  window.getData = {
    getRandomNumber: getRandomNumber,
    photos: window.backend.download(makePhotosArray)
  };

})();
