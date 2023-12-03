import { onCloseModal } from '../util.js';
import { addValidators } from './validation.js';
import { initEffects, removeEffect } from './effects.js';
import { sendUserPictures } from '../api.js';

const uploadFormNode = document.querySelector('.img-upload__form');
const uploadOverlayNode = document.querySelector('.img-upload__overlay');
const uploadInputNode = document.querySelector('.img-upload__input');
const uploadedImageNode = document.querySelector('.img-upload__preview img');
const sendButtonNode = document.querySelector('.img-upload__submit');
const closeIconNode = document.querySelector('.img-upload__cancel');

const effectPreviewNodes = document.querySelectorAll('.effects__preview');

const scaleValueNode = document.querySelector('.scale__control--value');
const scaleUpButtonNode = document.querySelector('.scale__control--bigger');
const scaleDownButtonNode = document.querySelector('.scale__control--smaller');

const Zoom = {
  MIN: 25,
  MAX: 100,
  STEP: 25
};

const pristine = new Pristine(uploadFormNode, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error'
});

const changeScale = (sign) => {
  let scaleValue = parseFloat(scaleValueNode.value);
  scaleValue = Math.max(Zoom.MIN, Math.min(Zoom.MAX, scaleValue + sign * Zoom.STEP));
  scaleValueNode.value = `${scaleValue}%`;
  uploadedImageNode.style.transform = `scale(${scaleValue / 100})`;
};

const onScaleUpButtonClick = () => changeScale(1);
const onScaleDownButtonClick = () => changeScale(-1);

const initForm = () => {
  initEffects();
  addValidators(pristine);

  uploadFormNode.addEventListener('input', () => {
    sendButtonNode.disabled = !pristine.validate();
  });
  uploadFormNode.addEventListener(('submit'), onUploadFormSubmit);

  scaleUpButtonNode.addEventListener('click', onScaleUpButtonClick);
  scaleDownButtonNode.addEventListener('click', onScaleDownButtonClick);
};

const openUploadImageForm = () => {
  uploadOverlayNode.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.querySelector('.effect-level').classList.add('hidden');
};

const onChangeUploadInput = () => {
  const image = uploadInputNode.files[0];
  if (!image) { return; }

  const imageFileObject = URL.createObjectURL(image);
  uploadedImageNode.src = imageFileObject;
  effectPreviewNodes.forEach((effectPreviewNode) => {
    effectPreviewNode.style.backgroundImage = `url(${imageFileObject})`;
  });
  openUploadImageForm();
};

const closeUploadImageForm = () => {
  uploadOverlayNode.scrollTop = 0;
  uploadOverlayNode.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadedImageNode.style.transform = 'none';
  uploadFormNode.reset();
  pristine.reset();
  removeEffect();
};

const onDocumentKeydown = (event) => onCloseModal(event, closeUploadImageForm);

const onCloseIconClick = closeUploadImageForm;

async function onUploadFormSubmit(event) {
  event.preventDefault();

  sendButtonNode.disabled = true;
  const isSuccessSubmit = await sendUserPictures(new FormData(uploadFormNode));
  sendButtonNode.disabled = false;

  if (isSuccessSubmit) {
    closeUploadImageForm();
  } else {
    uploadOverlayNode.classList.add('hidden');
    uploadInputNode.value = '';
    document.body.classList.remove('modal-open');
  }
}

uploadInputNode.addEventListener('change', onChangeUploadInput);
closeIconNode.addEventListener('click', onCloseIconClick);
document.addEventListener('keydown', onDocumentKeydown);

export { initForm };
