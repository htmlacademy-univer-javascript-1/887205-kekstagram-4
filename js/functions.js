const MINUTES_IN_HOUR = 60;

// Задание 1
// Функция для проверки длины строки. Она принимает строку, которую нужно проверить, и максимальную длину и возвращает true, если строка меньше или равна указанной длине, и false, если строка длиннее.
const checkMaxLength = (value, maxLength) => value.length <= maxLength;


// Задание 2
// Функция для проверки, является ли строка палиндромом.
const isPalindrome = (sentence) => {
  const normalizedSentence = sentence.replaceAll(' ', '').toLowerCase();
  const reversedSentence = normalizedSentence.split('').reverse().join('');
  return normalizedSentence === reversedSentence;
};

// Задание 3
// Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN
const parseNumber = (value) => {
  const number = value
    .toString()
    .split('')
    .filter((char) => parseInt(char, 10) >= 0)
    .reduce((acc, digit) => acc + digit, '') || NaN;
  return +number;
};


const timeToMinutes = (time) => {
  const [hours, minutes] = time.split(':');
  return +hours * MINUTES_IN_HOUR + +minutes;
};

const isMeetingInWorkday = (workdayStartTime, workdayEndTime, meetingStartTime, meetingDuration) => {
  workdayStartTime = timeToMinutes(workdayStartTime);
  workdayEndTime = timeToMinutes(workdayEndTime);
  meetingStartTime = timeToMinutes(meetingStartTime);
  const meetingEndTime = meetingStartTime + meetingDuration;

  return workdayStartTime <= meetingStartTime && meetingEndTime <= workdayEndTime;
};

checkMaxLength('login', 10);
isPalindrome('Was it a car or a cat I saw');
parseNumber('aa0l.14l03d');
isMeetingInWorkday('8:0', '10:0', '8:0', 120);
