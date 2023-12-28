import { useContext } from 'react';
import ChatsContext from '~/contexts/chatsContext';

export default function useChatsContext() {
  const contextValues = useContext(ChatsContext);

  if (!contextValues) 
    throw new Error('useChatsContext must be used within a ChatsContextProvider');

  return contextValues;
}