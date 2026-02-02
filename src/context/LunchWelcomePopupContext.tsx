import React, { createContext, useContext, useState, useEffect } from 'react';

interface LunchWelcomePopupContextType {
  isOpen: boolean;
  openPopup: () => void;
  closePopup: () => void;
}

const LunchWelcomePopupContext = createContext<LunchWelcomePopupContextType | undefined>(undefined);

export const LunchWelcomePopupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  return (
    <LunchWelcomePopupContext.Provider value={{ isOpen, openPopup, closePopup }}>
      {children}
    </LunchWelcomePopupContext.Provider>
  );
};

export const useLunchWelcomePopup = () => {
  const context = useContext(LunchWelcomePopupContext);
  if (!context) {
    throw new Error('useLunchWelcomePopup must be used within LunchWelcomePopupProvider');
  }
  return context;
};
