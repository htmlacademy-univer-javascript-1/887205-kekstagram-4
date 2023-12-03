import { showError, showSuccess } from './show-message.js';

const BASE = 'https://29.javascript.pages.academy/kekstagram';
const routes = {
  getUserPictures: {
    URL: `${BASE}/data`,
    METHOD: 'GET',
    ERROR: 'Не удалось загрузить данные, попробуйте позже'
  },
  sendUserPictures: {
    URL: BASE,
    METHOD: 'POST',
    ERROR: 'Не удалось отправить данные, попробуйте ещё раз'
  }
};

const makeResponse = async ({ URL, METHOD, ERROR }, body = null) => {
  try {
    const response = await fetch(URL, { method: METHOD, body });
    if (!response.ok) {
      throw new Error(ERROR);
    }
    return await response.json();
  } catch (error) {
    throw new Error(ERROR);
  }
};

const getUserPictures = async () => {
  try {
    const data = await makeResponse(routes.getUserPictures);
    return data;
  } catch (error) {
    showError(error.message, 'Хорошо');
  }
};

const sendUserPictures = async (body) => {
  try {
    await makeResponse(routes.sendUserPictures, body);
  } catch (error) {
    showError(error.message);
    return false;
  }
  showSuccess();
  return true;
};

export { getUserPictures, sendUserPictures };
