//  Пока что общий файл для TS типов  //

//  Импортирую store, колбэк, action и функцию для его создания в redux store  //
import { store } from '../services/store/store';
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';

//  Импортирую actions для redux  //
import { TIngredientActions } from '../services/actions/ingredient-actions';
import { TAuthActions } from '../services/actions/auth-actions';
import { TOrderActions } from '../services/actions/order-actions';

//  Типизирую actions  //
type TAppActions = TIngredientActions | TOrderActions | TAuthActions;

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

//  Типизирую объект заказа  //
export type TOrder = {
  _id: string;
  number: number;
  name: string;
  status: string;
  createdAt: Date;
  ingredients: string[];
}

//  Типизирую функцию проверки ответа от сервера - буль  //
export type TResponse<T> = {
  user(user: any): import("../services/actions/auth-actions").IUpdateUserProfileOK;
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

