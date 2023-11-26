const MAX_HASHTAGS_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;
const VALID_HASHTAG_SYMBOLS = /^#[a-zA-Z0-9а-яА-Я]{1,19}$/;

const commentNode = document.querySelector('.text__description');
const hashtagsNode = document.querySelector('.text__hashtags');

const toHashtagsList = (hashtags) => hashtags
  .split(' ')
  .map((hashtag) => hashtag.trim().toLowerCase())
  .filter((hashtag) => hashtag.length);

const isRightHashtags = (hashtags) => toHashtagsList(hashtags).every((hashtag) => VALID_HASHTAG_SYMBOLS.test(hashtag));

const isUniqueHashtags = (hashtags) => {
  const hashtagsList = toHashtagsList(hashtags);
  return hashtagsList.length === (new Set(hashtagsList)).size;
};

const isRightHashtagsCount = (hashtags) => toHashtagsList(hashtags).length <= MAX_HASHTAGS_COUNT;

const hashtagsRules = [
  {
    check: (hashtags) => isRightHashtagsCount(hashtags),
    ERROR: `Максимум ${MAX_HASHTAGS_COUNT} хэштегов`
  },
  {
    check: (hashtags) => isUniqueHashtags(hashtags),
    ERROR: 'Хэштеги должны быть уникальными'
  },
  {
    check: (hashtags) => isRightHashtags(hashtags),
    ERROR: 'Неправильный хэштег'
  },
];

const addValidators = (pristine) => {
  hashtagsRules.forEach((rule, index) => pristine.addValidator(hashtagsNode, rule.check, rule.ERROR, index, true));

  pristine.addValidator(commentNode, (comment) => comment.length < MAX_COMMENT_LENGTH, 'Слишком длинный комментарий', 1, false);
};

export { addValidators };
