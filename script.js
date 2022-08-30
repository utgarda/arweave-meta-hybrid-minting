import {
  base64urlStringToBase64,
  base64strTobase64url,
  binToHex,
  getAsByteArray,
} from './utils.mjs';

import { signPersonal } from './sign.mjs';
const key = {
  kty: 'RSA',
  n: 'rMLDSm2dj82VgfVmS9XBa7PAvH7Mk7-52z_QN6zvA77qrbjYYKGvSX7RYHal6i7XuQVd7EmKlUpjMBjGkmXuHPqzJBYfh11x-bI5pl6I_yMhPx47jPcIdp3SH_gTnodiYM2GdhniihGpgKdxw-SH5Th-GtJ-vv1e-8kB-C4jox5h0j3XBK9Hw4khw6PRwcIPsgs8OcrzH54VD_iZyYoTlWD7g6vLxhB0cdlvm9sOaANn2IulE6tnWeMCYQ2w5lLQjGd2qAUjBKsJUs1u8HlwhJRtyoa3z1FO6lvC4wdX7ix8OcZemozEUBE4_IbmbrxVznOYqTfhwNa5lGeAR8abaVWzs46LAezxuvYWvTls0cUcytM40fX2n5Uq4xoM4F8SzW3PEu38eVJsuIeb_7qUVrNec0Ie-FVmx_FAJV2Fq_0FNXtJMd7TmrawjdflRWX8KFe-71adh9jtEb7tjyeYfUiYGXtlZrpuEjSfVQU6DKwAGW0v0SGSaTq425HEk0kp1_QIddcbvI2vYZuk3ImgD3PMbrYaX_4OFBc4QrFMsmBJk_A0g57ooDIkmZt1Ca8NJG4fqHK6rGBY8KVgbOwW5tCeoYOiCVQPJsHBqRIFRm8zJLeBE0TZRIJNUYUE6QaYFQH8hCv-IWWqJScnU7iiBlllyO0jZSuDU6o5aIdQHps',
  e: 'AQAB',
  d: 'Gs287vdC0uTapWclj-6CK-ufo58ormO4ukOUUo8KJlKgpoNfTt7HC2gZpBXEeCj8X0Bt6hMe5Tq9WOD_LgeSgfyDfr3P9niRDmSQfTd9mdgheGGAa8aIEZ860qryoE3w_YPlsL0jYLiMy-EuzW3Ph8jUB-VQtOEqs3XkUFUYQl6cXropehiX0cac7nWkPaOWO9FybqUGQ4mLSwcPFS3PDAYX_73Px9MVvfQ2VMAP5CNjIT3JRtv5FQEbhWNSZunCYYZL6pWhcT_4Gli1NaohwvAkeJ-eNRQwYjwKaJ7jDZjpTS1x0Bi2_JUvej6T0ep2hal5rgd1hy3JbTUBuiEeS2AurEgUkMIf0g0vWi34EmDu-6rLwbwwldpVnpDgPlecMXuL2dJVNI1GWX-Q2FgOKiuwcW4ev4GkeMa8BFUG5q1LiilK-eaCWrBLVrHfLsoxJijJfere1eDuOnOXcbEcI3Rz5ie_ziz8m96fAEk1SQ91be2kTHElPxM8xQ4urFq07PL5h_MCNuvmk41xhgB_tFzZ0Z2vwNE3iDoZ0nxVxD6FF7y2rwd1JwlIga46kIXsBP_BDxBO7KvA_NUhvG53SkT0h-_uUxfiJsvq3-Z7Ubkz8iNtJfo9PCY-dyNugaN7nELCI5tgocqcDxpNvWPKKCH_EkNosSMbRucMwacmLEE',
  p: '2PM9qj5e4-HQfdlLTFH_ZG8zsLdi9Iq4dHuXpcMz8VhQYvduzL6x7C8XSaVTt2iMPkNohvcoyXNguAjZSw4eeh3moSRv28HYD4-yNgufrd7315HIF3CHqqrw7Wmfov3Zug0ho9GzvlWQy6qqZVlxk4fmwN8sqtcUpM01epWQ_TtmqkH4lMTHw7DZexlNZ0I2yAUsxcR3_wtyTcP6LaKocSeZJJAqJTC8hJA_xZrj0pFdh_mINJrQvW1YJZoWAioaMGSQfbgebXosU6Zgngx-5NSI3-CQKdUuqIDs6NzxJb5O0zkJ-c8PRguC4TjG1Mmlgtr7UI7mwQEYiQH8vuuDJQ',
  q: 'y9tWgJO3NcMSOVzhx5WtSrB-64iSDaZDGfNZyu0-QfUSs36ucqNSHNopQB7Bio9vknJT4Z8b36PIbUMaf1oNgaOlVuRs-hmV3yv2FoYK_zcpziIbp_50Z1tr5p3JCJYXwlK1FNvbwGgLGOvU6qn3BfotW-TVEceceqHsT3x9h1ElJ8Y22cAL_9XcBDgWCD1_VDVE-PZFbcfIN2A6Qpm1olwICyC7AfjIhre5vcbX5qQwJQooqvCZ6EQ0Pb8MlgrKtM0ttpl584q9P4mQH39SAEG43K4sT4E0lHIF5YfqiOar1pVk6I9rRO-PYZr4aGN1Rydl0eGFkkcqWocqBdROvw',
  dp: 'QGO5Kp0GVsY_tgpXEdjIXwuuIMXdBc1iP5grAxSzhu76NNVROk1iy0GSvNXnyeiqrxQcouoaXefzjct6io8vNnlHaQ5CcMvQj5XLg8ThaJ5jmsR2yZYpfdrsVNpjeeGzzEd3c4KawWPt7LTDi_8G-Y19TEMwo6fgRaVuOOrJNI97wg6Ac88PpyIG-kUhNwNs9OKsTioonzbLfw8qYn8DVUo2ZqavC4iyevnBI6n78hQY2XGTHmHQkFgysD5SR-QtD63ZQKbzyPRY0Z7w0BfPVaVK1n906iWOio5xQg_JNrWL-Z7VOiJdWyGxf5z1TlRm3jaWHmu7Sw9DM-62EAggTQ',
  dq: 'AvbgjiQXwO9iP3VLTzSs_W4Nmm00-n_Vb_Yq8xl6E0l2CSgpbz9SvVqqyOTpmZM2YyHIeHpw1FK0YmpcY0ey9JSlndraftSKamFgRbmTRVzO_dFfJ5U6qhoZOpRGzRoppEjBm1kLHAQnTSh4wyTPk8WsjS6JrqWBcAMUxZ8g0Cvs52Qpfgcd5Y19ko4iO-JxDI9tvlUOc2c5URzUHA3SJ1dBQrAqKAAvIk5fpBPVJeRzUsaQCtRO2KLNQ6yYiUIE6pYlOQeIT3NQBzF_6AVY8uoBvyvFNy7AzfvOfCT60xzPmOI5Qmx7edgl9JxlSldP6EX5ZBDseVERm5llkgohTw',
  qi: 'bTscTyLPh6UcycW26s4dlQ5SWbjOrFreq2_oIQ-vHUFNs-Kbo_mj1C_QJcfdHMw_01RG_2ZD_p3JulRflqvy2nOQdDipzdwmZ2DfG9ZiETYMhDJZsSuPjY13-_TFtWIe-6LIwXKRj_3ZyH-Uu1PR6cepiGF6LnlyxpungNd78v80Sa3GMca7SD3K8Am2nKutn2h-gk_gayb6GgaiSiDSYP5Y0MLFKY4bQxL7dRXJy_xmRQ2_mfBhciQORAtNAxztT2OYZ_VNVKryF8nVBJfWYeqYy7YLqvdaxN52xqgfKOOEPTAuP7OT1U9tZHMpr_-0KF_aTHWOZeEyfRELSdVE8A',
};

const uploadedFileNames = [];
const filesMetaData = [];
const currentFileMetaData = {};
const signs = [];
const hexs = [];

async function getNetworkAndChainId() {
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
}

window.onload = async () => {
  const ready = document.getElementById('metamaskReady');

  if (!window.ethereum) {
    console.log('MetaMask is not installed!');
    ready.textContent = 'False';
    return;
  }

  const { chainId, newAccounts, networkId } = await getNetworkAndChainId();
  ready.textContent = `True Chain: ${chainId} Network: ${networkId} Acc: ${newAccounts}`;

  const arweave = Arweave.init({});
  arweave.network.getInfo().then(console.log);

  const form = document.getElementById('form');

  const signButton = document.getElementById('sign');
  const input = document.getElementById('input');

  const uploadedID = document.getElementById('uploadedId');
  const uploadedUri = document.getElementById('uploadedJsonUri');
  const signature = document.getElementById('signature');
  const dataList = document.getElementById('datalist');
  const bulkmintButton = document.getElementById('bulkmintButton');
  const signsDiv = document.getElementById('signs');
  const hexsDiv = document.getElementById('hexs');

  const uploaded = document.getElementById('uploaded');
  const uploadedData = document.getElementById('uploadedData');

  // uploadedID.textContent = 'i0-oWbzktkHgcmLKiFz1NuXO0x1IKA4BBUnOFRb_7cg=';

  const decoded = atob(base64urlStringToBase64(uploadedID.textContent));
  const encoded = btoa(decoded);

  console.log(
    'decoded encoded',
    uploadedID.textContent,
    decoded,
    encoded,
    base64strTobase64url(encoded),
    uploadedID.textContent === base64strTobase64url(encoded),
  );

  const hex = binToHex(decoded);
  console.log('hex', hex);

  bulkmintButton.addEventListener('click', async () => {
    console.log('bulk mint clicked');
    console.log(signs);
    console.log(hexs);
    console.log(filesMetaData);
  });

  input.addEventListener('change', () => {
    signature.textContent = 'Null';
    uploadedUri.textContent = 'Null';
    uploadedID.textContent = 'Null';
  });

  signButton.addEventListener('click', async () => {
    if (uploadedID.textContent === 'Null') {
      alert('No json id!');
      return;
    }

    const data = uploadedID.textContent;
    console.log('data', data);
    const decoded = atob(base64urlStringToBase64(uploadedID.textContent));
    console.log('decoded', decoded);
    const hex = binToHex(decoded);
    console.log('hex', hex);

    const sign = await signPersonal(newAccounts, hex);
    // console.log('sign', sign);
    signature.textContent = sign;
    currentFileMetaData.sign = sign;
    currentFileMetaData.hex = `0x${hex}`;
    signs.push(sign);
    hexs.push(hex);

    const xxx = hexs.reduce((acc, val) => {
      return acc.length === 0 ? `0x${val}` : acc + ', ' + `0x${val}`;
    }, '');
    console.log('xxx', xxx);

    hexsDiv.textContent = `[${hexs.reduce((acc, val) => {
      return acc.length === 0 ? `0x${val}` : acc + ',' + `0x${val}`;
    }, '')}]`;
    signsDiv.textContent = `[${signs.reduce((acc, val) => {
      return acc.length === 0 ? val : acc + ',' + val;
    }, '')}]`;
    // console.log('filesMetaData', filesMetaData);
    // console.log('currentFileMetaData', currentFileMetaData);
    // console.log(filesMetaData);
    filesMetaData.push({ ...currentFileMetaData });
    // console.log(filesMetaData);

    dataList.innerHTML = null;
    filesMetaData.forEach((data) => {
      dataList.appendChild(createDataListElement(data));
    });
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const file = event.target.children[0].files[0];
    const fileType = file.type;
    uploadedFileNames.push(file.name);

    const data = await getAsByteArray(file);
    console.log(data);

    const transaction = await arweave.createTransaction({ data }, key);
    transaction.addTag('Content-Type', fileType);

    await arweave.transactions.sign(transaction, key);

    const uploader = await arweave.transactions.getUploader(transaction);
    uploaded.style = 'width: 300px; height: 20px;';
    while (!uploader.isComplete) {
      await uploader.uploadChunk();
      console.log(
        `${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`,
      );
      uploadedData.textContent = `${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks} chunks`;
    }

    console.log('sent', transaction);

    const imageId = transaction.id;

    const imageMetaData = {
      name: `HybridMint${uploadedFileNames.length}`,
      description:
        'Hybrid minting demo with image and JSON meta stored in Arweave, file IDs signed with Personal Sign',
      imageURI: `https://arweave.net/${imageId}`,
      fileName: file.name,
    };

    const imageMetaDataJSON = JSON.stringify(imageMetaData);

    console.log('imageMetaData', imageMetaData);

    const jsonTransaction = await arweave.createTransaction({ data: imageMetaDataJSON }, key);
    transaction.addTag('Content-Type', 'application/json');

    await arweave.transactions.sign(jsonTransaction, key);

    await arweave.transactions.post(jsonTransaction);

    const jsonId = jsonTransaction.id;

    const link = document.createElement('a');
    const jsonURI = `https://arweave.net/${jsonId}`;
    link.href = jsonURI;
    link.textContent = jsonURI;
    link.target = '_blank';

    console.log('jsonId', jsonId);

    uploadedId.textContent = jsonId;

    uploadedUri.textContent = '';
    uploadedUri.appendChild(link);

    currentFileMetaData.name = `HybridMint${uploadedFileNames.length}`;
    currentFileMetaData.description =
      'Hybrid minting demo with image and JSON meeta stored in Arweave, file IDs signed with Sign Typed Data v4';
    currentFileMetaData.imageURI = `https://arweave.net/${imageId}`;
    currentFileMetaData.fileName = file.name;

    // dataList.innerHTML = null;
    // filesMetaData.forEach((data) => {
    //   dataList.appendChild(createDataListElement(data));
    // });
  });
};

const createDataListElement = (imageMetaData) => {
  const div1 = document.createElement('div');
  div1.classList.add('metacontainer');
  const nameDiv = document.createElement('div');
  const fileNameDiv = document.createElement('div');
  const descriptionDiv = document.createElement('div');
  const imageUriDiv = document.createElement('div');
  const hex = document.createElement('div');
  const sign = document.createElement('div');
  nameDiv.innerHTML = `<div class="title-col">Name:</div> <div>${imageMetaData.name}</div>`;
  nameDiv.classList.add('metarow');
  fileNameDiv.innerHTML = `<div class="title-col">Filename:</div> <div>${imageMetaData.fileName}</div>`;
  fileNameDiv.classList.add('metarow');
  descriptionDiv.innerHTML = `<div class="title-col">Description:</div> <div>${imageMetaData.description}</div>`;
  descriptionDiv.classList.add('metarow');
  imageUriDiv.innerHTML = `<div class="title-col">ImageURI:</div> <div><a href="${imageMetaData.imageURI}" target="_blank">${imageMetaData.imageURI}</a></div>`;
  imageUriDiv.classList.add('metarow');
  hex.innerHTML = `<div class="title-col">ArweaveIDs in hex:</div> <div>${imageMetaData.hex}</div>`;
  hex.classList.add('metarow');
  sign.innerHTML = `<div class="title-col">Signature:</div> <div class="sign">${imageMetaData.sign}</div>`;
  sign.classList.add('metarow');

  div1.appendChild(nameDiv);
  div1.appendChild(fileNameDiv);
  div1.appendChild(descriptionDiv);
  div1.appendChild(imageUriDiv);
  div1.appendChild(hex);
  div1.appendChild(sign);
  return div1;
};
