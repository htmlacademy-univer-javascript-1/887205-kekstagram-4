import { openFullscreen } from './open-fullscreen.js';
import { renderPictures } from './draw-miniatures.js';
import { initFilters } from './filters.js';

const galleryNode = document.querySelector('.pictures');
const pictures = [];

const onGalleryClick = (event) => {
  const pictureNode = event.target.closest('.picture__img');
  if (!pictureNode) { return; }
  event.preventDefault();

  const pictureId = +pictureNode.dataset.id;
  const picture = pictures.find((pictureData) => pictureData.id === pictureId);
  openFullscreen(picture);
};

const createGallery = (picturesData = []) => {
  if (!picturesData.length) { return; }
  pictures.push(...picturesData);
  renderPictures(picturesData);
  initFilters(picturesData, renderPictures);
  galleryNode.addEventListener('click', onGalleryClick);
};

const clearGallery = () => galleryNode
  .querySelectorAll('.picture')
  .forEach((picture) => galleryNode.removeChild(picture));

export { createGallery, clearGallery };
