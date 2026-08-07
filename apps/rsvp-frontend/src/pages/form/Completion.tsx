import { useStateMachine } from "little-state-machine";
import { Col, Container, Row } from "react-bootstrap";

export const Completion = () => {
  const { state } = useStateMachine();

  return (
    <Container className="d-flex justify-content-center">
      <Row className="mt-5">
        <Col className="text-center">
          <h4>Thank you for submitting your feedback.</h4>
          {state.participating ? (
            <div>
              An email with confirmation will be sent to {state.invitee.email}
            </div>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};
