import React, { createContext, useContext, useState } from 'react';

interface ButtonVisibilityContextType {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
}

const ButtonVisibilityContext = createContext<ButtonVisibilityContextType | undefined>(undefined);

export const useButtonVisibility = () => {
  const context = useContext(ButtonVisibilityContext);
  if (!context) {
    throw new Error('useButtonVisibility must be used within a ButtonVisibilityProvider');
  }
  return context;
};

export const ButtonVisibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <ButtonVisibilityContext.Provider value={{ isVisible, setIsVisible }}>
      {children}
    </ButtonVisibilityContext.Provider>
  );
};
