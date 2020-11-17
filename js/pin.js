'use strict';

(function () {
  const PinSize = {
    WIDTH: 50,
    HEIGHT: 70
  };
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  const createPin = function (info) {
    const pin = pinTemplate.cloneNode(true);
    if (info.offer) {
      pin.style.left = info.location.x - PinSize.WIDTH / 2 + `px`;
      pin.style.top = info.location.y - PinSize.HEIGHT + `px`;

      const avatar = pin.querySelector(`img`);
      avatar.src = info.author.avatar;
      avatar.alt = info.offer.title;

      pin.addEventListener(`click`, function () {
        window.map.renderCard(info);
      });

      pin.addEventListener(`keydown`, function (evt) {
        if (evt.key === `Enter`) {
          window.map.renderCard(info);
        }
      });

    } else {
      pin.setAttribute(`hidden`, true);
    }

    return pin;
  };

  window.pin = {
    createPin
  };

})();
