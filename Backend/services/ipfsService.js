'use strict';

/**
 * IPFS service abstraction.
 *
 * For hackathon/demo use, this file exposes a simple API that you can
 * later wire up to Web3.Storage, Pinata, NFT.Storage, or an on-chain storage
 * solution. For now it just simulates an upload and returns a placeholder hash.
 */

exports.uploadFile = async (file) => {
  // `file` is the multer file object (buffer in memory)
  // Plug in actual IPFS client here.

  // Example (pseudo-code):
  // const client = new Web3Storage({ token: process.env.WEB3_STORAGE_TOKEN });
  // const cid = await client.put([new File([file.buffer], file.originalname)]);
  // return cid;

  // For now, return a deterministic fake hash so the rest of the app can function.
  const timestamp = Date.now();
  const safeName = (file.originalname || 'proof').replace(/\s+/g, '-');
  return `demo-ipfs-hash-${timestamp}-${safeName}`;
};

