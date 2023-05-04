//  Пока что общий файл для TS типов - вынести типизацию данных в data.ts //

//  Импортирую actions для redux  //
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';

//  Импортирую store, колбэк, action и функцию для его создания в redux store  //
import { store } from '../store';

//  Импортирую actions для redux  //
import { TIngredientActions } from '../actions/ingredient-actions';
import { TAuthActions } from '../actions/auth-actions';
import { TOrderActions } from '../actions/order-actions';
import { TWSConnectionActions, TWSConnectionAuthActions } from '../actions/ws-actions';

import { wsActions, wsActionsAuth } from '../store'

//  Типизирую actions  //
export type TAppActions = 
 | TIngredientActions 
 | TOrderActions 
 | TAuthActions
 | TWSConnectionActions
 | TWSConnectionAuthActions;

//  Типизирую state и dispatch как в тренажере  //
//  export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TAppActions>
>;

//  Типизирую объект пользователя  //
export type TUser = {
  name: string;
  email: string;
  password: string;
}

//  Типизирую объект данных формы логина/реги  //
export type TFormValues = {
  name?: string;
  email?: string;
  password?: string;
  token?: string;
}

//  Типизирую объект ингредиента  //
export type TIngredient = {
  _id: string;
  _uid: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  type: string;
  calories: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
}

//  Типизирую список ингредиентов  //
export type TIngredients = {
  ingredients: {
    ingredients: TIngredient[];
    ingredientsRequest: boolean;
    ingredientsFailed: boolean;
  };
};

export type TIngredientCount = {
  [key: string]: TIngredient & { count: number };
};


//  Типизирую объект заказа  //
export type TOrder = {
  _id: string;
  number: number;
  name: string;
  status: string;
  createdAt: string;
  ingredients: string[];
}

//  Типизирую функцию проверки ответа от сервера - буль  //
export type TResponse<T> = {
  user(user: any): import('../actions/auth-actions').IUpdateUserProfileOK;
  success: boolean;
} & T;

//  Типизирую функцию получения токенов - объект  //
export type TTokenResponse = {
  accessToken: string;
  refreshToken: string;
};

//  Типизирую функцию получения юзера - объект  //
export type TUserResponse = {
  user: TUser;
};

//  Типизирую функцию авторизации - объект токена, обогащенный юзером  //
export type TAuthResponse = TTokenResponse & TUserResponse;

//  Типизирую функцию получения ингридиента - объект  //
export type TIngredientResponse = {
  data: TIngredient[];
};

//  Типизирую функцию получения заказа - объект  //
export type TOrderResponse = {
  order: TOrder;
};

//  Типизирую action для WS до и после логина  //
export type TWSAction = typeof wsActions | typeof wsActionsAuth;

//  Типизирую сообщения WS по заказам  //
export type TWsMessage = {
  success?: boolean;
  orders: TOrder[];
  total: number|null;
  totalToday: number|null;
};
