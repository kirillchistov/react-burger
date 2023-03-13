//  Вернул app.jsx в корень как разводяющую с роутингом по остальным  //
//  Здесь добавил все для роутинга  //
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

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
import { Modal } from './components/modal/modal';


const App = () => {
/*  Вариант решения от Влада - чуть переработал
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

  const isBackground = location.state && location.state.ingredientModal;

  return (
    <Routes>
      <Route path='/' element={
        <HomePage />} />
      <Route
        path='/login'
        element={<LoginPage />}
      />
      <Route
        path='/register'
        element={<RegisterPage />}
      />
      <Route
        path='/forgot-password'
        element={<ForgotPasswordPage />}
      />
      <Route
        path='/reset-password'
        element={<ResetPasswordPage />}
      />
      <Route
        path='/profile'
        element={
          <ProtectedRouteElement
            element={<ProfilePage />}
            accessType="authorized"
          />
        }
      />
      <Route
        path='/profile/orders'
        element={
          <ProtectedRouteElement
            element={<OrdersPage />}
            accessType="authorized"
          />
        }
      />
      <Route path='/feed' element={<FeedPage />} />
      {isBackground && (
        <Route
          path='/ingredients/:id'
          element={
            <Modal handleClose={() => navigate(-1)} title='Детали ингредиента'>
              <IngredientDetails />
            </Modal>
          }
        />
      )}
      <Route path='/ingredients/:id' element={<IngredientPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;