import React, { useState } from 'react';
import { Search, Filter, Trash2, Edit3, ArrowUpCircle, ArrowDownCircle, Plus, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { type Transaction } from '../data/mockData';

const TransactionsList: React.FC = () => {
  const { transactions, role, deleteTransaction, addTransaction } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTx, setNewTx] = useState<Partial<Transaction>>({
    date: new Date().toISOString().split('T')[0],
    description: '',
    amount: 0,
    category: 'Food',
    type: 'expense'
  });

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTx.description || !newTx.amount) return;

    addTransaction({
      id: Math.random().toString(36).substring(7),
      date: newTx.date || new Date().toISOString().split('T')[0],
      description: newTx.description,
      amount: Number(newTx.amount),
      category: newTx.category as Transaction['category'],
      type: newTx.type as Transaction['type']
    });

    setIsModalOpen(false);
    setNewTx({
      date: new Date().toISOString().split('T')[0],
      description: '',
      amount: 0,
      category: 'Food',
      type: 'expense'
    });
  };

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || t.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="glass p-4 md:p-6 animate min-h-[500px]">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6 md:mb-8">
        <h2 className="text-lg md:text-xl font-bold">Transactions</h2>
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={16} />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-bg-tertiary border border-border-color rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-accent-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select
              className="flex-1 sm:w-auto bg-bg-tertiary border border-border-color rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent-primary appearance-none cursor-pointer"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            {role === 'admin' && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-accent-primary text-white p-2 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center"
              >
                <Plus size={20} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
        <table className="w-full border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-border-color text-text-secondary">
              <th className="text-center py-4 px-4 font-medium text-xs md:text-sm">Date</th>
              <th className="text-center py-4 px-4 font-medium text-xs md:text-sm">Description</th>
              <th className="text-center py-4 px-4 font-medium text-xs md:text-sm">Category</th>
              <th className="text-center py-4 px-4 font-medium text-xs md:text-sm">Amount</th>
              {role === 'admin' && <th className="text-center py-4 px-4 font-medium text-xs md:text-sm">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-border-color">
            {filteredTransactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-bg-tertiary/30 transition-colors group">
                <td className="py-4 px-4 text-center text-xs md:text-sm text-text-secondary">
                  {new Date(tx.date).toLocaleDateString()}
                </td>
                <td className="py-4 px-4 text-center">
                  <div className="text-xs md:text-sm font-medium flex items-center justify-center gap-2">
                    {tx.type === 'income' ? <ArrowUpCircle size={16} className="text-success" /> : <ArrowDownCircle size={16} className="text-danger" />}
                    <span className="truncate max-w-[120px] md:max-w-none">{tx.description}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex justify-center items-center">
                    <span className="inline-block text-[10px] md:text-xs font-semibold px-3 py-1 rounded-full bg-bg-tertiary border border-border-color text-accent-secondary">
                      {tx.category}
                    </span>
                  </div>
                </td>
                <td className={`py-4 px-4 text-center font-bold text-xs md:text-sm ${tx.type === 'income' ? 'text-success' : 'text-danger'}`}>
                  {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString()}
                </td>
                {role === 'admin' && (
                  <td className="py-4 px-4 text-center">
                    <div className="flex gap-1 md:gap-2 justify-center">
                      <button className="p-1.5 rounded-md hover:bg-bg-tertiary text-text-secondary hover:text-accent-primary transition-colors flex items-center justify-center">
                        <Edit3 size={14} />
                      </button>
                      <button
                        onClick={() => deleteTransaction(tx.id)}
                        className="p-1.5 rounded-md hover:bg-bg-tertiary text-text-secondary hover:text-danger transition-colors flex items-center justify-center"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {filteredTransactions.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-text-secondary">
            <Search size={40} className="mb-4 opacity-10" />
            <p className="text-sm">No transactions found.</p>
          </div>
        )}
      </div>

      {/* Add Transaction Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-bg-primary rounded-xl w-full max-w-md p-6 relative border border-border-color shadow-xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-text-secondary hover:text-text-primary flex items-center justify-center"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold mb-6">Add New Transaction</h3>

            <form onSubmit={handleAddTransaction} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm text-text-secondary mb-1">Type</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      value="income"
                      checked={newTx.type === 'income'}
                      onChange={(e) => setNewTx({ ...newTx, type: e.target.value as 'income' | 'expense' })}
                      className="accent-success"
                    />
                    <span>Income</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      value="expense"
                      checked={newTx.type === 'expense'}
                      onChange={(e) => setNewTx({ ...newTx, type: e.target.value as 'income' | 'expense' })}
                      className="accent-danger"
                    />
                    <span>Expense</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm text-text-secondary mb-1">Description</label>
                <input
                  type="text"
                  required
                  className="w-full bg-bg-tertiary border border-border-color rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-accent-primary"
                  value={newTx.description}
                  onChange={(e) => setNewTx({ ...newTx, description: e.target.value })}
                  placeholder="e.g., Grocery Shopping"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm text-text-secondary mb-1">Amount (₹)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    className="w-full bg-bg-tertiary border border-border-color rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-accent-primary"
                    value={newTx.amount || ''}
                    onChange={(e) => setNewTx({ ...newTx, amount: Number(e.target.value) })}
                    placeholder="0.00"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm text-text-secondary mb-1">Date</label>
                  <input
                    type="date"
                    required
                    className="w-full bg-bg-tertiary border border-border-color rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-accent-primary"
                    value={newTx.date}
                    onChange={(e) => setNewTx({ ...newTx, date: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-text-secondary mb-1">Category</label>
                <select
                  className="w-full bg-bg-tertiary border border-border-color rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-accent-primary appearance-none"
                  value={newTx.category}
                  onChange={(e) => setNewTx({ ...newTx, category: e.target.value as any })}
                >
                  <option value="Food">Food</option>
                  <option value="Transport">Transport</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Rent">Rent</option>
                  <option value="Salary">Salary</option>
                  <option value="Investment">Investment</option>
                  <option value="Entertainment">Entertainment</option>
                </select>
              </div>

              <button
                type="submit"
                className="mt-4 w-full bg-accent-primary text-white py-2.5 rounded-lg hover:opacity-90 transition-opacity font-medium flex items-center justify-center gap-2"
              >
                Add Transaction
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionsList;
