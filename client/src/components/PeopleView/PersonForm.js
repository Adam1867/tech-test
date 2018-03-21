import React, { Component } from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';
import { Card, CardBody, Form, FormGroup, Label, Col, Input, FormFeedback, Button } from 'reactstrap';

class PersonForm extends Component {

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
    const valid = validator.matches(value, /^[a-z ,.'-]+$/i);
    this.setState(prev => ({
      person: { ...prev.person, [key]: value },
      edited: true,
      errors: { ...prev.errors, [key]: !valid },
    }));
  }

  handleSave = (e) => {
    e.preventDefault();
    const { person } = this.state;
    this.props.onSavePerson(person);
    if (!person.id) this.clearNames(); // clear names if form was to create new user
  }

  handleDelete = (e) => {
    e.preventDefault();
    this.props.onDeletePerson(this.props.person.id);
  }

  clearNames = () => {
    this.setState(prev => ({
      person: {
        ...prev.person,
        firstname: '',
        surname: '',
      },
    }));
  }

  render() {
    return (
      <div className="person">
        <Card>
          <CardBody>
            <Form>
              <FormGroup row>
                <Label for="firstname" sm={3}>Firstname</Label>
                <Col sm={9}>
                  <Input
                    type="text"
                    id="firstname"
                    name="firstname"
                    onChange={this.handleNameChange}
                    value={this.state.person.firstname}
                    invalid={this.state.errors.firstname}
                  />
                  <FormFeedback>Invalid characters have been used!</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="surname" sm={3}>Surname</Label>
                <Col sm={9}>
                  <Input
                    type="text"
                    id="surname"
                    name="surname"
                    onChange={this.handleNameChange}
                    value={this.state.person.surname}
                    invalid={this.state.errors.surname}
                  />
                  <FormFeedback>Invalid characters have been used!</FormFeedback>
                </Col>
              </FormGroup>
              <hr />
              <div className="float-right">
                <Button
                  color="success"
                  size="sm"
                  outline
                  onClick={this.handleSave}
                  disabled={
                    !this.state.edited ||
                    (this.state.errors.firstname || this.state.errors.surname) ||
                    (!this.state.person.firstname || !this.state.person.surname)
                  }
                >
                  {this.props.person.id ? 'Save Changes' : 'Create'}
                </Button>
                {' '}
                {this.props.person.id && // dont display delete button if creating new user
                  <Button
                    color="danger"
                    size="sm"
                    outline
                    onClick={this.handleDelete}
                  >
                    Delete
                  </Button>
                }
              </div>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}

PersonForm.propTypes = {
  person: PropTypes.shape({
    id: PropTypes.number,
    firstname: PropTypes.string,
    surname: PropTypes.string,
  }),
};
PersonForm.defaultProps = {
  person: {
    firstname: '',
    surname: '',
  },
};

export default PersonForm;
