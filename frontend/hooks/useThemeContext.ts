import { useContext } from 'react';
import ThemeContext from '../contexts/themeContext';

const useThemeContext = () => {
  const contextValues = useContext(ThemeContext);

  if (!contextValues) 
    throw new Error('useThemeContext must be used within a ThemeContextProvider wrapped around the App');

  return contextValues;
};

export default useThemeContext;