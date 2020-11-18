'use strict';

(function () {

  // const filterFieldsets = filterOfAds.querySelectorAll(`fieldset`);
  const filterOfAds = document.querySelector(`.map__filters`);
  const filterSelects = filterOfAds.querySelectorAll(`select`);
  const filterFieldsets = filterOfAds.querySelectorAll(`fieldset`);
  const typeFilter = filterOfAds.querySelector(`#housing-type`);
  // const priceFilter = filterOfAds.querySelector(`#housing-price`);
  // const roomsFilter = filterOfAds.querySelector(`#housing-rooms`);
  // const guestsFilter = filterOfAds.querySelector(`#housing-guests`);

  let ads = [];
  let typeValue = `any`;
  // let priceValue = `any`;
  // let roomsValue = `any`;
  // let guestValue = `any`;

  const filterData = function (ad) {
    let show = false;
    if (typeValue === `any`) {
      show = true;
    } else if (ad.offer.type === typeValue) {
      show = true;
    }
    return show;
  };

  typeFilter.addEventListener(`change`, function () {
    typeValue = typeFilter.value;
    window.map.updatePins(ads);
  });

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
