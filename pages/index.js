import React, {Component} from 'react';
import {Card, Button} from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import {Link} from '../routes';
// npm run dev -- start the server

class CampaignIndex extends Component {
  // The next server only renders getInitialProps unlike normal react apps
  // where you can perform data loading with componentDidMount. So, in this app,
  // we are using getInitialProps for data loading
  // When you put static keyword, you can run the function without creating an
  // instance of the component
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    // returns an object to be used as props (properties) of the component
    return {campaigns};
  }

  renderCampaigns() {
    // map() applies the function (inside it) over all the elements of the
    // array and returns all the 'returns' to the variable on the left.
    const items = this.props.campaigns.map(address => {
      // fluid: yes, makes the card strech over the whole width of page, if
      // unobstructed
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true
      };
    });
    return <Card.Group items = {items}/>;
  }
  render() {
    return (
      // floated='right' moves the button to the right (CSS styling)
      <Layout>
        <div>
          <h3>Open Campaigns</h3>

          <Link route='/campaigns/new'>
            <a>
              <Button floated='right'
                content="Create Campaign"
                icon="add circle"
                primary
              />
            </a>
          </Link>
          {this.renderCampaigns()}
        </div>
      </Layout>
    );
  // Primary adds color to the button
  }
}

// Next expects that we export a react component in every page
export default CampaignIndex;
