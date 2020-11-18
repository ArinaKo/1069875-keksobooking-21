'use strict';

(function () {

  const FROM_URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const TO_URL = ` https://21.javascript.pages.academy/keksobooking`;
  const StatusCode = {
    OK: 200
  };
  const TIMEOUT_IN_MS = 10000;

  window.server = function (data, onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });
    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout / 1000 + ` секунд`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    if (data) {
      xhr.open(`POST`, TO_URL);
      xhr.send(data);
    } else {
      xhr.open(`GET`, FROM_URL);
      xhr.send();
    }
  };

})();
