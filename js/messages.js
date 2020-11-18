'use strict';

(function () {

  const page = document.querySelector(`main`);
  const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
  const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);

  const showMessage = function (message) {
    message.classList.add(`message`);
    page.appendChild(message);
    document.addEventListener(`click`, closeMessage);
    document.addEventListener(`keydown`, onEscapePress);

    const closeButton = message.querySelector(`.error__button`);
    if (closeButton) {
      closeButton.addEventListener(`click`, closeMessage);
    }
  };

  const onEscapePress = function (evt) {
    if (evt.key === `Escape`) {
      closeMessage();
    }
  };

  const closeMessage = function () {
    page.querySelector(`.message`).remove();
    document.removeEventListener(`click`, closeMessage);
    document.removeEventListener(`keydown`, onEscapePress);
    const closeButton = page.querySelector(`.error__button`);
    if (closeButton) {
      page.querySelector(`.error__button`).removeEventListener(`click`, closeMessage);
    }
  };

  const uploadSuccess = function () {
    const message = successTemplate.cloneNode(true);
    showMessage(message);

  };

  const uploadError = function () {
    const message = errorTemplate.cloneNode(true);
    showMessage(message);

  };

  const loadError = function (text) {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; padding: 10px 0; text-align: center; background-color: white; border: 3px solid red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = text;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  window.messages = {
    uploadSuccess,
    uploadError,
    loadError
  };

})();
