import { BASEURL } from "./constants";

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const getIngredients = () => {
  return fetch(`${BASEURL}/ingredients`).then(checkResponse);
}

/* 
//  вынесем сюда позже запросы к api - надо развязать со стейтами в App
const getServerData = async () => {
  fetch(BASEURL)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } 
      return Promise.reject(`Ошибка получения данных ${response.status}`)
    })
    .then((result) => {
      setData(result.data)
      console.log(data)
    })
    .catch((error) => {
      setError(error.message)
      console.log(error)
    })
}
*/

/*
//  Надо развести запросы к серверу за ингридиентами и заказами  //
  export const getIngredients = () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(),
    };

  return fetch(`${BASEURL}/ingredients`, requestOptions).then(checkServerResponse);
  };

// Здесь напишем еще fetch post и get для заказов  //
*/

export default getIngredients;