export const base64urlStringToBase64 = (str) => str.split('-').join('+').split('_').join('/');

export const base64strTobase64url = (str) => str.split('+').join('-').split('/').join('_');

export const readFile = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('loadend', (e) => resolve(e.target.result));
    reader.addEventListener('error', reject);
    reader.readAsArrayBuffer(file);
  });

export const getAsByteArray = async (file) => new Uint8Array(await readFile(file));

export const binToHex = (bin) => {
  for (var i = 0, hex = []; i < bin.length; ++i) {
    let tmp = bin.charCodeAt(i).toString(16);
    if (tmp.length === 1) tmp = '0' + tmp;
    hex[hex.length] = tmp;
  }
  return hex.join('');
};
