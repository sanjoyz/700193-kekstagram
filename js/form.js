'use strict';
(function () {
  var DEFAULT_FILTER_PIN_POSITION = '100%';
  var MAX_HASHTAG_LENGTH = 20;
  var MAX_HASHTAG_COUNT = 5;
  /*
* Загрузка фотографий
**/
  var commentTextArea = document.querySelector('.text__description');
  var hashtagsInput = document.querySelector('.text__hashtags');
  var editForm = document.querySelector('.img-upload__overlay');
  var buttonUploadCanel = editForm.querySelector('#upload-cancel');
  var uploadFileField = document.querySelector('#upload-file');


  var openPopup = function () {
    editForm.classList.remove('hidden');
    imgUploadEffectLevel.classList.add('hidden');
  };

  var closePopup = function () {
    editForm.classList.add('hidden');
    imgUploadPreview.firstElementChild.className = '';
    uploadFileField.value = '';
  };


  uploadFileField.addEventListener('change', openPopup);
  document.addEventListener('keyup', function () {
    if (window.utility.isEscEvent && document.activeElement !== commentTextArea && document.activeElement !== hashtagsInput) {
      editForm.classList.add('hidden');
      imgUploadPreview.firstElementChild.className = '';
    }
  });
  buttonUploadCanel.addEventListener('click', closePopup);

  /*
* Валидация форм
**/


  var makeHashtagValidation = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][0] !== '#') {
        return 'Хеш тег должен начинаться символом #';
      } else if (arr[i].length > MAX_HASHTAG_LENGTH) {
        return 'Длина хеш тега не должна превышать ' + MAX_HASHTAG_LENGTH + ' ';
      } else if (arr.length > MAX_HASHTAG_COUNT) {
        return 'Хеш тегов не может быть больше ' + MAX_HASHTAG_COUNT;
      } else if (arr[i][0] === '#' && arr[i].length < 2) {
        return 'Хеш тег не может состоять из одной решётки';
      }
      for (var j = i + 1; j < arr.length; j++) {
        if (arr[i].toUpperCase() === arr[j].toUpperCase()) {
          return 'Один и тот же хеш-тег не может быть использован дважды';
        }
      }
    }
    return false;
  };

  var hashTagsInputHandler = function (evt) {
    var hashArr = [];
    hashArr = hashtagsInput.value.split(' ');
    var target = evt.target;
    // var validity = hashTagsInputHandler.validity;
    if (makeHashtagValidation(hashArr)) {
      target.setCustomValidity(makeHashtagValidation(hashArr));
    } else {
      target.setCustomValidity('');
    }
  };
  hashtagsInput.addEventListener('input', hashTagsInputHandler);


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
* Движение слайдера эффектов
**/

  var filterPin = document.querySelector('.effect-level__pin');
  var pinLine = document.querySelector('.effect-level__line');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  // var imgUploadWrapper = document.querySelector('.img-upload__wrapper');

  filterPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startingCoords = {
      x: evt.clientX
    };
    var filterPinMouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startingCoords.x - moveEvt.clientX
      };
      startingCoords = {
        x: moveEvt.clientX
      };
      if ((filterPin.offsetLeft - shift.x) > 0 && (filterPin.offsetLeft - shift.x) < pinLine.offsetWidth) {
        filterPin.style.left = (filterPin.offsetLeft - shift.x) + 'px';
      }
      effectLevelDepth.style.width = filterPin.style.left;
      var ratio = calculateEffectDepth();
      effectLevelChanger(ratio);
    };

    var filterPinMouseUpHandler = function () {
      evt.preventDefault();
      document.removeEventListener('mousemove', filterPinMouseMoveHandler); // filterPin.removeEventListener('mousemove', filterPinMouseMoveHandler); почему так не работает?
      document.removeEventListener('mouseup', filterPinMouseUpHandler);
    };

    document.addEventListener('mousemove', filterPinMouseMoveHandler);
    document.addEventListener('mouseup', filterPinMouseUpHandler);
  });


  /*
* фильтры
**/
  var effectsListMap = {
    'chrome': 'effects__preview--chrome',
    'sepia': 'effects__preview--sepia',
    'marvin': 'effects__preview--marvin',
    'phobos': 'effects__preview--phobos',
    'heat': 'effects__preview--heat'
  };
  var effectClassName;
  var imgUploadPreview = document.querySelector('.img-upload__preview');
  var pic = imgUploadPreview.firstElementChild;
  var imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
  var effectsItemClickHandler = function (evt) {
    imgUploadEffectLevel.classList.remove('hidden');
    effectClassName = effectsListMap[evt.target.value];
    pic.className = '';
    pic.style = '';
    pic.classList.add(effectClassName);
    if (evt.target.value === 'none') {
      imgUploadEffectLevel.classList.add('hidden');
    }
    effectLevelDepth.style.width = DEFAULT_FILTER_PIN_POSITION;
    filterPin.style.left = DEFAULT_FILTER_PIN_POSITION;

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

  var calculateEffectDepth = function () {
    var pinPosition = filterPin.offsetLeft;
    var effectDepth = (pinPosition * 100) / pinLine.offsetWidth;
    return effectDepth / 100;
  };

  var effectLevelChanger = function (ratio) {
    if (effectClassName === 'effects__preview--chrome') {
      pic.style.filter = 'grayscale(' + ratio + ')';
    } else if (effectClassName === 'effects__preview--sepia') {
      pic.style.filter = 'sepia(' + ratio + ')';
    } else if (effectClassName === 'effects__preview--marvin') {
      pic.style.filter = 'invert(' + ratio * 100 + '%)';
    } else if (effectClassName === 'effects__preview--phobos') {
      pic.style.filter = 'blur(' + ratio * 3 + 'px)';
    } else if (effectClassName === 'effects__preview--heat') {
      pic.style.filter = 'brightness(' + (ratio * 2) + 1 + ')';
    }

  };
  var form = document.querySelector('.img-upload__form');
  form.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(form), function () {
      editForm.classList.add('hidden');
    });
    evt.preventDefault();
  });
})();
