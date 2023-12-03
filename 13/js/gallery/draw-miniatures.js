import { fillFragment } from '../util.js';

const pictureTemplate = document.querySelector('#picture').content;
const pictureContainerNode = document.querySelector('.pictures');

const createPictureNode = ({ id, url, description, likes, comments }) => {
  const pictureNode = pictureTemplate.cloneNode(true);
  const pictureImageNode = pictureNode.querySelector('.picture__img');
  pictureImageNode.src = url;
  pictureImageNode.alt = description;
  pictureImageNode.dataset.id = id;
  pictureNode.querySelector('.picture__likes').textContent = likes;
  pictureNode.querySelector('.picture__comments').textContent = comments.length;
  return pictureNode;
};

const renderPictures = (picturesData) => {
  if (!picturesData.length) { return; }
  const picturesFragment = fillFragment(picturesData, createPictureNode);
  pictureContainerNode.append(picturesFragment);
};

export { renderPictures };
