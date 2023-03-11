/*  
Сверстайте страницы авторизации и регистрации с использованием библиотеки компонентов.
Пока не нужно описывать саму функциональность регистрации.
В качестве минимальной работы необходимо настроить переходы:
Клик на «Войти» направляет пользователя на маршрут /login .
Клик на «Восстановить пароль» направляет пользователя на маршрут /forgot-password.
*/
//  Нужна шапка, хуки  //
import { useNavigate } from 'react-router-dom';
// import { useDispatch } from "react-redux";
import { useForm } from "../hooks/useForm";
import { AppHeader } from '../components/app-header/app-header';
//  Из библиотеки беру кнопку, поле ввода обычно и поле пароля  //
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
// нужен action регистрации для redux  //
import RegisterStyle from './login.module.css';

export const RegistrationPage = () => {
  const navigate = useNavigate();
  //  const dispatch = useDispatch();
  const { data, setData } = useForm({
    email: 'e@mail',
    password: 'abc123pass',
    name: 'user name',
  });

  //  Обработка нажатия на кнопку регистрации  //
  const submitRegistration = (e) => {
    e.preventDefault();
    //  здесь будет dispatch, но нужен user
  };

  //  Обработка изменений в полях ввода  //
  const handleChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
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
            value={data.name}
            name={'name'}
          />
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={handleChange}
            value={data.email}
            name={'email'}
          />
          <PasswordInput
            type={'password'}
            onChange={handleChange}
            value={data.password}
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
