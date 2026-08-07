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
  defaultGuest,
  getGuestsofType,
  updateRsvp,
} from "../../utils/weddingRsvp";
import { FormButtons } from "../../components/FormButtons";
import { errorTypes, pages } from "../../constants";
import { useNavigate } from "react-router";
import { AllDietaryRestrictions, AllGuestTypes, GuestSchema, GuestTypeSchema, RsvpDetailsSchema, type Guest, type GuestType, type RsvpDetails } from "@weselicho/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import {z} from "zod"

const GuestFormSchema = z.object({
  guestType: GuestTypeSchema,
  newGuest: GuestSchema
})

type GuestForm = z.infer<typeof GuestFormSchema>

export const Guests = () => {
  const navigate = useNavigate();
  const rsvpState = useStateMachine({
    actions: { updateAction: updateRsvp },
  });
  const rsvpForm = useForm<RsvpDetails>({
    defaultValues: rsvpState.state.details,
    resolver: zodResolver(RsvpDetailsSchema)
  });
  const guestForm = useForm<GuestForm>({
    defaultValues: {
      guestType: "Adult",
      newGuest:
        getGuestsofType("Adult", rsvpState.state.details.guests)
          .length === 0
          ? ({
              ...defaultGuest("Adult"),
              type: "Adult",
              name: rsvpState.state.invitee.name,
              surname: rsvpState.state.invitee.surname,
            } as Guest)
          : defaultGuest("Adult"),
    },
    resolver: zodResolver(GuestFormSchema)
  });
  const guests = useFieldArray({
    control: rsvpForm.control,
    name: "guests",
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
      data.guestType === "Adult" &&
      getGuestsofType("Adult", guests.fields).length === 2
    ) {
      rsvpForm.setError("guests", {
        type: "too_big",
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
      rsvpForm.setError("guests", {
        type: "duplicate",
        message: `${data.newGuest.name} ${data.newGuest.surname} is already added`,
      });
    } else {
      guests.append(data.newGuest);
      if (data.guestType === "Adult") {
        rsvpForm.clearErrors("guests");
      }

      guestForm.reset({
        ...guestForm.getValues(),
        guestType: "Adult",
        newGuest: defaultGuest("Adult"),
      });
    }
  };

  const removeGuest = (guest: Guest) => {
    const index = guests.fields.findIndex(
      (g) =>
        g.type === guest.type &&
        g.name === guest.name &&
        g.surname === guest.surname,
    );
    guests.remove(index);
  };

  const onSubmit = (data: RsvpDetails) => {
      rsvpState.actions.updateAction({
        ...rsvpState.state,
        details: data,
      });
      navigate(pages.otherDetails);
  };

  const registeredAdults = () => {
    const adults = getGuestsofType("Adult", guests.fields);
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
            {a.dietaryRestriction === "Allergy"
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
    const teens = getGuestsofType("Teen", guests.fields);
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
            {t.dietaryRestriction === "Allergy"
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
    const children = getGuestsofType("Child", guests.fields);
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
            {c.dietaryRestriction === "Allergy"
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
    const babies = getGuestsofType("Baby", guests.fields);
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
            Requires food: {b.requiresBabyFood ? "yes" : "no"}, requires separate
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
            rsvpForm.clearErrors("guests");
          }}
        >
          {Object.values(AllGuestTypes).map((gt, index) => {
            return (
              <option value={gt} key={`guest-type-${index}`}>
                {gt}
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
      {guestType === "Adult" ? (
        <Form.Group className="mb-3">
          <Form.Check
            {...guestForm.register("newGuest.pregnant")}
            type="checkbox"
            label="Pregnant?"
            defaultChecked={guestForm.getValues("newGuest.pregnant")}
          />
        </Form.Group>
      ) : null}
      {guestType === "Baby" ? (
        <Form.Group className="mb-3">
          <Form.Check
            {...guestForm.register("newGuest.requiresBabyFood")}
            label="Requires food?"
            type="checkbox"
            defaultChecked={guestForm.getValues("newGuest.requiresBabyFood")}
          />
          <Form.Check
            {...guestForm.register("newGuest.requiresHighChair")}
            label="Requires separate high chair?"
            type="checkbox"
            defaultChecked={guestForm.getValues("newGuest.requiresHighChair")}
          />
        </Form.Group>
      ) : null}
      {guestType !== "Baby" ? (
        <>
          <Form.Group className="mb-3">
            <Form.Label>Food restrictions</Form.Label>
            <Form.Select {...guestForm.register("newGuest.dietaryRestriction")}>
              {AllDietaryRestrictions.map((d, index) => (
                <option key={`diet-${index}`} value={d}>
                  {d}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          {diet === "Allergy" ? (
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
        {[errorTypes.ARRAY_TOO_BIG, errorTypes.ARRAY_DUPLICATE_ELEMENT].includes(rsvpForm.formState.errors.guests?.type ?? "") ?
          `${rsvpForm.formState.errors.guests?.message}` : null
        }
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
          {rsvpForm.formState.errors.guests?.type === errorTypes.ARRAY_TOO_SMALL ?
            `${rsvpForm.formState.errors.guests?.message}` : null
          }
        </Form.Text>
      </Form>
    </Container>
  );
};
