'use strict';

(function () {
  const map = document.querySelector(`.map`);

  const renderPins = function (pins, place) {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < pins.length; i++) {
      fragment.appendChild(window.pin.createPin(pins[i]));
    }

    place.appendChild(fragment);
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
    renderCard,
    closePopup,
    onPopupEscPress
  };

})();
