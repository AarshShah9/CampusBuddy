import { useContext } from 'react';
import ChatsSearchContext from '~/contexts/chatsSearchContext';

export default function useChatsSearchContext() {
  const contextValues = useContext(ChatsSearchContext);

  if (!contextValues) 
    throw new Error('useChatsSearchContext must be used within a ChatsSearchContextProvider');

  return contextValues;
}