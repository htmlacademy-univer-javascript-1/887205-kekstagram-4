const getRandomNumber = (min, max) => {
  if (max < min) {
    [min, max] = [max, min];
  }
  return Math.floor(min + Math.random() * (max - min));
};

const getRandomCount = ({ MIN, MAX }) => getRandomNumber(MIN, MAX);

const getRandomValue = (arr) => arr[getRandomNumber(0, arr.length - 1)];

const fillArray = (length, callback) => Array.from({ length }, callback);

export { getRandomCount, getRandomValue, fillArray };
