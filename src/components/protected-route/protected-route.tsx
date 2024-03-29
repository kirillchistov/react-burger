//  Компонент для ограничения доступа посторонних пользователей  //
/* 
ProtectedRouteElement принимает элемент, который надо отображать по конкретному роуту. 
Передавать ProtectedRouteElement буду в пропс element компонента Route
*/
//  Добавил хуки для монтирования, колбэка, переадресации и redux  //
import React, { useEffect, useCallback, FC, ReactElement } from 'react';
import { Navigate, Location, useLocation } from 'react-router-dom';
import { useSelector } from '../../hooks/useSelector';
import { useDispatch } from '../../hooks/useDispatch';
//  Нужны оба токена  //
import { authTokens } from '../../utils/auth';
import { getUser } from '../../utils/state';
//  Нужны экшены профиля и токена  //
import { getUserProfile, getAccessToken } from '../../services/actions/auth-actions';

interface IProtectedRoute {
  element: ReactElement;
  showWhen: string;
}

export const ProtectedRouteElement: FC<IProtectedRoute> = ({ element, showWhen }) => {
  const dispatch = useDispatch();
  const location: Location = useLocation();
  const { state: locationState } = useLocation();
  
  //  Отправляю экшены, после успешного запроса, записываю данные в Redux  //
  //  С помощью useSelector получаю доступ к данным пользователя и токену. PROFIT!  //
  //  const user = useSelector(state => state.auth.user);
  const user = useSelector(getUser);
  const { accessToken, refreshToken } = authTokens();

  //  Колбэк по условию наличия токена и объекта user в глобальном состоянии  //
  //  Если есть и токен и юзер, возвращаем оба токена и юзера  //
  const auth = useCallback(
    //  () => (accessToken || refreshToken) && user, [accessToken, refreshToken, user]
    () => accessToken || refreshToken, [accessToken, refreshToken]
  );
  //  При монтировании проверяю токен и юзера, получаю данные профиля  //
  useEffect(() => {
    if ((accessToken || refreshToken) && !user) {
      if (!accessToken) {
        dispatch(getAccessToken(refreshToken));
      }
      dispatch(getUserProfile());
    }
  }, [accessToken, dispatch, refreshToken, user]);

  const render = () => {
    let elementToRender = element;
    switch (showWhen) {
      case 'loggedIn':
        if (!auth()) {
          elementToRender = (
            <Navigate to='/login' replace state={{ redirectTo: location }} />
          );
        }
        break;
      case 'notLoggedIn':
        if (auth()) {
          if (locationState) {
            const { redirectTo } = locationState;
            elementToRender = (
              <Navigate
                to={`${redirectTo.pathname}`}
                replace
                state={{ redirectTo: location }}
              />
            );
          } else {
            elementToRender = (<Navigate to='/' replace state={{ redirectTo: location }} />);
          }
        }
        break;
      default:
        break;
    }
    return elementToRender;
  };
  return render();
};

export default React.memo(ProtectedRouteElement);