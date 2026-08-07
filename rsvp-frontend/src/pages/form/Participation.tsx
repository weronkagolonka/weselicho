import { useStateMachine } from "little-state-machine";
import { Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { guestFormFieldIds, pages } from "../../constants";
import type { WeddingRsvp } from "../../types/weddingRsvp";
import { updateRsvp } from "../../utils/weddingRsvp";
import { FormButtons } from "../../components/FormButtons";

export const Participation = () => {
  const { state, actions } = useStateMachine({
    actions: { updateAction: updateRsvp },
  });
  const { control, handleSubmit, formState } = useForm<WeddingRsvp>({
    defaultValues: state,
  });
  const navigate = useNavigate();

  const onSubmit = (data: WeddingRsvp) => {
    if (data.participating) {
      actions.updateAction(data);
      navigate(pages.guestLocation);
    } else {
      navigate(pages.completion);
    }
  };

  return (
    <Form className="rsvp-form-container" onSubmit={handleSubmit(onSubmit)}>
      <h2>Confirm your participation</h2>
      <Form.Group
        controlId={guestFormFieldIds.participation}
        title="Confirm participation"
        className="mb-3"
      >
        <Form.Label>Will you attend the wedding?</Form.Label>
        <Controller
          name="participating"
          control={control}
          rules={{
            validate: (value) => value !== undefined || "Please choose",
          }}
          render={({ field }) => {
            console.log(field.value);
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
        <Form.Text>{formState.errors.participating?.message}</Form.Text>
      </Form.Group>
      <FormButtons previousPage={pages.confirmationDetails} />
    </Form>
  );
};
