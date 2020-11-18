'use strict';

(function () {

  const map = document.querySelector(`.map`);
  const mainPin = document.querySelector(`.map__pin--main`);
  const fieldsets = document.querySelectorAll(`fieldset`);
  const selects = document.querySelectorAll(`select`);
  const adForm = document.querySelector(`.ad-form`);
  const adAddress = adForm.querySelector(`#address`);

  const disablePage = function () {
    map.classList.add(`map--faded`);
    adForm.classList.add(`ad-form--disabled`);
    window.util.changeAccessForElements(fieldsets, false);
    window.util.changeAccessForElements(selects, false);

    window.map.deletePins();
    window.map.closePopup();

    window.util.resetMainPinPosition();

    mainPin.removeEventListener(`mousedown`, window.moveScript.movePin);

    mainPin.addEventListener(`mousedown`, onMainPinMousedown);
    mainPin.addEventListener(`keydown`, onMainPinKeydown);

    adAddress.value = Math.floor(mainPin.offsetLeft + mainPin.offsetWidth / 2) + `, ` + Math.floor(mainPin.offsetTop + mainPin.offsetHeight / 2);
  };

  const onMainPinMousedown = function (evt) {
    if (evt.which === 1) {
      enablePage();
    }
  };

  const onMainPinKeydown = function (evt) {
    if (evt.key === `Enter`) {
      enablePage();
    }
  };

  const enablePage = function () {
    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);
    window.util.changeAccessForElements(fieldsets, true);
    window.util.changeAccessForElements(selects, true);

    window.server(``, window.map.renderPins, window.messages.loadError);

    window.util.changeAddress();

    mainPin.removeEventListener(`mousedown`, enablePage);
    mainPin.removeEventListener(`keydown`, enablePage);

    mainPin.addEventListener(`mousedown`, window.moveScript.movePin);
  };

  disablePage();

  window.main = {
    disablePage
  };

})();
