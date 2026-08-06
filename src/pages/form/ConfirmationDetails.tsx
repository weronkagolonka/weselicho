import { useStateMachine } from "little-state-machine";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import type { WeddingRsvp } from "../../types/weddingRsvp";
import { updateRsvp } from "../../utils/weddingRsvp";
import { FormButtons } from "../../components/FormButtons";
import { pages } from "../../constants";

export const ConfirmationDetails = () => {
  const { state, actions } = useStateMachine({
    actions: { updateAction: updateRsvp },
  });
  const { register, handleSubmit } = useForm<WeddingRsvp>({
    defaultValues: state,
  });
  const navigate = useNavigate();

  const onSubmit = (data: WeddingRsvp) => {
    actions.updateAction(data);
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
        <Form.Control
          {...register("recipient.email")}
          type="email"
          required
          className="mb-3"
        />
        <Form.Label>Recipient name</Form.Label>
        <Form.Control {...register("recipient.name")} className="mb-3" />
        <Form.Label>Recipent surname</Form.Label>
        <Form.Control required {...register("recipient.surname")} />
      </Form.Group>
      <FormButtons previousPage={pages.home} />
    </Form>
  );
};
