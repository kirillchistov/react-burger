
//  Страница ленты заказов  //
import React from 'react';
import { AppHeader } from '../components/app-header/app-header';
import { FeedItem } from '../components/feed-item/feed-item';
//  import { FeedStatus } from '../components/feed-status/feed-status';
//  import { HTML5Backend } from 'react-dnd-html5-backend';
//  import { DndProvider } from 'react-dnd';
import FeedStyles from './feed.module.css';

//  Пока в разметке шапка и заголовок страницы  //
export const FeedPage = () => {
  return (
    <div className='pt-10 pr-10 pb-10 pl-10'>
      <AppHeader />
      <main className={FeedStyles.mainContainer}>
          <FeedItem 
            order=1112223
            key=1112445
            showOrderStatus={false}
          />
          {/* <FeedStatus /> */}
      </main>
    </div>
  );
}

//  нет пропсов, нет типизации  //
