//  Хуки для обработки изменений в рег. форме и профиле  //
import { useState, ChangeEvent } from 'react';
import { TFormValues } from '../services/types';

export const useForm = (inputData: TFormValues) => {
  //  Создаем состояние для обновления значений в поле ввода  //
  const [data, setData] = useState<TFormValues>(inputData);
  
  //  Вешаем сеттер-обработчик для рендера обновленных значений  //
  const handleDataChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };
  return { data, handleDataChange, setData };
}