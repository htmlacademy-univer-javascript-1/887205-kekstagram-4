const photoTemplate = document.querySelector('#picture').content;

const convertToNode = ({ url, description, likes, comments }) => {
  const pictureNode = photoTemplate.cloneNode(true);
  const pictureNodeImage = pictureNode.querySelector('.picture__img');
  pictureNodeImage.src = url;
  pictureNodeImage.alt = description;
  pictureNode.querySelector('.picture__likes').textContent = likes;
  pictureNode.querySelector('.picture__comments').textContent = comments.length;
  return pictureNode;
};

const renderPhotos = (photosData) => {
  const photosFragment = document.createDocumentFragment();
  const photosContainer = document.querySelector('.pictures');
  photosData.forEach((data) => photosFragment.appendChild(convertToNode(data)));
  photosContainer.append(photosFragment);
};

export { renderPhotos };
