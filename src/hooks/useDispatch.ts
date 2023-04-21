import { useDispatch as dispatchHook } from 'react-redux';
import { AppDispatch, AppThunk } from '../services/types';

//  Отправляю только известный action  //
export const useDispatch = () => dispatchHook<AppDispatch & AppThunk>();
