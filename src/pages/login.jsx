/*  
Страница авторизации с использованием библиотеки компонентов.
Пока не нужно описывать саму функциональность авторизации.
В качестве минимальной работы необходимо настроить переходы:
Клик на «Зарегистрироваться» направляет пользователя на маршрут /register.
Клик на «Восстановить пароль» направляет пользователя на маршрут /forgot-password.
*/
//  Нужна шапка  //
import { AppHeader } from '../components/app-header/app-header';
//  Из библиотеки беру кнопку, поле ввода обычный инпут и поле пароля  //
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
// Хуки { useDispatch } и для формы { useForm } пока не подключаем //
// нужен action логина для redux  //
import LoginStyle from './login.module.css';

export const LoginPage = () => {
  const navigate = useNavigate();

  // dispatch пока не создаем  //
  // хук для стейтов поля ввода useForm тоже пока не делаю  //

  const submitLogin = (e) => {
    e.preventDefault();
    //  здесь будет dispatch, пока заглушка  //
  };

  const handleChange = (e) => {
    e.preventDefault();
    //  здесь будет dispatch, пока заглушка  //
  };

  //  Добавить отступы к зарег и вспомнить  //

  //  Разметка: шапка, flex-контейнер с grid-формой внутри  //
  return (
    <div className='pt-10 pr-10 pb-10 pl-10'>
      <AppHeader />
      <div className={LoginStyle.container}>
        <form className={LoginStyle.form} onSubmit={submitLogin}>
          <h1 className='text text_type_main-medium'>Вход</h1>

          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={handleChange}
            value={'e-mail'}
            name={'email'}
          />
          <PasswordInput
            onChange={handleChange}
            value={'пароль123pass'}
            name={'password'}
            icon='ShowIcon'
          />
          <Button htmlType='submit' type='primary' size='medium'>
            Войти
          </Button>
        </form>
        <p className='text text_type_main-default'>
          Вы — новый пользователь?
          <Button
            onClick={() => navigate('/register')}
            htmlType='button'
            type='secondary'
            size='medium'
            
          >
            Зарегистрироваться
          </Button>
        </p>
        <p className='text text_type_main-default'>
          Забыли пароль?
          <Button
            onClick={() => navigate('/forgot-password')}
            htmlType='button'
            type='secondary'
            size='medium'

          >
            Восстановить пароль
          </Button>
        </p>
      </div>
    </div>
  );
}
