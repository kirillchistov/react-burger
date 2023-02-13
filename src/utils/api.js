import { BASEURL } from "./constants";


export const getIngredients = () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(),
  };

  return fetch(`${BASEURL}/ingredients`, requestOptions).then(checkServerResponse);
};

// Здесь напишем еще один fetch для заказа  //
// 