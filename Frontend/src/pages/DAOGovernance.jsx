import { Link } from 'react-router-dom'

function DAOGovernance() {
    return (
        <div className="flex flex-col w-full overflow-x-hidden font-display">
            {/* Removed duplicate header — shared Navbar in App.jsx handles this */}





            <div className="flex flex-1">
                {/* Sidebar Navigation */}
                <aside className="w-64 border-r border-primary/10 bg-background-light dark:bg-background-dark p-6 hidden lg:flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold px-3 m-0">Organization</p>
                        <div className="flex flex-col gap-1">
                            <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-900 dark:text-slate-100 no-underline hover:bg-primary/10 transition-colors">
                                <span className="material-symbols-outlined text-primary">dashboard</span>
                                <span className="text-sm font-semibold">Dashboard</span>
                            </Link>
                            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-primary text-slate-900 font-bold">
                                <span className="material-symbols-outlined">description</span>
                                <span className="text-sm">Proposals</span>
                            </div>
                            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-900 dark:text-slate-100 hover:bg-primary/10 transition-colors">
                                <span className="material-symbols-outlined">history</span>
                                <span className="text-sm font-semibold">Voting History</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold px-3 m-0">Impact Metrics</p>
                        <div className="px-3">
                            <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-3 border border-primary/10">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs text-slate-500">Global Score</span>
                                    <span className="text-xs font-bold text-primary">94%</span>
                                </div>
                                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full">
                                    <div className="bg-primary h-full rounded-full w-[94%]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-auto">
                        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                            <span className="material-symbols-outlined">settings</span>
                            <span className="text-sm font-semibold">Settings</span>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 p-6 md:p-10 max-w-6xl mx-auto w-full">
                    {/* Header Section */}
                    <div className="mb-8">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div>
                                <nav className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                                    <span>Nairobi</span>
                                    <span className="material-symbols-outlined text-xs">chevron_right</span>
                                    <span className="text-primary">East District</span>
                                </nav>
                                <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight m-0">Active Proposals for Nairobi East District</h1>
                                <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-2xl m-0">Shape the future of our local infrastructure. Every vote counts towards sustainable community growth and resource optimization.</p>
                            </div>
                            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 min-w-[240px]">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter mb-1 m-0">Your Voting Power</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">1,500</span>
                                    <span className="text-xs font-bold bg-primary text-slate-900 px-2 py-0.5 rounded-full">BIDII</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Active Proposal Card */}
                    <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none">
                        <div className="grid grid-cols-1 xl:grid-cols-12 @container">
                            <div className="xl:col-span-4 h-64 xl:h-auto overflow-hidden">
                                <img className="w-full h-full object-cover" data-alt="Group of students studying in a classroom" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAM_fd966TqbcHfJpV8_UMfOklIRXWoH4Pp9eI1i-Y-F1Skxt-gBb1dmY_v4cnpk67yVIq-8wG9ebsO8KxFAo0bi5wa69Q1Kh64FmNRR_ZATwqWMO6mXHZsyWpd2KWo_nfE1_AqZUMg2iH32Cx-sNJs7yeXTFUPLHSFpu0WHQaORbri2d3TFg1kMJ4Lg9t2KdksLdfZnOqKK7xeFUeEcRFbJc6vXdX_yIRmxcMwSjvODWQrnBtGy8jNFhI1gHlfVY1o-nx2h3anVxk" />
                            </div>
                            <div className="xl:col-span-8 p-6 md:p-10 flex flex-col gap-6">
                                <div className="flex items-center justify-between">
                                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Education</span>
                                    <div className="flex items-center gap-2 text-slate-400 text-xs">
                                        <span className="material-symbols-outlined text-xs">schedule</span>
                                        <span>2 days left</span>
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 leading-tight mb-3 m-0">Proposal #42: Allocate 65,000 KES for new tutor supplies</h2>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed m-0">
                                        This initiative aims to revitalize 10 community learning centers in the East District. Funds will be used for essential teaching aids, whiteboards, stationery, and digital access tools for evening tutoring programs.
                                    </p>
                                </div>

                                {/* Progress Metrics */}
                                <div className="space-y-4 py-4 border-y border-slate-100 dark:border-slate-800">
                                    <div className="flex items-center justify-between text-sm mb-1">
                                        <span className="font-bold text-slate-700 dark:text-slate-300">Voting Results</span>
                                        <span className="text-slate-400">Quorum: 65% met</span>
                                    </div>
                                    <div className="relative h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
                                        <div className="h-full bg-primary" style={{ width: '72%' }}></div>
                                        <div className="h-full bg-slate-300 dark:bg-slate-600" style={{ width: '28%' }}></div>
                                    </div>
                                    <div className="flex justify-between text-xs font-bold">
                                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                            <div className="w-3 h-3 rounded-full bg-primary"></div>
                                            <span>Yes (72%) — 4.2M BIDII</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                            <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                                            <span>No (28%) — 1.1M BIDII</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Voting Actions */}
                                <div className="flex flex-col gap-4">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Cast your vote</label>
                                    <div className="flex flex-wrap items-center gap-0 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden p-1.5 bg-slate-50/50 dark:bg-slate-900/50">
                                        <button className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all hover:bg-white dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 active:bg-primary active:text-slate-900 border-none bg-transparent">
                                            <span className="material-symbols-outlined text-green-500">check_circle</span>
                                            <span>For</span>
                                        </button>
                                        <div className="w-px h-8 bg-slate-200 dark:border-slate-800"></div>
                                        <button className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all hover:bg-white dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 active:bg-red-100 active:text-red-700 border-none bg-transparent">
                                            <span className="material-symbols-outlined text-red-500">cancel</span>
                                            <span>Against</span>
                                        </button>
                                        <div className="w-px h-8 bg-slate-200 dark:border-slate-800"></div>
                                        <button className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all hover:bg-white dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 border-none bg-transparent">
                                            <span className="material-symbols-outlined">remove_circle</span>
                                            <span>Abstain</span>
                                        </button>
                                    </div>
                                    <button className="w-full bg-slate-900 dark:bg-primary dark:text-slate-900 text-white py-4 rounded-2xl font-bold hover:brightness-110 transition-all shadow-lg shadow-slate-900/10 dark:shadow-primary/5 border-none">
                                        Submit Vote
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Other Recent Proposals Grid */}
                    <div className="mt-12">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 m-0">Nearby Initiatives</h3>
                            <button className="bg-transparent border-none text-sm font-bold text-primary flex items-center gap-1 hover:underline p-0">View All <span className="material-symbols-outlined text-sm">arrow_forward</span></button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold uppercase">Infrastructure</span>
                                    <span className="text-xs text-slate-400 font-bold">Closed</span>
                                </div>
                                <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-slate-100 m-0">#41: Solar Grid for Market Square</h4>
                                <p className="text-sm text-slate-500 mb-6 m-0">Installation of 24kW solar array to power night vendors.</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-green-500 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-lg">PASSED</span>
                                    <button className="text-slate-400 hover:text-slate-900 transition-colors bg-transparent border-none p-0">
                                        <span className="material-symbols-outlined">more_horiz</span>
                                    </button>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-bold uppercase">Healthcare</span>
                                    <span className="text-xs text-slate-400 font-bold">12h left</span>
                                </div>
                                <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-slate-100 m-0">#43: Mobile Clinic Fuel Grant</h4>
                                <p className="text-sm text-slate-500 mb-6 m-0">Funding 3 months of diesel for the district mobile health unit.</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-slate-400">PENDING</span>
                                    <button className="text-slate-400 hover:text-slate-900 transition-colors bg-transparent border-none p-0">
                                        <span className="material-symbols-outlined">more_horiz</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Footer Meta */}
            <footer className="border-t border-primary/10 bg-white dark:bg-background-dark py-8 px-10">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="size-6 bg-primary rounded-md"></div>
                        <span className="font-bold text-slate-900 dark:text-slate-100">Bidii Chain DAO</span>
                    </div>
                    <div className="flex gap-8">
                        <a className="text-sm text-slate-400 hover:text-slate-900 dark:hover:text-slate-100" href="#">Documentation</a>
                        <a className="text-sm text-slate-400 hover:text-slate-900 dark:hover:text-slate-100" href="#">Privacy Policy</a>
                        <a className="text-sm text-slate-400 hover:text-slate-900 dark:hover:text-slate-100" href="#">Terms of Service</a>
                    </div>
                    <div className="text-slate-400 text-xs">
                        © 2024 Nairobi District Council
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default DAOGovernance
