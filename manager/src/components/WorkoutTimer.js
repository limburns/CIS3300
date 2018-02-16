import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, Text } from 'react-native';
import CountdownCircle from 'react-native-countdown-circle';
import { exercisesFetch } from '../actions';
import ExerciseListItem from './ExerciseListItem';
import { Card, CardSection, Button } from './common';

class WorkoutTimer extends Component {
  componentWillMount() {
    const { singleClient, singleWorkout } = this.props;
    this.props.exercisesFetch({
      clientUid: singleClient.clientUid,
      workoutUid: singleWorkout.workoutUid
    });
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component
    // will be rendered with
    // this.props is still the old set of props

    this.createDataSource(nextProps);
  }

  onButtonPress() {

  }

  createDataSource({ exercises }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(exercises);
  }

  renderRow(exercise) {
    return <ExerciseListItem exercise={exercise} />;
  }


  render() {
    const { workoutName, exerciseTime, sets } = this.props.singleWorkout;

    const { nameStyle, workoutTitleStyle } = styles;

    return (
      <Card>
        <Card>
          <CardSection>
            <Text style={nameStyle}>
              {workoutName}
            </Text>
          </CardSection>

          <CardSection style={{ alignItems: 'center', justifyContent: 'center' }}>
            <CountdownCircle
              seconds={40}
              radius={170}
              borderWidth={8}
              color="#ff003f"
              bgColor="#fff"
              textStyle={{ fontSize: 50 }}
              onTimeElapsed={() => console.log('Elapsed!')}
            />
          </CardSection>


        </Card>

        <Card>
          <CardSection>
            <ListView
              enableEmptySections
              dataSource={this.dataSource}
              renderRow={this.renderRow}
            />
          </CardSection>
        </Card>

        <Card>
          <CardSection>
            <Text style={workoutTitleStyle}>
              Sets left: {sets}
            </Text>
          </CardSection>
        </Card>

        <Card>
          <CardSection>
            <Button onPress={this.onButtonPress.bind(this)}>
              Pause Workout
            </Button>
          </CardSection>
        </Card>
      </Card>
    );
  }
}

const styles = {
  nameStyle: {
    fontSize: 36,
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1
  },
  workoutTitleStyle: {
    fontSize: 24,
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: 'center',
    flex: 1
  },
  statusTitleStyle: {
    fontSize: 24,
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: 'center',
    flex: 1,
    color: '#FFBF00'
  },
  exerciseTitleStyle: {
    fontSize: 24,
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1
  }
};

const mapStateToProps = state => {
  const exercises = _.map(state.exercises, (val, workoutUid, clientUid) => {
    return { ...val, workoutUid, clientUid };
  });

  return { exercises, singleWorkout: state.singleWorkout, singleClient: state.singleClient };
};

export default connect(mapStateToProps, { exercisesFetch })(WorkoutTimer);