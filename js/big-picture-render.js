'use strict';
(function () {
  var USER_AVATAR_MIN_ID = 1;
  var USER_AVATAR_MAX_ID = 6;
  var photos = [];
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
    commentBigPictureUserAvatar.src = 'img/avatar-' + window.utility.getRandomNumber(USER_AVATAR_MIN_ID, USER_AVATAR_MAX_ID) + '.svg';
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
* Показ полноэкранного изображения по клику
**/

  var picturePreviewClickHandler = function (event) {
    renderBigPicture(event.target);
    addBigPictureComments();
    document.addEventListener('keyup', function (evt) {
      if (window.utility.isEscEvent(evt)) {
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
})();
