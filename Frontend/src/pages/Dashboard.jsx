import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useWallet } from '../context/WalletContext'
import * as api from '../services/api'

function Dashboard() {
    const { walletAddress, user, badges, connecting, connectWallet } = useWallet()
    const [leaderboard, setLeaderboard] = useState([])
    const [tasks, setTasks] = useState([])
    const [loadingBoard, setLoadingBoard] = useState(false)
    const [loadingTasks, setLoadingTasks] = useState(false)

    // Fetch leaderboard from backend
    useEffect(() => {
        setLoadingBoard(true)
        api.getLeaderboard(5)
            .then(setLeaderboard)
            .catch(() => { })
            .finally(() => setLoadingBoard(false))
    }, [])

    // Fetch next available tasks
    useEffect(() => {
        setLoadingTasks(true)
        api.getTasks()
            .then(setTasks)
            .catch(() => { })
            .finally(() => setLoadingTasks(false))
    }, [])

    const nextTask = tasks[0] || null

    return (
        <div className="relative flex flex-col w-full overflow-x-hidden">
            <div className="max-w-[1200px] mx-auto w-full p-6 md:p-10 flex flex-col gap-10">

                {/* Top Section: Impact Score Gauge */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white dark:bg-slate-900/50 p-8 rounded-xl border border-primary/20 flex flex-col md:flex-row items-center gap-10 shadow-sm">
                        <div className="relative size-48 flex items-center justify-center flex-shrink-0">
                            <div className="circular-progress size-full rounded-full flex items-center justify-center">
                                <div className="flex flex-col items-center">
                                    <span className="text-4xl font-black">{user?.impactPoints?.toLocaleString() || '369,200'}</span>
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">KES Value</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 space-y-4 text-center md:text-left">
                            <div>
                                <h1 className="text-3xl font-black tracking-tight m-0">Impact Value</h1>
                                <p className="text-slate-500 mt-1 m-0">You are in the top 5% of Kenyan contributors this month.</p>
                            </div>
                            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                <div className="px-4 py-2 bg-primary/10 rounded-lg border border-primary/20">
                                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider m-0">Weekly Growth</p>
                                    <p className="text-lg font-bold text-green-600 m-0">+15.4%</p>
                                </div>
                                <div className="px-4 py-2 bg-primary/10 rounded-lg border border-primary/20">
                                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider m-0">Wallet</p>
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm text-orange-500">token</span>
                                        <p className="text-lg font-bold m-0">
                                            {walletAddress
                                                ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                                                : 'Not Connected'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {!walletAddress && (
                                <button
                                    onClick={() => connectWallet('0x4a3b2c1d')}
                                    disabled={connecting}
                                    className="mt-2 px-5 py-2.5 bg-primary text-slate-900 text-sm font-bold rounded-xl border-none cursor-pointer hover:opacity-90 transition"
                                >
                                    {connecting ? 'Connecting...' : 'Connect Wallet to View Stats'}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Level Card */}
                    <div className="bg-primary p-8 rounded-xl flex flex-col justify-between text-slate-900 shadow-lg shadow-primary/20">
                        <div>
                            <span className="material-symbols-outlined text-4xl mb-4">auto_awesome</span>
                            <h3 className="text-xl font-black m-0">Level 14</h3>
                            <p className="font-medium opacity-80 mt-1 m-0">"Community Guardian"</p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm font-bold">
                                <span>Progress to Lvl 15</span>
                                <span>75%</span>
                            </div>
                            <div className="w-full bg-black/10 h-3 rounded-full overflow-hidden">
                                <div className="bg-slate-900 h-full w-3/4"></div>
                            </div>
                            <p className="text-xs font-bold opacity-70 m-0">280,800 KES to next level</p>
                        </div>
                    </div>
                </section>

                {/* Center Section: Soulbound Badges */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-black tracking-tight flex items-center gap-2 m-0">
                            <span className="material-symbols-outlined text-primary">military_tech</span>
                            Soulbound Badges
                        </h2>
                        <button className="text-sm font-bold text-primary hover:underline bg-transparent border-none p-0 cursor-pointer">View All Gallery</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Use live badges if available, otherwise show defaults */}
                        {(badges.length ? badges.slice(0, 3) : [
                            { icon: 'forest', label: 'Tree Planter', sublabel: 'Level 3 • Rare', color: 'bg-primary/20', iconColor: 'text-green-700', barColor: 'bg-primary', bars: 3 },
                            { icon: 'school', label: 'Tutor Badge', sublabel: '150 Hours Logged', color: 'bg-blue-100', iconColor: 'text-blue-600', barColor: 'bg-blue-400', bars: 1 },
                            { icon: 'delete_sweep', label: 'Town Cleaner', sublabel: 'Community Hero', color: 'bg-yellow-100', iconColor: 'text-yellow-600', barColor: 'bg-yellow-400', bars: 1 },
                        ]).map((badge, i) => (
                            <div key={i} className="group bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-primary/10 hover:border-primary/50 transition-all cursor-pointer shadow-sm">
                                <div className={`size-20 ${badge.color} rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform`}>
                                    <span className={`material-symbols-outlined text-4xl ${badge.iconColor}`}>{badge.icon}</span>
                                </div>
                                <div className="text-center">
                                    <h4 className="font-black text-lg m-0">{badge.label}</h4>
                                    <p className="text-sm text-slate-500 font-medium m-0">{badge.sublabel}</p>
                                    <div className="mt-4 flex justify-center gap-1">
                                        {Array.from({ length: badge.bars || 1 }).map((_, b) => (
                                            <span key={b} className={`w-8 h-1 ${badge.barColor} rounded-full`}></span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Bottom Section: Leaderboard + Quest */}
                <section className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                    <div className="lg:col-span-3">
                        <div className="bg-white dark:bg-slate-900/50 rounded-xl border border-primary/20 overflow-hidden shadow-sm">
                            <div className="p-6 border-b border-primary/10 flex items-center justify-between">
                                <h3 className="text-xl font-black m-0">Top Contributors</h3>
                                <span className="text-xs font-bold px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500">National Rank</span>
                            </div>
                            <div className="divide-y divide-primary/5">
                                {loadingBoard ? (
                                    <div className="p-8 text-center text-slate-400 text-sm">Loading leaderboard…</div>
                                ) : leaderboard.length === 0 ? (
                                    // Fallback static data when backend isn't connected
                                    [
                                        { rank: 1, name: 'EcoWarrior_99', pts: '12,450 pts', tier: 'Master', rankColor: 'text-yellow-500' },
                                        { rank: 2, name: 'OceanCleaner', pts: '10,120 pts', tier: 'Expert', rankColor: 'text-slate-400' },
                                        { rank: 3, name: 'SolarPower', pts: '9,840 pts', tier: 'Expert', rankColor: 'text-amber-700' },
                                        { rank: 4, name: 'GreenThumb', pts: '8,750 pts', tier: 'Advanced', rankColor: 'text-slate-400' },
                                    ].map(({ rank, name, pts, tier, rankColor }) => (
                                        <div key={rank} className="flex items-center gap-4 p-4 hover:bg-primary/5 transition-colors">
                                            <div className={`w-8 text-center font-black ${rankColor} text-xl`}>{rank}</div>
                                            <div className="size-10 rounded-full overflow-hidden bg-slate-200 flex items-center justify-center text-slate-500">
                                                <span className="material-symbols-outlined text-sm">person</span>
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-bold m-0">{name}</p>
                                                <p className="text-xs text-slate-500 font-medium m-0">{pts}</p>
                                            </div>
                                            <span className="text-xs font-black bg-primary/20 text-slate-900 px-3 py-1 rounded-lg">{tier}</span>
                                        </div>
                                    ))
                                ) : (
                                    leaderboard.map((u, i) => (
                                        <div key={u.walletAddress} className="flex items-center gap-4 p-4 hover:bg-primary/5 transition-colors">
                                            <div className={`w-8 text-center font-black text-xl ${i === 0 ? 'text-yellow-500' : i === 1 ? 'text-slate-400' : 'text-amber-700'}`}>{i + 1}</div>
                                            <div className="size-10 rounded-full overflow-hidden bg-slate-200 flex items-center justify-center text-slate-500">
                                                <span className="material-symbols-outlined text-sm">person</span>
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-bold m-0">{u.name || u.walletAddress}</p>
                                                <p className="text-xs text-slate-500 font-medium m-0">{u.impactPoints?.toLocaleString()} pts</p>
                                            </div>
                                            <span className="text-xs font-black bg-primary/20 text-slate-900 px-3 py-1 rounded-lg">
                                                {u.impactPoints > 10000 ? 'Master' : u.impactPoints > 7000 ? 'Expert' : 'Advanced'}
                                            </span>
                                        </div>
                                    ))
                                )}

                                {/* Current user row */}
                                {walletAddress && (
                                    <div className="flex items-center gap-4 p-4 bg-primary/30 border-y-2 border-primary">
                                        <div className="w-8 text-center font-black text-slate-900 text-xl">–</div>
                                        <div className="size-10 rounded-full overflow-hidden bg-white border-2 border-primary flex items-center justify-center text-slate-500">
                                            <span className="material-symbols-outlined text-sm">person</span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold m-0">You ({walletAddress})</p>
                                            <p className="text-xs text-slate-700 font-medium m-0">{user?.impactPoints?.toLocaleString() || 0} pts</p>
                                        </div>
                                        <span className="text-xs font-black bg-slate-900 text-white px-3 py-1 rounded-lg">Guardian</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Side Card: Active Quests */}
                    <div className="space-y-6">
                        <div className="bg-slate-900 text-white p-6 rounded-xl space-y-4">
                            <h3 className="text-lg font-black flex items-center gap-2 m-0">
                                <span className="material-symbols-outlined text-primary">explore</span>
                                Next Quest
                            </h3>
                            {loadingTasks ? (
                                <p className="text-sm opacity-60 m-0">Loading tasks…</p>
                            ) : nextTask ? (
                                <div className="space-y-3">
                                    <div className="p-3 bg-white/10 rounded-lg border border-white/10">
                                        <p className="text-xs font-bold text-primary uppercase m-0">Available Task</p>
                                        <p className="text-sm font-medium mt-1 m-0">{nextTask.title}</p>
                                        <p className="text-[10px] mt-2 opacity-60 m-0">Reward: +{nextTask.reward?.toLocaleString()} KES</p>
                                    </div>
                                    <Link
                                        to="/submit"
                                        className="block w-full py-2 bg-primary text-slate-900 font-black rounded-lg text-sm text-center hover:scale-105 transition-transform no-underline"
                                    >
                                        Accept Quest →
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <div className="p-3 bg-white/10 rounded-lg border border-white/10">
                                        <p className="text-xs font-bold text-primary uppercase m-0">Urban Farming</p>
                                        <p className="text-sm font-medium mt-1 m-0">Volunteer at East Side Community Garden</p>
                                        <p className="text-[10px] mt-2 opacity-60 m-0">Reward: +26,000 KES</p>
                                    </div>
                                    <Link
                                        to="/submit"
                                        className="block w-full py-2 bg-primary text-slate-900 font-black rounded-lg text-sm text-center hover:scale-105 transition-transform no-underline"
                                    >
                                        Accept Quest →
                                    </Link>
                                </div>
                            )}
                        </div>

                        <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900/50">
                            <h3 className="font-black mb-3 m-0">Impact Summary</h3>
                            <ul className="text-sm space-y-3 text-slate-500 font-medium list-none p-0 m-0">
                                <li className="flex items-center gap-2 m-0"><span className="material-symbols-outlined text-sm text-green-500">check_circle</span> 14 Trees Planted</li>
                                <li className="flex items-center gap-2 m-0"><span className="material-symbols-outlined text-sm text-green-500">check_circle</span> 42kg CO2 Offset</li>
                                <li className="flex items-center gap-2 m-0"><span className="material-symbols-outlined text-sm text-green-500">check_circle</span> {badges.length || 3} Community Badges</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>

            <footer className="mt-auto border-t border-primary/10 py-10 px-6 text-center">
                <p className="text-sm text-slate-500 font-medium m-0">© 2024 Bidii Chain. Built on Web3 for a Sustainable Kenya.</p>
            </footer>
        </div>
    )
}

export default Dashboard
