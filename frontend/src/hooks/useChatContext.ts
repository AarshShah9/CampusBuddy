import { useContext } from 'react';
import ChatContext from '~/contexts/chatContext';

export default function useChatContext() {
  const contextValues = useContext(ChatContext);

  if (!contextValues) 
    throw new Error('useChatContext must be used within a ChatContextProvider');

  return contextValues;
}