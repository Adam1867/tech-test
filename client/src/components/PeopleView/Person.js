import React, { Component } from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';
import { Card, CardBody, Form, FormGroup, Label, Input, FormFeedback, Button } from 'reactstrap';

class Person extends Component {
  constructor(props) {
    super();
    this.state = {
      person: { ...props.person },
      edited: false,
      errors: {
        firstname: false,
        surname: false,
      },
    };
  }
  handleNameChange = (e) => {
    const key = e.target.name;
    const value = e.target.value.trim();
    this.setState(prev => ({
      person: { ...prev.person, [key]: value },
      edited: true,
    }));
    const valid = validator.matches(value, /^[a-z ,.'-]+$/i);
    this.setState(prev => ({
      errors: { ...prev.errors, [key]: !valid },
    }));
  }
  handleSave = (e) => {
    e.preventDefault();
    this.props.onSavePerson(this.state.person);
  }
  handleDelete = (e) => {
    e.preventDefault();
    this.props.onDeletePerson(this.props.person.id);
  }
  render() {
    return (
      <div className="person">
        <Card>
          <CardBody>
            <Form>
              <FormGroup>
                <Label for="firstname">Firstname</Label>
                <Input
                  type="text"
                  id="firstname"
                  name="firstname"
                  onChange={this.handleNameChange}
                  value={this.state.person.firstname}
                  invalid={this.state.errors.firstname}
                />
                <FormFeedback>Invalid characters have been used!</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="surname">Surname</Label>
                <Input
                  type="text"
                  id="surname"
                  name="surname"
                  onChange={this.handleNameChange}
                  value={this.state.person.surname}
                  invalid={this.state.errors.surname}
                />
                <FormFeedback>Invalid characters have been used!</FormFeedback>
              </FormGroup>
              <Button
                color="primary"
                onClick={this.handleSave}
                disabled={!this.state.edited || this.state.errors.firstname || this.state.errors.surname}
              >
                Update
              </Button>
              {' '}
              <Button
                color="danger"
                onClick={this.handleDelete}
              >
                Delete
              </Button>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}

Person.propTypes = {
  person: PropTypes.shape({
    id: PropTypes.number,
    firstname: PropTypes.string,
    surname: PropTypes.string,
  }),
};
Person.defaultProps = {
  person: {
    firstname: '',
    surname: '',
  },
};

export default Person;
