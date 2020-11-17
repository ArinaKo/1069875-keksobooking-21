'use strict';

(function () {
  const TITLE = `Уютное местечко`;
  const TYPES = [`palace`, `flat`, `house`, `bungalow`];
  const CHECK_TIMES = [`12:00`, `13:00`, `14:00`];
  const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const DESCRIPTION = `Блаблабла`;
  const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
  const NUMBER_OF_ADS = 8;
  const mapOfPins = document.querySelector(`.map__pins`);
  const LimitOfPins = {
    MIN_X: 0,
    MAX_X: mapOfPins.offsetWidth,
    MIN_Y: 130,
    MAX_Y: 630
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
          address: window.util.getRandomNumber(1, 100) * 10 + `, ` + window.util.getRandomNumber(1, 100) * 10,
          price: window.util.getRandomNumber(1, 100) * 100,
          type: window.util.getRandomOption(TYPES),
          rooms: window.util.getRandomNumber(1, 100),
          guests: window.util.getRandomNumber(1, 100),
          checkin: window.util.getRandomOption(CHECK_TIMES),
          checkout: window.util.getRandomOption(CHECK_TIMES),
          features: window.util.getRandomOptions(FEATURES),
          description: DESCRIPTION,
          photos: window.util.getRandomOptions(PHOTOS)
        },
        location: {
          x: window.util.getRandomNumber(LimitOfPins.MIN_X, LimitOfPins.MAX_X),
          y: window.util.getRandomNumber(LimitOfPins.MIN_Y, LimitOfPins.MAX_Y)
        }
      };

      ads[i] = ad;
    }
    return ads;
  };

  window.data = {
    getSimilarAds
  };

})();
