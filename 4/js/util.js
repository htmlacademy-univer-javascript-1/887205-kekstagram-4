const getRandomNumber = ({ min, max }) => {
  if (max < min) {
    [min, max] = [max, min];
  }
  return Math.floor(min + Math.random() * (max - min));
};

const getRandomValue = (arr) => arr[getRandomNumber({ min: 0, max: arr.length - 1 })];

const fillArray = (length, callback) => Array.from({ length }, callback);

export { getRandomNumber, getRandomValue, fillArray };
