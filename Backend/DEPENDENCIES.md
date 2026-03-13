# ImpactChain Backend - Required Dependencies

## Production Dependencies

Install all production dependencies with:
```bash
npm install cors dotenv express helmet multer mysql2 sequelize
```

### Individual Packages:
- **cors** - Enable Cross-Origin Resource Sharing for frontend integration
- **dotenv** - Load environment variables from .env file
- **express** - Web framework for Node.js
- **helmet** - Security middleware for Express
- **multer** - Middleware for handling multipart/form-data (file uploads)
- **mysql2** - MySQL database driver
- **sequelize** - Promise-based ORM for MySQL

---

## Development Dependencies

Install all development dependencies with:
```bash
npm install --save-dev nodemon sequelize-cli
```

### Individual Packages:
- **nodemon** - Auto-restart server on file changes during development
- **sequelize-cli** - Command-line interface for Sequelize migrations and seeders

---

## Optional Dependencies (for future enhancements)

### IPFS Integration:
- **web3.storage** - Decentralized storage via Web3.Storage
- **ipfs-http-client** - IPFS HTTP client
- **pinata-sdk** - Pinata IPFS service SDK

### Blockchain Integration:
- **ethers** - Ethereum library for smart contract interaction
- **web3** - Alternative Ethereum library
- **@okxweb3/coin-ethereum** - OKX Web3 SDK for Ethereum

### Additional Utilities:
- **axios** - HTTP client for external API calls
- **joi** - Schema validation
- **express-validator** - Request validation middleware
- **morgan** - HTTP request logger
- **compression** - Response compression middleware

---

## Installation Commands

### Quick Install (All at once):
```bash
npm install cors dotenv express helmet multer mysql2 sequelize
npm install --save-dev nodemon sequelize-cli
```

### Or use the existing package.json:
```bash
npm install
```

---

## Environment Setup

1. Copy `.env.example` to `.env`:
```bash
copy .env.example .env
```

2. Update `.env` with your MySQL credentials:
```
PORT=4000
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=impactchain_dev
```

3. Create MySQL database:
```sql
CREATE DATABASE impactchain_dev;
```

4. Run migrations:
```bash
npm run db:migrate
```

5. (Optional) Seed demo data:
```bash
npm run db:seed
```

6. Start the server:
```bash
npm run dev
```

---

## Verification

After installation, verify all dependencies are installed:
```bash
npm list --depth=0
```

Expected output should show all packages listed above.
