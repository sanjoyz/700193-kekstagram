'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var isEscEvent = function (evt) {
    return evt.keyCode === ESC_KEYCODE;
  };

  var getRandomNumber = function (min, max) {
    return Math.round(min + Math.random() * (max - min));
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
      if (target.classList.contains('error__button') || target.classList.contains('success__button') || evt.keyCode === ESC_KEYCODE) {
        messageContainer.removeEventListener('click', hideMessage);
        document.addEventListener('click', hideMessage);
        messageContainer.parentElement.removeChild(messageContainer);
      }
    };

    messageButton.addEventListener('click', hideMessage);
    document.addEventListener('click', hideMessage);

  };

  var shuffleArray = function (array) {
    var copy = array.slice(0);
    for (var i = copy.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = copy[i];
      copy[i] = copy[j];
      copy[j] = temp;
    }
    return copy;
  };

  window.utility = {
    isEscEvent: isEscEvent,
    getRandomNumber: getRandomNumber,
    createMessage: createMessage,
    shuffleArray: shuffleArray
  };
})();
