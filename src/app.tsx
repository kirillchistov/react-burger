//  Вернул app.jsx в корень как разводяющую с роутингом по остальным  //
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { 
  HOMEURL, 
  INGREDIENTSID, 
  FEEDURL,
  FEEDID,
  REGURL,
  LOGINURL,
  PROFILEURL,
  FORGOTURL,
  RESETPASSURL,
  PROFILEORDERSURL,
  ORDERSID,
} from './utils/constants';
import { useDispatch } from './hooks/useDispatch';
//  Импортирую все странички из разводящего index файла //
import {
  HomePage,
  IngredientPage,
  FeedPage,
  RegisterPage,
  LoginPage,
  ProfilePage,
  ForgotPasswordPage,
  ResetPasswordPage,
  OrdersPage,
  NotFoundPage,
  OrderPage
} from './pages';
import { ProtectedRouteElement } from './components/protected-route/protected-route';
import { IngredientDetails } from './components/ingredient-details/ingredient-details';
import { getIngredients } from './services/actions/ingredient-actions';
import { Order } from './components/order/order';
import { Modal } from './components/modal/modal';
import { useEffect } from 'react';


const App = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //  Смотрю как открывают ингридиент/заказ и показываю модалку/страницу  //
  const isHomeBackground = location.state && location.state.ingredientModal;
  const isFeedBackground = location.state && location.state.feedItemModal;

  //  Маршруты для всех: /home, /ingredient, /feed, /feed/:id //
  //  ...для авторизованных: /profile, /profile/orders, /profile/orders/:id  //
  //  ...для не-авторизованных: /login, /register?, /forgot-password, /reset-password?  //
  return (
    <Routes>
      <Route path={HOMEURL} element={<HomePage />} />
      <Route path={REGURL} element={
        <ProtectedRouteElement
          element={<RegisterPage />}
          showWhen='notLoggedIn'
        />
      } />
      <Route path={LOGINURL} element={
        <ProtectedRouteElement
          element={<LoginPage />}
          showWhen='notLoggedIn'
        />
      } />
      <Route path={FORGOTURL} element={
        <ProtectedRouteElement
          element={<ForgotPasswordPage />}
          showWhen='notLoggedIn'
        />
      } />
      { /* здесь надо сделать развилку - авторизованных переспрашивать */ }
      <Route path={RESETPASSURL} element={
        <ProtectedRouteElement
          element={<ResetPasswordPage />}
          showWhen='notLoggedIn'
        />
      } />
      { /* здесь надо сделать развилку - неавторизованных отправлять на логин */ }
      <Route path={PROFILEURL} element={
        <ProtectedRouteElement
          element={<ProfilePage />}
          showWhen='loggedIn'
        />
      } />
      <Route path={PROFILEORDERSURL} element={
        <ProtectedRouteElement
          element={<OrdersPage />}
          showWhen='loggedIn'
        />
      } />

      {isFeedBackground && (
        <Route path={ORDERSID} element={
          <Modal handleClose={() => navigate(-1)} title='Детали заказа'>
            <Order />
          </Modal>
        } />
      )}
      <Route path={ORDERSID} element={
        <ProtectedRouteElement
          element={<OrderPage />}
          showWhen='loggedIn'
        />
      } />

      <Route path={FEEDURL} element={<FeedPage />} />
      <Route path='/feed' element={
        <ProtectedRouteElement
          element={<FeedPage />}
          showWhen='notLoggedIn'
        />
      } />
      <Route path={FEEDID} element={<OrderPage />} />
      {isHomeBackground && (
        <Route path={INGREDIENTSID} element={
          <Modal handleClose={() => navigate(-1)} title='Детали ингредиента'>
            <IngredientDetails />
          </Modal>
        } />
      )}
      <Route path={INGREDIENTSID} element={<IngredientPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;