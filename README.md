## ImpactChain / Community Work Tracker - Backend

Node.js + Express + MySQL + Sequelize backend for tracking community impact tasks, proofs, and a wallet-based leaderboard. Designed to plug into a React/Next.js frontend and OKX Web3 wallet.

---

### Getting Started

**1. Prerequisites**

- Node.js 18+ and npm
- MySQL running locally or in the cloud
- (Optional) Postman for testing the API

**2. Install dependencies**

```bash
cd BidiiChain
npm install
```

**3. Configure environment**

Create a `.env` file from the example:

```bash
copy .env.example .env
```

Update the values in `.env` to match your MySQL credentials:

- `DB_HOST`
- `DB_PORT`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`

**4. Create database and run migrations**

In MySQL, create the database named in `DB_NAME`, for example:

```sql
CREATE DATABASE impactchain_dev;
```

Then run:

```bash
npx sequelize db:migrate
npx sequelize db:seed:all
```

**5. Start the server**

```bash
npm run dev   # with nodemon
# or
npm start
```

By default the API runs at `http://localhost:4000`.

---

### API Overview

Base URL: `http://localhost:4000`

All main endpoints are under `/api`.

#### Wallet / User

- **POST** `/api/connect-wallet`
  - Body (JSON):
    ```json
    {
      "walletAddress": "0xYOUR_OKX_WALLET",
      "name": "Alice",
      "email": "alice@example.com"
    }
    ```
  - Creates or updates a user keyed by `walletAddress` (lowercased). Returns user profile and placeholder `badges`.

- **GET** `/api/dashboard/:walletAddress`
  - Path:
    - `walletAddress`: wallet address of the user
  - Returns:
    - `user` (with `impactPoints`, joined tasks, proofs)
    - `completedTasks` (derived from verified proofs)
    - `badges` (from blockchain service stub)

#### Tasks

- **GET** `/api/tasks`
  - Returns all tasks with:
    - `volunteersCount`
    - `verifiedProofs`
    - `isFull` (based on `requiredVolunteers`)

- **POST** `/api/tasks`
  - Body (JSON):
    ```json
    {
      "title": "Beach Cleanup Drive",
      "description": "Collect plastic waste along the coastline and sort recyclables.",
      "reward": 50,
      "requiredVolunteers": 20
    }
    ```

- **POST** `/api/tasks/:taskId/join`
  - Body (JSON):
    ```json
    { "walletAddress": "0xYOUR_OKX_WALLET" }
    ```
  - User must already exist via `/api/connect-wallet`.
  - Creates a join record, respecting `requiredVolunteers` and preventing duplicates.

- **GET** `/api/tasks/:taskId`
  - Returns task with:
    - `volunteers` (users who joined)
    - `proofs` (each with submitting user)

- **GET** `/api/leaderboard?limit=10`
  - Returns top users ordered by `impactPoints`.

#### Proofs

- **POST** `/api/tasks/:taskId/proof`
  - Multipart form-data with:
    - `walletAddress` (text)
    - `file` (file; photo/video/etc.)
  - Uses in-memory multer storage and `ipfsService.uploadFile` to produce an `ipfsHash` (demo implementation).
  - Creates a `Proof` with `verified = false`.

- **POST** `/api/tasks/:taskId/proof/:proofId/verify`
  - Body (JSON):
    ```json
    { "approve": true }
    ```
  - When `approve` is `true` and proof is not yet verified:
    - Marks proof as verified.
    - Adds `task.reward` to `user.impactPoints`.
    - Calls `blockchainService.mintRewardToken(...)` (stub; safe to no-op during development).

---

### Architecture

- `app.js` – Express setup, global middleware (CORS, Helmet, JSON parsing), route mounting, and DB bootstrap.
- `models/` – Sequelize models (`User`, `Task`, `Proof`, `TaskVolunteer`) with timestamps and soft-delete enabled.
- `controllers/` – Business logic for users (`userController`), tasks (`taskController`), and proofs (`proofController`).
- `routes/` – Route files mapping HTTP paths to controllers.
- `services/` – Abstraction layer for IPFS and blockchain/OKX integration.
- `migrations/` – Sequelize migrations defining DB schema.
- `seeders/` – Demo tasks to quickly populate the DB.

---

### Using the Postman Collection

1. Open Postman.
2. Click **Import** and select `ImpactChain.postman_collection.json` from this project.
3. In the imported collection, define the `baseUrl` variable at the collection level:
   - `baseUrl = http://localhost:4000`
4. Run the requests in this order for a clean flow:
   - `Wallet / User → Connect Wallet`
   - `Tasks → Get All Tasks` (or `Create Task`)
   - `Tasks → Join Task`
   - `Proofs → Submit Proof`
   - `Proofs → Verify Proof`
   - `Wallet / User → Get Dashboard`
   - `Tasks → Leaderboard`

---

### Frontend / OKX Integration Notes

- Use OKX Web3 to get the connected wallet address, then call `POST /api/connect-wallet` to register/login the user.
- Call the task and proof endpoints from your React/Next.js app via `fetch`/`axios`, passing the connected `walletAddress`.
- Replace the stub logic in:
  - `services/ipfsService.js` – integrate Web3.Storage, Pinata, or OKX tooling.
  - `services/blockchainService.js` – wire up your reward token / NFT contract on OKX or EVM-compatible chain.

