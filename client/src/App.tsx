import { useState } from 'react'
import Sidebar from './components/Sidebar'
import DashboardOverview from './components/DashboardOverview'
import TransactionsList from './components/TransactionsList'
import Insights from './components/Insights'
import { AppProvider } from './context/AppContext'
import { Bell, User, Menu } from 'lucide-react'
import AuthModal from './components/AuthModal'

const App = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <DashboardOverview />
      case 'transactions': return <TransactionsList />
      case 'insights': return <Insights />
      default: return <DashboardOverview />
    }
  }

  const closeMobileMenu = (tab: string) => {
    setActiveTab(tab)
    setIsMobileMenuOpen(false)
  }

  return (
    <AppProvider>
      <div className="flex bg-bg-primary text-text-primary min-h-screen overflow-hidden">
        {/* Sidebar for Desktop & Mobile */}
        <div
          className={`fixed inset-0 z-40 lg:relative lg:block ${isMobileMenuOpen ? 'flex' : 'hidden'} lg:flex`}
        >
          {/* Overlay for mobile */}
          <div
            className="fixed inset-0 bg-bg-primary/60 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="relative z-50 h-full">
            <Sidebar
              activeTab={activeTab}
              setActiveTab={closeMobileMenu}
            />
          </div>
        </div>

        <main className="flex-1 overflow-y-auto px-4 py-6 md:px-10 md:py-8">
          <header className="flex justify-between items-center mb-6 md:mb-10 sticky top-0 bg-bg-primary/80 backdrop-blur-md z-30 py-4 border-b border-border-color">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 lg:hidden border border-border-color rounded-lg text-text-secondary hover:text-accent-primary transition-colors cursor-pointer flex items-center justify-center"
              >
                <Menu size={20} />
              </button>
              <div>
                <h1 className="text-xl md:text-3xl font-bold tracking-tight">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </h1>
                <p className="text-text-secondary text-xs md:text-sm font-medium hidden sm:block">Welcome back, Pari!</p>
              </div>
            </div>

            <div className="flex gap-2 md:gap-4 items-center">
              <button className="p-2 border border-border-color rounded-lg text-text-secondary hover:text-accent-primary transition-colors cursor-pointer flex items-center justify-center">
                <Bell size={20} />
              </button>
              <div className="w-9 h-9 md:w-10 md:h-10 border border-border-color rounded-lg flex items-center justify-center text-text-secondary hover:text-accent-primary transition-colors cursor-pointer overflow-hidden">
                <User size={20} />
              </div>
            </div>
          </header>

          <div className="animate">
            {renderContent()}
          </div>
        </main>

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />
      </div>
    </AppProvider>
  )
}

export default App

