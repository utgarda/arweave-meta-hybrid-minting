import { signPersonal } from './sign.mjs';
import { base64urlStringToBase64, binToHex } from './helpers.mjs';

export const getNetworkAndChainId = async () => {
  try {
    const chainId = await ethereum.request({
      method: 'eth_chainId',
    });

    const networkId = await ethereum.request({
      method: 'net_version',
    });

    const newAccounts = await ethereum.request({
      method: 'eth_accounts',
    });

    return { chainId, networkId, newAccounts };
  } catch (err) {
    console.error(err);
  }
};

export const sendArweaveTransaction = async (
  arweave,
  data,
  key,
  dataType,
  uploadedDataDiv,
) => {
  const transaction = await arweave.createTransaction({ data }, key);
  // console.log(dataType);
  transaction.addTag('Content-Type', dataType);

  await arweave.transactions.sign(transaction, key);

  if (dataType === 'application/json') {
    await arweave.transactions.post(transaction);
    // console.log(transaction);
    return transaction.id;
  }

  const uploader = await arweave.transactions.getUploader(transaction);
  const uploaded = document.getElementById('uploaded');
  uploaded.style = 'width: 800px; height: 20px;';
  while (!uploader.isComplete) {
    await uploader.uploadChunk();
    console.log(
      `${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`,
    );
    uploadedDataDiv.textContent = `${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks} chunks`;
  }

  return transaction.id;
};

export const createArweaveManest = (filesMetaData) => {
  const paths = filesMetaData.reduce((acc, val, index) => {
    acc[`${index}.json`] = { id: val.jsonId };
    return acc;
  }, {});
  return {
    manifest: 'arweave/paths',
    version: '0.1.0',
    paths,
  };
};

export const signWithMetamask = async (uploadedId, accounts) => {
  if (uploadedId === 'Null' || uploadedId === null || !uploadedId) {
    alert('No json id!');
    return;
  }
  const decoded = atob(base64urlStringToBase64(uploadedId));
  const hex = binToHex(decoded);
  const sign = await signPersonal(accounts, hex);
  return { sign, hex };
};
