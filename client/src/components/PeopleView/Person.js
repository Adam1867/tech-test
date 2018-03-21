import React, { Component } from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';
import { Card, CardBody, Form, FormGroup, Label, Col, Input, FormFeedback, Button } from 'reactstrap';

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
                  disabled={this.state.errors.firstname || this.state.errors.surname}
                >
                  Save
                </Button>
                {' '}
                <Button
                  color="danger"
                  size="sm"
                  outline
                  onClick={this.handleDelete}
                >
                  Delete
                </Button>
              </div>
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
