'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var isEscEvent = function (evt) {
    return evt.keyCode === ESC_KEYCODE;
  };

  var getRandomNumber = function (min, max) {
    return Math.round(min + Math.random() * (max - min));
  };
  window.utility = {
    isEscEvent: isEscEvent,
    getRandomNumber: getRandomNumber
  };
})();
