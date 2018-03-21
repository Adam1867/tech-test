import React from 'react';
import { Alert, Container, Row, Col } from 'reactstrap';
import PersonForm from './PersonForm';

const PeopleList = props => (
  <div className="people-list py-3">
    <Container>
      <Row>
        {!props.people.length ? (
          <Col xs={{ size: 12 }} className="mb-3" >
            <Alert color="warning">
              Sorry, all presenters have been fired :(
            </Alert>
          </Col>
        ) : (
          props.people.map(person => (
            <Col key={person.id} xs={{ size: 12 }} lg={{ size: 6 }} className="mb-3" >
              <PersonForm
                person={person}
                onSavePerson={props.onSavePerson}
                onDeletePerson={props.onDeletePerson}
              />
            </Col>
          ))
        )}
        <Col xs={{ size: 12 }} lg={{ size: 6 }} className="mb-3" >
          <PersonForm
            onSavePerson={props.onCreatePerson}
          />
        </Col>
      </Row>
    </Container>
  </div>
);

export default PeopleList;
