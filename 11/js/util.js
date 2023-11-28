const getRandomNumber = (min, max) => {
  if (max < min) {
    [min, max] = [max, min];
  }
  return Math.floor(min + Math.random() * (max - min));
};

const getRandomCount = ({ MIN, MAX }) => getRandomNumber(MIN, MAX);

const getRandomValue = (arr) => arr[getRandomNumber(0, arr.length - 1)];

const fillArray = (length, callback) => Array.from({ length }, callback);

const fillFragment = (data, createItemNode) => {
  const itemFragment = document.createDocumentFragment();
  data.forEach((itemData) => itemFragment.append(createItemNode(itemData)));
  return itemFragment;
};

const hasFocusOnInput = () => document.activeElement.hasAttribute('data-no-close-on-focus');

const onCloseModal = (event, closeModal) => {
  if (event.key === 'Escape' && !hasFocusOnInput()) {
    closeModal();
  }
};

export { getRandomCount, getRandomValue, fillArray, fillFragment, onCloseModal };
