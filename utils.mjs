export const base64urlStringToBase64 = (str) => str.split('-').join('+').split('_').join('/');

export const base64strTobase64url = (str) => str.split('+').join('-').split('/').join('_');

export const binToHex = (bin) => {
  for (var i = 0, hex = []; i < bin.length; ++i) {
    let tmp = bin.charCodeAt(i).toString(16);
    if (tmp.length === 1) tmp = '0' + tmp;
    hex[hex.length] = tmp;
  }
  return hex.join('');
};

export function readFile(file) {
  return new Promise((resolve, reject) => {
    // Create file reader
    let reader = new FileReader();

    // Register event listeners
    reader.addEventListener('loadend', (e) => resolve(e.target.result));
    reader.addEventListener('error', reject);

    // Read file
    reader.readAsArrayBuffer(file);
  });
}

export async function getAsByteArray(file) {
  return new Uint8Array(await readFile(file));
}
