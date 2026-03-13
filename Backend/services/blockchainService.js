'use strict';

/**
 * Blockchain / smart contract integration layer.
 *
 * This file is intentionally lightweight so you can easily plug in
 * OKX Web3, EVM contracts, or other chains. All controllers call
 * through this abstraction instead of touching on-chain directly.
 */

exports.mintRewardToken = async ({ walletAddress, taskId, proofId, amount }) => {
  // TODO: Replace with actual contract call using ethers/web3/OKX SDK.
  // Example (pseudo-code):
  //
  // const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  // const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  // const contract = new ethers.Contract(process.env.REWARD_CONTRACT_ADDRESS, abi, signer);
  // const tx = await contract.mint(walletAddress, ethers.parseUnits(String(amount), 18));
  // await tx.wait();
  //
  // For now do nothing and just log.
  console.log('mintRewardToken called', { walletAddress, taskId, proofId, amount });
};

exports.getUserBadges = async (walletAddress) => {
  // TODO: Replace with on-chain or off-chain query for NFT badges.
  // For hackathon/demo we can derive virtual badges from impact points on the backend,
  // or you can later map this to contract-held NFTs.
  console.log('getUserBadges called', { walletAddress });

  // Return an empty list by default to keep the shape stable.
  return [];
};

