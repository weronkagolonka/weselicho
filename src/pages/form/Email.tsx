import { useStateMachine } from "little-state-machine";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { guestFormFieldIds, pages } from "../../constants";
import type { WeddingRsvp } from "../../types/weddingRsvp";
import { updateRsvp } from "../../utils/weddingRsvp";
import { FormButtons } from "../../components/FormButtons";

export const Email = () => {
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

  return (
    <Form className="rsvp-form-container" onSubmit={handleSubmit(onSubmit)}>
      <h2>Email address</h2>
      <Form.Group className="mb-3">
        <Form.Label>
          Please provide your email address for confirmation
        </Form.Label>
        <Form.Control required {...register("email")} />
      </Form.Group>
      <FormButtons previousPage={pages.home} />
    </Form>
  );
};
