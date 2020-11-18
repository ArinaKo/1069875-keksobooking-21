'use strict';

(function () {

  const priceLaw = {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalow: 0
  };

  const adForm = document.querySelector(`.ad-form`);
  const adRooms = adForm.querySelector(`#room_number`);
  const adCapacity = adForm.querySelector(`#capacity`);
  const adPrice = adForm.querySelector(`#price`);
  const adType = adForm.querySelector(`#type`);
  const adTimeIn = adForm.querySelector(`#timein`);
  const adTimeOut = adForm.querySelector(`#timeout`);
  const formResetButton = adForm.querySelector(`.ad-form__reset`);

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

  const isPriceValid = function () {
    const value = Number(adPrice.value);
    const minValue = Number(adPrice.getAttribute(`min`));

    if (value < minValue) {
      adPrice.setCustomValidity(`Минимальная цена: ` + minValue);
      adPrice.reportValidity();
    } else {
      adPrice.setCustomValidity(``);
    }
  };

  adPrice.addEventListener(`input`, function () {
    isPriceValid();
  });

  const isMinPriceValid = function () {
    const minValue = Number(adPrice.getAttribute(`min`));
    const correctPrice = priceLaw[adType.value];
    if (correctPrice !== minValue) {
      adPrice.min = correctPrice;
      adPrice.placeholder = correctPrice;
    }
  };

  adType.addEventListener(`change`, function () {
    isMinPriceValid();
  });
  adType.addEventListener(`change`, function () {
    if (adPrice.value) {
      isPriceValid();
    }
  });

  const onTimesChange = function (selectA, selectB) {
    const timeA = selectA.value;
    const timeB = selectB.value;
    if (timeB !== timeA) {
      selectB.value = timeA;
    }
  };

  adTimeIn.addEventListener(`change`, function () {
    onTimesChange(adTimeIn, adTimeOut);
  });

  adTimeOut.addEventListener(`change`, function () {
    onTimesChange(adTimeOut, adTimeIn);
  });

  adForm.addEventListener(`submit`, function (evt) {
    evt.preventDefault();
    window.server(new FormData(adForm), window.messages.uploadSuccess, window.messages.uploadError);
    formReset();

  });

  const formReset = function () {
    adForm.reset();
    window.main.disablePage();
  };

  formResetButton.addEventListener(`click`, formReset);

})();
