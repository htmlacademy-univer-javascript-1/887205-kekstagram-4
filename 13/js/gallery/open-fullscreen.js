import { showComments, resetCommentData } from './comments.js';
import { onCloseModal } from '../util.js';

const closeButtonNode = document.getElementById('picture-cancel');

const onCloseIconClick = closeFullscreen;

const onDocumentKeydown = (event) => onCloseModal(event, closeFullscreen);

function closeFullscreen() {
  resetCommentData();
  const modalNode = document.querySelector('.big-picture');
  modalNode.scrollTop = 0;
  modalNode.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeButtonNode.removeEventListener('click', onCloseIconClick);
}

const openFullscreen = ({ url, description, likes, comments }) => {
  document.querySelector('.big-picture__img').children[0].src = url;
  document.querySelector('.social__caption').textContent = description;
  document.querySelector('.likes-count').textContent = likes;
  document.querySelector('.social__comment-total-count').textContent = comments.length;
  showComments(comments);
  document.querySelector('.big-picture').classList.remove('hidden');

  document.body.classList.add('modal-open');
  closeButtonNode.addEventListener('click', onCloseIconClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

export { openFullscreen };
