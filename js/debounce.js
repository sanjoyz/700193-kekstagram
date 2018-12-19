'use strict';

(function () {
  var INTERVAL = 500;
  var time;

  window.debounce = function (task) {
    if (time) {
      clearTimeout(time);
    }
    time = setTimeout(task, INTERVAL);
  };
})();
