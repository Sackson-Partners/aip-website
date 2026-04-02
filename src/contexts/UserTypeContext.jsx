import React, { createContext, useContext, useState, useEffect } from 'react';

const UserTypeContext = createContext(null);

export const useUserType = () => {
  const context = useContext(UserTypeContext);
  if (!context) {
    throw new Error('useUserType must be used within a UserTypeProvider');
  }
  return context;
};

export const UserTypeProvider = ({ children }) => {
  const [selectedUserType, setSelectedUserType] = useState(() => {
    return localStorage.getItem('selectedUserType') || 'institutional_investor';
  });

  useEffect(() => {
    localStorage.setItem('selectedUserType', selectedUserType);
  }, [selectedUserType]);

  const value = {
    selectedUserType,
    setSelectedUserType,
    userTypes: {
      INSTITUTIONAL_INVESTOR: 'institutional_investor',
      PROJECT_SPONSOR: 'project_sponsor',
      GOVERNMENT_PPP: 'government_ppp',
      EPC_CONTRACTOR: 'epc_contractor'
    },
    userTypeLabels: {
      institutional_investor: 'Institutional Investor',
      project_sponsor: 'Project Sponsor',
      government_ppp: 'Government & PPP Unit',
      epc_contractor: 'EPC Contractor'
    }
  };

  return <UserTypeContext.Provider value={value}>{children}</UserTypeContext.Provider>;
};