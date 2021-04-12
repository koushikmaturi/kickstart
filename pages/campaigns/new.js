import React, {Component} from 'react';
import {Form, Button, Input, Message} from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
// Router helps with automatic re-routing and Link (not imported here)
// is for placing manual links through anchor tags
import {Router} from '../../routes';
// class component, so it has state and constructor calls props
class CampaignNew extends Component {
  // We used an event handler to set the state of minimumContribution
  state = {
    minimumContribution: '',
    errorMessage: '',
    loading: false
  };

// Using arrow function instead of a normal method so that the scope of
// 'this' is not confusing to use.
  onSubmit = async (event) => {
    // Prevent the browser page from attempting to
    // submit the form after pressing Submit
    // We want to perform some steps on interval it
    event.preventDefault();

    this.setState({loading:true, errorMessage: ''});
    try {
      // Getting a list of accounts to send a transaction for creating a contract
      const accounts = await web3.eth.getAccounts();
      // Create campaign as the create a campaign form is submitted
      await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({from: accounts[0]});

      // Redirecting to the Homepage after campaign creation
      Router.pushRoute('/');
    } catch(err){
        this.setState({errorMessage: err.message});
    }

    this.setState({loading:false});
  };
  render() {
    // Not placing () after this.onSubmit because we dont want
    // to run the function right away. We just want to pass a reference to it
    // So, it runs onn form submittal

    // The error property of Form must be added so that the form only renders
    // the error messages when there is an error. The error prop must be a boolean
    // So, we are converting this.state.errorMessage string into boolean value using
    // !!this.state.errorMessage (First ! negates the value gives the opposite bool)
    // The second ! flips the bool to give the accurate bool of the string existence
    return (
      <Layout>
        <h3>Create a Campaign</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label='wei'
              labelPosition='right'
              value={this.state.minimumContribution}
              onChange={event =>
                this.setState({ minimumContribution: event.target.value })}
            />
          </Form.Field>
          <Message error header='Oops!' content={this.state.errorMessage}/>
          <Button loading={this.state.loading} primary>Create!</Button>
        </Form>
      </Layout>
  );
  }
}

export default CampaignNew;
