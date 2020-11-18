'use strict';

(function () {

  const map = document.querySelector(`.map`);
  const mapOfPins = map.querySelector(`.map__pins`);
  const NUMBER_OF_ADS = 5;

  const renderPins = function (data) {
    const fragment = document.createDocumentFragment();

    const pins = data.filter(function (ad) {
      return ad.offer;
    });

    let count = NUMBER_OF_ADS;

    if (pins.length < count) {
      count = pins.length;
    }

    for (let i = 0; i < count; i++) {
      fragment.appendChild(window.pin.createPin(pins[i]));
    }

    mapOfPins.appendChild(fragment);
  };

  const deletePins = function () {
    const pins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    for (let i = 0; i < pins.length; i++) {
      pins[i].remove();
    }
  };

  const renderCard = function (info) {
    closePopup();
    const card = window.card.createCard(info);
    map.insertBefore(card, document.querySelector(`.map__filters-container`));
  };

  const closePopup = function () {
    const popup = document.querySelector(`.popup`);
    if (popup) {
      popup.remove();
    }
  };

  const onPopupEscPress = function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closePopup();
    }
  };

  window.map = {
    renderPins,
    deletePins,
    renderCard,
    closePopup,
    onPopupEscPress
  };

})();
