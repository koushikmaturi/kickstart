
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
  'aware certain depend pretty mouse amused square absent solve fee tomato monster',
  'https://rinkeby.infura.io/v3/c10aca7ac3374188bcbeb49a8211d6c3'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({data: compiledFactory.evm.bytecode.object})
    .send({from: accounts[0], gas: '1000000'});

  console.log('Contract deployed to', result.options.address);
};
deploy();
