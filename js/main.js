'use strict';

(function () {
  const PinSize = {
    WIDTH: 50,
    HEIGHT: 70
  };
  const mapOfPins = document.querySelector(`.map__pins`);
  const map = document.querySelector(`.map`);
  const mainPin = document.querySelector(`.map__pin--main`);
  const fieldsets = document.querySelectorAll(`fieldset`);
  const selects = document.querySelectorAll(`select`);
  const adForm = document.querySelector(`.ad-form`);
  const adAddress = adForm.querySelector(`#address`);

  const changeAccessForElements = function (elements, isneedAccess) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].disabled = !isneedAccess;
    }
  };

  const disablePage = function () {
    changeAccessForElements(fieldsets, false);
    changeAccessForElements(selects, false);

    mainPin.addEventListener(`mousedown`, enablePage);
    mainPin.addEventListener(`keydown`, enablePage);

    adAddress.value = Math.floor(mainPin.offsetLeft + mainPin.offsetWidth / 2) + `, ` + Math.floor(mainPin.offsetTop + mainPin.offsetHeight);
  };

  const enablePage = function (evt) {
    if ((evt.which === 1) || (evt.key === `Enter`)) {
      map.classList.remove(`map--faded`);
      adForm.classList.remove(`ad-form--disabled`);
      changeAccessForElements(fieldsets, true);
      changeAccessForElements(selects, true);

      const similarAds = window.data.getSimilarAds();
      window.map.renderPins(similarAds, mapOfPins);

      adAddress.value = Math.floor(mainPin.offsetLeft + PinSize.WIDTH / 2) + `, ` + Math.floor(mainPin.offsetTop + PinSize.HEIGHT);

      mainPin.removeEventListener(`mousedown`, enablePage);
      mainPin.removeEventListener(`keydown`, enablePage);
    }
  };

  disablePage();
})();
