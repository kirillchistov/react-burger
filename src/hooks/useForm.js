//  Хук для обработки изменений в рег. форме и профиле  //
import { useState } from "react";

export const useForm = (inputValues) => {
  //  Создаем состояние для обновления значений в поле ввода  //
  const [values, setValues] = useState(inputValues);
  
  //  Вешаем сеттер-обработчик для рендера обновленных значений  //
  const handleChange = (e) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}