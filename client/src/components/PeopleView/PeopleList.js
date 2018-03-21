import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Person from './Person';

const PeopleList = props => (
  <div className="people-list py-3">
    <Container>
      <Row>
        {props.people.length && props.people.map(person => (
          <Col key={person.id} md={{ size: 6 }} xl={{ size: 4 }} className="mb-3" >
            <Person
              person={person}
              onSavePerson={props.onSavePerson}
              onDeletePerson={props.onDeletePerson}
            />
          </Col>
        ))}
      </Row>
    </Container>
  </div>
);

export default PeopleList;
