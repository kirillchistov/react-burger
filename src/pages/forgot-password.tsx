//  Страница для воспоминаний о пароле  //
/*  На /forgot-password пользователь вводит адрес email и нажимает «Восстановить». 
После этого происходит POST запрос к эндпоинту /password-reset  */
import React, {FormEvent} from 'react';
//  хуки  //
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from '../hooks/useSelector';
import { useDispatch } from '../hooks/useDispatch';
import { useForm } from '../hooks/useForm';
import { requestResetCode } from '../services/actions/auth-actions';
//  Шапка и компоненты из UX-библиотеки  //
import { AppHeader } from '../components/app-header/app-header';
import { getResetCode } from '../utils/state';

//  Стили пока беру из login  //
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import PasswordStyles from './login.module.css';

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //  Отправляю экшен, после успешного запроса, записываю данные в Redux  //
  //  С помощью useSelector получаю доступ к данным пользователя. PROFIT!  //
  const hasResetCode = useSelector(getResetCode);
  const { data, handleDataChange } = useForm({ email: '' });
  
  //  Обрабатываю нажатие кнопки Забыли пароль - отправляю экшен  //
  const submitForgotPassword = (e: FormEvent) => {
    e.preventDefault();
    dispatch(requestResetCode(data));
  };

  //  если уже есть код, отправляю на reset-password  //
  if (hasResetCode) {
    return <Navigate to={'/reset-password'} />;
  }

  //  Разметка: шапка, flex-контейнер с grid-формой внутри  //
  //  Кнопки  ...  //
  return (
    <div className='pt-10 pr-10 pb-10 pl-10'>
      <AppHeader />
      <div className={PasswordStyles.container}>
        <form className={PasswordStyles.form} onSubmit={submitForgotPassword}>
          <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
          <Input
            type={'email'}
            placeholder={'Укажите e-mail'}
            onChange={handleDataChange}
            value={data.email !== undefined ? data.email : ''}
            name={'email'}
          />
          <Button htmlType='submit' type='primary' size='medium'>
            Восстановить
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

//  нет пропсов, нет типизации  //