import React, { createContext, useContext, useState } from 'react';

const FormModalContext = createContext(null);

export const useFormModal = () => {
  const context = useContext(FormModalContext);
  if (!context) {
    throw new Error('useFormModal must be used within a FormModalProvider');
  }
  return context;
};

export const FormModalProvider = ({ children }) => {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (modalName) => {
    // Standardize modal names or allow flexible string passing
    // Supported: 'subscribe', 'subscribeForAccess', 'customBrief', 'requestCustomBrief', 'consultation', 'platformAccess', 'guestProposal', 'demo'
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const value = {
    activeModal,
    openModal,
    closeModal
  };

  return (
    <FormModalContext.Provider value={value}>
      {children}
    </FormModalContext.Provider>
  );
};