export const BASEURL = "https://norma.nomoreparties.space/api";

export const checkServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка получения данных ${res.status}`);
};