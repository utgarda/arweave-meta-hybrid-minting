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
