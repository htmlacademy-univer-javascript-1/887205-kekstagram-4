import { fillFragment } from '../util.js';

const COMMENTS_PER_LOAD = 5;

const commentTemplate = document.querySelector('.social__comment');
const commentsContainerNode = document.querySelector('.social__comments');
const currentCommentsCountNode = document.querySelector('.social__comment-shown-count');
const loadCommentsButtonNode = document.querySelector('.social__comments-loader');

let comments = [];
let lastCommentNumber = 0;

const changeVisibleCommentsCount = (current) => {
  currentCommentsCountNode.textContent = current;
};

const hideLoadCommentsButton = () => loadCommentsButtonNode.classList.add('hidden');

const showLoadCommentsButton = () => loadCommentsButtonNode.classList.remove('hidden');

const resetCommentData = () => {
  lastCommentNumber = 0;
  comments = [];
  loadCommentsButtonNode.removeEventListener('click', renderComments);
};

const createCommentNode = ({ avatar, message, name }) => {
  const commentNode = commentTemplate.cloneNode(true);
  const commentPictureNode = commentNode.querySelector('.social__picture');
  commentPictureNode.src = avatar;
  commentPictureNode.alt = name;
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
  commentsContainerNode.append(commentsFragment);
};

function renderComments() {
  const commentsToShow = getComments();
  addComments(commentsToShow);
  changeVisibleCommentsCount(lastCommentNumber);
  showLoadCommentsButton();

  if (comments.length - lastCommentNumber === 0) {
    hideLoadCommentsButton();
    resetCommentData();
  }
}

const onLoadCommentsButtonClick = renderComments;

const showComments = (newComments) => {
  commentsContainerNode.innerHTML = '';
  comments = newComments;
  renderComments();
  loadCommentsButtonNode.addEventListener('click', onLoadCommentsButtonClick);
};

export { showComments, resetCommentData };
