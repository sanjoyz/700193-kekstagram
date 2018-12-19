'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var isEscEvent = function (evt) {
    return evt.keyCode === ESC_KEYCODE;
  };

  var getRandomNumber = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  var createMessage = function (status, text) {
    var template = document.querySelector('#' + status);
    var messageContainer = template.content.querySelector('.' + status).cloneNode(true);
    var messageTitle = messageContainer.querySelector('.' + status + '__title');
    messageTitle.textContent = text;
    var messageButton = messageContainer.querySelector('.' + status + '__button');
    document.querySelector('main').appendChild(messageContainer);

    var hideMessage = function (evt) {
      var target = evt.target;
      if (target.classList.contains('error__button') || target.classList.contains('success__button') || isEscEvent(evt)) {
        messageContainer.removeEventListener('click', hideMessage);
        document.addEventListener('click', hideMessage);
        messageContainer.parentElement.removeChild(messageContainer);
      }
    };

    messageButton.addEventListener('click', hideMessage);
    document.addEventListener('click', hideMessage);

  };

  var getRandomArrayElem = function (arr) {
    return arr[getRandomNumber(0, arr.length)];
  };

  window.utility = {
    isEscEvent: isEscEvent,
    getRandomNumber: getRandomNumber,
    createMessage: createMessage,
    getRandomArrayElem: getRandomArrayElem
  };
})();
