import React, { useMemo } from 'react';
import { Target, TrendingUp, Zap, AlertCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Insights: React.FC = () => {
  const { transactions } = useAppContext();

  const { totalIncome, totalExpenses, categorySpending } = useMemo(() => {
    let income = 0;
    let expenses = 0;
    const categories: Record<string, number> = {};

    transactions.forEach(t => {
      if (t.type === 'income') {
        income += t.amount;
      } else {
        expenses += t.amount;
        categories[t.category] = (categories[t.category] || 0) + t.amount;
      }
    });

    const formattedCategories = Object.keys(categories).map(key => ({
      name: key,
      value: categories[key],
    })).sort((a, b) => b.value - a.value);

    return { totalIncome: income, totalExpenses: expenses, categorySpending: formattedCategories };
  }, [transactions]);

  const savingsRate = totalIncome > 0 ? (((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(1) : '0.0';
  const highestCategory = categorySpending.length > 0 ? categorySpending[0] : { name: 'None', value: 0 };

  const InsightCard = ({ icon: Icon, title, description, color }: any) => (
    <div className="glass p-6 card-hover animate flex gap-5 items-start">
      <div className="p-3 rounded-2xl" style={{ backgroundColor: `${color}20` }}>
        <Icon size={32} style={{ color }} />
      </div>
      <div>
        <h3 className="text-lg font-bold mb-1">{title}</h3>
        <p className="text-text-secondary leading-relaxed">{description}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-8">Financial Insights</h2>
      
      <div className="grid grid-cols-1 gap-4 md:gap-6">
        <InsightCard 
          icon={Target}
          title="Savings Rate"
          description={`Your current savings rate is ${savingsRate}%. A good rule of thumb is to aim for 20% or higher. Keep it up!`}
          color="var(--accent-primary)"
        />

        <InsightCard 
          icon={Zap}
          title="Spending Hotspot"
          description={`Your highest spending category is ${highestCategory.name} (₹${highestCategory.value.toLocaleString()}). Try to look for ways to optimize this.`}
          color="var(--accent-secondary)"
        />

        <InsightCard 
          icon={TrendingUp}
          title="Monthly Comparison"
          description="Compared to last month, your overall expenses are down by 4.5%. This is a positive trend for your financial health."
          color="var(--success)"
        />

        <InsightCard 
          icon={AlertCircle}
          title="Budget Alert"
          description="You've reached 85% of your entertainment budget for this month. Consider slowing down on non-essential spending."
          color="var(--warning)"
        />
      </div>
    </div>
  );
};

export default Insights;
