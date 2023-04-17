import { TypedUseSelectorHook, useSelector as selectorHook } from 'react-redux';
import { RootState } from '../services/types';

//  Отправляю только известный action  //
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
