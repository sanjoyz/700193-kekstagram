'use strict';
(function () {

  var renderBigPicture = function (photo) {
    var bigPictureContainer = document.querySelector('.big-picture');
    bigPictureContainer.classList.remove('hidden');
    var bigPictureImg = document.querySelector('.big-picture__img').firstElementChild;
    for (var i = 0; i < photo.length; i++) {
      bigPictureImg.src = photo[i].url;
      var bigPictureLikes = document.querySelector('.likes-count');
      bigPictureLikes.textContent = photo[i].likes;
      var bigPictureCommentsCount = document.querySelector('.comments-count');
      bigPictureCommentsCount.textContent = photo[i].comments.length.toString();
    }

    var renderBigPictureComments = function (text) {
      var commentsTemplate = document.querySelector('#big-comments').content;
      var commentItemTemplate = commentsTemplate.querySelector('.social__comment');
      var commentItem = commentItemTemplate.cloneNode(true);
      var commentItemText = commentItem.querySelector('.social__text');
      commentItemText.textContent = text;
      var commentBigPictureUserAvatar = commentItem.querySelector('.social__picture');
      commentBigPictureUserAvatar.src = photo.comments.avatar;
      return commentItem;
    };
    var addBigPictureComments = function () {
      var fragment = document.createDocumentFragment();
      for (var j = 0; j < photo.comments.length; j++) {
        var comment = renderBigPictureComments(photo.comments[j].message);
        fragment.appendChild(comment);
      }
      var commentsList = document.querySelector('.social__comments');
      commentsList.appendChild(fragment);
    };
  };


  var closeBigPicture = function () {
    var bigOverlay = document.querySelector('.big-picture.overlay');
    bigOverlay.classList.add('hidden');
  };

  var commentCountBlock = document.querySelector('.social__comment-count');
  var commentLoaderBlock = document.querySelector('.comments-loader');
  commentCountBlock.classList.add('visually-hidden');
  commentLoaderBlock.classList.add('visually-hidden');

  var picturePreviewClickHandler = function (event) {
    renderBigPicture(event.target);
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

  window.backend.download(renderBigPicture);
  /*
* Показ полноэкранного изображения по клику
**/


})();
