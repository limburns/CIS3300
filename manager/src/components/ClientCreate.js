import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clientUpdate, clientCreate } from '../actions';
import { Card, CardSection, Button } from './common';
import ClientForm from './ClientForm';

class ClientCreate extends Component {
  onButtonPress() {
    const { name, phone } = this.props;

    this.props.clientCreate({ name, phone });
  }

  render() {
    return (
      <Card>
        <ClientForm {...this.props} />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Create
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, phone } = state.clientForm;

  return { name, phone };
};

export default connect(mapStateToProps, {
  clientUpdate, clientCreate
})(ClientCreate);
