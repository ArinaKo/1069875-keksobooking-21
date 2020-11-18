'use strict';

(function () {

  const map = document.querySelector(`.map`);
  const mainPin = document.querySelector(`.map__pin--main`);
  const adForm = document.querySelector(`.ad-form`);
  const adAddress = adForm.querySelector(`#address`);
  const formFieldsets = adForm.querySelectorAll(`fieldset`);

  const filterOfAds = document.querySelector(`.map__filters`);
  const filterSelects = filterOfAds.querySelectorAll(`select`);
  const filterFieldsets = filterOfAds.querySelectorAll(`fieldset`);

  const disablePage = function () {
    map.classList.add(`map--faded`);
    adForm.classList.add(`ad-form--disabled`);
    window.util.changeAccessForElements(formFieldsets, false);
    window.util.changeAccessForElements(filterFieldsets, false);
    window.util.changeAccessForElements(filterSelects, false);

    window.map.deletePins();
    window.map.closePopup();

    window.util.resetMainPinPosition();
    adForm.reset();
    filterOfAds.reset();

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
    window.util.changeAccessForElements(formFieldsets, true);

    window.server(``, window.data.loadingCompleted, window.messages.loadError);

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
