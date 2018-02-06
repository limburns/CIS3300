import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import ClientForm from './ClientForm';
import { clientUpdate, clientSave, clientDelete } from '../actions';
import { Card, CardSection, Button, Confirm } from './common';

class ClientEdit extends Component {
  state = { showModal: false };

  componentWillMount() {
    //debugger;
    _.each(this.props.client, (value, prop) => {
      this.props.clientUpdate({ prop, value });
    });
  }

  onButtonPress() {
    const { firstName, lastName, email } = this.props;

    this.props.clientSave({ firstName, lastName, email, clientUid: this.props.client.clientUid });
  }

  onAccept() {
    const { clientUid } = this.props.client;

    this.props.clientDelete({ clientUid });
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <Card>
        <ClientForm />

        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Save Changes
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
            Remove Client
          </Button>
        </CardSection>

        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        >
          Are you sure you want to remove this client?
        </Confirm>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { firstName, lastName, email } = state.clientForm;

  return { firstName, lastName, email };
};

export default connect(mapStateToProps, {
  clientUpdate, clientSave, clientDelete
})(ClientEdit);
