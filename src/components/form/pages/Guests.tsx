import { useStateMachine } from "little-state-machine";
import { Button, CloseButton, Form, ListGroup } from "react-bootstrap";
import {
  useFieldArray,
  useForm,
  useWatch,
  type UseFieldArrayReturn,
} from "react-hook-form";
import {
  DietaryRestriction,
  GuestType,
  type BabyGuest,
  type Guest,
  type GuestList,
  type WeddingRsvp,
} from "../../../types/weddingRsvp";
import { defaultGuest, updateRsvp } from "../../../utils/weddingRsvp";
import { FormButtons } from "../../FormButtons";
import { pages } from "../../../constants";
import { useNavigate } from "react-router";

type GuestForm = {
  guestType: GuestType;
  newGuest: Guest | BabyGuest;
  guestList: GuestList;
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
      newGuest: defaultGuest(GuestType.Adult),
      guestList: rsvpState.state.details.guests,
    },
  });
  const guestFieldArrays: Record<
    GuestType,
    UseFieldArrayReturn<
      GuestForm,
      | "guestList.Adult"
      | "guestList.Teen"
      | "guestList.Child"
      | "guestList.Baby",
      string
    >
  > = {
    [GuestType.Adult]: useFieldArray({
      control: guestForm.control,
      name: "guestList.Adult",
    }),
    [GuestType.Teen]: useFieldArray({
      control: guestForm.control,
      name: "guestList.Teen",
    }),
    [GuestType.Child]: useFieldArray({
      control: guestForm.control,
      name: "guestList.Child",
    }),
    [GuestType.Baby]: useFieldArray({
      control: guestForm.control,
      name: "guestList.Baby",
    }),
  };

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
      guestFieldArrays.Adult.fields.length === 2
    ) {
      guestForm.setError("guestList.Adult", {
        message: "Up to 2 adult guests are allowed",
      });
    } else {
      if (data.guestType === GuestType.Baby) {
        guestFieldArrays.Baby.append(data.newGuest as BabyGuest);
      } else {
        guestFieldArrays[data.guestType].append(data.newGuest as Guest);
        if (data.guestType === GuestType.Adult) {
          rsvpForm.clearErrors("details.guests.Adult");
        }
      }

      guestForm.reset({
        ...guestForm.getValues(),
        guestType: GuestType.Adult,
        newGuest: defaultGuest(GuestType.Adult),
      });
    }
  };

  const removeGuest = (
    removedGuestType: GuestType,
    removedGuestIndex: number,
  ) => {
    if (removedGuestType === GuestType.Baby) {
      guestFieldArrays.Baby.remove(removedGuestIndex);
    } else {
      guestFieldArrays[removedGuestType].remove(removedGuestIndex);
    }
  };

  const onSubmit = () => {
    if (guestFieldArrays.Adult.fields.length === 0) {
      rsvpForm.setError("details.guests.Adult", {
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

  const registeredAdults =
    guestFieldArrays.Adult.fields.length > 0 ? (
      guestFieldArrays.Adult.fields.map((a, index) => (
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
          <CloseButton onClick={() => removeGuest(GuestType.Adult, index)} />
        </ListGroup.Item>
      ))
    ) : (
      <p>No Adults registered - must register at least one.</p>
    );
  const registeredTeens =
    guestFieldArrays.Teen.fields.length > 0 ? (
      guestFieldArrays.Teen.fields.map((t, index) => (
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
          <CloseButton onClick={() => removeGuest(GuestType.Teen, index)} />
        </ListGroup.Item>
      ))
    ) : (
      <p>No registered teens.</p>
    );
  const registeredChildren =
    guestFieldArrays.Child.fields.length > 0 ? (
      guestFieldArrays.Child.fields.map((c, index) => (
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
          <CloseButton onClick={() => removeGuest(GuestType.Child, index)} />
        </ListGroup.Item>
      ))
    ) : (
      <p>No children registered.</p>
    );
  const registeredBabies =
    guestFieldArrays.Baby.fields.length > 0 ? (
      guestFieldArrays.Baby.fields.map((b, index) => (
        <ListGroup.Item
          key={`baby-${index}`}
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">
              {b.name} {b.surname}
            </div>
            {b.requiresFood ? ", requires food" : ""}
            {b.requiresHighChair ? ", requires separate high chair" : ""}
          </div>
          <CloseButton onClick={() => removeGuest(GuestType.Baby, index)} />
        </ListGroup.Item>
      ))
    ) : (
      <p>No babies registered.</p>
    );

  const addGuestsForm = (
    <Form onSubmit={guestForm.handleSubmit(onAddGuestSubmit)}>
      <Form.Group>
        <Form.Label>Select guest type</Form.Label>
        <Form.Select
          {...guestForm.register("guestType")}
          onChange={(e) => {
            guestForm.reset({
              ...guestForm.getValues(),
              guestType: e.target.value as GuestType,
              newGuest: defaultGuest(e.target.value as GuestType),
            });
            guestForm.clearErrors("guestList.Adult");
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
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          {...guestForm.register("newGuest.name")}
          required
          defaultValue={guestForm.getValues("newGuest.name")}
          placeholder="Guest name"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Surname</Form.Label>
        <Form.Control
          {...guestForm.register("newGuest.surname")}
          required
          defaultValue={guestForm.getValues("newGuest.surname")}
          placeholder="Guest surname"
        />
      </Form.Group>
      {guestType === GuestType.Adult ? (
        <Form.Group>
          <Form.Check
            {...guestForm.register("newGuest.pregnant")}
            type="checkbox"
            label="Pregnant?"
          />
        </Form.Group>
      ) : null}
      {guestType === GuestType.Baby ? (
        <Form.Group>
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
          <Form.Group>
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
            <Form.Group>
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
      <Button type="submit">Add guest</Button>
      <Form.Text>
        {guestForm.formState.errors.guestList?.Adult?.message}
      </Form.Text>
    </Form>
  );

  return (
    <>
      <h3>Add guests:</h3>
      {addGuestsForm}
      <Form onSubmit={rsvpForm.handleSubmit(onSubmit)}>
        <h3>Registered guests:</h3>
        <h4>Adults (18+ years old):</h4>
        <ListGroup as="ol">{registeredAdults}</ListGroup>
        <h4>Teens (11-17 years old):</h4>
        <ListGroup as="ol">{registeredTeens}</ListGroup>

        <h4>Children (3-10 years old):</h4>
        <ListGroup as="ol">{registeredChildren}</ListGroup>

        <h4>Babies (0-2 years old):</h4>
        <ListGroup as="ol">{registeredBabies}</ListGroup>

        <FormButtons previousPage={pages.participation} />
        <Form.Text>
          {rsvpForm.formState.errors.details?.guests?.Adult?.message}
        </Form.Text>
      </Form>
    </>
  );
};
