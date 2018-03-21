import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import logo from './../assets/sky-bet-vector-logo.svg';

const Header = () => (
  <header className="header">
    <Container>
      <Row>
        <Col lg={{ size: 12 }} >
          <img src={logo} className="header__logo" alt="logo" />
          <h1 className="header__title">Sky Sports People</h1>
        </Col>
      </Row>
    </Container>
  </header>
);

export default Header;
