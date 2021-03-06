'use strict';
(function () {
  var DEFAULT_FILTER_PIN_POSITION = '100%';
  var MAX_HASHTAG_LENGTH = 20;
  var MAX_HASHTAG_COUNT = 5;
  var SCALE_STEP = 25;
  var MAX_SCALE_VALUE = 100;
  var HASHTAG_INVALID_COLOR = '#f45f42';
  var ARROW_RIGHT_KEY_CODE = 39;
  var ARROW_LEFT_KEY_CODE = 37;

  // Загрузка фотографий
  var commentTextArea = document.querySelector('.text__description');
  var hashtagsInput = document.querySelector('.text__hashtags');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var buttonUploadCanel = imgUploadOverlay.querySelector('#upload-cancel');
  var uploadFileField = document.querySelector('#upload-file');
  var form = document.querySelector('.img-upload__form');

  var openPopup = function () {
    imgUploadOverlay.classList.remove('hidden');
    imgUploadEffectLevel.classList.add('hidden');
    document.querySelector('.scale__control--value').value = '100%';
    imgUploadPreview.style.transform = 'scale(1)';
    buttonUploadCanel.addEventListener('click', closePopup);
    filterPin.addEventListener('keydown', filterPinKeyDownHandler);
  };

  var closePopup = function () {
    imgUploadOverlay.classList.add('hidden');
    uploadFileField.value = '';
    imgUploadPreview.firstElementChild.className = '';
    imgUploadPreview.firstElementChild.removeAttribute('style');
    buttonUploadCanel.removeEventListener('click', closePopup);
    filterPin.removeEventListener('keydown', filterPinKeyDownHandler);
    commentTextArea.value = '';
    hashtagsInput.value = '';
    hashtagsInput.setCustomValidity('');
    hashtagsInput.removeAttribute('style');
  };

  uploadFileField.addEventListener('change', openPopup);

  window.addEventListener('keyup', function (event) {
    if (window.utility.isEscEvent(event)
    && document.activeElement !== commentTextArea
    && document.activeElement !== hashtagsInput) {
      closePopup();
    }
  });

  // Валидация форм
  var makeHashtagValidation = function (arr, target) {
    var outlineColorChanger = function (color) {
      target.style.outline = '1px solid' + color;
    };

    var validityMessage;
    arr.forEach(function (elem, i) {
      if (elem[0] !== '#' && elem !== '') {
        outlineColorChanger(HASHTAG_INVALID_COLOR);
        validityMessage = 'Хеш тег должен начинаться символом #';
      } else if (elem.length > MAX_HASHTAG_LENGTH) {
        outlineColorChanger(HASHTAG_INVALID_COLOR);
        validityMessage = 'Длина хеш тега не должна превышать ' + MAX_HASHTAG_LENGTH + ' ';
      } else if (arr.length > MAX_HASHTAG_COUNT) {
        outlineColorChanger(HASHTAG_INVALID_COLOR);
        validityMessage = 'Хеш тегов не может быть больше ' + MAX_HASHTAG_COUNT;
      } else if (elem === '#' && elem.length < 2) {
        outlineColorChanger(HASHTAG_INVALID_COLOR);
        validityMessage = 'Хеш тег не может состоять из одной решётки';
      }
      for (var j = i + 1; j < arr.length; j++) {
        if (elem.toUpperCase() === arr[j].toUpperCase()) {
          outlineColorChanger(HASHTAG_INVALID_COLOR);
          validityMessage = 'Один и тот же хеш-тег не может быть использован дважды';
        }
      }
    });
    return validityMessage;
  };

  var hashTagsInputHandler = function (evt) {
    var hashArr = hashtagsInput.value.trim().replace(/\s+/g, ' ').split(' ');
    var target = evt.target;
    if (makeHashtagValidation(hashArr, target)) {
      target.setCustomValidity(makeHashtagValidation(hashArr, target));
    } else {
      target.setCustomValidity('');
      target.removeAttribute('style');
    }
  };
  hashtagsInput.addEventListener('input', hashTagsInputHandler);

  // Масштаб превью
  var scaleSmallerControl = document.querySelector('.scale__control--smaller');
  var scaleBiggerControl = document.querySelector('.scale__control--bigger');

  var scaleValueChangeHandler = function (value) {
    imgUploadPreview.style.transform = 'scale(' + parseInt(value, 10) / 100 + ')';
  };

  var scaleControlClickHandler = function () {
    var scaleControlValue = document.querySelector('.scale__control--value').value;
    var controlValueInt = parseInt(scaleControlValue, 10);
    if (event.target === scaleSmallerControl && controlValueInt > SCALE_STEP) {
      controlValueInt -= SCALE_STEP;
    } else if (event.target === scaleBiggerControl && controlValueInt < MAX_SCALE_VALUE) {
      controlValueInt += SCALE_STEP;
    }
    document.querySelector('.scale__control--value').value = controlValueInt + '%';
    scaleValueChangeHandler(controlValueInt);
  };
  scaleSmallerControl.addEventListener('click', scaleControlClickHandler);
  scaleBiggerControl.addEventListener('click', scaleControlClickHandler);

  // Движение слайдера эффектов
  var filterPin = document.querySelector('.effect-level__pin');
  var pinLine = document.querySelector('.effect-level__line');
  var effectLevelDepth = document.querySelector('.effect-level__depth');

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
      document.removeEventListener('mousemove', filterPinMouseMoveHandler);
      document.removeEventListener('mouseup', filterPinMouseUpHandler);
    };
    document.addEventListener('mousemove', filterPinMouseMoveHandler);
    document.addEventListener('mouseup', filterPinMouseUpHandler);
  });

  var filterPinKeyDownHandler = function (evt) {
    var shift = 7;
    if (evt.keyCode === ARROW_RIGHT_KEY_CODE) {
      shift = -shift;
    } else if (evt.keyCode === ARROW_LEFT_KEY_CODE) {
      shift = +shift;
    }
    if ((filterPin.offsetLeft - shift) > 0 && (filterPin.offsetLeft - shift) < pinLine.offsetWidth) {
      filterPin.style.left = (filterPin.offsetLeft - shift) + 'px';
    }
    effectLevelDepth.style.width = filterPin.style.left;
    var ratio = calculateEffectDepth();
    effectLevelChanger(ratio);
  };

  // Фильтры
  var effectClassName;
  var imgUploadPreview = document.querySelector('.img-upload__preview');
  var pic = imgUploadPreview.firstElementChild;
  var imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
  var effectsItemClickHandler = function (evt) {
    imgUploadEffectLevel.classList.remove('hidden');
    effectClassName = 'effects__preview--' + evt.target.value;
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
    effectsList.forEach(function (effect) {
      effect.addEventListener('click', effectsItemClickHandler);
    });
  };
  effectsListener();

  // Расчет глубины фильтров
  var calculateEffectDepth = function () {
    var pinPosition = filterPin.offsetLeft;
    var effectDepth = (pinPosition * 100) / pinLine.offsetWidth;
    return effectDepth / 100;
  };

  var effectLevelChanger = function (ratio) {
    switch (effectClassName) {
      case 'effects__preview--chrome':
        pic.style.filter = 'grayscale(' + ratio + ')';
        break;
      case 'effects__preview--sepia':
        pic.style.filter = 'sepia(' + ratio + ')';
        break;
      case 'effects__preview--marvin':
        pic.style.filter = 'invert(' + ratio * 100 + '%)';
        break;
      case 'effects__preview--phobos':
        pic.style.filter = 'blur(' + ratio * 3 + 'px)';
        break;
      case 'effects__preview--heat':
        pic.style.filter = 'brightness(' + (ratio * 2) + 1 + ')';
        break;
    }
  };

  // Работа с отправкой формы
  var formRestoreDefault = function () {
    var file = document.querySelector('#upload-file');
    file.value = '';
    commentTextArea.value = '';
    hashtagsInput.value = '';
  };

  var formUploadSuccessHandler = function () {
    var uploadImg = imgUploadPreview.firstElementChild;
    uploadImg.style = '';
    uploadImg.classList = '';
    imgUploadOverlay.classList.add('hidden');
    formRestoreDefault();
    window.utility.createMessage('success', 'Загрузка успешна');
  };

  var formUploadErrorHandler = function () {
    closePopup();
    window.utility.createMessage('error', 'Ошибка загрузки');
  };

  // Отображение загружаемой фотографии в превью
  var fileInput = document.querySelector('#upload-file');
  fileInput.addEventListener('change', function () {
    var file = fileInput.files[0];
    var fReader = new FileReader();
    fReader.addEventListener('load', function () {
      imgUploadPreview.firstElementChild.src = fReader.result;
    });
    fReader.readAsDataURL(file);
  });

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(form), formUploadSuccessHandler, formUploadErrorHandler);
  });
})();
