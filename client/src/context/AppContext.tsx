import React, { createContext, useContext, useState, useEffect } from 'react';
import { type Transaction } from '../data/mockData';

type Role = 'admin' | 'viewer';

interface ContextType {
  role: Role;
  setRole: (role: Role) => void;
  transactions: Transaction[];
  addTransaction: (tx: Transaction) => void;
  deleteTransaction: (id: string) => void;
}

const AppContext = createContext<ContextType | undefined>(undefined);

const API_URL = import.meta.env.VITE_API_URL || 'https://finance-dashboard-8lvq.onrender.com/api/transactions';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role>('admin');
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        // Sort transactions by date descending
        const sortedData = data.sort((a: Transaction, b: Transaction) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setTransactions(sortedData);
      })
      .catch(err => console.error("Error fetching transactions:", err));
  }, []);

  const addTransaction = async (tx: Transaction) => {
    if (role !== 'admin') return;
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tx)
      });
      const newTx = await res.json();
      setTransactions(prev => [newTx, ...prev].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    } catch(err) {
      console.error("Error adding transaction:", err);
    }
  };

  const deleteTransaction = async (id: string) => {
    if (role !== 'admin') return;
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setTransactions(prev => prev.filter(t => t.id !== id));
    } catch(err) {
      console.error("Error deleting transaction:", err);
    }
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
