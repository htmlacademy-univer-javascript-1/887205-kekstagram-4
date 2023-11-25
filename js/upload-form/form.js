import { onCloseModal } from '../util.js';
import { addValidators } from './validation.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInputNode = document.querySelector('.img-upload__input');
const uploadOverlayNode = document.querySelector('.img-upload__overlay');
const closeIconNode = document.querySelector('.img-upload__cancel');
const sendButtonNode = document.querySelector('.img-upload__submit');


const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error'
});

const createForm = () => {
  addValidators(pristine);
  uploadForm.addEventListener('input', () => {
    sendButtonNode.disabled = !pristine.validate();
  });
};


const onChangeUploadInput = () => {
  uploadOverlayNode.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const closeUploadImageForm = () => {
  uploadOverlayNode.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadForm.reset();
  pristine.reset();
};

const onDocumentKeydown = (event) => onCloseModal(event, closeUploadImageForm);

const onCloseIconClick = () => closeUploadImageForm;

uploadInputNode.addEventListener('change', onChangeUploadInput);
closeIconNode.addEventListener('click', onCloseIconClick);
document.addEventListener('keydown', onDocumentKeydown);

export { createForm };
