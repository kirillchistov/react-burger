import { getCookie, setCookies, deleteCookie } from './auth';
import { TIngredient, TOrder, TUser } from '@/services/types';

export const BURGER_API_URL =
  import.meta.env.BURGER_API_URL || 'https://norma.education-services.ru/api';

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

type TServerResponse<T> = {
  success: boolean;
} & T;

type TRefreshResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
}>;

const getAuthorizationHeader = (): string => {
  const token = getCookie('accessToken');
  if (!token) return '';
  return token.startsWith('Bearer ') ? token : `Bearer ${token}`;
};

export const refreshTokenRequest = (): Promise<TRefreshResponse> =>
  fetch(`${BURGER_API_URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      token: getCookie('refreshToken'),
    }),
  })
    .then((res) => checkResponse<TRefreshResponse>(res))
    .then((refreshData) => {
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      setCookies(refreshData.accessToken, refreshData.refreshToken);
      return refreshData;
    });

export const fetchWithRefresh = async <T>(
  url: RequestInfo,
  options: RequestInit
): Promise<T> => {
  try {
    const res = await fetch(url, options);
    return await checkResponse<T>(res);
  } catch (err) {
    if ((err as { message?: string }).message === 'jwt expired') {
      const refreshData = await refreshTokenRequest();
      if (options.headers) {
        (options.headers as Record<string, string>).authorization =
          refreshData.accessToken;
      }
      const retryRes = await fetch(url, options);
      return await checkResponse<T>(retryRes);
    }
    return Promise.reject(err);
  }
};

type TIngredientsResponse = TServerResponse<{
  data: TIngredient[];
}>;

type TFeedsResponse = TServerResponse<{
  orders: TOrder[];
  total: number;
  totalToday: number;
}>;

export const getIngredientsApi = () =>
  fetch(`${BURGER_API_URL}/ingredients`)
    .then((res) => checkResponse<TIngredientsResponse>(res))
    .then((data) => {
      if (data?.success) return data.data;
      return Promise.reject(data);
    });

export const getFeedsApi = () =>
  fetch(`${BURGER_API_URL}/orders/all`)
    .then((res) => checkResponse<TFeedsResponse>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

export const getOrdersApi = () =>
  fetchWithRefresh<TFeedsResponse>(`${BURGER_API_URL}/orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: getAuthorizationHeader(),
    },
  }).then((data) => {
    if (data?.success) return data.orders;
    return Promise.reject(data);
  });

type TNewOrderResponse = TServerResponse<{
  order: TOrder;
  name: string;
}>;

export const orderBurgerApi = (ingredients: string[]) =>
  fetchWithRefresh<TNewOrderResponse>(`${BURGER_API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: getAuthorizationHeader(),
    },
    body: JSON.stringify({ ingredients }),
  }).then((data) => {
    if (data?.success) return data;
    return Promise.reject(data);
  });

type TOrderByNumberResponse = TServerResponse<{
  orders: TOrder[];
}>;

export const getOrderByNumberApi = (number: number) =>
  fetch(`${BURGER_API_URL}/orders/${number}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => checkResponse<TOrderByNumberResponse>(res));

export type TRegisterData = {
  email: string;
  name: string;
  password: string;
};

type TAuthResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
  user: TUser;
}>;

export const registerUserApi = (data: TRegisterData) =>
  fetch(`${BURGER_API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  })
    .then((res) => checkResponse<TAuthResponse>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

export type TLoginData = {
  email: string;
  password: string;
};

export const loginUserApi = (data: TLoginData) =>
  fetch(`${BURGER_API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  })
    .then((res) => checkResponse<TAuthResponse>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

export const forgotPasswordApi = (data: { email: string }) =>
  fetch(`${BURGER_API_URL}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  })
    .then((res) => checkResponse<TServerResponse<Record<string, never>>>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

export const resetPasswordApi = (data: { password: string; token: string }) =>
  fetch(`${BURGER_API_URL}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  })
    .then((res) => checkResponse<TServerResponse<Record<string, never>>>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

type TUserResponse = TServerResponse<{ user: TUser }>;

export const getUserApi = () =>
  fetchWithRefresh<TUserResponse>(`${BURGER_API_URL}/auth/user`, {
    headers: {
      authorization: getAuthorizationHeader(),
    },
  });

export const updateUserApi = (user: Partial<TRegisterData>) =>
  fetchWithRefresh<TUserResponse>(`${BURGER_API_URL}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: getAuthorizationHeader(),
    },
    body: JSON.stringify(user),
  });

export const logoutApi = () =>
  fetch(`${BURGER_API_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      token: getCookie('refreshToken'),
    }),
  }).then((res) => checkResponse<TServerResponse<Record<string, never>>>(res));
