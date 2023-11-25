import { openFullscreen } from './open-fullscreen.js';
import { renderPhotos } from './draw-miniatures.js';

const gallery = document.querySelector('.pictures');
const photos = [];

const openPhoto = (event) => {
  const picture = event.target.closest('.picture__img');
  if (!picture) { return; }
  event.preventDefault();

  const photoId = +picture.dataset.id;
  const photo = photos.find((photoData) => photoData.id === photoId);
  openFullscreen(photo);
};

const createGallery = (data) => {
  photos.push(...data);
  renderPhotos(data);
  gallery.addEventListener('click', openPhoto);
};

export { createGallery };
