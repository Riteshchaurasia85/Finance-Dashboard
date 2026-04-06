import React, { useState } from 'react';
import { LayoutDashboard, ReceiptText, PieChart, X, ChevronLeft, ChevronRight, UserPlus, Shield } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const { role, setRole } = useAppContext();

  const menuItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
    { id: 'transactions', icon: ReceiptText, label: 'Transactions' },
    { id: 'insights', icon: PieChart, label: 'Insights' },
  ];

  return (
    <aside className={`glass h-screen p-4 flex flex-col transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'} md:relative`}>
      <div className="flex items-center justify-between gap-3 mb-10 px-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent-primary rounded-xl flex items-center justify-center shadow-lg">
            <Shield className="text-white" size={24} />
          </div>
          {!isCollapsed && <h1 className="font-bold text-xl tracking-tight">FinScale</h1>}
        </div>

        {/* Close button for mobile */}
        <button
          onClick={() => setActiveTab(activeTab)}
          className="lg:hidden p-2 text-text-secondary hover:text-accent-primary flex items-center justify-center"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{ width: '100%', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: '0.75rem', border: 'none', background: activeTab === item.id ? 'var(--bg-tertiary)' : 'transparent', color: activeTab === item.id ? 'var(--accent-primary)' : 'var(--text-secondary)' }}
            className={`cursor-pointer hover:bg-bg-tertiary transition-colors`}
          >
            <item.icon size={22} className={activeTab === item.id ? 'text-accent-primary' : ''} />
            {!isCollapsed && <span className="font-medium">{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-border-color space-y-4">
        {!isCollapsed && (
          <div className="px-2 relative">
            <p className="text-xs text-text-secondary uppercase mb-2">Role Management</p>
            <div
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="px-3 py-2 bg-bg-tertiary rounded-lg flex items-center justify-between cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center gap-2">
                <UserPlus size={16} className="text-accent-secondary" />
                <span className="text-sm font-medium capitalize">{role}</span>
              </div>
              <div className={`w-8 h-4 rounded-full relative transition-colors ${role === 'admin' ? 'bg-success' : 'bg-text-secondary'}`}>
                <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${role === 'admin' ? 'right-0.5' : 'left-0.5'}`} />
              </div>
            </div>
            
            {isRoleDropdownOpen && (
              <div className="absolute bottom-full left-2 right-2 mb-2 bg-bg-primary border border-border-color rounded-lg shadow-xl overflow-hidden z-50">
                <button
                  onClick={() => {
                    setRole('admin');
                    setIsRoleDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-bg-tertiary transition-colors flex items-center gap-2 ${role === 'admin' ? 'text-accent-primary font-medium' : 'text-text-secondary'}`}
                >
                  <div className={`w-2 h-2 rounded-full ${role === 'admin' ? 'bg-accent-primary' : 'bg-transparent'}`} />
                  Admin
                </button>
                <button
                  onClick={() => {
                    setRole('viewer');
                    setIsRoleDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-bg-tertiary transition-colors flex items-center gap-2 ${role === 'viewer' ? 'text-accent-primary font-medium' : 'text-text-secondary'}`}
                >
                  <div className={`w-2 h-2 rounded-full ${role === 'viewer' ? 'bg-accent-primary' : 'bg-transparent'}`} />
                  Viewer
                </button>
              </div>
            )}
          </div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: '0.75rem', border: 'none', background: 'transparent', color: 'var(--text-secondary)' }}
          className="hidden md:flex hover:bg-bg-tertiary transition-colors cursor-pointer"
        >
          {isCollapsed ? <ChevronRight size={22} /> : <ChevronLeft size={22} />}
          {!isCollapsed && <span className="font-medium">Collapse</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
