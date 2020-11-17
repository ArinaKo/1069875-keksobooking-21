'use strict';

(function () {
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
    addTextData,
    addTwoTextData,
    changeAccessForElements,
    changeAddress
  };
})();
