//  Вернул app.jsx в корень как разводяющую с роутингом по остальным  //
//  Здесь добавил все для роутинга  //
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

//  import { ProtectedRouteElement } from './components/protected-route';
import { IngredientDetails } from './components/ingredient-details/ingredient-details';
import { Modal } from './components/modal/modal';

//  Импортирую все странички из разводящего index файла //
import {
  RegistrationPage,
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


export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const isHomeLocation = location.state && location.state.ingredientModal;
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route
        path='/login'
        element={<LoginPage />}
      />
      <Route
        path='/register'
        element={<RegistrationPage />}
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
        element={<ProfilePage />}
      />
      <Route
        path='/profile/orders'
        element={<OrdersPage />}
      />
      <Route path='/feed' element={<FeedPage />} />
      {isHomeLocation && (
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
