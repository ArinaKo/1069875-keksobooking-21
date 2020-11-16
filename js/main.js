'use strict';

const TITLE = `Уютное местечко`;
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
// const TYPES_OUTPUT = [`Дворец`, `Квартира`, `Дом`, `Бунгало`];
const CHECK_TIMES = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const DESCRIPTION = `Блаблабла`;
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const NUMBER_OF_ADS = 8;
const PinSize = {
  WIDTH: 50,
  HEIGHT: 70
};
const mapOfPins = document.querySelector(`.map__pins`);
const LimitOfPins = {
  MIN_X: 0,
  MAX_X: mapOfPins.offsetWidth,
  MIN_Y: 130,
  MAX_Y: 630
};

const map = document.querySelector(`.map`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
// const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const adForm = document.querySelector(`.ad-form`);
const adAddress = document.querySelector(`#address`);
const adRooms = document.querySelector(`#room_number`);
const adCapacity = document.querySelector(`#capacity`);
const mainPin = document.querySelector(`.map__pin--main`);
const fieldsets = document.querySelectorAll(`fieldset`);
const selects = document.querySelectorAll(`select`);

const getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomOption = function (options) {
  const i = getRandomNumber(0, options.length - 1);
  return options[i];
};

const getRandomOptions = function (options) {
  const newArray = [];
  newArray.length = getRandomNumber(1, options.length);
  let i = 0;
  while (i < newArray.length) {
    const newElement = getRandomOption(options);
    if (!newArray.includes(newElement)) {
      newArray[i] = newElement;
      i++;
    }
  }
  return newArray;
};
/*
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
*/
const changeAccessForElements = function (elements, isneedAccess) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].disabled = !isneedAccess;
  }
};

const getSimilarAds = function () {
  const ads = [];
  for (let i = 0; i < NUMBER_OF_ADS; i++) {
    const ad = {
      author: {
        avatar: `img/avatars/user0` + (i + 1) + `.png`
      },
      offer: {
        title: TITLE,
        address: getRandomNumber(1, 100) * 10 + `, ` + getRandomNumber(1, 100) * 10,
        price: getRandomNumber(1, 100) * 100,
        type: getRandomOption(TYPES),
        rooms: getRandomNumber(1, 100),
        guests: getRandomNumber(1, 100),
        checkin: getRandomOption(CHECK_TIMES),
        checkout: getRandomOption(CHECK_TIMES),
        features: getRandomOptions(FEATURES),
        description: DESCRIPTION,
        photos: getRandomOptions(PHOTOS)
      },
      location: {
        x: getRandomNumber(LimitOfPins.MIN_X, LimitOfPins.MAX_X),
        y: getRandomNumber(LimitOfPins.MIN_Y, LimitOfPins.MAX_Y)
      }
    };

    ads[i] = ad;
  }
  return ads;
};

const createPin = function (info) {
  const pin = pinTemplate.cloneNode(true);

  pin.style.left = info.location.x - PinSize.WIDTH / 2 + `px`;
  pin.style.top = info.location.y - PinSize.HEIGHT + `px`;

  const avatar = pin.querySelector(`img`);
  avatar.src = info.author.avatar;
  avatar.alt = info.offer.title;

  return pin;
};

const renderPins = function (pins, place) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < pins.length; i++) {
    fragment.appendChild(createPin(pins[i]));
  }

  place.appendChild(fragment);
};
/*
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

  addTextData(cardTitle, info.offer.title);
  addTextData(cardAddres, info.offer.address);
  addTextData(cardPrice, info.offer.price, info.offer.price + `₽/ночь`);
  addTextData(cardType, info.offer.type, TYPES_OUTPUT[TYPES.indexOf(info.offer.type)]);
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

  return card;
};
*/
const disablePage = function () {
  changeAccessForElements(fieldsets, false);
  changeAccessForElements(selects, false);

  adAddress.value = Math.floor(mainPin.offsetLeft + mainPin.offsetWidth / 2) + `, ` + Math.floor(mainPin.offsetTop + mainPin.offsetHeight);
};

const enablePage = function () {
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  changeAccessForElements(fieldsets, true);
  changeAccessForElements(selects, true);

  const similarAds = getSimilarAds();
  renderPins(similarAds, mapOfPins);

  adAddress.value = Math.floor(mainPin.offsetLeft + PinSize.WIDTH / 2) + `, ` + Math.floor(mainPin.offsetTop + PinSize.HEIGHT);
};

mainPin.addEventListener(`mousedown`, function (evt) {
  if (evt.which === 1) {
    enablePage();
  }
});

mainPin.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    enablePage();
  }
});

const isCapacityValid = function () {
  const selRoomsOption = Number(adRooms.value);
  const selCapacity = Number(adCapacity.value);
  if (selCapacity !== 0 && selCapacity > selRoomsOption) {
    adCapacity.setCustomValidity(`Количество гостей не должно превышать количество комнат.`);
    adCapacity.reportValidity();
  } else if (selCapacity !== 0 && selRoomsOption === 100) {
    adCapacity.setCustomValidity(`Жилье со 100 комнатами не предназначено для гостей.`);
    adCapacity.reportValidity();
  } else if (selCapacity === 0 && selRoomsOption !== 100) {
    adCapacity.setCustomValidity(`Пригласите гостей.`);
    adCapacity.reportValidity();
  } else {
    adCapacity.setCustomValidity(``);
  }
};

adCapacity.addEventListener(`change`, function () {
  isCapacityValid();
});

adRooms.addEventListener(`change`, function () {
  isCapacityValid();
});

disablePage();

// const fragment = document.createDocumentFragment();
// fragment.appendChild(createCard(similarAds[0]));
// document.querySelector(`.map`).insertBefore(fragment, document.querySelector(`.map__filters-container`));
