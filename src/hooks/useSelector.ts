import { TypedUseSelectorHook, useSelector as selectorHook } from 'react-redux';
import { RootState } from '../utils/types';

//  Отправляю только известный action  //
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
