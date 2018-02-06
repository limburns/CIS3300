import React, { Component } from 'react';
import { connect } from 'react-redux';
import { exerciseUpdate, exerciseCreate } from '../actions';
import { Card, CardSection, Button } from './common';
import ExerciseForm from './ExerciseForm';

class ExerciseCreate extends Component {

  componentWillMount() {
    debugger;
  }

  onButtonPress() {
    const { exerciseName, benchmark, clientUid, workoutUid } = this.props;
    debugger;
    this.props.exerciseCreate({ exerciseName, benchmark, clientUid, workoutUid });
  }

  render() {
    return (
      <Card>
        <ExerciseForm {...this.props} />
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
  const { benchmark, exerciseName } = state.exerciseForm;

  return { benchmark, exerciseName };
};

export default connect(mapStateToProps, {
  exerciseUpdate, exerciseCreate
})(ExerciseCreate);
