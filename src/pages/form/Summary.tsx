import { useStateMachine } from "little-state-machine";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { FormButtons } from "../../components/FormButtons";
import { pages } from "../../constants";
import { DietaryRestriction } from "../../types/weddingRsvp";

export const Summary = () => {
  const { state } = useStateMachine();

  return (
    <Container className="rsvp-summary-container">
      <h2>Summary</h2>
      {state.participating ? (
        <Row className="mb-3">
          <Col xs={12} xl={6}>
            <h4>Details:</h4>
            <Row className="mb-3">
              <h5>Confirmation email:</h5>
              <div>{state.recipient.email}</div>
            </Row>
            <Row className="mb-3">
              <h5>Transport required:</h5>
              <div>{state.details.requiresTransport ? "yes" : "no"}</div>
            </Row>
            <Row className="mb-3">
              <h5>Accommodation required:</h5>
              <div>{state.details.requiresAccommodation ? "yes" : "no"}</div>
            </Row>
          </Col>
          <Col xs={12} xl={6}>
            <h4>Guests:</h4>
            <h5>Adults:</h5>
            <ListGroup className="mb-3">
              {state.details.guests.Adult.map((a, index) => (
                <ListGroup.Item
                  key={`adult-${index}`}
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">
                      {a.name} {a.surname}
                    </div>
                    Dietary restrictions: {a.dietaryRestriction}
                    {a.dietaryRestriction === DietaryRestriction.Allergy
                      ? `, allergy/intolerance: ${a.allergy}`
                      : ""}
                    {a.pregnant ? ", no alcohol" : ""}
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <h5>Teens:</h5>
            {state.details.guests.Teen.length > 0 ? (
              <ListGroup className="mb-3">
                {state.details.guests.Teen.map((t, index) => (
                  <ListGroup.Item
                    key={`teen-${index}`}
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                  >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">
                        {t.name} {t.surname}
                      </div>
                      Dietary restrictions: {t.dietaryRestriction}
                      {t.dietaryRestriction === DietaryRestriction.Allergy
                        ? `, allergy/intolerance: ${t.allergy}`
                        : ""}
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <div className="mb-3">No teens registered.</div>
            )}
            <h5>Children:</h5>
            {state.details.guests.Child.length > 0 ? (
              <ListGroup className="mb-3">
                {state.details.guests.Child.map((c, index) => (
                  <ListGroup.Item
                    key={`child-${index}`}
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                  >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">
                        {c.name} {c.surname}
                      </div>
                      Dietary restrictions: {c.dietaryRestriction}
                      {c.dietaryRestriction === DietaryRestriction.Allergy
                        ? `, allergy/intolerance: ${c.allergy}`
                        : ""}
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <div className="mb-3">No children registered.</div>
            )}
            <h5>Babies:</h5>
            {state.details.guests.Baby.length > 0 ? (
              <ListGroup>
                {state.details.guests.Baby.map((b, index) => (
                  <ListGroup.Item
                    key={`baby-${index}`}
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                  >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">
                        {b.name} {b.surname}
                      </div>
                      Requires food: {b.requiresFood ? "yes" : "no"}, requires
                      separate chair: {b.requiresHighChair ? "yes" : "no"}
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <div className="mb-3">No babies registered.</div>
            )}
          </Col>
        </Row>
      ) : (
        <Row className="mb-3">
          <h4>Thank you for submitting your feedback.</h4>
        </Row>
      )}
      <Col>
        <FormButtons
          submitButtonText="Submit"
          previousPage={pages.otherDetails}
        />
      </Col>
    </Container>
  );
};
