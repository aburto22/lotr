import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import { IRootStore, IAppDispatch } from '../store';

export const useAppSelector: TypedUseSelectorHook<IRootStore> = useSelector;

export const useAppDispatch = () => useDispatch<IAppDispatch>();
