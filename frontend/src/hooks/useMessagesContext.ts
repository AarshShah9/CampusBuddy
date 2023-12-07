import { useContext } from 'react';
import MessagesContext from '~/contexts/messagesContext';

export default function useMessagesContext() {
  const contextValues = useContext(MessagesContext);

  if (!contextValues) 
    throw new Error('useMessagesContext must be used within a MessagesContextProvider');

  return contextValues;
}