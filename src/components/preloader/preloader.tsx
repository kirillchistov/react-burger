//  Компонент для показа прогресса загрузки пользователю в периоды ожидания ответа сервера  //
import React, { FC } from 'react';
import preloaderStyles from './preloader.module.css';

const Preloader:FC = () => {
  return (
    <div className={preloaderStyles.preloader}>
      <div className={preloaderStyles.container}>
        <span className={preloaderStyles.round}></span>
      </div>
    </div>
  );
};

export default Preloader;