//  Страница для воспоминаний о пароле  //
//  Нужны будут хуки для redux  //
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/app-header/app-header';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
//  Стили берем из login  //
import PasswordStyles from './login.module.css';

export const ForgotPasswordPage = () => {
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
          <Input
            type={'email'}
            placeholder={'Укажите e-mail'}
            onChange={handleChange}
            value={() => console.log('здесь будет функция email')}
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
