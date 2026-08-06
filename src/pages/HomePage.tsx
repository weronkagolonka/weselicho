import { Button, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router";
import { pages } from "../constants";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Col>
        <Col>HOME</Col>
        <Col>
          <Button onClick={() => navigate(pages.form)}>Add your RSVP</Button>
        </Col>
      </Col>
    </Container>
  );
};
