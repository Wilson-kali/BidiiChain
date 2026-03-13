import { createContext, useContext, useState } from 'react'
import * as api from '../services/api'

const WalletContext = createContext(null)

export function WalletProvider({ children }) {
    const [walletAddress, setWalletAddress] = useState(null)
    const [user, setUser] = useState(null)
    const [badges, setBadges] = useState([])
    const [connecting, setConnecting] = useState(false)
    const [error, setError] = useState(null)

    const connectWallet = async (address) => {
        setConnecting(true)
        setError(null)
        try {
            const data = await api.connectWallet(address)
            setWalletAddress(data.user.walletAddress)
            setUser(data.user)
            setBadges(data.badges || [])
        } catch (err) {
            setError(err.message)
        } finally {
            setConnecting(false)
        }
    }

    const disconnect = () => {
        setWalletAddress(null)
        setUser(null)
        setBadges([])
    }

    return (
        <WalletContext.Provider value={{ walletAddress, user, badges, connecting, error, connectWallet, disconnect }}>
            {children}
        </WalletContext.Provider>
    )
}

export const useWallet = () => useContext(WalletContext)
