import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useWallet } from '../context/WalletContext'

export default function Navbar() {
    const location = useLocation()
    const { walletAddress, connecting, connectWallet, disconnect } = useWallet()
    const [showMobileMenu, setShowMobileMenu] = useState(false)

    const navLinks = [
        { to: '/', label: 'Dashboard' },
        { to: '/governance', label: 'Governance' },
        { to: '/transparency', label: 'Transparency' },
        { to: '/submit', label: 'Submit' },
    ]

    const isActive = (to) =>
        to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)

    const handleConnect = () => {
        // In production, integrate MetaMask/OKX Wallet here to get the address
        const mockAddress = '0x4a...3e2'
        connectWallet(mockAddress)
    }

    return (
        <header className="flex items-center justify-between border-b border-primary/20 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-6 lg:px-10 py-4 sticky top-0 z-50">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 no-underline text-slate-900 dark:text-slate-100">
                <div className="size-10 bg-primary rounded-lg flex items-center justify-center text-slate-900">
                    <span className="material-symbols-outlined font-bold">eco</span>
                </div>
                <h2 className="text-xl font-extrabold tracking-tight m-0">Bidii Chain</h2>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
                {navLinks.map(({ to, label }) => (
                    <Link
                        key={to}
                        to={to}
                        className={`text-sm font-semibold transition-colors no-underline ${isActive(to) ? 'text-primary border-b-2 border-primary pb-0.5' : 'text-slate-700 dark:text-slate-300 hover:text-primary'
                            }`}
                    >
                        {label}
                    </Link>
                ))}
            </nav>

            {/* Wallet Button */}
            <div className="flex items-center gap-3">
                {walletAddress ? (
                    <>
                        <button
                            onClick={disconnect}
                            className="flex items-center justify-center rounded-xl h-10 bg-primary/20 hover:bg-primary/30 text-slate-900 gap-2 px-4 transition-all border-none cursor-pointer"
                        >
                            <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
                            <span className="text-xs font-bold font-mono">{walletAddress}</span>
                        </button>
                    </>
                ) : (
                    <button
                        onClick={handleConnect}
                        disabled={connecting}
                        className="flex items-center justify-center rounded-xl h-10 bg-primary hover:bg-primary/80 text-slate-900 gap-2 px-4 transition-all border-none cursor-pointer font-bold text-sm disabled:opacity-60"
                    >
                        <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
                        <span>{connecting ? 'Connecting...' : 'Connect Wallet'}</span>
                    </button>
                )}

                {/* Mobile menu toggle */}
                <button
                    className="md:hidden bg-transparent border-none p-1 cursor-pointer"
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                >
                    <span className="material-symbols-outlined">{showMobileMenu ? 'close' : 'menu'}</span>
                </button>
            </div>

            {/* Mobile dropdown menu */}
            {showMobileMenu && (
                <div className="absolute top-full left-0 right-0 bg-white dark:bg-background-dark border-b border-primary/20 shadow-lg md:hidden z-50">
                    {navLinks.map(({ to, label }) => (
                        <Link
                            key={to}
                            to={to}
                            onClick={() => setShowMobileMenu(false)}
                            className={`block px-6 py-4 text-sm font-semibold no-underline border-b border-slate-100 dark:border-slate-800 ${isActive(to) ? 'text-primary bg-primary/5' : 'text-slate-700 dark:text-slate-300'
                                }`}
                        >
                            {label}
                        </Link>
                    ))}
                </div>
            )}
        </header>
    )
}
