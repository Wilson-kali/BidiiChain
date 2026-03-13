'use strict';

/**
 * Blockchain / smart contract integration layer.
 * 
 * Connects to ADEToken and ImpactNFT contracts deployed on Hardhat/Ethereum networks.
 * Uses ethers.js for contract interaction.
 */

const ethers = require('ethers');
const ADETokenABI = require('../contracts/ADEToken.json').abi;
const ImpactNFTABI = require('../contracts/ImpactNFT.json').abi;

// Contract addresses (set in .env or hardhat deployment)
const ADE_TOKEN_ADDRESS = process.env.ADE_TOKEN_ADDRESS || '';
const IMPACT_NFT_ADDRESS = process.env.IMPACT_NFT_ADDRESS || '';
const RPC_URL = process.env.RPC_URL || 'http://localhost:8545'; // Hardhat default
const PRIVATE_KEY = process.env.BLOCKCHAIN_PRIVATE_KEY || '';

let provider;
let signer;
let adeTokenContract;
let impactNFTContract;

/**
 * Initialize blockchain connection
 */
function initializeBlockchain() {
  if (!ADE_TOKEN_ADDRESS || !IMPACT_NFT_ADDRESS) {
    console.warn('⚠️  Contract addresses not set. Blockchain features will be disabled.');
    console.warn('   Set ADE_TOKEN_ADDRESS and IMPACT_NFT_ADDRESS in .env');
    return false;
  }

  try {
    provider = new ethers.JsonRpcProvider(RPC_URL);
    
    if (PRIVATE_KEY) {
      signer = new ethers.Wallet(PRIVATE_KEY, provider);
    } else {
      console.warn('⚠️  BLOCKCHAIN_PRIVATE_KEY not set. Write operations will fail.');
      signer = null;
    }

    // Initialize contracts
    adeTokenContract = new ethers.Contract(ADE_TOKEN_ADDRESS, ADETokenABI, signer || provider);
    impactNFTContract = new ethers.Contract(IMPACT_NFT_ADDRESS, ImpactNFTABI, signer || provider);

    console.log('✅ Blockchain initialized');
    console.log(`   ADE Token: ${ADE_TOKEN_ADDRESS}`);
    console.log(`   Impact NFT: ${IMPACT_NFT_ADDRESS}`);
    console.log(`   RPC: ${RPC_URL}`);
    return true;
  } catch (err) {
    console.error('❌ Failed to initialize blockchain:', err.message);
    return false;
  }
}

/**
 * Mint reward tokens to a volunteer
 * @param {Object} params
 * @param {string} params.walletAddress - Recipient wallet address
 * @param {number} params.taskId - Task ID
 * @param {number} params.proofId - Proof ID
 * @param {number} params.amount - Amount to mint (in whole units, will be converted to wei)
 */
exports.mintRewardToken = async ({ walletAddress, taskId, proofId, amount }) => {
  if (!signer || !adeTokenContract) {
    console.log('⚠️  Blockchain not initialized. Skipping mintRewardToken.');
    console.log(`   Would mint ${amount} ADE to ${walletAddress} for task ${taskId}`);
    return {
      success: false,
      message: 'Blockchain not configured',
      taskId,
      proofId,
      walletAddress
    };
  }

  try {
    // Convert amount to wei (ADE has 18 decimals)
    const amountInWei = ethers.parseUnits(String(amount), 18);
    
    console.log(`🔄 Minting ${amount} ADE to ${walletAddress}...`);
    
    // Call mint function on the contract
    const tx = await adeTokenContract.mint(walletAddress, amountInWei);
    const receipt = await tx.wait();
    
    console.log(`✅ Minted ${amount} ADE - TX: ${receipt.hash}`);
    
    return {
      success: true,
      transactionHash: receipt.hash,
      blockNumber: receipt.blockNumber,
      taskId,
      proofId,
      walletAddress,
      amount
    };
  } catch (err) {
    console.error(`❌ Failed to mint tokens:`, err.message);
    return {
      success: false,
      error: err.message,
      taskId,
      proofId,
      walletAddress,
      amount
    };
  }
};

/**
 * Issue a badge NFT to a volunteer
 * @param {Object} params
 * @param {string} params.walletAddress - Recipient wallet address
 * @param {string} params.badgeName - Badge name
 * @param {string} params.description - Badge description
 * @param {number} params.tier - Badge tier (0=BRONZE, 1=SILVER, 2=GOLD, 3=PLATINUM)
 * @param {number} params.contributionCount - Number of contributions
 */
exports.issueBadge = async ({ walletAddress, badgeName, description, tier = 0, contributionCount = 0 }) => {
  if (!signer || !impactNFTContract) {
    console.log('⚠️  Blockchain not initialized. Skipping issueBadge.');
    console.log(`   Would issue ${badgeName} badge to ${walletAddress}`);
    return {
      success: false,
      message: 'Blockchain not configured',
      walletAddress,
      badgeName
    };
  }

  try {
    console.log(`🔄 Issuing "${badgeName}" badge to ${walletAddress}...`);
    
    const tx = await impactNFTContract.issueBadge(
      walletAddress,
      badgeName,
      description,
      tier,
      contributionCount
    );
    const receipt = await tx.wait();
    
    console.log(`✅ Issued badge - TX: ${receipt.hash}`);
    
    return {
      success: true,
      transactionHash: receipt.hash,
      blockNumber: receipt.blockNumber,
      walletAddress,
      badgeName,
      tier
    };
  } catch (err) {
    console.error(`❌ Failed to issue badge:`, err.message);
    return {
      success: false,
      error: err.message,
      walletAddress,
      badgeName
    };
  }
};

/**
 * Get user's badges/NFTs
 * @param {string} walletAddress
 * @returns {Array} Array of badge data
 */
exports.getUserBadges = async (walletAddress) => {
  if (!impactNFTContract) {
    console.log('⚠️  Blockchain not initialized. Returning empty badge list.');
    return [];
  }

  try {
    const balance = await impactNFTContract.balanceOf(walletAddress);
    
    if (balance === 0) {
      return [];
    }

    const badges = [];
    
    // Iterate through token IDs to get badge details
    // Note: This is a simplified approach. In production, you might want to use events or a more efficient method.
    for (let i = 0; i < balance; i++) {
      try {
        // In ERC721, you'd typically need to iterate through owned tokens
        // This is a simplified version - actual implementation depends on contract design
        const badgeData = await impactNFTContract.getBadge(i);
        badges.push({
          tokenId: i,
          name: badgeData.name,
          description: badgeData.description,
          tier: badgeData.tier,
          contributionCount: badgeData.contributionCount.toString(),
          issuedAt: new Date(badgeData.issuedAt.toNumber() * 1000)
        });
      } catch (err) {
        // Token may not exist, continue
        continue;
      }
    }
    
    return badges;
  } catch (err) {
    console.error(`❌ Failed to get badges:`, err.message);
    return [];
  }
};

/**
 * Get token balance for a user
 * @param {string} walletAddress
 * @returns {string} Balance in ADE tokens
 */
exports.getTokenBalance = async (walletAddress) => {
  if (!adeTokenContract) {
    console.log('⚠️  Blockchain not initialized. Cannot fetch balance.');
    return '0';
  }

  try {
    const balanceInWei = await adeTokenContract.balanceOf(walletAddress);
    // Convert from wei to readable format (ADE has 18 decimals)
    const balanceInADE = ethers.formatUnits(balanceInWei, 18);
    return balanceInADE;
  } catch (err) {
    console.error(`❌ Failed to get balance:`, err.message);
    return '0';
  }
};

/**
 * Initialize on service load
 */
initializeBlockchain();

// Export initialization function for manual retry
exports.initialize = initializeBlockchain;

module.exports.ADE_TOKEN_ADDRESS = ADE_TOKEN_ADDRESS;
module.exports.IMPACT_NFT_ADDRESS = IMPACT_NFT_ADDRESS;
