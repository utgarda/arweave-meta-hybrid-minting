export const signPersonal = async (accounts, message) => {
  try {
    const from = accounts[0];

    const msg = `0x${message}`;
    const sign = await ethereum.request({
      method: 'personal_sign',
      params: [msg, from, 'Example password'],
    });

    return sign;
  } catch (err) {
    console.error(err);
  }
};

export const signTypedDataV4 = async (networkId, chainId, newAccounts, messageInputValue) => {
  if (networkId && chainId && newAccounts) {
    const networkId1 = parseInt(networkId, 10);
    const chainId1 = parseInt(chainId, 16) || networkId1;
    const msgParams = {
      domain: {
        chainId: chainId1.toString(),
        name: 'Ether Mail',
        verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
        version: '1',
      },
      message: {
        contents: messageInputValue,
        from: {
          name: 'nobody1',
          wallets: newAccounts,
        },
        to: [
          {
            name: 'nobody2',
            wallets: [
              '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
              '0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57',
              '0xB0B0b0b0b0b0B000000000000000000000000000',
            ],
          },
        ],
      },
      primaryType: 'Mail',
      types: {
        EIP712Domain: [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
          { name: 'chainId', type: 'uint256' },
          { name: 'verifyingContract', type: 'address' },
        ],
        Group: [
          { name: 'name', type: 'string' },
          { name: 'members', type: 'Person[]' },
        ],
        Mail: [
          { name: 'from', type: 'Person' },
          { name: 'to', type: 'Person[]' },
          { name: 'contents', type: 'string' },
        ],
        Person: [
          { name: 'name', type: 'string' },
          { name: 'wallets', type: 'address[]' },
        ],
      },
    };

    try {
      const from = newAccounts[0];
      const sign = await ethereum.request({
        method: 'eth_signTypedData_v4',
        params: [from, JSON.stringify(msgParams)],
      });
      console.log(sign);
      return sign;
    } catch (err) {
      console.error('error: ', err);
    }
  }
};
