'use strict';

(function () {

  var INTERVAL = 500;

  var time;

  var debounce = function (task) {
    if (time) {
      clearTimeout(time);
    }
    time = setTimeout(task, INTERVAL);
  };
  window.debounce = debounce;

})();
