import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(CampaignFactory.abi,
  '0x55caa0D0c732cD28d84bE76E5e8f08c3f301E3F1');

  export default instance;
