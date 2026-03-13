# ImpactChain Backend - Complete Implementation Guide

## ✅ Implementation Status

### Database Models (Sequelize) - FULLY IMPLEMENTED
- ✅ **User Model** (`models/User.js`)
  - walletAddress (primary key)
  - name, email (optional)
  - impactPoints (default 0)
  - Timestamps & soft delete enabled
  - Associations: hasMany Proofs, belongsToMany Tasks

- ✅ **Task Model** (`models/Task.js`)
  - id, title, description
  - reward, requiredVolunteers
  - completed status
  - Timestamps & soft delete enabled
  - Associations: hasMany Proofs, belongsToMany Users

- ✅ **Proof Model** (`models/Proof.js`)
  - id, taskId, userId
  - ipfsHash, verified status
  - submittedAt timestamp
  - Timestamps & soft delete enabled
  - Associations: belongsTo Task, belongsTo User

- ✅ **TaskVolunteer Model** (`models/TaskVolunteer.js`)
  - Junction table for Task-User many-to-many relationship
  - Tracks which users joined which tasks

### Migrations - FULLY IMPLEMENTED
- ✅ `20260314000100-create-users.js` - Users table
- ✅ `20260314000200-create-tasks.js` - Tasks table
- ✅ `20260314000300-create-proofs.js` - Proofs table
- ✅ `20260314000400-create-task-volunteer.js` - TaskVolunteers junction table

### API Endpoints - FULLY IMPLEMENTED

#### Wallet / User Endpoints
- ✅ `POST /api/connect-wallet` - Connect OKX wallet, create/update user
- ✅ `GET /api/dashboard/:walletAddress` - Get user dashboard with tasks and badges

#### Task Endpoints
- ✅ `GET /api/tasks` - List all tasks with volunteer counts
- ✅ `POST /api/tasks` - Create new task
- ✅ `GET /api/tasks/:taskId` - Get single task details
- ✅ `POST /api/tasks/:taskId/join` - User joins a task
- ✅ `GET /api/leaderboard` - Get top contributors by impact points

#### Proof Endpoints
- ✅ `POST /api/tasks/:taskId/proof` - Submit proof with file upload
- ✅ `POST /api/tasks/:taskId/proof/:proofId/verify` - Verify proof and award points

### Controllers - FULLY IMPLEMENTED
- ✅ `userController.js` - Wallet connection and dashboard logic
- ✅ `taskController.js` - Task CRUD and leaderboard logic
- ✅ `proofController.js` - Proof submission and verification logic

### Services - FULLY IMPLEMENTED
- ✅ `ipfsService.js` - IPFS upload abstraction (demo mode, ready for integration)
- ✅ `blockchainService.js` - Smart contract abstraction (demo mode, ready for integration)

### Routes - FULLY IMPLEMENTED
- ✅ `userRoutes.js` - User/wallet routes
- ✅ `taskRoutes.js` - Task and leaderboard routes
- ✅ `proofRoutes.js` - Proof routes with multer file upload

### Configuration - FULLY IMPLEMENTED
- ✅ `config/config.js` - Sequelize database configuration
- ✅ `.sequelizerc` - Sequelize CLI configuration
- ✅ `app.js` - Express server setup with middleware
- ✅ `.env.example` - Environment variables template

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment
```bash
copy .env.example .env
```

Edit `.env` with your MySQL credentials:
```
PORT=4000
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=impactchain_dev
```

### 3. Create Database
```sql
CREATE DATABASE impactchain_dev;
```

### 4. Run Migrations
```bash
npm run db:migrate
```

### 5. (Optional) Seed Demo Data
```bash
npm run db:seed
```

### 6. Start Server
```bash
npm run dev
```

Server will run on `http://localhost:4000`

---

## 📋 API Testing

### Test Wallet Connection
```bash
curl -X POST http://localhost:4000/api/connect-wallet \
  -H "Content-Type: application/json" \
  -d '{"walletAddress":"0x1234567890abcdef","name":"John Doe"}'
```

### Create Task
```bash
curl -X POST http://localhost:4000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Clean Beach","description":"Help clean local beach","reward":100,"requiredVolunteers":5}'
```

### Get All Tasks
```bash
curl http://localhost:4000/api/tasks
```

### Join Task
```bash
curl -X POST http://localhost:4000/api/tasks/1/join \
  -H "Content-Type: application/json" \
  -d '{"walletAddress":"0x1234567890abcdef"}'
```

### Submit Proof (with file)
```bash
curl -X POST http://localhost:4000/api/tasks/1/proof \
  -F "walletAddress=0x1234567890abcdef" \
  -F "file=@proof.jpg"
```

### Verify Proof
```bash
curl -X POST http://localhost:4000/api/tasks/1/proof/1/verify \
  -H "Content-Type: application/json" \
  -d '{"approve":true}'
```

### Get Dashboard
```bash
curl http://localhost:4000/api/dashboard/0x1234567890abcdef
```

### Get Leaderboard
```bash
curl http://localhost:4000/api/leaderboard
```

---

## 🔧 Project Structure

```
Backend/
├── config/
│   └── config.js                    # Sequelize DB config
├── controllers/
│   ├── userController.js            # Wallet & dashboard logic
│   ├── taskController.js            # Task CRUD & leaderboard
│   └── proofController.js           # Proof submission & verification
├── migrations/
│   ├── 20260314000100-create-users.js
│   ├── 20260314000200-create-tasks.js
│   ├── 20260314000300-create-proofs.js
│   └── 20260314000400-create-task-volunteer.js
├── models/
│   ├── index.js                     # Sequelize initialization
│   ├── User.js                      # User model
│   ├── Task.js                      # Task model
│   ├── Proof.js                     # Proof model
│   └── TaskVolunteer.js             # Junction table model
├── routes/
│   ├── userRoutes.js                # User/wallet routes
│   ├── taskRoutes.js                # Task routes
│   └── proofRoutes.js               # Proof routes
├── services/
│   ├── ipfsService.js               # IPFS integration layer
│   └── blockchainService.js         # Smart contract layer
├── seeders/
│   └── 20260314000500-demo-tasks.js # Demo data
├── .env.example                     # Environment template
├── .sequelizerc                     # Sequelize CLI config
├── app.js                           # Express app entry point
├── package.json                     # Dependencies
└── README.md                        # Documentation
```

---

## 🔌 Frontend Integration

### Connect OKX Wallet
```javascript
const connectWallet = async () => {
  const accounts = await window.okxwallet.request({ 
    method: 'eth_requestAccounts' 
  });
  
  const response = await fetch('http://localhost:4000/api/connect-wallet', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      walletAddress: accounts[0],
      name: 'User Name'
    })
  });
  
  const data = await response.json();
  console.log('User:', data.user);
};
```

### Fetch Tasks
```javascript
const fetchTasks = async () => {
  const response = await fetch('http://localhost:4000/api/tasks');
  const tasks = await response.json();
  return tasks;
};
```

### Submit Proof
```javascript
const submitProof = async (taskId, walletAddress, file) => {
  const formData = new FormData();
  formData.append('walletAddress', walletAddress);
  formData.append('file', file);
  
  const response = await fetch(`http://localhost:4000/api/tasks/${taskId}/proof`, {
    method: 'POST',
    body: formData
  });
  
  return await response.json();
};
```

---

## 🔐 Security Features

- ✅ Helmet.js for HTTP security headers
- ✅ CORS enabled for frontend integration
- ✅ Input validation in controllers
- ✅ Sequelize ORM prevents SQL injection
- ✅ Wallet addresses normalized to lowercase
- ✅ Soft delete (paranoid mode) for data recovery

---

## 🎯 Next Steps for Production

### IPFS Integration
Replace demo IPFS service with real implementation:
```javascript
// services/ipfsService.js
const { Web3Storage } = require('web3.storage');

exports.uploadFile = async (file) => {
  const client = new Web3Storage({ 
    token: process.env.WEB3_STORAGE_TOKEN 
  });
  const cid = await client.put([
    new File([file.buffer], file.originalname)
  ]);
  return cid;
};
```

### Blockchain Integration
Replace demo blockchain service with real smart contract calls:
```javascript
// services/blockchainService.js
const { ethers } = require('ethers');

exports.mintRewardToken = async ({ walletAddress, amount }) => {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const contract = new ethers.Contract(
    process.env.REWARD_CONTRACT_ADDRESS, 
    abi, 
    signer
  );
  const tx = await contract.mint(
    walletAddress, 
    ethers.parseUnits(String(amount), 18)
  );
  await tx.wait();
};
```

### Additional Enhancements
- Add JWT authentication middleware
- Implement rate limiting
- Add request validation with Joi or express-validator
- Add logging with Morgan
- Add API documentation with Swagger
- Add unit and integration tests
- Deploy to cloud (AWS, Heroku, Railway)

---

## ✅ All Features Implemented

This backend is **100% complete** and ready for:
- ✅ OKX wallet integration
- ✅ React/Next.js frontend connection
- ✅ Task management
- ✅ Proof submission with file uploads
- ✅ Impact points tracking
- ✅ Leaderboard functionality
- ✅ Database migrations
- ✅ Modular architecture
- ✅ Ready for blockchain integration

**Status: Production-ready for hackathon demo!** 🚀
