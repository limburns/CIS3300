import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { exerciseSave, exerciseFetch } from '../actions';
import { CardSection, Input } from './common';

class WorkoutReviewExerciseListItem extends Component {
  componentWillMount() {
    this.props.exerciseFetch(this.props.exercise);
  }

  onRatingChange(text) {
    const { clientUid } = this.props.singleClient;
    const { workoutUid } = this.props.singleWorkout;
    const { exerciseUid } = this.props.exercise;

    const rating = text;
    this.props.exerciseSave({ clientUid, workoutUid, exerciseUid, rating });
  }

  render() {
    const { exerciseName, benchmark } = this.props.exercise;

    const { titleStyle } = styles;

    return (
        <View>
          <CardSection>
            <Text style={titleStyle}>
              {exerciseName}
            </Text>
            <Text style={titleStyle}>
              {benchmark} per set
            </Text>
            <Input
              placeholder="Enter rating"
              onChangeText={this.onRatingChange.bind(this)}
              value={this.props.exercise.rating}
            />
          </CardSection>
        </View>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 24,
    paddingLeft: 15,
    paddingTop: 20,
    paddingBottom: 20,
    flex: 1,
    textAlign: 'center'
  }
};

const mapStateToProps = state => {
  return {
    singleWorkout: state.singleWorkout,
    singleClient: state.singleClient,
    rating: state.rating
  };
};

export default connect(mapStateToProps, {
  exerciseSave,
  exerciseFetch
})(WorkoutReviewExerciseListItem);
