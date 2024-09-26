import React, { createContext, useContext, useState, ReactNode } from 'react';

// Definindo a estrutura do usuário
interface User {
  name: string;
  picture: string;
  id: string;
}

interface UserContextType {
  currentUser: User | null;
  updateCurrentUser: (user: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>({
    name: '',
    picture: '',
    id: '',
  });

  const updateCurrentUser = (user: User) => {
    setCurrentUser(user);
  };

  return (
    <UserContext.Provider value={{ currentUser, updateCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
