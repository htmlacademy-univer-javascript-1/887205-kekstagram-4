import { showComments, resetCommentData } from '../comments.js';
import { onCloseModal } from '../util.js';
const closeButton = document.getElementById('picture-cancel');

const onCloseIconClick = closeFullscreen;
const onDocumentKeydown = (event) => onCloseModal(event, closeFullscreen);

function closeFullscreen() {
  resetCommentData();
  document.querySelector('.big-picture').classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeButton.removeEventListener('click', onCloseIconClick);
  document.body.classList.remove('modal-open');
}

const openFullscreen = ({ url, description, likes, comments }) => {
  document.querySelector('.big-picture__img').children[0].src = url;
  document.querySelector('.social__caption').textContent = description;
  document.querySelector('.likes-count').textContent = likes;
  document.querySelector('.comments-count').textContent = comments.length;
  document.querySelector('.big-picture').classList.remove('hidden');
  showComments(comments);

  document.body.classList.add('modal-open');
  closeButton.addEventListener('click', onCloseIconClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

export { openFullscreen };
