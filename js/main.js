'use strict';

const TITLE = `Уютное местечко`;
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
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


map.classList.remove(`map--faded`);

renderPins(getSimilarAds(), mapOfPins);
