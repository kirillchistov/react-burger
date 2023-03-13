//  Страница для сброса пароля  //
/*  На /reset-password пользователь вводит новый пароль и код из имейла, нажимает «Сохранить». 
    После этого происходит POST запрос к /password-reset/reset 
    Для этого требуется создать пользователя через POST запрос к /auth/register. 
    Пример тела запроса в ТЗ
*/
//  Хуки для redux, навигации, авторизации  //
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { changePassword } from '../services/actions/auth-actions';
//  Шапка и компоненты из библиотеки  //
import { AppHeader } from '../components/app-header/app-header';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
//  Стили берем из login  //
import PasswordStyles from './login.module.css';

export const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //  Отправляю экшен, после успешного запроса, записываю данные в Redux  //
  //  С помощью useSelector получаю доступ к данным пользователя. PROFIT!  //
  const { hasResetCode } = useSelector((state) => state.auth);
  const { data, handleChange,  } = useForm({ password: '', token: '' });

  const submitForgotPassword = (e) => {
    e.preventDefault();
    dispatch(changePassword(data));
    navigate('/login');
  };

  if (!hasResetCode) {
    return <Navigate to={'/forgot-password'} />;
  }

  //  Разметка: шапка, flex-контейнер с grid-формой внутри  //
  return (
    <div className='pt-10 pr-10 pb-10 pl-10'>
      <AppHeader />
      <div className={PasswordStyles.container}>
        <form className={PasswordStyles.form} onSubmit={submitForgotPassword}>
          <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
          <PasswordInput
            placeholder={'Введите новый пароль'}
            onChange={handleChange}
            value={data.password}
            name={'password'}
            icon='ShowIcon'
          />
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={handleChange}
            value={data.token}
            name={'token'}
          />
          <Button htmlType='submit' type='primary' size='medium'>
            Сохранить
          </Button>
        </form>
        <p className='text text_type_main-default'>
          Вспомнили пароль?
          <Button
            onClick={() => navigate('/login')}
            htmlType='button'
            type='secondary'
            size='medium'
          >
            Войти
          </Button>
        </p>
      </div>
    </div>
  );
}
