'use strict';
var LIKES_MIN = 15;
var LIKES_MAX = 200;


  //url: 'photos/' + index + '.jpg', // {{i}} - 1-25
  //likes: Math.round(LIKES_MIN + Math.random() * (LIKES_MAX - LIKES_MIN)),
var comments = [
  'Всё отлично',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабумшка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
]
var descriptionsArray = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
]

var i = 1;
var photos = [

    {
      url: 'photos/' + i + '.jpg',
      likes: Math.round(LIKES_MIN + Math.random() * (LIKES_MAX - LIKES_MIN)),
      comments: 1,//getRandomComment(),
      description: 1//getRandomDescription()
    },
    {
      url: 'photos/' + i + '.jpg',
      likes: Math.round(LIKES_MIN + Math.random() * (LIKES_MAX - LIKES_MIN)),
      comments: 2,//getRandomComment(),
      description: 3//getRandomDescription()
    }

]

console.log(photos.length);
console.log(photos[0].url);
console.log(photos[0].comments);
console.log(photos[1].likes);
