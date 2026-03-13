function TransparencyHub() {
    return (
        <div className="relative flex w-full flex-col overflow-x-hidden antialiased">
            {/* Header removed — shared Navbar in App.jsx handles navigation */}

            <main className="flex flex-1 flex-col px-6 py-8 lg:px-20 max-w-[1400px] mx-auto w-full">
                {/* Hero Section */}
                <div className="flex flex-col gap-2 mb-10">
                    <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest">
                        <span className="material-symbols-outlined text-sm">verified_user</span>
                        On-Chain Verified
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-slate-100 m-0">Bidii Chain Transparency Portal</h1>
                    <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl m-0">
                        Real-time fund tracking and impact verification powered by X Layer. Monitor every USDT from donation to deployment.
                    </p>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="flex flex-col gap-4 rounded-2xl p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="flex items-center justify-between">
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider m-0">Total Received</p>
                            <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <p className="text-3xl font-black m-0">KES 162,305,000</p>
                            <p className="text-slate-400 text-sm font-medium m-0">KES</p>
                        </div>
                        <div className="flex items-center gap-1 text-emerald-500 text-sm font-bold">
                            <span className="material-symbols-outlined text-sm">trending_up</span>
                            <span>+12.4% this month</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 rounded-2xl p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="flex items-center justify-between">
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider m-0">Funds Deployed</p>
                            <span className="material-symbols-outlined text-primary">payments</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <p className="text-3xl font-black m-0">KES 109,486,000</p>
                            <p className="text-slate-400 text-sm font-medium m-0">KES</p>
                        </div>
                        <div className="flex items-center gap-1 text-slate-500 text-sm font-bold">
                            <span>67% Utilization Rate</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 rounded-2xl p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="flex items-center justify-between">
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider m-0">Active Projects</p>
                            <span className="material-symbols-outlined text-primary">potted_plant</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <p className="text-3xl font-black m-0">24</p>
                            <p className="text-slate-400 text-sm font-medium m-0">Global</p>
                        </div>
                        <div className="flex items-center gap-1 text-emerald-500 text-sm font-bold">
                            <span className="material-symbols-outlined text-sm">add_circle</span>
                            <span>3 new this week</span>
                        </div>
                    </div>
                </div>

                {/* Main Grid: Projects & Transactions */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Project List (Left Side) */}
                    <div className="lg:col-span-7 flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold tracking-tight m-0">Active Impact Projects</h2>
                            <button className="bg-transparent border-none text-primary text-sm font-bold flex items-center gap-1 hover:underline p-0">View All <span className="material-symbols-outlined text-sm">chevron_right</span></button>
                        </div>
                        <div className="grid grid-cols-1 gap-6">
                            {/* Project Card 1 */}
                            <div className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-lg transition-all border-l-4 border-l-primary cursor-pointer">
                                <div className="flex flex-col md:flex-row h-full">
                                    <div className="w-full md:w-48 h-48 md:h-auto bg-center bg-cover" data-alt="Lush green forest area in Nairobi being reforested" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA2WZA_FA6Ey-bt1tY61vZ0YvhzdF4U2uee3ss_1-i14adqg_N8Zan27b_J-u6_UhERu55leXL3SAHZ4n4Gjoe2xpGWCOLRqwV-URY8Q3kYgkukwo9qOFEQerZ8yqEcHhc3erQ4MhoRrHyVGsCTdcUHCV4T0h_YlfXPkDq9kJ3-3N_bECUZ2_1MPqhv4CAnPa0amMQEB_DIJ08S47LHnOsCnk4tvBs16FOk5gT0Y94G-yQ8Ca2WNDTCEki7aR9_lXt9TytbwG1f1Vc")' }}></div>
                                    <div className="p-6 flex flex-1 flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-xl font-bold m-0">Nairobi Reforestation</h3>
                                                <span className="bg-primary/20 text-slate-900 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">X Layer</span>
                                            </div>
                                            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2 m-0">Restoring 500 hectares of native forest in the Nairobi outskirts to combat urban heat islands.</p>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-500">Total Funds Received</span>
                                                <span className="font-bold">KES 650,000</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-500">Total Funds Spent</span>
                                                <span className="font-bold">KES 416,000</span>
                                            </div>
                                            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                                                <div className="bg-primary h-full rounded-full" style={{ width: '64%' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Project Card 2 */}
                            <div className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-lg transition-all border-l-4 border-l-primary/40 cursor-pointer">
                                <div className="flex flex-col md:flex-row h-full">
                                    <div className="w-full md:w-48 h-48 md:h-auto bg-center bg-cover" data-alt="Clean water installation in a rural village" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDIU6KEuxfLeCI5EoCBvdeP7NppvZSVOvHuvCKEL7e-sT-ixhXiP-6MWsvLAkvogMtq1k28F7Fy4DTqh8m6vdfWR1eTFvBGYiE4lj5iuKG68KxwsKUkJRdxSAfOAtd9jtWlnClz00pHXY2_lntSe2le7dhFmcue4BDLAo3xtIwJJAgsjgflXsJF0Oyel2YpYZmzgAMTv1lVdm3BlDI2b2zLp0ttlmO047B279Bc3ebtf7gnGyOYzzlS4damje4RMal-BsZyQ-l9xlU")' }}></div>
                                    <div className="p-6 flex flex-1 flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-xl font-bold m-0">Clean Water Project</h3>
                                                <span className="bg-primary/20 text-slate-900 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">X Layer</span>
                                            </div>
                                            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2 m-0">Installing solar-powered water filtration systems for coastal communities in Indonesia.</p>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-500">Total Funds Received</span>
                                                <span className="font-bold">KES 1,105,000</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-500">Total Funds Spent</span>
                                                <span className="font-bold">KES 520,000</span>
                                            </div>
                                            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                                                <div className="bg-primary h-full rounded-full" style={{ width: '47%' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Transaction Stream (Right Side) */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold tracking-tight m-0">Live Transaction Stream</h2>
                            <span className="flex items-center gap-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                <span className="text-xs font-bold text-slate-500 uppercase">Live</span>
                            </span>
                        </div>
                        <div className="flex flex-col gap-3">
                            {/* Transaction 1 */}
                            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-colors">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <span className="material-symbols-outlined text-lg">potted_plant</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold m-0">39,000 KES <span className="text-slate-400 font-normal">to</span> Seed Purchases</p>
                                            <p className="text-[10px] text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/30 inline-block px-1.5 py-0.5 rounded uppercase mt-1 m-0">Verified by AI Agent</p>
                                        </div>
                                    </div>
                                    <p className="text-[10px] font-medium text-slate-400 m-0">2m ago</p>
                                </div>
                                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm text-slate-400">link</span>
                                        <span className="text-[10px] font-mono text-slate-400">0x4a...d9e2</span>
                                    </div>
                                    <a className="text-[10px] font-bold text-primary hover:underline" href="#">View on OKX Explorer</a>
                                </div>
                            </div>

                            {/* Transaction 2 */}
                            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-colors">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <span className="material-symbols-outlined text-lg">water_drop</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold m-0">156,000 KES <span className="text-slate-400 font-normal">to</span> Filter Maintenance</p>
                                            <p className="text-[10px] text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/30 inline-block px-1.5 py-0.5 rounded uppercase mt-1 m-0">Proof of Impact Filed</p>
                                        </div>
                                    </div>
                                    <p className="text-[10px] font-medium text-slate-400 m-0">14m ago</p>
                                </div>
                                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm text-slate-400">link</span>
                                        <span className="text-[10px] font-mono text-slate-400">0x8b...f2c4</span>
                                    </div>
                                    <a className="text-[10px] font-bold text-primary hover:underline" href="#">View on OKX Explorer</a>
                                </div>
                            </div>

                            {/* Transaction 3 */}
                            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-colors opacity-80">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                                            <span className="material-symbols-outlined text-lg">transportation</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-600 dark:text-slate-300 m-0">71,500 KES <span className="text-slate-400 font-normal">to</span> Solar Panels Transport</p>
                                            <p className="text-[10px] text-slate-500 font-bold bg-slate-50 dark:bg-slate-800/50 inline-block px-1.5 py-0.5 rounded uppercase mt-1 m-0">Manual Audit Completed</p>
                                        </div>
                                    </div>
                                    <p className="text-[10px] font-medium text-slate-400 m-0">1h ago</p>
                                </div>
                                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm text-slate-400">link</span>
                                        <span className="text-[10px] font-mono text-slate-400">0x2c...a1b9</span>
                                    </div>
                                    <a className="text-[10px] font-bold text-primary hover:underline" href="#">View on OKX Explorer</a>
                                </div>
                            </div>

                            <button className="w-full py-3 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800 text-slate-400 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-500 transition-all bg-transparent">
                                LOAD MORE TRANSACTIONS
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer Meta */}
            <footer className="mt-auto py-12 px-6 lg:px-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark">
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex items-center justify-center size-8 rounded-lg bg-primary text-slate-900">
                                <span className="material-symbols-outlined text-sm">account_tree</span>
                            </div>
                            <h2 className="text-lg font-extrabold tracking-tight m-0">Bidii Chain</h2>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm leading-relaxed m-0">
                            The world's first fully transparent impact funding platform. We use blockchain and AI to ensure every cent reaches its intended destination.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-wider mb-6 m-0">Network</h4>
                        <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400 list-none p-0 m-0">
                            <li className="m-0"><a className="hover:text-primary transition-colors text-slate-500 dark:text-slate-400 no-underline" href="#">X Layer Testnet</a></li>
                            <li className="m-0"><a className="hover:text-primary transition-colors text-slate-500 dark:text-slate-400 no-underline" href="#">OKX Explorer</a></li>
                            <li className="m-0"><a className="hover:text-primary transition-colors text-slate-500 dark:text-slate-400 no-underline" href="#">Documentation</a></li>
                            <li className="m-0"><a className="hover:text-primary transition-colors text-slate-500 dark:text-slate-400 no-underline" href="#">API Access</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-wider mb-6 m-0">Community</h4>
                        <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400 list-none p-0 m-0">
                            <li className="m-0"><a className="hover:text-primary transition-colors text-slate-500 dark:text-slate-400 no-underline" href="#">Discord</a></li>
                            <li className="m-0"><a className="hover:text-primary transition-colors text-slate-500 dark:text-slate-400 no-underline" href="#">X / Twitter</a></li>
                            <li className="m-0"><a className="hover:text-primary transition-colors text-slate-500 dark:text-slate-400 no-underline" href="#">Governance Forum</a></li>
                            <li className="m-0"><a className="hover:text-primary transition-colors text-slate-500 dark:text-slate-400 no-underline" href="#">Snapshot</a></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-[1400px] mx-auto pt-12 mt-12 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-xs text-slate-400 m-0">© 2024 Bidii Chain. Built on X Layer.</p>
                    <div className="flex gap-4 flex-wrap md:flex-nowrap md:gap-8">
                        <a className="text-xs text-slate-400 hover:text-primary no-underline transition-colors" href="#">Privacy Policy</a>
                        <a className="text-xs text-slate-400 hover:text-primary no-underline transition-colors" href="#">Terms of Service</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}


export default TransparencyHub
