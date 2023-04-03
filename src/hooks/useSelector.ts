import { TypedUseSelectorHook, useSelector as selectorHook } from 'react-redux';
import { RootState } from '../utils/types';

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
