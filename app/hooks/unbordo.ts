import UnbordoApp from '@/contexts/AppContext';
import { useContext } from 'react';

export const useUnBordo = () => useContext(UnbordoApp.Context);
