'use strict';

(function () {

  const filterOfAds = document.querySelector(`.map__filters`);
  const filterSelects = filterOfAds.querySelectorAll(`select`);
  const filterFieldsets = filterOfAds.querySelectorAll(`fieldset`);
  const typeFilter = filterOfAds.querySelector(`#housing-type`);
  const roomsFilter = filterOfAds.querySelector(`#housing-rooms`);
  const guestsFilter = filterOfAds.querySelector(`#housing-guests`);
  const priceFilter = filterOfAds.querySelector(`#housing-price`);
  const wifiFilter = filterOfAds.querySelector(`#filter-wifi`);
  const dishwasherFilter = filterOfAds.querySelector(`#filter-dishwasher`);
  const parkingFilter = filterOfAds.querySelector(`#filter-parking`);
  const washerFilter = filterOfAds.querySelector(`#filter-washer`);
  const elevatorFilter = filterOfAds.querySelector(`#filter-elevator`);
  const conditionerFilter = filterOfAds.querySelector(`#filter-conditioner`);

  let ads = [];
  let typeValue = `any`;
  let roomsValue = `any`;
  let guestsValue = `any`;
  let priceValue = `any`;
  let wifiValue = false;
  let dishwasherValue = false;
  let parkingValue = false;
  let washerValue = false;
  let elevatorValue = false;
  let conditionerValue = false;

  const PriceLimit = {
    LOW: 10000,
    HIGHT: 50000
  };

  const filterPrice = function (price) {
    let isValid = false;
    if (priceValue === `any`) {
      isValid = true;
    }
    if ((priceValue === `low`) && (price < PriceLimit.LOW)) {
      isValid = true;
    }
    if ((priceValue === `middle`) && (price >= PriceLimit.LOW) && (price <= PriceLimit.HIGHT)) {
      isValid = true;
    }
    if ((priceValue === `high`) && (price > PriceLimit.HIGHT)) {
      isValid = true;
    }
    return isValid;
  };

  const isFeatureValid = function (ad, featureValid) {
    return ad.offer.features.some(function (feature) {
      return feature === featureValid;
    });
  };

  const filterData = function (ad) {
    let isValid = true;

    if (!filterPrice(ad.offer.price)) {
      isValid = false;
    }

    if (wifiValue && !isFeatureValid(ad, `wifi`)) {
      isValid = false;
    }

    if (dishwasherValue && !isFeatureValid(ad, `dishwasher`)) {
      isValid = false;
    }

    if (parkingValue && !isFeatureValid(ad, `parking`)) {
      isValid = false;
    }

    if (washerValue && !isFeatureValid(ad, `washer`)) {
      isValid = false;
    }

    if (elevatorValue && !isFeatureValid(ad, `elevator`)) {
      isValid = false;
    }

    if (conditionerValue && !isFeatureValid(ad, `conditioner`)) {
      isValid = false;
    }

    if ((typeValue !== `any`) && (ad.offer.type !== typeValue)) {
      isValid = false;
    }
    if ((roomsValue !== `any`) && (ad.offer.rooms !== parseInt(roomsValue, 10))) {
      isValid = false;
    }
    if ((guestsValue !== `any`) && (ad.offer.guests !== parseInt(guestsValue, 10))) {
      isValid = false;
    }

    return isValid;
  };
  /*
  typeFilter.addEventListener(`change`, function () {
    typeValue = typeFilter.value;
    window.debounce(window.map.updatePins(ads));
  });
  roomsFilter.addEventListener(`change`, function () {
    roomsValue = roomsFilter.value;
    window.debounce(window.map.updatePins(ads));
  });

  guestsFilter.addEventListener(`change`, function () {
    guestsValue = guestsFilter.value;
    window.debounce(window.map.updatePins(ads));
  });

  priceFilter.addEventListener(`change`, function () {
    priceValue = priceFilter.value;
    window.debounce(window.map.updatePins(ads));
  });

  wifiFilter.addEventListener(`click`, function () {
    wifiValue = wifiFilter.checked;
    window.debounce(window.map.updatePins(ads));
  });

  dishwasherFilter.addEventListener(`click`, function () {
    dishwasherValue = dishwasherFilter.checked;
    window.debounce(window.map.updatePins(ads));
  });

  parkingFilter.addEventListener(`click`, function () {
    parkingValue = parkingFilter.checked;
    window.debounce(window.map.updatePins(ads));
  });

  washerFilter.addEventListener(`click`, function () {
    washerValue = washerFilter.checked;
    window.debounce(window.map.updatePins(ads));
  });

  elevatorFilter.addEventListener(`click`, function () {
    elevatorValue = elevatorFilter.checked;
    window.debounce(window.map.updatePins(ads));
  });

  conditionerFilter.addEventListener(`click`, function () {
    conditionerValue = conditionerFilter.checked;
    window.debounce(window.map.updatePins(ads));
  });
*/
  typeFilter.addEventListener(`change`, window.debounce(function () {
    typeValue = typeFilter.value;
    window.map.updatePins(ads);
  }));

  roomsFilter.addEventListener(`change`, window.debounce(function () {
    roomsValue = roomsFilter.value;
    window.map.updatePins(ads);
  }));

  guestsFilter.addEventListener(`change`, window.debounce(function () {
    guestsValue = guestsFilter.value;
    window.map.updatePins(ads);
  }));

  priceFilter.addEventListener(`change`, window.debounce(function () {
    priceValue = priceFilter.value;
    window.map.updatePins(ads);
  }));

  wifiFilter.addEventListener(`click`, window.debounce(function () {
    wifiValue = wifiFilter.checked;
    window.map.updatePins(ads);
  }));

  dishwasherFilter.addEventListener(`click`, window.debounce(function () {
    dishwasherValue = dishwasherFilter.checked;
    window.map.updatePins(ads);
  }));

  parkingFilter.addEventListener(`click`, window.debounce(function () {
    parkingValue = parkingFilter.checked;
    window.map.updatePins(ads);
  }));

  washerFilter.addEventListener(`click`, window.debounce(function () {
    washerValue = washerFilter.checked;
    window.map.updatePins(ads);
  }));

  elevatorFilter.addEventListener(`click`, window.debounce(function () {
    elevatorValue = elevatorFilter.checked;
    window.map.updatePins(ads);
  }));

  conditionerFilter.addEventListener(`click`, window.debounce(function () {
    conditionerValue = conditionerFilter.checked;
    window.map.updatePins(ads);
  }));

  const loadingCompleted = function (data) {
    ads = data;
    window.map.updatePins(ads);

    window.util.changeAccessForElements(filterFieldsets, true);
    window.util.changeAccessForElements(filterSelects, true);
  };

  window.data = {
    filterData,
    loadingCompleted
  };

})();
