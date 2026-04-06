import React, { createContext, useContext, useState, useEffect } from 'react';
import { type Transaction, mockTransactions } from '../data/mockData';

type Role = 'admin' | 'viewer';

interface ContextType {
  role: Role;
  setRole: (role: Role) => void;
  transactions: Transaction[];
  addTransaction: (tx: Transaction) => void;
  deleteTransaction: (id: string) => void;
}

const AppContext = createContext<ContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role>('admin');
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);

  const addTransaction = (tx: Transaction) => {
    if (role !== 'admin') return;
    setTransactions(prev => [tx, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    if (role !== 'admin') return;
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  return (
    <AppContext.Provider value={{ role, setRole, transactions, addTransaction, deleteTransaction }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within an AppProvider');
  return context;
};
