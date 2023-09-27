const checkMaxLength = (value, maxLength) => value.length <= maxLength;

const isPalindrome = (sentence) => {
  const normalizedSentence = sentence.replaceAll(' ', '').toLowerCase();
  const reversedSentence = normalizedSentence.split('').reverse().join('');
  return normalizedSentence === reversedSentence;
};

const parseNumber = (value) => {
  const number = value
    .toString()
    .split('')
    .filter((char) => +char)
    .reduce((acc, digit) => acc + digit, '') || NaN;
  return +number;
};

checkMaxLength('login', 10);
isPalindrome('Was it a car or a cat I saw');
parseNumber('aa0l.14l03d');
