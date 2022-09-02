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
    // await arweave.transactions.post(transaction);
    // console.log(transaction);
    return transaction.id;
  }

  const uploader = await arweave.transactions.getUploader(transaction);
  const uploaded = document.getElementById('uploaded');
  uploaded.style = 'width: 800px; height: 20px;';
  // while (!uploader.isComplete) {
  //   await uploader.uploadChunk();
  //   console.log(
  //     `${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`,
  //   );
  //   uploadedDataDiv.textContent = `${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks} chunks`;
  // }

  return transaction.id;
};

export const createArweaveManest = (filesMetaData) => {
  console.log('files', filesMetaData);
  // [ 'filename': { id: 'id}]
  const paths = filesMetaData.reduce((acc, val, index) => {
    acc[`${index}.json`] = { id: val.jsonId };
    return acc;
  }, {});
  // console.log(JSON.stringify(paths));
  return {
    manifest: 'arweave/paths',
    version: '0.1.0',
    paths,
  };
};
