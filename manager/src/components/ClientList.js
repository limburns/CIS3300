import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, Text } from 'react-native';
import { clientsFetch } from '../actions';
import ClientListItem from './ClientListItem';
import { Card } from './common';

class ClientList extends Component {
  componentWillMount() {
    this.props.clientsFetch();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component
    // will be rendered with
    // this.props is still the old set of props

    this.createDataSource(nextProps);
  }

  createDataSource({ clients }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(clients);
  }

  renderRow(client) {
    return <ClientListItem client={client} />;
  }

  render() {
    const { titleStyle } = styles;

    const { clients } = this.props;

    let noClients = null;
    if (clients.length > 0) {
      console.log('clients is not empty');
    } else {
      console.log('clients is empty');
      noClients =
      (<Text style={titleStyle}>
        No Clients
      </Text>);
    }

    return (
      <Card>
        <ListView
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={this.renderRow}
        />
        {noClients}
      </Card>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 16,
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: 'center'
  }
};

const mapStateToProps = state => {
  const clients = _.map(state.clients, (val, clientUid) => {
    return { ...val, clientUid };
  });
  return { clients };
};

export default connect(mapStateToProps, { clientsFetch })(ClientList);
