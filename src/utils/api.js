//  Упрощенный API для получения данных с сервера  //
import { BASEURL } from './constants';

//  Обрабатываю ответ сервера - возвращаю json или ошибку  //
export const checkResponse = async (res) => {
  try {
    if (res.ok) {
      return await res.json();
    }
    return Promise.reject({statusCode: res.status, message: res.message});
  } catch (err) {
    console.log(`Ошибка запроса к серверу: ${err}`);
  }
};

//  Получаю ингридиенты с сервера и записываем в массив  //
export const getIngredients = async (setIngredients) => {
  try {
    return await fetch(`${BASEURL}/ingredients`)
      .then(checkResponse)
      .then(setIngredients)
  } catch (err) {
    console.log(`Ошибка получения ингридиентов: ${err}`);
  }
}

//  Отправляю заказ на сервер, post fetch, преобразую JSON в строку  //
export const sendOrder = async (ingredientsID) => {
  try {
    return await fetch(`${BASEURL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },   
      body: JSON.stringify({
        ingredients: ingredientsID
      })   
    })
    .then(checkResponse)
      } catch (err) {
    console.log(`Ошибка отправки заказа: ${err}`);
  }
};
