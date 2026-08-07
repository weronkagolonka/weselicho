import { useStateMachine } from "little-state-machine";
import { Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import { FormButtons } from "../../components/FormButtons";
import { pages } from "../../constants";
import { DietaryRestriction, GuestType } from "../../types/weddingRsvp";
import { getGuestsofType } from "../../utils/weddingRsvp";
import { useNavigate } from "react-router";

export const Summary = () => {
  const { state } = useStateMachine();
  const navigate = useNavigate();

  const adults = getGuestsofType(GuestType.Adult, state.details.guests);
  const teens = getGuestsofType(GuestType.Teen, state.details.guests);
  const children = getGuestsofType(GuestType.Child, state.details.guests);
  const babies = getGuestsofType(GuestType.Baby, state.details.guests);

  const onSubmit = () => {
    navigate(pages.completion);
  };

  return (
    <Container className="rsvp-summary-container">
      <h2>Summary</h2>
      <Row className="mb-3">
        <Col xs={12} xl={6}>
          <h4>Details:</h4>
          <Row className="mb-3">
            <h5>Confirmation email:</h5>
            <div>{state.recipient.email}</div>
          </Row>
          <Row className="mb-3">
            <h5>Phone number:</h5>
            <div>{state.recipient.phone}</div>
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
            {adults.map((a, index) => (
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
          {teens.length > 0 ? (
            <ListGroup className="mb-3">
              {teens.map((t, index) => (
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
          {children.length > 0 ? (
            <ListGroup className="mb-3">
              {children.map((c, index) => (
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
          {babies.length > 0 ? (
            <ListGroup>
              {babies.map((b, index) => (
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
      <Col>
        <Form onSubmit={onSubmit}>
          <FormButtons
            submitButtonText="Submit"
            previousPage={pages.otherDetails}
          />
        </Form>
      </Col>
    </Container>
  );
};
