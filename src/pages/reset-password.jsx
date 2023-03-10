//  Страница для сброса пароля  //
//  Нужны будут хуки для redux  //
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/app-header/app-header';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
//  Стили берем из login  //
import PasswordStyles from './login.module.css';

export const ResetPasswordPage = () => {
  const navigate = useNavigate();
  //  const dispatch = useDispatch();
  
  const submitForgotPassword = (e) => {
    e.preventDefault();
    //  здесь будет dispatch  //
  };

  const handleChange = (e) => {
    e.preventDefault();
    //  здесь будет обработчик  //
  };

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
            value={() => console.log('здесь будет функция пароля')}
            name={'password'}
            icon='ShowIcon'
          />
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={handleChange}
            value={() => console.log('здесь будет функция токена')}
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
