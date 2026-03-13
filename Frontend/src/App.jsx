import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { WalletProvider } from './context/WalletContext'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import DAOGovernance from './pages/DAOGovernance'
import TransparencyHub from './pages/TransparencyHub'
import SubmitContribution from './pages/SubmitContribution'
import './App.css'

// Bottom mobile navigation (shows only on small screens)
function BottomNav() {
    const location = useLocation()
    const links = [
        { to: '/', icon: 'dashboard', label: 'Dashboard' },
        { to: '/governance', icon: 'account_tree', label: 'Governance' },
        { to: '/transparency', icon: 'visibility', label: 'Transparency' },
        { to: '/submit', icon: 'add_circle', label: 'Submit' },
    ]

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-primary/20 py-2 z-50 flex justify-around md:hidden">
            {links.map(({ to, icon, label }) => (
                <Link
                    key={to}
                    to={to}
                    className={`flex flex-col items-center gap-0.5 no-underline transition-colors ${location.pathname === to ? 'text-primary' : 'text-slate-400 hover:text-slate-600'
                        }`}
                >
                    <span className="material-symbols-outlined text-[22px]">{icon}</span>
                    <span className="text-[9px] font-bold uppercase tracking-wide">{label}</span>
                </Link>
            ))}
        </nav>
    )
}

function App() {
    return (
        <Router>
            <WalletProvider>
                <div className="flex flex-col min-h-screen pb-14 md:pb-0">
                    <Navbar />
                    <main className="flex-1">
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/governance" element={<DAOGovernance />} />
                            <Route path="/transparency" element={<TransparencyHub />} />
                            <Route path="/submit" element={<SubmitContribution />} />
                        </Routes>
                    </main>
                    <BottomNav />
                </div>
            </WalletProvider>
        </Router>
    )
}

export default App
