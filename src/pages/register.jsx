/*  
Сверстайте страницы авторизации и регистрации с использованием библиотеки компонентов.
Пока не нужно описывать саму функциональность регистрации.
В качестве минимальной работы необходимо настроить переходы:
Клик на «Войти» направляет пользователя на маршрут /login .
Клик на «Восстановить пароль» направляет пользователя на маршрут /forgot-password.
Формат тела запроса: { "email": "", "password": "", "name": "" }
Тело ответа, если успех: { "success": true, "user": { "email": "", "name": "" }, 
"accessToken": "Bearer ...", "refreshToken": "" }
*/
//  Нужна шапка, хуки  //
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { AppHeader } from '../components/app-header/app-header';
//  Из библиотеки беру кнопку, поле ввода обычно и поле пароля  //
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
//  action регистрации для redux  //
import { registerUser } from '../services/actions/auth-actions';
import RegisterStyle from './login.module.css';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  //  Задаю начальное состояние данных пользователя  //
  const { data, handleDataChange } = useForm({
    email: '',
    password: '',
    name: '',
  });

  //  Обработка нажатия на кнопку регистрации  //
  const submitRegisterUser = (e) => {
    e.preventDefault();
    dispatch(registerUser(data));
  };

  //  Обработка изменений в полях ввода  //
  /* const handleChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };
  */

  //  Разметка: шапка, flex-контейнер с grid-формой внутри  //
  //  Стили заимствовал из логина  //
  return (
    <div className='pt-10 pr-10 pb-10 pl-10'>
      <AppHeader />
      <div className={RegisterStyle.container}>
        <form className={RegisterStyle.form} onSubmit={submitRegisterUser}>
          <h1 className='text text_type_main-medium'>Регистрация</h1>

          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={handleDataChange}
            value={data.name}
            name={'name'}
          />
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={handleDataChange}
            value={data.email}
            name={'email'}
          />
          <PasswordInput
            type={'password'}
            onChange={handleDataChange}
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
