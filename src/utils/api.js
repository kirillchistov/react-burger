//  Упрощенный API для получения данных с сервера  //
import { BASEURL } from './constants';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(res.status));
};
  
export function getIngredients (ingredients) {
  return fetch(`${BASEURL}/ingredients`)
    .then(checkResponse)
    .then(ingredients)
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
}

//  Рефактор: переписать на async await, добавить ошибки, упростить  //
/*
const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const getIngredients = async () => {
  const res = await fetch(`${BASEURL}/ingredients`);
  return checkResponse(res);
}

*/

// export default getIngredients;