import React, {Component} from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import { Card, Grid, Button } from "semantic-ui-react";
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import {Link} from '../../routes';
class CampaignShow extends Component {

// getInitialProps doesn't belong to the component, so props.query.address
// isn't accessible to the rest of the methods
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();
// Summary is an object. When we return multiple things from a function
// in a contract, the result is returned as an object. But, the values
// inside it can be accessed like an array, as seen below.
    return {
      address: props.query.address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestCount: summary[2],
      approversCount: summary[3],
      manager: summary[4]
    };
  }

  renderCards() {
    const {
      minimumContribution,
      balance,
      requestCount,
      approversCount,
      manager
    } = this.props;
    const items = [
      {
        header: manager,
        meta: 'Address of the Manager',
        description: 'Manager is the creator of the campaign. ' +
          'Only the manager cann raise new requests to withdraw money.',
        style: { overflowWrap: "break-word" }
      },
      {
        header: minimumContribution,
        meta: 'Minimum Contribution (wei)',
        description: 'Amount you must contribute to become a contributor and approver.'
      },
      {
        header: requestCount,
        meta: 'Number of Requests',
        description: 'Requests are used to withdraw money from the campaign and ' +
          'use it buy supplies, etc.'
      },
      {
        header: approversCount,
        meta: 'Number of Contributors/Approvers',
        description: 'Number of Contributors/Approvers for the campaign.'
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Balance of the Contract (ether)',
        description: 'Capital left in the campaign for expenditure'
      }
    ];

    return <Card.Group items={items}/>;
  }

  render() {
    return (
      <Layout>
        <h3>Campaign Show</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              {this.renderCards()}
            </Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={this.props.address}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary>View Requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
