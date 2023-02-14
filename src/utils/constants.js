export const BASEURL = 'https://norma.nomoreparties.space/api';
export const modalsRoot = document.querySelector('#react-modals');
/*
//  Вынесем сюда обработку ответа сервера попозже  //
const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const getIngredients = () => {
  return fetch(`${BASEURL}/ingredients`).then(checkResponse);
}

export default getIngredients;
*/