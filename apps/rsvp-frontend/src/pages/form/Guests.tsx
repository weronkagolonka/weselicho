import { useStateMachine } from "little-state-machine";
import {
  Button,
  CloseButton,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import {
  DietaryRestriction,
  GuestType,
  type Guestt,
  type WeddingRsvp,
} from "../../types/weddingRsvp";
import {
  defaultGuest,
  getGuestsofType,
  updateRsvp,
} from "../../utils/weddingRsvp";
import { FormButtons } from "../../components/FormButtons";
import { pages } from "../../constants";
import { useNavigate } from "react-router";

type GuestForm = {
  guestType: GuestType;
  newGuest: Guestt;
  guestList: Guestt[];
};

export const Guests = () => {
  const navigate = useNavigate();
  const rsvpState = useStateMachine({
    actions: { updateAction: updateRsvp },
  });
  const rsvpForm = useForm<WeddingRsvp>({
    defaultValues: rsvpState.state,
  });
  const guestForm = useForm<GuestForm>({
    defaultValues: {
      guestType: GuestType.Adult,
      newGuest:
        getGuestsofType(GuestType.Adult, rsvpState.state.details.guests)
          .length === 0
          ? ({
              ...defaultGuest(GuestType.Adult),
              type: GuestType.Adult,
              name: rsvpState.state.recipient.name,
              surname: rsvpState.state.recipient.surname,
            } as Guestt)
          : defaultGuest(GuestType.Adult),
      guestList: rsvpState.state.details.guests,
    },
  });
  const guests = useFieldArray({
    control: guestForm.control,
    name: "guestList",
  });

  const guestType = useWatch({
    control: guestForm.control,
    name: "guestType",
  });
  const diet = useWatch({
    control: guestForm.control,
    name: "newGuest.dietaryRestriction",
  });

  const onAddGuestSubmit = (data: GuestForm) => {
    if (
      data.guestType === GuestType.Adult &&
      getGuestsofType(GuestType.Adult, guests.fields).length === 2
    ) {
      guestForm.setError("guestList", {
        message: "Up to 2 adult guests are allowed",
      });
    } else if (
      guests.fields.find(
        (g) =>
          g.type === data.newGuest.type &&
          g.name === data.newGuest.name &&
          g.surname === data.newGuest.surname,
      )
    ) {
      guestForm.setError("guestList", {
        message: `${data.newGuest.name} ${data.newGuest.surname} is already added`,
      });
    } else {
      guests.append(data.newGuest);
      if (data.guestType === GuestType.Adult) {
        rsvpForm.clearErrors("details.guests");
      }

      guestForm.reset({
        ...guestForm.getValues(),
        guestType: GuestType.Adult,
        newGuest: defaultGuest(GuestType.Adult),
      });
    }
  };

  const removeGuest = (guest: Guestt) => {
    const index = guests.fields.findIndex(
      (g) =>
        g.type === guest.type &&
        g.name === guest.name &&
        g.surname === guest.surname,
    );
    guests.remove(index);
  };

  const onSubmit = () => {
    if (getGuestsofType(GuestType.Adult, guests.fields).length === 0) {
      rsvpForm.setError("details.guests", {
        message: "One or two adults are required",
      });
    } else {
      rsvpState.actions.updateAction({
        ...rsvpState.state,
        details: {
          ...rsvpState.state.details,
          guests: guestForm.getValues("guestList"),
        },
      });
      navigate(pages.otherDetails);
    }
  };

  const registeredAdults = () => {
    const adults = getGuestsofType(GuestType.Adult, guests.fields);
    return adults.length > 0 ? (
      adults.map((a, index) => (
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
          <CloseButton onClick={() => removeGuest(a)} />
        </ListGroup.Item>
      ))
    ) : (
      <p>No Adults registered - must register at least one.</p>
    );
  };
  const registeredTeens = () => {
    const teens = getGuestsofType(GuestType.Teen, guests.fields);
    return teens.length > 0 ? (
      teens.map((t, index) => (
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
          <CloseButton onClick={() => removeGuest(t)} />
        </ListGroup.Item>
      ))
    ) : (
      <p>No registered teens.</p>
    );
  };
  const registeredChildren = () => {
    const children = getGuestsofType(GuestType.Child, guests.fields);
    return children.length > 0 ? (
      children.map((c, index) => (
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
          <CloseButton onClick={() => removeGuest(c)} />
        </ListGroup.Item>
      ))
    ) : (
      <p>No children registered.</p>
    );
  };
  const registeredBabies = () => {
    const babies = getGuestsofType(GuestType.Baby, guests.fields);
    return babies.length > 0 ? (
      babies.map((b, index) => (
        <ListGroup.Item
          key={`baby-${index}`}
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">
              {b.name} {b.surname}
            </div>
            Requires food: {b.requiresFood ? "yes" : "no"}, requires separate
            chair: {b.requiresHighChair ? "yes" : "no"}
          </div>
          <CloseButton onClick={() => removeGuest(b)} />
        </ListGroup.Item>
      ))
    ) : (
      <p>No babies registered.</p>
    );
  };

  const addGuestsForm = (
    <Form
      className="rsvp-form-container"
      onSubmit={guestForm.handleSubmit(onAddGuestSubmit)}
    >
      <h2>Add guests:</h2>
      <Form.Group className="mb-3">
        <Form.Label>Select guest type</Form.Label>
        <Form.Select
          {...guestForm.register("guestType")}
          onChange={(e) => {
            guestForm.reset({
              ...guestForm.getValues(),
              guestType: e.target.value as GuestType,
              newGuest: defaultGuest(e.target.value as GuestType),
            });
            guestForm.clearErrors("guestList");
          }}
        >
          {Object.values(GuestType).map((gt, index) => {
            return (
              <option value={gt} key={`guest-type-${index}`}>
                {GuestType[gt]}
              </option>
            );
          })}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          {...guestForm.register("newGuest.name")}
          required
          defaultValue={guestForm.getValues("newGuest.name")}
          placeholder="Guest name"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Surname</Form.Label>
        <Form.Control
          {...guestForm.register("newGuest.surname")}
          required
          defaultValue={guestForm.getValues("newGuest.surname")}
          placeholder="Guest surname"
        />
      </Form.Group>
      {guestType === GuestType.Adult ? (
        <Form.Group className="mb-3">
          <Form.Check
            {...guestForm.register("newGuest.pregnant")}
            type="checkbox"
            label="Pregnant?"
          />
        </Form.Group>
      ) : null}
      {guestType === GuestType.Baby ? (
        <Form.Group className="mb-3">
          <Form.Check
            {...guestForm.register("newGuest.requiresFood")}
            label="Requires food?"
            type="checkbox"
            defaultChecked={guestForm.getValues("newGuest.requiresFood")}
          />
          <Form.Check
            {...guestForm.register("newGuest.requiresHighChair")}
            label="Requires separate high chair?"
            type="checkbox"
            defaultChecked={guestForm.getValues("newGuest.requiresHighChair")}
          />
        </Form.Group>
      ) : null}
      {guestType !== GuestType.Baby ? (
        <>
          <Form.Group className="mb-3">
            <Form.Label>Food restrictions</Form.Label>
            <Form.Select {...guestForm.register("newGuest.dietaryRestriction")}>
              {Object.values(DietaryRestriction).map((d, index) => (
                <option key={`diet-${index}`} value={d}>
                  {d}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          {diet === DietaryRestriction.Allergy ? (
            <Form.Group className="mb-3">
              <Form.Label>Type of allergy/intolerance</Form.Label>
              <Form.Control
                required
                {...guestForm.register("newGuest.allergy")}
                defaultValue={guestForm.getValues("newGuest.allergy")}
                placeholder="E.g. gluten"
              />
            </Form.Group>
          ) : null}
        </>
      ) : null}
      <Button type="submit" className="mb-3">
        Add guest
      </Button>
      <Form.Text className="mx-3">
        {guestForm.formState.errors.guestList?.message}
      </Form.Text>
    </Form>
  );

  // TODO pull recipient's name and ask for pregnant and diet.

  return (
    <Container>
      <Row>
        <Col xs={12} xl={6}>
          {addGuestsForm}
        </Col>
        <Col xs={12} xl={6} className="p-4">
          <h2 className="mb-3">Registered guests:</h2>
          <h4>Adults (18+ years old):</h4>
          <ListGroup as="ol" className="mb-3">
            {registeredAdults()}
          </ListGroup>
          <h4>Teens (11-17 years old):</h4>
          <ListGroup as="ol" className="mb-3">
            {registeredTeens()}
          </ListGroup>
          <h4>Children (3-10 years old):</h4>
          <ListGroup as="ol" className="mb-3">
            {registeredChildren()}
          </ListGroup>
          <h4>Babies (0-2 years old):</h4>
          <ListGroup as="ol">{registeredBabies()}</ListGroup>
        </Col>
      </Row>

      <Form
        className="rsvp-form-container"
        onSubmit={rsvpForm.handleSubmit(onSubmit)}
      >
        <FormButtons
          submitButtonText="Confirm guest list and continue"
          previousPage={pages.participation}
        />
        <Form.Text className="mx-3">
          {rsvpForm.formState.errors.details?.guests?.message}
        </Form.Text>
      </Form>
    </Container>
  );
};
