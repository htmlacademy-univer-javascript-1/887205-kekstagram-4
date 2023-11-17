import { fillFragment } from '../util.js';

const closeButton = document.getElementById('picture-cancel');
const commentTemplate = document.querySelector('.social__comment');
const onCloseIconClick = closeFullscreen;

const onGalleryKeydown = (event) => {
  if (event.key === 'Escape') {
    onCloseIconClick();
  }
};

function closeFullscreen() {
  document.querySelector('.big-picture').classList.add('hidden');
  document.removeEventListener('keydown', onGalleryKeydown);
  closeButton.addEventListener('click', onCloseIconClick);
}

const createCommentNode = ({ id, avatar, message, name }) => {
  const commentNode = commentTemplate.cloneNode(true);
  const commentNodePicture = commentNode.querySelector('.social__picture');
  commentNode.dataset.id = id;
  commentNodePicture.src = avatar;
  commentNodePicture.alt = name;
  commentNode.querySelector('.social__text').textContent = message;
  return commentNode;
};

const addComments = (comments) => {
  const commentsContainer = document.querySelector('.social__comments');
  const commentsFragment = fillFragment(comments, createCommentNode);
  commentsContainer.append(commentsFragment);
};

const openFullscreen = (photo) => {
  document.querySelector('.big-picture__img').children[0].src = photo.url;
  document.querySelector('.social__caption').textContent = photo.description;
  document.querySelector('.likes-count').textContent = photo.likes;
  document.querySelector('.comments-count').textContent = photo.comments.length;
  document.querySelector('.big-picture').classList.remove('hidden');

  document.querySelector('.social__comments').innerHTML = '';
  addComments(photo.comments);
  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');

  closeButton.addEventListener('click', onCloseIconClick);
  document.addEventListener('keydown', onGalleryKeydown);
};

export { openFullscreen };
