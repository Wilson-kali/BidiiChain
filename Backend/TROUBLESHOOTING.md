# ImpactChain Backend - Troubleshooting Guide

## Common Errors and Solutions

### 1. Database Connection Errors

#### Error: "Unable to connect to the database"
**Cause:** MySQL is not running or credentials are incorrect

**Solutions:**
```bash
# Check if MySQL is running (Windows)
net start | findstr MySQL

# Start MySQL service
net start MySQL80

# Verify credentials in .env file
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=impactchain_dev
```

#### Error: "Unknown database 'impactchain_dev'"
**Cause:** Database doesn't exist

**Solution:**
```sql
-- Connect to MySQL and create database
mysql -u root -p
CREATE DATABASE impactchain_dev;
exit;
```

---

### 2. Migration Errors

#### Error: "Cannot find module './config/config'"
**Cause:** Sequelize CLI can't find config file

**Solution:**
Ensure `.sequelizerc` exists in project root:
```javascript
const path = require('path');

module.exports = {
  config: path.resolve(__dirname, 'config', 'config.js'),
  'models-path': path.resolve(__dirname, 'models'),
  'migrations-path': path.resolve(__dirname, 'migrations'),
  'seeders-path': path.resolve(__dirname, 'seeders')
};
```

#### Error: "Table already exists"
**Cause:** Migrations already run

**Solution:**
```bash
# Undo all migrations
npm run db:migrate:undo:all

# Run migrations again
npm run db:migrate
```

---

### 3. Module Not Found Errors

#### Error: "Cannot find module 'express'" (or any other package)
**Cause:** Dependencies not installed

**Solution:**
```bash
# Delete node_modules and package-lock.json
rmdir /s /q node_modules
del package-lock.json

# Reinstall all dependencies
npm install
```

#### Error: "Cannot find module './models'"
**Cause:** File path issue or missing model files

**Solution:**
Verify all model files exist:
- `models/index.js`
- `models/User.js`
- `models/Task.js`
- `models/Proof.js`
- `models/TaskVolunteer.js`

---

### 4. Port Already in Use

#### Error: "EADDRINUSE: address already in use :::4000"
**Cause:** Another process is using port 4000

**Solution:**
```bash
# Find process using port 4000 (Windows)
netstat -ano | findstr :4000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Or change port in .env
PORT=5000
```

---

### 5. CORS Errors (Frontend Integration)

#### Error: "Access-Control-Allow-Origin" blocked
**Cause:** CORS not properly configured

**Solution:**
Verify `app.js` has CORS enabled:
```javascript
const cors = require('cors');
app.use(cors());
```

For specific origins:
```javascript
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  credentials: true
}));
```

---

### 6. File Upload Errors

#### Error: "Unexpected field" when uploading proof
**Cause:** Form field name doesn't match multer configuration

**Solution:**
Ensure frontend sends file with field name 'file':
```javascript
const formData = new FormData();
formData.append('file', fileObject); // Must be 'file'
formData.append('walletAddress', address);
```

#### Error: "Proof file is required"
**Cause:** No file attached to request

**Solution:**
```javascript
// Frontend - ensure file is selected
if (!file) {
  alert('Please select a file');
  return;
}
```

---

### 7. Sequelize Association Errors

#### Error: "Task.hasMany called with something that's not a subclass of Sequelize.Model"
**Cause:** Model not properly initialized

**Solution:**
Ensure all models are loaded in `models/index.js` before associations:
```javascript
// Load all models first
fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js' && file.endsWith('.js'))
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Then set up associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
```

---

### 8. Environment Variable Issues

#### Error: "process.env.DB_NAME is undefined"
**Cause:** .env file not loaded

**Solution:**
```javascript
// Ensure dotenv is loaded at the top of app.js and config.js
require('dotenv').config();
```

Verify .env file exists in project root (not in subdirectory)

---

### 9. JSON Parsing Errors

#### Error: "Unexpected token in JSON"
**Cause:** Invalid JSON in request body

**Solution:**
```javascript
// Ensure Content-Type header is set
fetch('/api/connect-wallet', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ walletAddress: '0x...' })
});
```

---

### 10. Wallet Address Case Sensitivity

#### Error: "User not found" even after connecting wallet
**Cause:** Wallet address case mismatch

**Solution:**
All wallet addresses are normalized to lowercase in the backend:
```javascript
const normalizedAddress = walletAddress.toLowerCase();
```

Ensure frontend also uses lowercase:
```javascript
const address = accounts[0].toLowerCase();
```

---

## Verification Checklist

Before starting the server, verify:

- [ ] MySQL is running
- [ ] Database `impactchain_dev` exists
- [ ] `.env` file exists with correct credentials
- [ ] All dependencies installed (`npm install`)
- [ ] Migrations run successfully (`npm run db:migrate`)
- [ ] Port 4000 is available (or change in .env)

---

## Testing the Backend

### 1. Test Database Connection
```bash
npm start
```
Should see: "Database connection established."

### 2. Test API Root
```bash
curl http://localhost:4000/
```
Should return: `{"message":"ImpactChain / Community Work Tracker API"}`

### 3. Test Wallet Connection
```bash
curl -X POST http://localhost:4000/api/connect-wallet ^
  -H "Content-Type: application/json" ^
  -d "{\"walletAddress\":\"0xtest123\"}"
```

### 4. Test Get Tasks
```bash
curl http://localhost:4000/api/tasks
```

---

## Getting Help

If you encounter an error not listed here:

1. Check the console output for detailed error messages
2. Verify all files are in the correct locations
3. Ensure all dependencies are installed
4. Check MySQL error logs
5. Review the IMPLEMENTATION_GUIDE.md for setup steps

---

## Reset Everything

If all else fails, complete reset:

```bash
# 1. Stop the server (Ctrl+C)

# 2. Drop and recreate database
mysql -u root -p
DROP DATABASE impactchain_dev;
CREATE DATABASE impactchain_dev;
exit;

# 3. Clean install
rmdir /s /q node_modules
del package-lock.json
npm install

# 4. Run migrations
npm run db:migrate

# 5. Seed demo data (optional)
npm run db:seed

# 6. Start server
npm run dev
```

---

## Success Indicators

When everything is working correctly:

✅ Server starts without errors
✅ "Database connection established" message appears
✅ API responds at http://localhost:4000
✅ Can connect wallet via POST /api/connect-wallet
✅ Can create and fetch tasks
✅ Can submit proofs with file uploads
✅ Leaderboard returns data

**Status: Ready for frontend integration!** 🚀
