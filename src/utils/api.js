import { BASEURL, checkServerResponse } from "./constants";

export const getOrderDetails = (ingredients) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients }),
  };

  return fetch(`${BASEURL}/orders`, requestOptions).then(checkServerResponse);
};

export const getIngredients = () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(),
  };

  return fetch(`${BASEURL}/ingredients`, requestOptions).then(checkServerResponse);
};
