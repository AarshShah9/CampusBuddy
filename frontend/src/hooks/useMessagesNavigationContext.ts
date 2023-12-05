import { useContext } from 'react';
import MessagesNavigationContext from '~/contexts/messagesNavigationContext'; 

export default function useMessagesNavigationContext() {
  const contextValues = useContext(MessagesNavigationContext);

  if (!contextValues) 
    throw new Error('useMessagesNavigationContext must be used within a MessagesNavigationContextProvider');

  return contextValues;
};