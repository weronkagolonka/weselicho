import { useStateMachine } from "little-state-machine";
import { Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { updateRsvp } from "../../utils/weddingRsvp";
import { FormButtons } from "../../components/FormButtons";
import { pages } from "../../constants";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { InviteeSchema, type Invitee } from "@weselicho/shared";
import { zodResolver } from "@hookform/resolvers/zod";

export const ConfirmationDetails = () => {
  const { state, actions } = useStateMachine({
    actions: { updateAction: updateRsvp },
  });
  const { register, control, handleSubmit } = useForm<Invitee>({
    resolver: zodResolver(InviteeSchema),
    defaultValues: state.invitee,
  });
  const navigate = useNavigate();

  const onSubmit = (data: Invitee) => {
    actions.updateAction({
      ...state,
      invitee: data
    });
    // TODO: verify whether email is already registered
    navigate(pages.participation);
  };

  // maybe ask for name and surname to register decline
  return (
    <Form className="rsvp-form-container" onSubmit={handleSubmit(onSubmit)}>
      <h2>Confirmation details</h2>
      <div className="mb-3">
        The information will be used for the confirmation email.
      </div>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control {...register("email")} type="email" required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Phone number</Form.Label>
        <Controller
          control={control}
          name="phone"
          render={({ field }) => (
            <PhoneInput
              defaultCountry="PL"
              value={field.value}
              onChange={(value) => {
                field.onChange(value);
              }}
            />
          )}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Recipient name</Form.Label>
        <Form.Control {...register("name")} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Recipient surname</Form.Label>
        <Form.Control required {...register("surname")} />
      </Form.Group>
      <FormButtons previousPage={pages.home} />
    </Form>
  );
};
