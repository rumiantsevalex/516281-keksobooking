'use strict';
(function () {
  var MAP_MIN_X = window.MainPinSizes.WIDTH / 2;
  var MAP_MAX_X = 1200 - (window.MainPinSizes.WIDTH / 2);
  var MAP_MIN_Y = 150 - window.MainPinSizes.HEIGHT;
  var MAP_MAX_Y = 500 - window.MainPinSizes.HEIGHT;

  var mainPin = document.querySelector('.map__pin--main');

  window.mainPinCoords = {
    x: mainPin.offsetLeft,
    y: mainPin.offsetTop
  };

  window.activatePinDragging = function () {
    mainPin.querySelector('img').setAttribute('draggable', 'true');

    window.setMainPinAddress = function (x, y) {
      window.FormFields.ADDRESS.value = x + ', ' + y;
      window.FormFields.ADDRESS.setAttribute('disabled', 'true');
    };

    mainPin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      window.startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var mouseMoveHandler = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: window.startCoords.x - moveEvt.clientX,
          y: window.startCoords.y - moveEvt.clientY
        };

        window.startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        window.mainPinCoords = {
          x: mainPin.offsetLeft - shift.x,
          y: mainPin.offsetTop - shift.y
        };

        // Ограничим область установки пина
        if (window.mainPinCoords.x > MAP_MAX_X) {
          window.mainPinCoords.x = MAP_MAX_X;
        }
        if (window.mainPinCoords.y > MAP_MAX_Y) {
          window.mainPinCoords.y = MAP_MAX_Y;
        }
        if (window.mainPinCoords.x < MAP_MIN_X) {
          window.mainPinCoords.x = MAP_MIN_X;
        }
        if (window.mainPinCoords.y < MAP_MIN_Y) {
          window.mainPinCoords.y = MAP_MIN_Y;
        }


        mainPin.style.left = window.mainPinCoords.x + 'px';
        mainPin.style.top = window.mainPinCoords.y + 'px';

        window.setMainPinAddress(window.mainPinCoords.x + window.MainPinSizes.WIDTH / 2, window.mainPinCoords.y + window.MainPinSizes.HEIGHT);

      };

      var mouseUpHandler = function (upEvt) {
        upEvt.preventDefault();
        window.setMainPinAddress(window.mainPinCoords.x + window.MainPinSizes.WIDTH / 2, window.mainPinCoords.y + window.MainPinSizes.HEIGHT);
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
      };
      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    });
  };
})();
