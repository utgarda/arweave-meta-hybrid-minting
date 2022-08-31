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
