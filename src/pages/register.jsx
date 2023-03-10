/*  
Сверстайте страницы авторизации и регистрации с использованием библиотеки компонентов.
Пока не нужно описывать саму функциональность регистрации.
В качестве минимальной работы необходимо настроить переходы:
Клик на «Войти» направляет пользователя на маршрут /login .
Клик на «Восстановить пароль» направляет пользователя на маршрут /forgot-password.
*/
//  Нужна шапка  //
import { useNavigate } from 'react-router-dom';
//  { useDispatch } и { useForm } пока не делаю  //
import { AppHeader } from '../components/app-header/app-header';
//  Из библиотеки беру кнопку, поле ввода обычно и поле пароля  //
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
// нужен action регистрации для redux  //
import RegisterStyle from './login.module.css';

export const RegistrationPage = () => {
  const navigate = useNavigate();
  // dispatch пока не создаем  //
  // хук для стейтов поля ввода useForm тоже пока не делаю  //

  const submitRegistration = (e) => {
    e.preventDefault();
    //  здесь будет dispatch, пока заглушка  //
  };

  const handleChange = (e) => {
    e.preventDefault();
    //  здесь будет dispatch, пока заглушка  //
  };

  //  Разметка: шапка, flex-контейнер с grid-формой внутри  //
  //  Стили заимствовал из логина  //
  return (
    <div className='pt-10 pr-10 pb-10 pl-10'>
      <AppHeader />
      <div className={RegisterStyle.container}>
        <form className={RegisterStyle.form} onSubmit={submitRegistration}>
          <h1 className='text text_type_main-medium'>Регистрация</h1>

          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={handleChange}
            value={'name'}
            name={'name'}
          />
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={handleChange}
            value={'e@mail.ru'}
            name={'email'}
          />
          <PasswordInput
            type={'password'}
            onChange={handleChange}
            value={'abc123pass'}
            name={'password'}
            icon='ShowIcon'
          />
          <Button htmlType='submit' type='primary' size='medium'>
            Зарегистрироваться
          </Button>
        </form>
        <p className='text text_type_main-default'>
          Уже зарегистрированы?
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
