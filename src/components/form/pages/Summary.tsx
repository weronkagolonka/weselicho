import { useStateMachine } from "little-state-machine";
import {
  ButtonGroup,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { FormButtons } from "../../FormButtons";
import { pages } from "../../../constants";
import { DietaryRestriction } from "../../../types/weddingRsvp";

export const Summary = () => {
  const { state } = useStateMachine();

  return (
    <Container>
      <Col>
        <h3>Summary</h3>
      </Col>
      {!state.participating ? (
        <Col>Thank you for submitting your feedback.</Col>
      ) : (
        <Col>
          <Col>Confirmation email: {state.email}</Col>
          <Col>
            Transport required: {state.details.requiresTransport ? "yes" : "no"}
          </Col>
          <Col>
            Accommodation required:{" "}
            {state.details.requiresAccommodation ? "yes" : "no"}
          </Col>
          <Col>Guests:</Col>
          <Col>
            {state.details.guests.Adult.length > 0 ? (
              <>
                <h5>Adults:</h5>
                <ListGroup>
                  {state.details.guests.Adult.map((adult, index) => (
                    <ListGroupItem
                      key={`adult-${index}`}
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">
                          {adult.name} {adult.surname}
                        </div>
                        Dietary restrictions: {adult.dietaryRestriction}
                        {adult.dietaryRestriction === DietaryRestriction.Allergy
                          ? `, allergy/intolerance: ${adult.allergy}`
                          : ""}
                        {adult.pregnant ? ", no alcohol" : ""}
                      </div>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </>
            ) : null}
          </Col>
          <Col>
            {state.details.guests.Teen.length > 0 ? (
              <>
                <h5>Adults:</h5>
                <ListGroup>
                  {state.details.guests.Teen.map((teen, index) => (
                    <ListGroupItem
                      key={`teen-${index}`}
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">
                          {teen.name} {teen.surname}
                        </div>
                        Dietary restrictions: {teen.dietaryRestriction}
                        {teen.dietaryRestriction === DietaryRestriction.Allergy
                          ? `, allergy/intolerance: ${teen.allergy}`
                          : ""}
                      </div>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </>
            ) : null}
          </Col>
          <Col>
            {state.details.guests.Child.length > 0 ? (
              <>
                <h5>Adults:</h5>
                <ListGroup>
                  {state.details.guests.Child.map((child, index) => (
                    <ListGroupItem
                      key={`child-${index}`}
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">
                          {child.name} {child.surname}
                        </div>
                        Dietary restrictions: {child.dietaryRestriction}
                        {child.dietaryRestriction === DietaryRestriction.Allergy
                          ? `, allergy/intolerance: ${child.allergy}`
                          : ""}
                      </div>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </>
            ) : null}
          </Col>
          <Col>
            {state.details.guests.Baby.length > 0 ? (
              <>
                <h5>Adults:</h5>
                <ListGroup>
                  {state.details.guests.Baby.map((baby, index) => (
                    <ListGroupItem
                      key={`baby-${index}`}
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">
                          {baby.name} {baby.surname}
                        </div>
                        {baby.requiresFood ? ", requires food" : ""}
                        {baby.requiresHighChair
                          ? ", requires separate high chair"
                          : ""}
                      </div>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </>
            ) : null}
          </Col>
        </Col>
      )}
      {/* Button to finish which clears the state */}
      {/* Still possible to go back and reset */}
      <Col>
        <ButtonGroup></ButtonGroup>
        <FormButtons
          submitButtonText="Submit"
          previousPage={pages.otherDetails}
        />
      </Col>
    </Container>
  );
};
