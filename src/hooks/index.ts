//  Привел в соответствие структуре в ТЗ спринта  //
import { 
    TypedUseSelectorHook, 
    useSelector as selectorHook,
    useDispatch as dispatchHook,
} from 'react-redux';
import { RootState, AppDispatch, AppThunk } from '../services/types';

//  Отправляю только известный action  //
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch = () => dispatchHook<AppDispatch & AppThunk>();
