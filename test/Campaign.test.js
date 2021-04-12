const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({data: compiledFactory.evm.bytecode.object})
    .send({from: accounts[0], gas: '1000000'});

  await factory.methods.createCampaign('100').send({
    from: accounts[0],
    gas: '1000000'
  });

  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
  campaign = await new web3.eth.Contract(compiledCampaign.abi, campaignAddress);
});
describe('Campaign tests', () => {

  it('deploys factory and campaign', () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  it('marks caller as the campaign manager', async () => {
    const manager = await campaign.methods.manager().call();
    assert.equal(accounts[0],manager);
  });

  it('a contributor become an approver', async () => {
    await campaign.methods.contribute().send({
      from: accounts[1],
      value: '200'
    });
    const isApprover = await campaign.methods.approvers(accounts[1]).call();
    assert(isApprover);
  });

  it('requires a minimum contribution', async () => {
    try {
      await campaign.methods.contribute().send({
        from: accounts[1],
        value: '50'
      });
      assert(false);
    } catch (e) {
      assert(e)
    }
  });

  it('allows to finalizeRequest', async () => {
    await campaign.methods.contribute().send({
      from: accounts[0],
      value: 2000
    });
    await campaign.methods.createRequest('Biryani', 100, accounts[1]).send({
      from: accounts[0],
      gas: 1000000
    });
    await campaign.methods.approveRequest(0).send({
      from: accounts[0],
      gas: 1000000
    });
    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: 1000000
    });
    let request = await campaign.methods.requests(0).call();
    assert.ok(request.complete);
  });
});
