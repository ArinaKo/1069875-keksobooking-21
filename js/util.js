'use strict';

(function () {
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

  const changeAccessForElements = function (elements, isneedAccess) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].disabled = !isneedAccess;
    }
  };

  const changeAddress = function () {
    const addressInput = document.querySelector(`#address`);
    const pin = document.querySelector(`.map__pin--main`);

    const PIN_SIZE = {
      width: 50,
      height: 70
    };

    addressInput.value = Math.floor(pin.offsetLeft + PIN_SIZE.width / 2) + `, ` + Math.floor(pin.offsetTop + PIN_SIZE.height);
  };

  window.util = {
    getRandomNumber,
    getRandomOption,
    getRandomOptions,
    addTextData,
    addTwoTextData,
    changeAccessForElements,
    changeAddress
  };
})();
