import { useLocation, NavLink, matchPath } from 'react-router-dom';
import PropTypes from 'prop-types';

import ProfileNavSyle from './profile-nav.module.css';

export const ProfileNav = ({ navTip }) => {
  //  Здесь будет dispatch  //
  //  Здесь будет refreshToken  //
  const location = useLocation();
  
  //  вынести URLы в контстанты  //
  const activeProfileHome = matchPath(location.pathname, "/profile");
  const activeOrders = matchPath(location.pathname, "/profile/orders");
  
  //  Здесь будет функция подсветки  //

  const logout = (e) => {
    e.preventDefault();
    //  Здесь будет dispatch  //
  };

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
