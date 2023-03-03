//  Упрощенный API для получения данных с сервера  //
//  BASEURL = 'https://norma.nomoreparties.space/api' убрать в .env  //
import {BASEURL} from './constants';

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

//  Получаю ингредиенты с сервера и записываю в массив  //
export const fetchIngredients = async (setIngredients) => {
  try {
    return await fetch(`${BASEURL}/ingredients`)
      .then(checkResponse)
      .then(setIngredients)
  } catch (err) {
    console.log(`Ошибка получения ингредиентов: ${err}`);
  }
}

//  Отправляю заказ на сервер, post fetch в /orders  //
//  преобразую JSON с id ингредиентов в строку  //
export const postOrder = async (ingredientsID) => {
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
    //  Возвращаем номер заказа в createOrder в конструкторе  //
  } catch (err) {
    console.log(`Ошибка отправки заказа: ${err}`);
  }
};
