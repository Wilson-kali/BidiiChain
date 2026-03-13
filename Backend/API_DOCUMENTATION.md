# BidiiChain Backend - Complete API Documentation

Base URL: `http://localhost:4000`

---

## 📋 Table of Contents
1. [Wallet / User Endpoints](#wallet--user-endpoints)
2. [Task Endpoints](#task-endpoints)
3. [Proof Endpoints](#proof-endpoints)
4. [Response Formats](#response-formats)
5. [Error Handling](#error-handling)

---

## Wallet / User Endpoints

### 1. Connect Wallet
**Endpoint:** `POST /api/connect-wallet`

**Description:** Register or update a user by wallet address. Creates new user if doesn't exist.

**Request Body:**
```json
{
  "walletAddress": "0x1234567890abcdef1234567890abcdef12345678",
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Required Fields:**
- `walletAddress` (string) - OKX wallet address

**Optional Fields:**
- `name` (string) - User's display name
- `email` (string) - User's email address

**Response (200 OK):**
```json
{
  "user": {
    "walletAddress": "0x1234567890abcdef1234567890abcdef12345678",
    "name": "John Doe",
    "email": "john@example.com",
    "impactPoints": 0,
    "createdAt": "2024-03-14T10:30:00.000Z",
    "updatedAt": "2024-03-14T10:30:00.000Z"
  },
  "badges": []
}
```

**Error Responses:**
- `400 Bad Request` - Missing walletAddress

**Example cURL:**
```bash
curl -X POST http://localhost:4000/api/connect-wallet \
  -H "Content-Type: application/json" \
  -d '{"walletAddress":"0x1234567890abcdef","name":"John Doe"}'
```

---

### 2. Get User Dashboard
**Endpoint:** `GET /api/dashboard/:walletAddress`

**Description:** Fetch user profile, completed tasks, and badges.

**URL Parameters:**
- `walletAddress` (string) - User's wallet address

**Response (200 OK):**
```json
{
  "user": {
    "walletAddress": "0x1234567890abcdef1234567890abcdef12345678",
    "name": "John Doe",
    "email": "john@example.com",
    "impactPoints": 250,
    "createdAt": "2024-03-14T10:30:00.000Z",
    "updatedAt": "2024-03-14T11:45:00.000Z",
    "proofs": [...],
    "tasks": [...]
  },
  "completedTasks": [
    {
      "id": 1,
      "title": "Beach Cleanup Drive",
      "description": "Collect plastic waste...",
      "reward": 50,
      "completed": false
    }
  ],
  "badges": []
}
```

**Error Responses:**
- `400 Bad Request` - Missing walletAddress
- `404 Not Found` - User not found

**Example cURL:**
```bash
curl http://localhost:4000/api/dashboard/0x1234567890abcdef
```

---

## Task Endpoints

### 3. Get All Tasks
**Endpoint:** `GET /api/tasks`

**Description:** Retrieve all tasks with volunteer counts and status.

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "title": "Beach Cleanup Drive",
    "description": "Collect plastic waste along the coastline and sort recyclables.",
    "reward": 50,
    "requiredVolunteers": 20,
    "completed": false,
    "createdAt": "2024-03-14T10:00:00.000Z",
    "updatedAt": "2024-03-14T10:00:00.000Z",
    "volunteersCount": 5,
    "verifiedProofs": 2,
    "isFull": false,
    "proofs": [...],
    "volunteers": [...]
  }
]
```

**Example cURL:**
```bash
curl http://localhost:4000/api/tasks
```

---

### 4. Create Task
**Endpoint:** `POST /api/tasks`

**Description:** Create a new community task.

**Request Body:**
```json
{
  "title": "Community Tree Planting",
  "description": "Plant and water new saplings in the community park.",
  "reward": 75,
  "requiredVolunteers": 15
}
```

**Required Fields:**
- `title` (string) - Task title
- `description` (string) - Task description

**Optional Fields:**
- `reward` (integer) - Impact points reward (default: 0)
- `requiredVolunteers` (integer) - Number of volunteers needed (default: 1)

**Response (201 Created):**
```json
{
  "id": 2,
  "title": "Community Tree Planting",
  "description": "Plant and water new saplings in the community park.",
  "reward": 75,
  "requiredVolunteers": 15,
  "completed": false,
  "createdAt": "2024-03-14T11:00:00.000Z",
  "updatedAt": "2024-03-14T11:00:00.000Z"
}
```

**Error Responses:**
- `400 Bad Request` - Missing title or description

**Example cURL:**
```bash
curl -X POST http://localhost:4000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Tree Planting","description":"Plant trees","reward":75,"requiredVolunteers":15}'
```

---

### 5. Get Task by ID
**Endpoint:** `GET /api/tasks/:taskId`

**Description:** Fetch detailed information about a specific task.

**URL Parameters:**
- `taskId` (integer) - Task ID

**Response (200 OK):**
```json
{
  "id": 1,
  "title": "Beach Cleanup Drive",
  "description": "Collect plastic waste along the coastline and sort recyclables.",
  "reward": 50,
  "requiredVolunteers": 20,
  "completed": false,
  "createdAt": "2024-03-14T10:00:00.000Z",
  "updatedAt": "2024-03-14T10:00:00.000Z",
  "proofs": [
    {
      "id": 1,
      "ipfsHash": "demo-ipfs-hash-1234567890",
      "verified": true,
      "submittedAt": "2024-03-14T10:30:00.000Z",
      "user": {
        "walletAddress": "0x1234567890abcdef",
        "name": "John Doe"
      }
    }
  ],
  "volunteers": [
    {
      "walletAddress": "0x1234567890abcdef",
      "name": "John Doe"
    }
  ]
}
```

**Error Responses:**
- `404 Not Found` - Task not found

**Example cURL:**
```bash
curl http://localhost:4000/api/tasks/1
```

---

### 6. Join Task
**Endpoint:** `POST /api/tasks/:taskId/join`

**Description:** User joins a task as a volunteer.

**URL Parameters:**
- `taskId` (integer) - Task ID

**Request Body:**
```json
{
  "walletAddress": "0x1234567890abcdef1234567890abcdef12345678"
}
```

**Required Fields:**
- `walletAddress` (string) - User's wallet address

**Response (200 OK):**
```json
{
  "message": "Joined task",
  "task": {
    "id": 1,
    "title": "Beach Cleanup Drive",
    "volunteers": [...]
  }
}
```

**Error Responses:**
- `400 Bad Request` - Missing walletAddress or task is full
- `404 Not Found` - Task or user not found
- `200 OK` - Already joined (returns existing join)

**Example cURL:**
```bash
curl -X POST http://localhost:4000/api/tasks/1/join \
  -H "Content-Type: application/json" \
  -d '{"walletAddress":"0x1234567890abcdef"}'
```

---

### 7. Get Leaderboard
**Endpoint:** `GET /api/leaderboard`

**Description:** Fetch top contributors by impact points.

**Query Parameters:**
- `limit` (integer, optional) - Number of users to return (default: 10)

**Response (200 OK):**
```json
[
  {
    "walletAddress": "0x1234567890abcdef1234567890abcdef12345678",
    "name": "John Doe",
    "impactPoints": 250,
    "createdAt": "2024-03-14T10:00:00.000Z"
  },
  {
    "walletAddress": "0xabcdef1234567890abcdef1234567890abcdef12",
    "name": "Jane Smith",
    "impactPoints": 175,
    "createdAt": "2024-03-14T09:30:00.000Z"
  }
]
```

**Example cURL:**
```bash
curl http://localhost:4000/api/leaderboard?limit=20
```

---

## Proof Endpoints

### 8. Submit Proof
**Endpoint:** `POST /api/tasks/:taskId/proof`

**Description:** Submit proof of task completion with file upload.

**URL Parameters:**
- `taskId` (integer) - Task ID

**Request Body (multipart/form-data):**
- `walletAddress` (text) - User's wallet address
- `file` (file) - Proof file (image, video, etc.)

**Response (201 Created):**
```json
{
  "message": "Proof submitted",
  "proof": {
    "id": 1,
    "taskId": 1,
    "userId": "0x1234567890abcdef1234567890abcdef12345678",
    "ipfsHash": "demo-ipfs-hash-1234567890-proof.jpg",
    "verified": false,
    "submittedAt": "2024-03-14T11:00:00.000Z",
    "createdAt": "2024-03-14T11:00:00.000Z",
    "updatedAt": "2024-03-14T11:00:00.000Z"
  }
}
```

**Error Responses:**
- `400 Bad Request` - Missing walletAddress or file
- `404 Not Found` - Task or user not found

**Example cURL:**
```bash
curl -X POST http://localhost:4000/api/tasks/1/proof \
  -F "walletAddress=0x1234567890abcdef" \
  -F "file=@proof.jpg"
```

**Example JavaScript (Frontend):**
```javascript
const formData = new FormData();
formData.append('walletAddress', '0x1234567890abcdef');
formData.append('file', fileInput.files[0]);

const response = await fetch('http://localhost:4000/api/tasks/1/proof', {
  method: 'POST',
  body: formData
});
```

---

### 9. Verify Proof
**Endpoint:** `POST /api/tasks/:taskId/proof/:proofId/verify`

**Description:** Verify submitted proof and award impact points.

**URL Parameters:**
- `taskId` (integer) - Task ID
- `proofId` (integer) - Proof ID

**Request Body:**
```json
{
  "approve": true
}
```

**Optional Fields:**
- `approve` (boolean) - Whether to approve the proof (default: true)

**Response (200 OK):**
```json
{
  "message": "Proof verified",
  "proof": {
    "id": 1,
    "taskId": 1,
    "userId": "0x1234567890abcdef1234567890abcdef12345678",
    "ipfsHash": "demo-ipfs-hash-1234567890-proof.jpg",
    "verified": true,
    "submittedAt": "2024-03-14T11:00:00.000Z",
    "task": {
      "id": 1,
      "title": "Beach Cleanup Drive",
      "reward": 50
    },
    "user": {
      "walletAddress": "0x1234567890abcdef1234567890abcdef12345678",
      "impactPoints": 50
    }
  }
}
```

**Error Responses:**
- `404 Not Found` - Proof not found

**Example cURL:**
```bash
curl -X POST http://localhost:4000/api/tasks/1/proof/1/verify \
  -H "Content-Type: application/json" \
  -d '{"approve":true}'
```

---

## Response Formats

### Success Response
All successful responses return appropriate HTTP status codes (200, 201) with JSON data.

### Error Response
```json
{
  "message": "Error description"
}
```

Common HTTP status codes:
- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

## Error Handling

All endpoints use consistent error handling:

```javascript
try {
  // Controller logic
} catch (err) {
  next(err); // Passes to global error handler
}
```

Global error handler in `app.js`:
```javascript
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || 'Internal server error'
  });
});
```

---

## Authentication Notes

Currently, the API uses wallet addresses as user identifiers without JWT tokens. For production:

1. Implement signature verification for wallet authentication
2. Add JWT tokens for session management
3. Add middleware to protect endpoints
4. Implement role-based access control (admin vs user)

---

## Rate Limiting

Not currently implemented. For production, consider adding:
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

---

## CORS Configuration

Currently allows all origins:
```javascript
app.use(cors());
```

For production, restrict to specific origins:
```javascript
app.use(cors({
  origin: ['https://yourfrontend.com'],
  credentials: true
}));
```

---

## Testing with Postman

Import the included `BidiiChain.postman_collection.json` file for pre-configured requests.

**Collection Variables:**
- `baseUrl`: `http://localhost:4000`
- `walletAddress`: Your test wallet address
- `taskId`: Test task ID

---

## Frontend Integration Example

```javascript
// Connect wallet
const connectWallet = async () => {
  const accounts = await window.okxwallet.request({ 
    method: 'eth_requestAccounts' 
  });
  
  const response = await fetch('http://localhost:4000/api/connect-wallet', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      walletAddress: accounts[0].toLowerCase()
    })
  });
  
  return await response.json();
};

// Fetch tasks
const getTasks = async () => {
  const response = await fetch('http://localhost:4000/api/tasks');
  return await response.json();
};

// Join task
const joinTask = async (taskId, walletAddress) => {
  const response = await fetch(`http://localhost:4000/api/tasks/${taskId}/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ walletAddress })
  });
  return await response.json();
};

// Submit proof
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

**API Version:** 1.0.0  
**Last Updated:** March 2024  
**Status:** Production-ready for hackathon demo 🚀
