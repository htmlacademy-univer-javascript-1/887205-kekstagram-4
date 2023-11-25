import { fillFragment } from './util.js';

const COMMENTS_PER_LOAD = 5;

const loadCommentsButton = document.querySelector('.social__comments-loader');
const commentTemplate = document.querySelector('.social__comment');
const commentsContainer = document.querySelector('.social__comments');
const currentCommentsCountNode = document.querySelector('.loaded-comments-count');

let comments = [];
let lastCommentNumber = 0;

const changeVisibleCommentsCount = (current) => {
  currentCommentsCountNode.textContent = current;
};

const hideLoadCommentsButton = () => loadCommentsButton.classList.add('hidden');

const showLoadCommentsButton = () => loadCommentsButton.classList.remove('hidden');

const resetCommentData = () => {
  lastCommentNumber = 0;
  comments = [];
  loadCommentsButton.removeEventListener('click', renderComments);
};

const createCommentNode = ({ avatar, message, name }) => {
  const commentNode = commentTemplate.cloneNode(true);
  const commentNodePicture = commentNode.querySelector('.social__picture');
  commentNodePicture.src = avatar;
  commentNodePicture.alt = name;
  commentNode.querySelector('.social__text').textContent = message;
  return commentNode;
};

const getComments = () => {
  const commentsToShow = comments.slice(lastCommentNumber, lastCommentNumber + COMMENTS_PER_LOAD);
  lastCommentNumber += commentsToShow.length;
  return commentsToShow;
};

const addComments = (currentComments) => {
  const commentsFragment = fillFragment(currentComments, createCommentNode);
  commentsContainer.append(commentsFragment);
};

function renderComments() {
  showLoadCommentsButton();
  const commentsToShow = getComments();
  addComments(commentsToShow);
  changeVisibleCommentsCount(lastCommentNumber);

  if (comments.length - lastCommentNumber === 0) {
    hideLoadCommentsButton();
    resetCommentData();
  }
}

const showComments = (newComments) => {
  commentsContainer.innerHTML = '';
  comments = newComments;
  renderComments();
  loadCommentsButton.addEventListener('click', renderComments);
};

export { showComments, resetCommentData };
