//  Компонент для ограничения доступа посторонних пользователей  //
import React, { useEffect, FC, ReactElement } from 'react';
import { Navigate, Location, useLocation } from 'react-router-dom';
import { useSelector } from '@/hooks/useSelector';
import { useDispatch } from '@/hooks/useDispatch';
import { authTokens } from '@/utils/auth';
import { getUser } from '@/utils/state';
import { getUserProfile, getAccessToken } from '@/services/actions/auth-actions';
import Preloader from '@/components/preloader/preloader';
import { LOGINURL } from '@/utils/constants';

interface IProtectedRoute {
  element: ReactElement;
  showWhen: 'loggedIn' | 'notLoggedIn';
}

export const ProtectedRouteElement: FC<IProtectedRoute> = ({ element, showWhen }) => {
  const dispatch = useDispatch();
  const location: Location = useLocation();
  const { state: locationState } = useLocation();

  const user = useSelector(getUser);
  const authRequest = useSelector((state) => state.auth.request);
  const authFailed = useSelector((state) => state.auth.requestFailed);
  const { accessToken, refreshToken } = authTokens();

  const hasTokens = Boolean(accessToken || refreshToken);
  const isAuthenticated = Boolean(user && hasTokens);

  useEffect(() => {
    if (!hasTokens || user) return;

    if (!accessToken && refreshToken) {
      dispatch(getAccessToken());
      return;
    }

    dispatch(getUserProfile());
  }, [accessToken, dispatch, hasTokens, refreshToken, user]);

  if (showWhen === 'loggedIn') {
    if (!hasTokens || (authFailed && !user)) {
      return <Navigate to={LOGINURL} replace state={{ redirectTo: location }} />;
    }

    if (!user) {
      return <Preloader />;
    }

    return element;
  }

  if (showWhen === 'notLoggedIn') {
    if (isAuthenticated || (hasTokens && authRequest)) {
      if (hasTokens && !user && authRequest) {
        return <Preloader />;
      }

      if (locationState?.redirectTo) {
        const { redirectTo } = locationState;
        return (
          <Navigate
            to={`${redirectTo.pathname}`}
            replace
            state={{ redirectTo: location }}
          />
        );
      }

      return <Navigate to='/' replace state={{ redirectTo: location }} />;
    }

    return element;
  }

  return element;
};

export default React.memo(ProtectedRouteElement);
