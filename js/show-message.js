import { closeModalOnEsc } from './util.js';

const errorTemplate = document.querySelector('#error').content;
const successTemplate = document.querySelector('#success').content;

const onDocumentKeydown = (event) => closeModalOnEsc(event, closeModal);

const onModalButtonClick = () => closeModal();

const onModalClick = (event) => {
  if (event.target.className.includes('message__modal')) {
    closeModal();
  }
};

function closeModal() {
  const modalNode = document.querySelector('.message__modal');
  document.querySelector('.message__button').removeEventListener('click', onModalButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  modalNode.parentNode.removeChild(modalNode);
}

const showMessage = (template) => {
  const modal = template.cloneNode(true);
  document.body.append(modal);
  const closeButtonNode = document.querySelector('.message__button');
  closeButtonNode.addEventListener('click', onModalButtonClick);
  document.querySelector('.message__modal').addEventListener('click', onModalClick);
  document.body.addEventListener('keydown', onDocumentKeydown);
};

const showError = (title, buttonText = null) => {
  const template = errorTemplate;
  const closeButtonNode = errorTemplate.querySelector('.message__button');
  errorTemplate.querySelector('.error__title').textContent = title;
  if (buttonText) {
    closeButtonNode.textContent = buttonText;
  }
  showMessage(template);
};

const showSuccess = () => showMessage(successTemplate);

export { showError, showSuccess };
