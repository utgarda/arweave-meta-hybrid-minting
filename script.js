window.onload = () => {
  console.log('loaded');
  const arweave = Arweave.init({});
  arweave.network.getInfo().then(console.log);

  const form = document.getElementById('form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('form submit', event.target.children[0].files[0]);
  });
};
