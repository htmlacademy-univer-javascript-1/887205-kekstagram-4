import { showError, showSuccess } from './show-message.js';

const BASE = 'https://29.javascript.pages.academy/kekstagram';
const routes = {
  getUserImages: {
    URL: `${BASE}/data`,
    METHOD: 'GET',
    ERROR: 'Не удалось загрузить данные, попробуйте позже'
  },
  sendUserImage: {
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

const getUserImages = async () => {
  try {
    const data = await makeResponse(routes.getUserImages);
    return data;
  } catch (error) {
    showError(error.message, 'Хорошо');
  }
};

const sendUserImages = async (body) => {
  try {
    await makeResponse(routes.sendUserImage, body);
  } catch (error) {
    showError(error.message);
    return false;
  }
  showSuccess();
  return true;
};

export { getUserImages, sendUserImages };
