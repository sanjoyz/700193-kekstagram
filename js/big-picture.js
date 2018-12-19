'use strict';
(function () {
  var AVATAR_RANDOM_USER_WIDTH = 35;
  var AVATAR_RANDOM_USER_HEIGHT = 35;
  var DEFAULT_SHOW_COMMENTS = 5;

  var closeBigPicture = document.querySelector('.big-picture__cancel');
  var bigPictureElement = document.querySelector('.big-picture');
  var showMoreCommentsElement = bigPictureElement.querySelector('.comments-loader');
  var commentsMessageElement = bigPictureElement.querySelector('.social__comment-count');
  var commentsElement = document.querySelector('.social__comments');

  var insertCommentListElement = function (elem) {
    commentsElement.appendChild(getCommentListElement(elem));
  };

  var getCommentListElement = function (elem) {
    var commentsListElement = document.createDocumentFragment();
    while (commentsElement.children.length > 0) {
      commentsElement.removeChild(commentsElement.lastChild);
    }
    for (var i = 0; i < elem.comments.length; i++) {
      var listItemElement = createElement('li', 'social__comment');
      var imgElement = createImgElement('social__picture', elem.comments[i]);
      var pElement = createElement('p', 'social__text', elem.comments[i].message);
      listItemElement.appendChild(imgElement);
      listItemElement.appendChild(pElement);

      if (i >= DEFAULT_SHOW_COMMENTS) {
        listItemElement.classList.add('visually-hidden');
      }
      commentsListElement.appendChild(listItemElement);
    }
    return commentsListElement;
  };

  var createElement = function (tag, className, text) {
    var someElement = document.createElement(tag);
    someElement.classList.add(className);

    if (text) {
      someElement.textContent = text;
    }
    return someElement;
  };

  var createImgElement = function (className, commentObject) {
    var someImgElement = createElement('img', className);
    someImgElement.src = commentObject.avatar;
    someImgElement.alt = commentObject.name;
    someImgElement.width = AVATAR_RANDOM_USER_WIDTH;
    someImgElement.height = AVATAR_RANDOM_USER_HEIGHT;
    return someImgElement;
  };

  var changeShownComments = function (commentsShow) {
    var textElement = commentsMessageElement.childNodes[0];
    var message = textElement.textContent;
    var messageChanged = message.split(' ');
    messageChanged.shift();
    messageChanged.unshift(commentsShow);
    message = messageChanged.join(' ');
    textElement.textContent = message;
  };

  var renderBigPicture = function (elem) {
    var alt = 'Фото пользователя';
    var socialCaptionElement = bigPictureElement.querySelector('.social__caption');

    bigPictureElement.classList.remove('hidden');
    bigPictureElement.querySelector('.big-picture__img img').src = elem.url;
    bigPictureElement.querySelector('.big-picture__img img').alt = alt;
    bigPictureElement.querySelector('.likes-count').textContent = elem.likes.toString();
    bigPictureElement.querySelector('.comments-count').textContent = elem.comments.length.toString();
    insertCommentListElement(elem);
    socialCaptionElement.textContent = elem.description;

    var commentListElement = bigPictureElement.querySelectorAll('.social__comment');

    if (commentListElement.length <= DEFAULT_SHOW_COMMENTS) {
      changeShownComments(commentListElement.length);
      showMoreCommentsElement.classList.add('visually-hidden');
    } else {
      changeShownComments(DEFAULT_SHOW_COMMENTS);
      if (showMoreCommentsElement.classList.contains('visually-hidden')) {
        showMoreCommentsElement.classList.remove('visually-hidden');
      }
    }
    showMoreCommentsElement.addEventListener('click', showMoreClickHandler);
    closeBigPicture.addEventListener('click', closeBigPictureHandler);
    window.addEventListener('keydown', closeBigPictureHandler);
  };

  var closeBigPictureHandler = function (evt) {
    if (window.utility.isEscEvent(evt) || evt.type === 'click') {
      bigPictureElement.classList.add('hidden');
      showMoreCommentsElement.removeEventListener('click', showMoreClickHandler);
      closeBigPicture.removeEventListener('click', closeBigPictureHandler);
      window.removeEventListener('keydown', closeBigPictureHandler);
    }
  };

  var showMoreClickHandler = function () {
    var hiddenCommentsElement = bigPictureElement.querySelectorAll('li.visually-hidden');
    var i = DEFAULT_SHOW_COMMENTS;
    var hiddenComments = hiddenCommentsElement.length;

    while (i && hiddenComments) {
      bigPictureElement.querySelector('li.visually-hidden').classList.remove('visually-hidden');
      i--;
      hiddenComments--;
    }
    if (!hiddenComments) {
      showMoreCommentsElement.classList.add('visually-hidden');
    }
    var visibleComments = bigPictureElement.querySelectorAll('.social__comment').length - hiddenComments;
    changeShownComments(visibleComments);
  };

  window.bigPicture = {
    render: renderBigPicture
  };
})();
