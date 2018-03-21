import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import PeopleList from './../components/PeopleView/PeopleList';

// import redux actions
import { fetchPeople } from './../services/actions/people.actions';

class PeopleView extends Component {

  componentDidMount = () => {
    this.handleGetPeople();
  }

  handleGetPeople = () => {
    this.props.fetchPeople();
  }

  handleUpdatePerson = (person) => {
    console.log('Update: ', person);
    // toast('User updated!', {
    //   type: 'success',
    //   className: 'px-4',
    // });
    // this.handleGetPeople();
  }

  handleDeletePerson = (id) => {
    console.log('Delete: ', id);
  }

  render() {
    const loadingStyle = {
      opacity: 0.5,
      pointerEvents: 'none',
    };
    return (
      <div
        className="people-view-container"
        style={this.props.loading ? loadingStyle : null}
      >
        <PeopleList
          people={this.props.people}
          onSavePerson={this.handleUpdatePerson}
          onDeletePerson={this.handleDeletePerson}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  people: state.people.people,
  loading: state.people.loading,
});

const mapDispatchToProps = dispatch => ({
  fetchPeople: () => dispatch(fetchPeople()),
});

PeopleView.propTypes = {
  people: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  fetchPeople: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PeopleView);
