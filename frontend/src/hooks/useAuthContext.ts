import {useContext} from 'react';
import AuthContext from '~/contexts/authContext';

export default function useAuthContext() {
  const contextValues = useContext(AuthContext);

  if (!contextValues) 
    throw new Error('useAuthContext must be used within a AuthContextProvider wrapped around the App');

  return contextValues;
}