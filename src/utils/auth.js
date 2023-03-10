//  Здесь все утилиты для регистрации и авторизации. Все как в тренажере  //
//  Функция для удобного доступа к cookie - линтер ругается на лишние экраны //


export const getCookie = (name) => {
  //  создаю массив cookie, подходящих под regex  //
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  //  если массив не нулевой, возвращаю второй элемент или undefined  //
  return matches ? decodeURIComponent(matches[1]) : undefined;
} 

//  Сохраняю полученный токен в куку  //
export const setCookie = (name, value, props) => {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export const setCookies = (accessToken, refreshToken) => {
  const expirationAt = new Date(new Date().getTime() + 20 * 60 * 1000);
  setCookie("accessToken", accessToken.split("Bearer ")[1], {
    expires: expirationAt,
  });
  setCookie("refreshToken", refreshToken);
};

export const authTokens = () => {
  const accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");
  return { accessToken, refreshToken };
};