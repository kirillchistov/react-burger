//  Хук для обработки изменений в рег. форме и профиле  //
import { useState } from 'react';

export const useForm = (inputData) => {
  //  Создаем состояние для обновления значений в поле ввода  //
  const [data, setData] = useState(inputData);
  
  //  Вешаем сеттер-обработчик для рендера обновленных значений  //
  const handleDataChange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };
  return { data, handleDataChange, setData };
}