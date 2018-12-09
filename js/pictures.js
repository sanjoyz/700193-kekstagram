'use strict';
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var PHOTOS_QUANTITY = 25;
var COMMENTS_MIN = 1;
var COMMENTS_MAX = 10;
var USER_AVATAR_MIN_ID = 1;
var USER_AVATAR_MAX_ID = 6;
var MAX_HASHTAG_LENGTH = 20;
var MAX_HASHTAG_COUNT = 5;
var ESC_KEYCODE = 27;
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
*
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

var renderBigPicture = function (photo) {
  var bigPictureContainer = document.querySelector('.big-picture');
  bigPictureContainer.classList.remove('hidden');
  var bigPictureImg = document.querySelector('.big-picture__img').firstElementChild;
  bigPictureImg.src = photo.src;
  var bigPictureLikes = document.querySelector('.likes-count');
  bigPictureLikes.textContent = photos[0].likes;
  var bigPictureCommentsCount = document.querySelector('.comments-count');
  bigPictureCommentsCount.textContent = photos[0].comments.length.toString();
};

var renderBigPictureComments = function (text) {
  var commentsTemplate = document.querySelector('#big-comments').content;
  var commentItemTemplate = commentsTemplate.querySelector('.social__comment');
  var commentItem = commentItemTemplate.cloneNode(true);
  var commentItemText = commentItem.querySelector('.social__text');
  commentItemText.textContent = text;
  var commentBigPictureUserAvatar = commentItem.querySelector('.social__picture');
  commentBigPictureUserAvatar.src = 'img/avatar-' + getRandomNumber(USER_AVATAR_MIN_ID, USER_AVATAR_MAX_ID) + '.svg';
  return commentItem;
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

var closeBigPicture = function () {
  var bigOverlay = document.querySelector('.big-picture.overlay');
  bigOverlay.classList.add('hidden');
};

var commentCountBlock = document.querySelector('.social__comment-count');
var commentLoaderBlock = document.querySelector('.comments-loader');
commentCountBlock.classList.add('visually-hidden');
commentLoaderBlock.classList.add('visually-hidden');


/*
* Загрузка фотографий
**/
var commentTextArea = document.querySelector('.text__description');
var editForm = document.querySelector('.img-upload__overlay');
var buttonUploadCanel = editForm.querySelector('#upload-cancel');
var uploadFileField = document.querySelector('#upload-file');


var openPopup = function () {
  editForm.classList.remove('hidden');
};

var closePopup = function () {
  editForm.classList.add('hidden');
  imgUploadPreview.firstElementChild.className = '';
  uploadFileField.value = '';
};


uploadFileField.addEventListener('change', openPopup);
document.addEventListener('keyup', function (evt) {
  if (evt.keyCode === ESC_KEYCODE && document.activeElement !== commentTextArea) {
    editForm.classList.add('hidden');
    imgUploadPreview.firstElementChild.className = '';
  }
});
buttonUploadCanel.addEventListener('click', closePopup);

/*
* Показ полноэкранного изображения по клику
**/

var picturePreviewClickHandler = function (event) {
  renderBigPicture(event.target);
  addBigPictureComments();
  document.addEventListener('keyup', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeBigPicture();
    }
  });
  var bigPictureCanel = document.querySelector('.big-picture__cancel');
  bigPictureCanel.addEventListener('click', closeBigPicture);
};

var picturesPreviewList = document.querySelectorAll('.picture');
var picturesListener = function () {
  for (var i = 0; i < picturesPreviewList.length; i++) {
    picturesPreviewList[i].addEventListener('click', picturePreviewClickHandler);

  }
};
picturesListener();

/*
* масштаб превью
**/
var scaleSmallerControl = document.querySelector('.scale__control--smaller');
var scaleBiggerControl = document.querySelector('.scale__control--bigger');
document.querySelector('.scale__control--value').value = '100%'; //  дефолт зума 100%, подумать как улучшить

var scaleValueChangeHandler = function (value) {
  imgUploadPreview.style.transform = 'scale(' + parseInt(value, 10) / 100 + ')';
};

var scaleControlClickHandler = function () {
  var scaleControlValue = document.querySelector('.scale__control--value').value;
  var controlValueInt = parseInt(scaleControlValue, 10);
  if (event.target === scaleSmallerControl && controlValueInt > 0) {
    controlValueInt -= 25;
  } else if (event.target === scaleBiggerControl && controlValueInt < 100) {
    controlValueInt += 25;
  }
  document.querySelector('.scale__control--value').value = controlValueInt + '%';
  scaleValueChangeHandler(controlValueInt);
};

scaleSmallerControl.addEventListener('click', scaleControlClickHandler);
scaleBiggerControl.addEventListener('click', scaleControlClickHandler);


/*
* фильтры
**/


var imgUploadPreview = document.querySelector('.img-upload__preview');
var pic = imgUploadPreview.firstElementChild;
var effectsItemClickHandler = function () {
  var effectClassName = 'effects__preview--' + event.target.value;
  pic.className = '';
  pic.style = '';
  pic.classList.add(effectClassName);
};

var effectsList = document.querySelectorAll('.effects__item');
var effectsListener = function () {
  for (var i = 0; i < effectsList.length; i++) {
    effectsList[i].addEventListener('click', effectsItemClickHandler);
  }
};
effectsListener();

/*
* Расчет глубины фильтров
**/

var filterPin = document.querySelector('.effect-level__pin');

var calculateEffectDepth = function () {
  var pinLineWidth = document.querySelector('.effect-level__line').offsetWidth;
  var pinPosition = document.querySelector('.effect-level__pin').offsetLeft;
  var effectDepth = (pinPosition * 100) / pinLineWidth;
  return effectDepth / 100;
};
var effectLevelPinMouseUpHandler = function () {
  pic.style.filter = 'grayscale(' + calculateEffectDepth() + ')';
};


filterPin.addEventListener('mouseup', effectLevelPinMouseUpHandler);

/*
* Валидация форм
**/
var hashtagsInput = document.querySelector('.text__hashtags');

var makeHashtagValidation = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i][0] !== '#') {
      return 'Хеш тег должен начинаться символом #';
    } else if (arr[i].length > MAX_HASHTAG_LENGTH) {
      return 'Длина хеш тега не должна превышать ' + MAX_HASHTAG_LENGTH + ' ';
    } else if (arr.length > MAX_HASHTAG_COUNT) {
      return 'Хеш тегов не может быть больше ' + MAX_HASHTAG_COUNT;
    }
  }
  return true;
};

var hashTagsInputHandler = function (evt) {
  var hashArr = [];
  hashArr.push(hashtagsInput.value.split(' '));
  // var validity = hashTagsInputHandler.validity;
  if (makeHashtagValidation(hashArr)) {
    evt.target.setCustomValidity(makeHashtagValidation(hashArr));
  }
};
hashtagsInput.addEventListener('input', hashTagsInputHandler);
