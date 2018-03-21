import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Container, Row, Col } from 'reactstrap';
import PersonForm from './PersonForm';

const PeopleList = props => (
  <div className="people-list py-3">
    <Container>
      <Row>
        {!props.people.length ? (
          <Col
            xs={{ size: 12 }}
            lg={{ size: 10, offset: 1 }}
            xl={{ size: 8, offset: 2 }}
            className="mb-3"
          >
            <Alert color="warning">
              Sorry, all people have been fired :(
            </Alert>
          </Col>
        ) : (
          props.people.map(person => (
            <Col
              key={person.id}
              xs={{ size: 12 }}
              lg={{ size: 10, offset: 1 }}
              xl={{ size: 8, offset: 2 }}
              className="mb-3"
            >
              <PersonForm
                person={person}
                onSavePerson={props.onSavePerson}
                onDeletePerson={props.onDeletePerson}
              />
            </Col>
          ))
        )}
        <Col
          xs={{ size: 12 }}
          lg={{ size: 10, offset: 1 }}
          xl={{ size: 8, offset: 2 }}
          className="mb-3"
        >
          <PersonForm
            onSavePerson={props.onCreatePerson}
          />
        </Col>
      </Row>
    </Container>
  </div>
);

PeopleList.propTypes = {
  people: PropTypes.array.isRequired,
  onSavePerson: PropTypes.func.isRequired,
  onDeletePerson: PropTypes.func.isRequired,
  onCreatePerson: PropTypes.func.isRequired,
};

export default PeopleList;
