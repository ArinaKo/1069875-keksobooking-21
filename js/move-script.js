'use strict';

(function () {

  const pin = document.querySelector(`.map__pin--main`);
  const map = document.querySelector(`.map__pins`);

  const PIN_WIDTH = 65;

  const MOVE_LIMIT_Y = {
    min: 130,
    max: 630
  };
  const MOVE_LIMIT_X = {
    min: map.offsetLeft - Math.floor(PIN_WIDTH / 2),
    max: map.clientWidth - Math.floor(PIN_WIDTH / 2)
  };

  const checkLimit = function (data, limit) {
    if (data < limit.min) {
      return limit.min;
    } else if (data > limit.max) {
      return limit.max;
    } else {
      return data;
    }
  };

  const movePin = function (evt) {
    evt.preventDefault();

    let startLocation = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      const shift = {
        x: startLocation.x - moveEvt.clientX,
        y: startLocation.y - moveEvt.clientY,
      };

      startLocation = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pin.style.top = checkLimit(pin.offsetTop - shift.y, MOVE_LIMIT_Y) + `px`;
      pin.style.left = checkLimit(pin.offsetLeft - shift.x, MOVE_LIMIT_X) + `px`;
      window.util.changeAddress();
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  };

  window.moveScript = {
    movePin
  };

})();
