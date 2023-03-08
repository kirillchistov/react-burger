//  Вернул app.jsx в корень как разводяющую с роутингом по остальным  //
//  Здесь добавил все для роутинга  //
import { Routes, Route, useNavigate } from 'react-router-dom';

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
import { IngredientDetails } from './components/ingredient-details/ingredient-details';
import { Modal } from './components/modal/modal';


const App = () => {
  const navigate = useNavigate();
  //  const location = useLocation();

  const isHomeLocation = false

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

export default App;