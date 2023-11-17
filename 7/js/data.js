import { fillArray, getRandomCount, getRandomValue } from './util.js';

const MAX_PICTURE_ID = 25;

const AvatarId = { MIN: 1, MAX: 6 };
const Likes = { MIN: 15, MAX: 200 };
const Comments = { MIN: 0, MAX: 30 };

const NAMES = [
  'Дмитрий',
  'Анна',
  'Михаил',
  'Николай',
  'Алиса',
  'Юлия',
  'Артем',
  'Елизавета',
  'Антон'
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const generateComments = () => {
  let commentId = 0;

  return () => ({
    id: ++commentId,
    avatar: `img/avatar-${getRandomCount(AvatarId)}.svg`,
    message: getRandomValue(COMMENTS),
    name: getRandomValue(NAMES),
  });
};

const generatePhotoDescriptions = (generateComment) => {
  let photoId = 0;

  return () => ({
    id: ++photoId,
    url: `photos/${photoId}.jpg`,
    description: `Описание картинки №${photoId}`,
    likes: getRandomCount(Likes),
    comments: fillArray(getRandomCount(Comments), generateComment)
  });
};

const generatePhotoDescription = generatePhotoDescriptions(generateComments());

const generateData = () => fillArray(MAX_PICTURE_ID, generatePhotoDescription);
export { generateData };
