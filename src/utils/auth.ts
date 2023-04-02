//  Здесь все утилиты для регистрации и авторизации. Все как в тренажере  //
//  Функция для удобного доступа к cookie - линтер ругается на лишние экраны //

//  Создаю тип для пропсов куки  //
type TCookieProps = {
  expires?: Date | string;
  path?: string;
} & { [key: string]: string };

//  Получаю куки  //
export const getCookie = (name: string) => {
  //  создаю массив cookie, подходящих под regex (линтер ругается, quick fixed)  //
  const matches = document.cookie.match(
  //  new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)')
  );
  //  если массив не нулевой, возвращаю второй элемент или undefined  //
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

//  Сохраняю полученный токен в куку  //
export const setCookie = (name: string, value: string, props?:TCookieProps) => {
  props = props || { path: '/' };
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp instanceof Date && exp) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (!propValue) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

//  Сохраняю и обновляю куки, Срок жизни токена — 20 минут  //
/* export const setCookies = (accessToken: string, refreshToken: string) => {
  const expirationAt = new Date(new Date().getTime() + 20 * 60 * 1000);
  setCookie('accessToken', accessToken.split('Bearer ')[1], 
    { exp: expirationAt }
  );
  setCookie('refreshToken', refreshToken);
};
*/

export const setCookies = ( accessToken: string, refreshToken: string) => {
  setCookie('accessToken', accessToken.split('Bearer ')[1]);
  setCookie('refreshToken', refreshToken);
};

//  Удаляю куки и выставляю дату экспирации в прошлом - на начало e-времен  //
export const deleteCookie = (name: string) => {
  document.cookie = name + "=; Path='/'; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

//  Получение токена и рефреш токена из куки  //
//  Не надо типизировать возврат, т.к. самотипизируется?  //
export const authTokens = () => {
  const accessToken = getCookie('accessToken');
  const refreshToken = getCookie('refreshToken');
  return { accessToken, refreshToken };
};

//  Пока не использую хранение данных в лок.хранилище  //
/*
export const setLStorage = <T>(key: string, value: T) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const deleteLStorage = (key: string) => {
  window.localStorage.removeItem(key);
};

export const getLStorage = (key: string) => {
  const value = window.localStorage.getItem(key);
  if (typeof value === 'string') {
    return JSON.parse(value);
  }
  return null;
};
*/