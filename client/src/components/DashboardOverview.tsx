import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, IndianRupee, Wallet, CreditCard } from 'lucide-react';
import { summaryData } from '../data/mockData';

const DashboardOverview: React.FC = () => {
  const { totalBalance, totalIncome, totalExpenses, balanceTrend, categorySpending } = summaryData;

  const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
    <div className="glass p-4 md:p-6 card-hover flex flex-col gap-3 animate w-full">
      <div className="flex justify-between items-center">
        <div className="p-2 rounded-lg" style={{ backgroundColor: `${color}20` }}>
          <Icon size={24} style={{ color }} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm font-medium ${trend > 0 ? 'text-success' : 'text-danger'}`}>
            {trend > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div>
        <p className="text-text-secondary text-xs md:text-sm font-medium">{title}</p>
        <h3 className="text-xl md:text-2xl font-bold mt-1">₹{value.toLocaleString()}</h3>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        <StatCard title="Total Balance" value={totalBalance} icon={Wallet} color="var(--accent-primary)" trend={5.2} />
        <StatCard title="Total Income" value={totalIncome} icon={IndianRupee} color="var(--success)" trend={12.4} />
        <StatCard title="Total Expenses" value={totalExpenses} icon={CreditCard} color="var(--danger)" trend={-2.1} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass p-4 md:p-6 min-h-[350px] md:min-h-[400px]">
          <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-6">Balance Trend</h3>
          <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={balanceTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-secondary)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '8px', fontSize: '12px' }}
                  itemStyle={{ color: 'var(--text-primary)' }}
                />
                <Area type="monotone" dataKey="balance" stroke="var(--accent-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass p-4 md:p-6 min-h-[350px] md:min-h-[400px]">
          <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-6">Spending Breakdown</h3>
          <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categorySpending}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categorySpending.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '8px', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
