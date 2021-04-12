import Web3 from'web3';

let web3;
if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // You are in a broswer and have installed metamask
  web3 = new Web3(window.web3.currentProvider);
}else {
  // You are in the server OR do not have metamask
  // So, we create our own provider using infura
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/c10aca7ac3374188bcbeb49a8211d6c3'
  );
  web3 = new Web3(provider);
}

export default web3;
