import { onCloseModal } from '../util.js';
import { addValidators } from './validation.js';
import { createEffectSlider, resetEffectSlider } from './effects.js';
import { sendUserImages } from '../api.js';

const Zoom = {
  MIN: 25,
  MAX: 100,
  STEP: 25
};

const uploadForm = document.querySelector('.img-upload__form');
const uploadedImageNode = document.querySelector('.img-upload__preview img');
const uploadInputNode = document.querySelector('.img-upload__input');
const uploadOverlayNode = document.querySelector('.img-upload__overlay');
const sendButtonNode = document.querySelector('.img-upload__submit');
const closeIconNode = document.querySelector('.img-upload__cancel');

const scaleValueNode = document.querySelector('.scale__control--value');
const scaleUpButtonNode = document.querySelector('.scale__control--bigger');
const scaleDownButtonNode = document.querySelector('.scale__control--smaller');
const effectPreviewNodes = document.querySelectorAll('.effects__preview');

const pristine = new Pristine(uploadForm, {
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
  createEffectSlider();
  addValidators(pristine);
  uploadForm.addEventListener('input', () => {
    sendButtonNode.disabled = !pristine.validate();
  });
  uploadForm.addEventListener(('submit'), onUploadFormSubmit);
  scaleUpButtonNode.addEventListener('click', onScaleUpButtonClick);
  scaleDownButtonNode.addEventListener('click', onScaleDownButtonClick);
};

const openUploadImageForm = () => {
  uploadOverlayNode.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const onChangeUploadInput = () => {
  const image = uploadInputNode.files[0];
  if (image) {
    const imageFileObject = URL.createObjectURL(image);
    uploadedImageNode.src = imageFileObject;
    effectPreviewNodes.forEach((effectPreviewNode) => {
      effectPreviewNode.style.backgroundImage = `url(${imageFileObject})`;
    });
    openUploadImageForm();
  }
};

const closeUploadImageForm = () => {
  uploadOverlayNode.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadForm.reset();
  pristine.reset();
  resetEffectSlider();
};

const onDocumentKeydown = (event) => onCloseModal(event, closeUploadImageForm);

const onCloseIconClick = closeUploadImageForm;

async function onUploadFormSubmit(event) {
  event.preventDefault();
  sendButtonNode.disabled = true;
  const isSuccess = await sendUserImages(new FormData(uploadForm));
  sendButtonNode.disabled = false;
  if (isSuccess) {
    closeUploadImageForm();
  } else {
    uploadOverlayNode.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
}

uploadInputNode.addEventListener('change', onChangeUploadInput);
closeIconNode.addEventListener('click', onCloseIconClick);
document.addEventListener('keydown', onDocumentKeydown);

export { initForm };
