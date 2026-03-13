import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useWallet } from '../context/WalletContext'
import * as api from '../services/api'

function SubmitContribution() {
    const { walletAddress } = useWallet()
    const navigate = useNavigate()

    const [tasks, setTasks] = useState([])
    const [selectedTaskId, setSelectedTaskId] = useState('')
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [verifying, setVerifying] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error'
    const [errorMsg, setErrorMsg] = useState('')
    const fileInputRef = useRef()

    // Load available tasks
    useEffect(() => {
        api.getTasks()
            .then((data) => {
                setTasks(data)
                if (data.length) setSelectedTaskId(data[0].id)
            })
            .catch(() => {
                // fallback static options — visible even without backend
                setTasks([
                    { id: '1', title: 'Plant a Tree at Kakamega' },
                    { id: '2', title: 'Beach Cleanup at Diani' },
                    { id: '3', title: 'Solar Panel Installation - Kibera' },
                    { id: '4', title: 'Waste Management Training' },
                ])
                setSelectedTaskId('1')
            })
    }, [])

    const handleFileChange = (e) => {
        const f = e.target.files[0]
        if (!f) return
        setFile(f)
        setPreview(URL.createObjectURL(f))
        setSubmitStatus(null)
    }

    const handleSubmit = async () => {
        if (!walletAddress) {
            setErrorMsg('Please connect your wallet first.')
            setSubmitStatus('error')
            return
        }
        if (!file) {
            setErrorMsg('Please upload evidence (photo or video) first.')
            setSubmitStatus('error')
            return
        }
        setVerifying(true)
        setSubmitStatus(null)
        try {
            await api.submitProof(selectedTaskId, file)
            setSubmitStatus('success')
            setTimeout(() => navigate('/'), 2000)
        } catch (err) {
            setErrorMsg(err.message || 'Submission failed. Please try again.')
            setSubmitStatus('error')
        } finally {
            setVerifying(false)
        }
    }

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-[calc(100vh-72px)] flex flex-col items-center font-display">
            {/* Mobile Container */}
            <div className="w-full max-w-[480px] flex flex-col shadow-xl min-h-[calc(100vh-72px)]">

                {/* Sub-header */}
                <div className="flex items-center px-4 pt-6 pb-2">
                    <Link to="/" className="p-2 rounded-full hover:bg-primary/10 flex items-center no-underline text-slate-900 dark:text-slate-100">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </Link>
                    <h1 className="text-xl font-bold ml-2 text-slate-900 dark:text-slate-100 m-0">Submit Contribution</h1>
                </div>

                {/* Wallet warning */}
                {!walletAddress && (
                    <div className="mx-4 mb-2 p-3 bg-yellow-50 border border-yellow-200 rounded-xl text-sm text-yellow-800 flex items-center gap-2">
                        <span className="material-symbols-outlined text-yellow-500">warning</span>
                        Connect your wallet from the nav bar before submitting.
                    </div>
                )}

                {/* Main Content */}
                <main className="flex-1 px-4 space-y-6 py-2">
                    {/* Task Selection */}
                    <section className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Select Task</label>
                        <div className="relative">
                            <select
                                value={selectedTaskId}
                                onChange={(e) => setSelectedTaskId(e.target.value)}
                                className="w-full appearance-none bg-white dark:bg-slate-800 border-2 border-primary/20 rounded-xl px-4 py-4 pr-10 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            >
                                {tasks.map((t) => (
                                    <option key={t.id} value={t.id}>{t.title}</option>
                                ))}
                            </select>
                            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                expand_more
                            </span>
                        </div>
                    </section>

                    {/* Evidence Upload Area */}
                    <section>
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1 block mb-2">Evidence</label>
                        <div
                            onClick={() => fileInputRef.current.click()}
                            className="w-full aspect-square rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 flex flex-col items-center justify-center space-y-4 hover:bg-primary/10 transition-colors cursor-pointer group overflow-hidden"
                        >
                            {preview ? (
                                preview.includes('video') || file?.type?.startsWith('video') ? (
                                    <video src={preview} className="w-full h-full object-cover" muted autoPlay loop />
                                ) : (
                                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                )
                            ) : (
                                <>
                                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined text-4xl text-slate-800 dark:text-slate-200">photo_camera</span>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-lg font-bold text-slate-900 dark:text-slate-100 m-0">Upload Photo/Video Proof</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 m-0">JPG, PNG or MP4 (Max 50MB)</p>
                                    </div>
                                </>
                            )}
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*,video/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </section>

                    {/* Status messages */}
                    {submitStatus === 'error' && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 flex items-center gap-2">
                            <span className="material-symbols-outlined text-red-500">error</span>
                            {errorMsg}
                        </div>
                    )}
                    {submitStatus === 'success' && (
                        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-700 flex items-center gap-2">
                            <span className="material-symbols-outlined text-emerald-500">check_circle</span>
                            Proof submitted! Redirecting to Dashboard…
                        </div>
                    )}

                    {/* Verification Status */}
                    {verifying && (
                        <section className="flex flex-col items-center">
                            <div className="w-full py-3 px-6 bg-primary/20 dark:bg-primary/10 rounded-full flex items-center justify-center gap-3 text-slate-800 dark:text-primary font-medium border border-primary/30">
                                <span className="material-symbols-outlined animate-spin">settings</span>
                                <span>Verifying via AI Agent...</span>
                            </div>
                            <p className="mt-2 text-xs text-slate-500 text-center px-8 m-0">Our AI is analyzing your media to confirm task completion against project guidelines.</p>
                        </section>
                    )}
                </main>

                {/* Final Action Footer */}
                <footer className="p-6 bg-white dark:bg-slate-900 rounded-t-xl shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                    <button
                        onClick={handleSubmit}
                        disabled={verifying || submitStatus === 'success'}
                        className="w-full py-4 bg-primary text-slate-900 font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity border-none cursor-pointer disabled:opacity-60"
                    >
                        <span className="material-symbols-outlined">workspace_premium</span>
                        {verifying ? 'Submitting...' : 'Claim Soulbound Badge & Token Reward'}
                    </button>
                </footer>
            </div>
        </div>
    )
}

export default SubmitContribution
