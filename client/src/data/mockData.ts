export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: 'Food' | 'Transport' | 'Shopping' | 'Rent' | 'Salary' | 'Investment' | 'Entertainment';
  type: 'income' | 'expense';
}

export const mockTransactions: Transaction[] = [
  { id: '1', date: '2024-03-01', description: 'Monthly Salary', amount: 5000, category: 'Salary', type: 'income' },
  { id: '2', date: '2024-03-02', description: 'Grocery Store', amount: 150, category: 'Food', type: 'expense' },
  { id: '3', date: '2024-03-05', description: 'Monthly Rent', amount: 1200, category: 'Rent', type: 'expense' },
  { id: '4', date: '2024-03-07', description: 'Gas Station', amount: 60, category: 'Transport', type: 'expense' },
  { id: '5', date: '2024-03-10', description: 'Netflix Subscription', amount: 15, category: 'Entertainment', type: 'expense' },
  { id: '6', date: '2024-03-12', description: 'Amazon Purchase', amount: 200, category: 'Shopping', type: 'expense' },
  { id: '7', date: '2024-03-15', description: 'Stock Dividend', amount: 300, category: 'Investment', type: 'income' },
  { id: '8', date: '2024-03-18', description: 'Dinner Out', amount: 45, category: 'Food', type: 'expense' },
  { id: '9', date: '2024-03-20', description: 'Uber Ride', amount: 25, category: 'Transport', type: 'expense' },
  { id: '10', date: '2024-03-25', description: 'New Shoes', amount: 120, category: 'Shopping', type: 'expense' },
];

export const summaryData = {
  totalBalance: 3200,
  totalIncome: 5300,
  totalExpenses: 2100,
  balanceTrend: [
    { name: 'Jan', balance: 2000 },
    { name: 'Feb', balance: 2500 },
    { name: 'Mar', balance: 3200 },
  ],
  categorySpending: [
    { name: 'Rent', value: 1200, color: '#bc8cff' },
    { name: 'Food', value: 450, color: '#58a6ff' },
    { name: 'Shopping', value: 320, color: '#f0f6fc' },
    { name: 'Transport', value: 130, color: '#8b949e' },
  ]
};

