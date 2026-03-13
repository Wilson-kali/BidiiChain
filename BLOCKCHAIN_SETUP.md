# Blockchain Integration Setup

This guide connects the Hardhat smart contracts to the BidiiChain backend.

## Quick Start

### 1. Deploy Contracts

From the `/Blockchain` directory (parent of BidiiChain):

```bash
# Install dependencies (if not done)
npm install

# Compile contracts
npx hardhat compile

# Deploy to local Hardhat node
npx hardhat run scripts/deploy.js --network localhost

# OR deploy to Sepolia testnet
npx hardhat run scripts/deploy.js --network sepolia
```

This will output contract addresses.

### 2. Configure Backend

In `BidiiChain/Backend/.env`, add:

```env
# Blockchain Integration
RPC_URL=http://localhost:8545              # For local Hardhat
# RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY  # For Sepolia

BLOCKCHAIN_PRIVATE_KEY=your_private_key

ADE_TOKEN_ADDRESS=0x...
IMPACT_NFT_ADDRESS=0x...
```

### 3. Install Dependencies

```bash
cd BidiiChain/Backend
npm install
```

### 4. Start Backend

```bash
npm run dev
```

## API Endpoints

All endpoints automatically interact with blockchain when:
- Token rewards are minted → `POST /api/tasks/:taskId/proof/:proofId/verify`
- Badges are issued → Integrated into future endpoints

## Architecture

```
BidiiChain/Backend/
├── services/
│   └── blockchainService.js    # Contract interaction layer
├── contracts/
│   ├── ADEToken.json           # ADE Token ABI
│   └── ImpactNFT.json          # Impact NFT ABI
└── .env                        # Contract addresses & RPC config
```

## Contract Details

### ADEToken (ERC-20)
- **Function**: Mint reward tokens to volunteers
- **Supply**: 1M ADE tokens max
- **Decimals**: 18
- **Key Method**: `mint(address to, uint256 amount)`

### ImpactNFT (ERC-721)
- **Function**: Issue soulbound achievement badges
- **Tiers**: BRONZE, SILVER, GOLD, PLATINUM
- **Soulbound**: Cannot be transferred
- **Key Method**: `issueBadge(address to, string name, string description, BadgeTier tier, uint256 contributionCount)`

## Troubleshooting

**"Contract addresses not set"**
- Ensure ADE_TOKEN_ADDRESS and IMPACT_NFT_ADDRESS are in .env

**"Failed to connect to RPC"**
- Is Hardhat node running? (`npx hardhat node`)
- Check RPC_URL matches your network

**"Write operations will fail"**
- BLOCKCHAIN_PRIVATE_KEY must be set for minting/issuing

## Development Workflow

1. **Local Testing**: Use Hardhat local network
   ```bash
   # In /Blockchain directory
   npx hardhat node
   ```

2. **Deploy Contracts**: Run deploy script to get addresses
   ```bash
   npx hardhat run scripts/deploy.js --network localhost
   ```

3. **Update .env**: Copy addresses from deployment output

4. **Start Backend**: `npm run dev`

5. **Test Integration**: Use Postman collection to trigger blockchain calls

## Production Deployment

- Deploy to Sepolia testnet first: `--network sepolia`
- Then mainnet when ready: `--network polygon` or `--network ethereum`
- Update RPC_URL and contract addresses for each network
- Use secure key management (never commit BLOCKCHAIN_PRIVATE_KEY)
