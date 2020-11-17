'use strict';

(function () {
  const typesOutput = {
    palace: `Дворец`,
    flat: `Квартира`,
    house: `Дом`,
    bungalow: `Бунгало`
  };
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

  const addTextData = function (block, data, string) {
    if (data) {
      let text = data;
      if (string) {
        text = string;
      }
      block.textContent = text;
    } else {
      block.remove();
    }
  };

  const addTwoTextData = function (block, data1, data2, string) {
    if (data1 && data2) {
      block.textContent = string;
    } else {
      block.remove();
    }
  };

  const createCard = function (info) {
    const card = cardTemplate.cloneNode(true);

    const cardTitle = card.querySelector(`.popup__title`);
    const cardAddres = card.querySelector(`.popup__text--address`);
    const cardPrice = card.querySelector(`.popup__text--price`);
    const cardType = card.querySelector(`.popup__type`);
    const cardCapacity = card.querySelector(`.popup__text--capacity`);
    const cardTime = card.querySelector(`.popup__text--time`);
    const cardDescription = card.querySelector(`.popup__description`);
    const cardFeaturesList = card.querySelector(`.popup__features`);
    const cardImagesList = card.querySelector(`.popup__photos`);
    const cardImage = card.querySelector(`.popup__photo`);
    const cardAvatar = card.querySelector(`.popup__avatar`);
    const cardCloseButton = card.querySelector(`.popup__close`);

    addTextData(cardTitle, info.offer.title);
    addTextData(cardAddres, info.offer.address);
    addTextData(cardPrice, info.offer.price, info.offer.price + `₽/ночь`);
    addTextData(cardType, info.offer.type, typesOutput[info.offer.type]);
    addTextData(cardDescription, info.offer.description);
    addTwoTextData(cardCapacity, info.offer.rooms, info.offer.guests, info.offer.rooms + ` комнаты для ` + info.offer.guests + ` гостей`);
    addTwoTextData(cardTime, info.offer.checkin, info.offer.checkout, `Заезд после ` + info.offer.checkin + `, выезд до ` + info.offer.checkout);

    if (info.offer.features.length !== 0) {
      const cardFeatures = cardFeaturesList.querySelectorAll(`.popup__feature`);
      for (let i = 0; i < cardFeatures.length; i++) {
        let isfeatureExist = false;
        for (let j = 0; j < info.offer.features.length; j++) {
          if (cardFeatures[i].classList.contains(`popup__feature--` + info.offer.features[j])) {
            isfeatureExist = true;
          }
        }
        if (isfeatureExist === false) {
          cardFeatures[i].remove();
        }
      }
    } else {
      cardFeaturesList.remove();
    }

    if (info.offer.photos.length !== 0) {
      cardImage.src = info.offer.photos[0];
      for (let i = 1; i < info.offer.photos.length; i++) {
        const newCardImage = cardImage.cloneNode(true);
        newCardImage.src = info.offer.photos[i];
        cardImagesList.appendChild(newCardImage);
      }
    } else {
      cardImagesList.remove();
    }

    if (info.author.avatar) {
      cardAvatar.src = info.author.avatar;
    } else {
      cardAvatar.remove();
    }

    cardCloseButton.addEventListener(`click`, window.map.closePopup);
    document.addEventListener(`keydown`, window.map.onPopupEscPress);

    return card;
  };

  window.card = {
    createCard
  };

})();
