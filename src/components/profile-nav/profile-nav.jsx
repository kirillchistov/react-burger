//  Хуки для навигации и подсветки активного меню  //
import React from 'react';
import { useLocation, NavLink, matchPath } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authTokens } from '../../utils/auth';
import { logoutUser } from '../../services/actions/auth-actions';
import PropTypes from 'prop-types';

import ProfileNavSyle from './profile-nav.module.css';

export const ProfileNav = ({ navTip }) => {
  const dispatch = useDispatch();
  const { refreshToken } = authTokens();
  
  const location = useLocation();
  
  //  вынести URLы в контстанты  //
  //  Определяем активный маршрут для подсветки меню  //
  const activeProfileHome = matchPath(location.pathname, '/profile');
  const activeOrders = matchPath(location.pathname, '/profile/orders');
  
  //  Выход из системы при клкие, отправляю action в redux  //
  const logout = (e) => {
    e.preventDefault();
    dispatch(logoutUser(refreshToken));
  };
  //  В разметке использую prop end для NavLink, чтобы учитывать вложенность  //
  //  В зависимости от пути / URL строки, подсвечиваю активное меню  //
  return (
    <div className={ProfileNavSyle.container}>
      <nav className={`mb-20 ${ProfileNavSyle.navbar}`}>
        <NavLink
          to='/profile'
          end
          className={`text text_type_main-medium pt-4 pb-4 ${ProfileNavSyle.link}`}
        >
          <p className={activeProfileHome ? 'text_color_primary' : 'text_color_inactive'}>
            Профиль
          </p>
        </NavLink>
        <NavLink
          to='/profile/orders'
          className={`text text_type_main-medium pt-4 pb-4 ${ProfileNavSyle.link}`}
        >
          <p className={activeOrders ? 'text_color_primary' : 'text_color_inactive'}>
            История заказов
          </p>
        </NavLink>
        <NavLink
          to='/login'
          className={`text text_type_main-medium text_color_inactive pt-4 pb-4 ${ProfileNavSyle.link}`}
          onClick={logout}
        >
          Выход
        </NavLink>
      </nav>
      <p className='text text_type_main-default text_color_inactive'>{navTip}</p>
    </div>
  );
}

ProfileNav.propTypes = {
  navTip: PropTypes.string.isRequired,
};

export default React.memo(ProfileNav);
