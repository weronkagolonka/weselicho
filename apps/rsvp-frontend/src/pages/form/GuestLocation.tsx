import { Form } from "react-bootstrap";
import { guestFormFieldIds, pages } from "../../constants";
import { useStateMachine } from "little-state-machine";
import { Controller, useForm } from "react-hook-form";
import type { WeddingRsvp } from "../../types/weddingRsvp";
import { updateRsvp } from "../../utils/weddingRsvp";
import { useNavigate } from "react-router";
import { FormButtons } from "../../components/FormButtons";

export const GuestLocation = () => {
  const { state, actions } = useStateMachine({
    actions: { updateAction: updateRsvp },
  });
  const { control, handleSubmit, formState } = useForm<WeddingRsvp>({
    defaultValues: state,
  });
  const navigate = useNavigate();

  const onSubmit = (data: WeddingRsvp) => {
    actions.updateAction(data);
    navigate(pages.guests);
  };

  return (
    <Form className="rsvp-form-container" onSubmit={handleSubmit(onSubmit)}>
      <h2>Location</h2>
      <Form.Group
        controlId={guestFormFieldIds.participation}
        title="Confirm participation"
        className="mb-3"
      >
        <Form.Label>Are you coming from abroad?</Form.Label>
        <Controller
          name="details.fromAbroad"
          control={control}
          rules={{
            validate: (value) => value !== undefined || "Please choose",
          }}
          render={({ field }) => {
            return (
              <Form.Group>
                <Form.Check
                  type="radio"
                  label="Yes"
                  value="Yes"
                  checked={field.value}
                  onChange={() => field.onChange(true)}
                />
                <Form.Check
                  type="radio"
                  label="No"
                  value="No"
                  checked={field.value === undefined ? undefined : !field.value}
                  onChange={() => field.onChange(false)}
                />
              </Form.Group>
            );
          }}
        />
        <Form.Text>{formState.errors.details?.fromAbroad?.message}</Form.Text>
      </Form.Group>
      <FormButtons previousPage={pages.confirmationDetails} />
    </Form>
  );
};
