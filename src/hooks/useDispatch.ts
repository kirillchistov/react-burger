import { useDispatch as dispatchHook } from 'react-redux';
import { AppDispatch, AppThunk } from '../utils/types';

export const useDispatch = () => dispatchHook<AppDispatch|AppThunk|any>();
