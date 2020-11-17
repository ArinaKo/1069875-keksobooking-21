'use strict';

(function () {
  const map = document.querySelector(`.map`);
  const mainPin = document.querySelector(`.map__pin--main`);
  const fieldsets = document.querySelectorAll(`fieldset`);
  const selects = document.querySelectorAll(`select`);
  const adForm = document.querySelector(`.ad-form`);
  const adAddress = adForm.querySelector(`#address`);

  const disablePage = function () {
    window.util.changeAccessForElements(fieldsets, false);
    window.util.changeAccessForElements(selects, false);

    mainPin.removeEventListener(`mousedown`, window.moveScript.movePin);

    mainPin.addEventListener(`mousedown`, enablePage);
    mainPin.addEventListener(`keydown`, enablePage);

    adAddress.value = Math.floor(mainPin.offsetLeft + mainPin.offsetWidth / 2) + `, ` + Math.floor(mainPin.offsetTop + mainPin.offsetHeight / 2);
  };

  const enablePage = function (evt) {
    if ((evt.which === 1) || (evt.key === `Enter`)) {
      map.classList.remove(`map--faded`);
      adForm.classList.remove(`ad-form--disabled`);
      window.util.changeAccessForElements(fieldsets, true);
      window.util.changeAccessForElements(selects, true);

      window.load.loadData(window.map.renderPins, window.load.errorMessage);

      window.util.changeAddress();

      mainPin.removeEventListener(`mousedown`, enablePage);
      mainPin.removeEventListener(`keydown`, enablePage);

      mainPin.addEventListener(`mousedown`, window.moveScript.movePin);
    }
  };

  disablePage();
})();
