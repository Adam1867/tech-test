import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import PeopleList from './../components/PeopleView/PeopleList';

// import redux actions
import {
  fetchPeople,
  updatePerson,
  deletePerson,
  createPerson,
} from './../services/actions/people.actions';

class PeopleView extends Component {

  componentDidMount = () => {
    this.handleGetPeople();
  }

  handleGetPeople = () => {
    this.props.fetchPeople();
  }

  handleUpdatePerson = (person) => {
    this.props.updatePerson(person);
  }

  handleDeletePerson = (id) => {
    if (window.confirm('Are you sure you want to delete this presenter?')) { // would replace with nicer modal
      this.props.deletePerson(id);
    }
  }

  handleCreatePerson = (person) => {
    this.props.createPerson(person);
  }

  render() {
    const loadingStyle = {
      opacity: 0.5,
      pointerEvents: 'none',
    };
    return (
      <div
        className="people-view-container"
        style={this.props.loading && this.props.people ? loadingStyle : null}
      >
        {!this.props.initialLoad ? (
          <p>LOADING...</p>
        ) : (
          <PeopleList
            people={this.props.people}
            onSavePerson={this.handleUpdatePerson}
            onDeletePerson={this.handleDeletePerson}
            onCreatePerson={this.handleCreatePerson}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  people: state.people.people,
  loading: state.people.loading,
  initialLoad: state.people.initiallyLoaded,
});

const mapDispatchToProps = dispatch => ({
  fetchPeople: () => dispatch(fetchPeople()),
  updatePerson: person => dispatch(updatePerson(person)),
  deletePerson: id => dispatch(deletePerson(id)),
  createPerson: person => dispatch(createPerson(person)),
});

PeopleView.propTypes = {
  people: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  initialLoad: PropTypes.bool.isRequired,
  fetchPeople: PropTypes.func.isRequired,
  updatePerson: PropTypes.func.isRequired,
  deletePerson: PropTypes.func.isRequired,
  createPerson: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PeopleView);
