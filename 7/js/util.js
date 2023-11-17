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

export { getRandomCount, getRandomValue, fillArray, fillFragment };
