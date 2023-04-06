import { useDispatch as dispatchHook } from 'react-redux';
import { AppDispatch, AppThunk } from '../utils/types';

//  Отправляю только известный action  //
export const useDispatch = () => dispatchHook<AppDispatch & AppThunk>();
