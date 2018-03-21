import React, { Component } from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';
import { Card, CardBody, Form, FormGroup, Label, Row, Col, Input, FormFeedback, Button } from 'reactstrap';

class PersonForm extends Component {
  constructor(props) {
    super();
    this.state = {
      person: { ...props.person },
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
              <Row>
                <Col xs={12} md={4}>
                  <FormGroup className="mb-md-0">
                    {/* <Label for="firstname">Firstname</Label> */}
                    <Input
                      type="text"
                      id="firstname"
                      name="firstname"
                      placeholder="Firstname"
                      autoComplete="false"
                      onChange={this.handleNameChange}
                      value={this.state.person.firstname}
                      invalid={this.state.errors.firstname}
                    />
                    {/* <FormFeedback>Invalid characters have been used!</FormFeedback> */}
                  </FormGroup>
                </Col>
                <Col xs={12} md={4}>
                  <FormGroup className="mb-md-0">
                    {/* <Label for="surname">Surname</Label> */}
                    <Input
                      type="text"
                      id="surname"
                      name="surname"
                      placeholder="Surname"
                      autoComplete="false"
                      onChange={this.handleNameChange}
                      value={this.state.person.surname}
                      invalid={this.state.errors.surname}
                    />
                    {/* <FormFeedback>Invalid characters have been used!</FormFeedback> */}
                  </FormGroup>
                </Col>
                <Col xs={12} md={4} className="d-flex align-items-center justify-content-end">
                  <Button
                    color="success"
                    size="sm"
                    outline
                    onClick={this.handleSave}
                    disabled={
                      (this.state.errors.firstname || this.state.errors.surname) ||
                      (!this.state.person.firstname || !this.state.person.surname)
                    }
                  >
                    {this.props.person.id ? 'Save Changes' : 'Create'}
                  </Button>
                  {' '}
                  {this.props.person.id && // dont display delete button if creating new user
                    <Button
                      className="ml-1"
                      color="danger"
                      size="sm"
                      outline
                      onClick={this.handleDelete}
                    >
                      Delete
                    </Button>
                  }
                </Col>
              </Row>
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
  onSavePerson: PropTypes.func.isRequired,
  onDeletePerson: PropTypes.func,
};
PersonForm.defaultProps = {
  person: {
    firstname: '',
    surname: '',
  },
  onDeletePerson: undefined,
};

export default PersonForm;
