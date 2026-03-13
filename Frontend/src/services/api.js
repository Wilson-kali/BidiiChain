/**
 * Bidii Chain API Service
 * Connects the frontend to the Express backend.
 * Base URL: http://localhost:3000/api
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

async function request(path, options = {}) {
    const res = await fetch(`${BASE_URL}${path}`, {
        headers: { 'Content-Type': 'application/json', ...options.headers },
        ...options,
    });
    if (!res.ok) {
        const error = await res.json().catch(() => ({ message: res.statusText }));
        throw new Error(error.message || 'API request failed');
    }
    return res.json();
}

// ─── User / Wallet ─────────────────────────────────────────────────────────
export const connectWallet = (walletAddress, name, email) =>
    request('/connect-wallet', {
        method: 'POST',
        body: JSON.stringify({ walletAddress, name, email }),
    });

export const getDashboard = (walletAddress) =>
    request(`/dashboard/${walletAddress}`);

// ─── Tasks ──────────────────────────────────────────────────────────────────
export const getTasks = () => request('/tasks');

export const getTaskById = (taskId) => request(`/tasks/${taskId}`);

export const createTask = (data) =>
    request('/tasks', { method: 'POST', body: JSON.stringify(data) });

export const joinTask = (taskId, walletAddress) =>
    request(`/tasks/${taskId}/join`, {
        method: 'POST',
        body: JSON.stringify({ walletAddress }),
    });

// ─── Leaderboard ────────────────────────────────────────────────────────────
export const getLeaderboard = (limit = 10) =>
    request(`/leaderboard?limit=${limit}`);

// ─── Proof Submission ────────────────────────────────────────────────────────
export const submitProof = (taskId, file) => {
    const form = new FormData();
    form.append('file', file);
    return fetch(`${BASE_URL}/tasks/${taskId}/proof`, { method: 'POST', body: form })
        .then((r) => r.json());
};

export const verifyProof = (taskId, proofId) =>
    request(`/tasks/${taskId}/proof/${proofId}/verify`, { method: 'POST' });
