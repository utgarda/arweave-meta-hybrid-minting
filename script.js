import { base64urlStringToBase64, binToHex, getAsByteArray } from './helpers.mjs';
import { signPersonal } from './sign.mjs';
import { key } from './key.mjs';
import { contract1 } from './contract.mjs';
import { getNetworkAndChainId, sendArweaveTransaction } from './utils.mjs';

const web3 = new Web3(Web3.givenProvider);

const contract = await new web3.eth.Contract([contract1.abi], contract1.address);

const uploadedFileNames = [];
const filesMetaData = [];
const currentFileMetaData = {};
const signs = [];
const hexs = [];

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
  arweave.network.getInfo().then((data) => console.log('arweave connect status: ', data));

  const form = document.getElementById('form');
  const signButton = document.getElementById('sign');
  const input = document.getElementById('input');
  const uploadedImageId = document.getElementById('uploadedImageId');
  const uploadedID = document.getElementById('uploadedId');
  const uploadedUri = document.getElementById('uploadedJsonUri');
  const signature = document.getElementById('signature');
  const dataList = document.getElementById('datalist');
  const bulkmintButton = document.getElementById('bulkmintButton');
  const signsDiv = document.getElementById('signs');
  const hexsDiv = document.getElementById('hexs');
  const uploaded = document.getElementById('uploaded');
  const uploadedData = document.getElementById('uploadedData');
  const gas = document.getElementById('gas');

  bulkmintButton.addEventListener('click', async () => {
    console.log('bulk mint clicked');
    console.log('signs', signs);
    console.log('hexs', hexs);
    console.log('accc', newAccounts[0]);

    const bulk = contract.methods.bulkMint;

    const meta = hexs.map((hex) => `0x${hex}`);

    const res = await bulk(meta, signs).send({
      from: newAccounts[0],
    });

    console.log('transaction:', res);
    gas.textContent = res.gasUsed;
  });

  input.addEventListener('change', () => {
    signature.textContent = 'Null';
    uploadedUri.textContent = 'Null';
    uploadedID.textContent = 'Null';
    gas.textContent = '';
  });

  signButton.addEventListener('click', async () => {
    if (uploadedID.textContent === 'Null') {
      alert('No json id!');
      return;
    }

    const data = uploadedID.textContent;
    // console.log('data', data);
    const decoded = atob(base64urlStringToBase64(uploadedID.textContent));
    // console.log('decoded', decoded);
    const hex = binToHex(decoded);
    // console.log('hex', hex);

    const sign = await signPersonal(newAccounts, hex);

    signature.textContent = sign;
    currentFileMetaData.sign = sign;
    currentFileMetaData.hex = `0x${hex}`;
    signs.push(sign);
    hexs.push(hex);

    const xxx = hexs.reduce((acc, val) => {
      return acc.length === 0 ? `0x${val}` : acc + ', ' + `0x${val}`;
    }, '');
    // console.log('xxx', xxx);

    hexsDiv.textContent = `[${hexs.reduce((acc, val) => {
      return acc.length === 0 ? `0x${val}` : acc + ',' + `0x${val}`;
    }, '')}]`;
    signsDiv.textContent = `[${signs.reduce((acc, val) => {
      return acc.length === 0 ? val : acc + ',' + val;
    }, '')}]`;

    filesMetaData.push({ ...currentFileMetaData });

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

    const imageId = await sendArweaveTransaction(arweave, data, key, fileType, uploadedData);

    const imageMetaData = {
      name: `HybridMint${uploadedFileNames.length}`,
      description:
        'Hybrid minting demo with image and JSON meta stored in Arweave, file IDs signed with Personal Sign',
      image: `ar://${imageId}`,
    };

    const imageMetaDataJSON = JSON.stringify(imageMetaData);

    const jsonId = await sendArweaveTransaction(
      arweave,
      imageMetaDataJSON,
      key,
      'application/json',
      uploadedData,
    );

    const jsonLink = document.createElement('a');
    const jsonURI = `https://arweave.net/${jsonId}`;
    jsonLink.href = jsonURI;
    jsonLink.textContent = jsonURI;
    jsonLink.target = '_blank';

    const imageURI = `https://arweave.net/${imageId}`;
    const imageLink = document.createElement('a');
    imageLink.href = imageURI;
    imageLink.textContent = imageURI;
    imageLink.target = '_blank';

    uploadedImageId.textContent = '';
    uploadedImageId.appendChild(imageLink);
    uploadedId.textContent = jsonId;
    uploadedUri.textContent = '';
    uploadedUri.appendChild(jsonLink);
    currentFileMetaData.name = imageMetaData.name;
    currentFileMetaData.description = imageMetaData.description;
    currentFileMetaData.imageURI = imageURI;
    currentFileMetaData.jsonURI = jsonURI;
    currentFileMetaData.fileName = file.name;
  });
};

const createDataListElement = (imageMetaData) => {
  const div1 = document.createElement('div');
  div1.classList.add('metacontainer');
  const nameDiv = document.createElement('div');
  const fileNameDiv = document.createElement('div');
  const descriptionDiv = document.createElement('div');
  const imageUriDiv = document.createElement('div');
  const jsonUriDiv = document.createElement('div');
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
  jsonUriDiv.innerHTML = `<div class="title-col">JSONURI:</div> <div><a href="${imageMetaData.jsonURI}" target="_blank">${imageMetaData.jsonURI}</a></div>`;
  jsonUriDiv.classList.add('metarow');
  hex.innerHTML = `<div class="title-col">ArweaveIDs in hex:</div> <div>${imageMetaData.hex}</div>`;
  hex.classList.add('metarow');
  sign.innerHTML = `<div class="title-col">Signature:</div> <div class="sign">${imageMetaData.sign}</div>`;
  sign.classList.add('metarow');

  div1.appendChild(nameDiv);
  div1.appendChild(fileNameDiv);
  div1.appendChild(descriptionDiv);
  div1.appendChild(imageUriDiv);
  div1.appendChild(jsonUriDiv);
  div1.appendChild(hex);
  div1.appendChild(sign);
  return div1;
};
