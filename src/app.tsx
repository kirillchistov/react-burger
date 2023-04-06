//  Вернул app.jsx в корень как разводяющую с роутингом по остальным  //
//  Здесь добавил все для роутинга  //
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { 
  LOGINURL, 
  REGURL, 
  PROFILEURL, 
  HOMEURL, 
  FEEDURL, 
  RESETPASSURL, 
  INGREDIENTSID, 
  PROFILEORDERSURL, 
  FORGOTURL 
} from './utils/constants';
import { useDispatch } from './hooks/useDispatch';
//  Импортирую все странички из разводящего index файла //
import {
  RegisterPage,
  LoginPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  HomePage,
  ProfilePage,
  IngredientPage,
  OrdersPage,
  FeedPage,
  NotFoundPage,
} from './pages';
import { ProtectedRouteElement } from './components/protected-route/protected-route';
import { IngredientDetails } from './components/ingredient-details/ingredient-details';
import { getIngredients } from './services/actions/ingredient-actions';
import { Modal } from './components/modal/modal';
import { useEffect } from 'react';
//  import { Order } from './components/order/order';


const App = () => {
/*  Вариант решения от Влада:
  const ModalSwitch = () => {
    const location = useLocation();
    const navigate = useNavigate();
    let background = location.state && location.state.background;

  const handleModalClose = () => {
   dispatch({
    type: RESET_ITEM_TO_VIEW,
   });
   navigate(-1);
 };
*/
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //  Смотрю как открывают ингридиент и показываю модалку или страницу  //
  const isBackground = location.state && location.state.ingredientModal;

  //  Маршруты для всех: home, ingredient, feed?,  404 //
  //  ...для авторизованных: profile, profile/orders, profile/orders/:id  //
  //  ...для не-авторизованных: login, register?, forgot-password, reset-password?  //
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
      { /* не ясно, что будет в ленте для неавторизованных - номера чужих заказов? */ }

      {/* По аналогии с ингредиентами надо сделать заказы
      {isBackground && (
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
      */}


      <Route path={FEEDURL} element={<FeedPage />} />
      {/* <Route path='/feed' element={
        <ProtectedRouteElement
          element={<FeedPage />}
          showWhen='notLoggedIn'
        />
      } /> */}
      {isBackground && (
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