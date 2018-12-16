'use strict';
(function () {

  /*
** Создание дом элементов
*/
  var bigPictureCanel = document.querySelector('.big-picture__cancel');
  var bigPictureContainer = document.querySelector('.big-picture');
  var bigPictureImg = document.querySelector('.big-picture__img').firstElementChild;
  var bigPictureLikes = document.querySelector('.likes-count');
  var bigPictureCommentsCount = document.querySelector('.comments-count');
  var bigPictureCaption = bigPictureContainer.querySelector('.social__caption');

  /*
** renderPicture - принимает объект (фотографию). Наполняет дом элементы исходя из принятых данных
*/
  var renderBigPicture = function (photo) {
    bigPictureContainer.classList.remove('hidden');
    bigPictureImg.src = photo.url;
    bigPictureLikes.textContent = photo.likes;
    bigPictureCommentsCount.textContent = photo.comments.length.toString();
    bigPictureCaption.textContent = photo.description;
    addBigPictureComments(photo);
  };

  var addBigPictureComments = function (photo) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photo.comments.length; i++) {
      var comment = renderBigPictureComments(photo.comments[i]);
      fragment.appendChild(comment);
    }
    var commentsList = document.querySelector('.social__comments');
    commentsList.appendChild(fragment);
  };

  var renderBigPictureComments = function (photoComment) {
    var commentsTemplate = document.querySelector('#big-comments').content;
    var commentItemTemplate = commentsTemplate.querySelector('.social__comment');
    var commentItem = commentItemTemplate.cloneNode(true);
    var commentItemText = commentItem.querySelector('.social__text');
    commentItemText.textContent = photoComment.message;
    var commentBigPictureUserAvatar = commentItem.querySelector('.social__picture');
    commentBigPictureUserAvatar.src = photoComment.avatar;
    return commentItem;
  };


  var closeBigPictureHandler = function () {
    var bigOverlay = document.querySelector('.big-picture.overlay');
    bigOverlay.classList.add('hidden');
    document.addEventListener('keyup', function (evt) {
      if (window.utility.isEscEvent(evt)) {
        closeBigPictureHandler();
      }
    });
  };

  var commentCountBlock = document.querySelector('.social__comment-count');
  var commentLoaderBlock = document.querySelector('.comments-loader');
  commentCountBlock.classList.add('visually-hidden');
  commentLoaderBlock.classList.add('visually-hidden');

  /*
** обработчик нажатия на крестик во время просмотра большой фотографии
*/
  bigPictureCanel.addEventListener('click', closeBigPictureHandler);


  window.bigPicture = {
    renderBigPicture: renderBigPicture
  };

})();
