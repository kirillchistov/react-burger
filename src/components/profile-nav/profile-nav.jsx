import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import ProfileNavSyle from "./profile-nav.module.css";

export const ProfileNav = ({ navTip }) => {
  //  Здесь будет dispatch  //
  //  Здесь будет refreshToken  //

  /*
    activeColor: "#F2F2F3",
  */
  //  Здесь будет функция подсветки  //

  const logout = (e) => {
    e.preventDefault();
    //  Здесь будет dispatch  //
  };

  return (
    <div className={ProfileNavSyle.container}>
      <nav className={`mb-20 ${ProfileNavSyle.navbar}`}>
        <NavLink
          to="/profile"
          end
          className={`text text_type_main-medium text_color_inactive pt-4 pb-4 ${ProfileNavSyle.link}`}
        >
          Профиль
        </NavLink>
        <NavLink
          to="/profile/orders"
          className={`text text_type_main-medium text_color_inactive pt-4 pb-4 ${ProfileNavSyle.link}`}
        >
          История заказов
        </NavLink>
        <NavLink
          to="/login"
          className={`text text_type_main-medium text_color_inactive pt-4 pb-4 ${ProfileNavSyle.link}`}
          onClick={logout}
        >
          Выход
        </NavLink>
      </nav>
      <p className="text text_type_main-default text_color_inactive">{navTip}</p>
    </div>
  );
}

ProfileNav.propTypes = {
  navTip: PropTypes.string.isRequired,
};
