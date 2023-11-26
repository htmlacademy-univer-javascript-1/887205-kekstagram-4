import { fillFragment } from '../util.js';
const photoTemplate = document.querySelector('#picture').content;

const createPhotoNode = ({ id, url, description, likes, comments }) => {
  const pictureNode = photoTemplate.cloneNode(true);
  const pictureNodeImage = pictureNode.querySelector('.picture__img');
  pictureNodeImage.src = url;
  pictureNodeImage.alt = description;
  pictureNodeImage.dataset.id = id;
  pictureNode.querySelector('.picture__likes').textContent = likes;
  pictureNode.querySelector('.picture__comments').textContent = comments.length;
  return pictureNode;
};

const renderPhotos = (photosData) => {
  const photosContainer = document.querySelector('.pictures');
  const photosFragment = fillFragment(photosData, createPhotoNode);
  photosContainer.append(photosFragment);
};
export { renderPhotos };
