export const contract1 = {
  abi: {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'directory',
        type: 'bytes32',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'bytes32[]',
            name: 'metadata',
            type: 'bytes32[]',
          },
          {
            internalType: 'bytes[]',
            name: 'signatures',
            type: 'bytes[]',
          },
        ],
        internalType: 'struct IMultiaddressHybridBulkMinter.SingleAddressBulkMint[]',
        name: 'data',
        type: 'tuple[]',
      },
    ],
    name: 'bulkMint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  address: '0xe5aDefE963f8776Fbfbdd0d5acFcdFC04781Eb3C',
};
