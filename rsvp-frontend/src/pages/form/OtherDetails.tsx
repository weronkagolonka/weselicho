import { Controller, useForm } from "react-hook-form";
import type { WeddingRsvp } from "../../types/weddingRsvp";
import { Form } from "react-bootstrap";
import { useStateMachine } from "little-state-machine";
import { updateRsvp } from "../../utils/weddingRsvp";
import { FormButtons } from "../../components/FormButtons";
import { pages } from "../../constants";
import { useNavigate } from "react-router";

export const OtherDetails = () => {
  const navigate = useNavigate();
  const { actions, state } = useStateMachine({
    actions: { updateAction: updateRsvp },
  });
  const { control, handleSubmit, formState } = useForm<WeddingRsvp>({
    defaultValues: state,
  });

  const onSubmit = (data: WeddingRsvp) => {
    actions.updateAction(data);
    console.log("NAVIGATE");
    navigate(pages.summary);
  };

  return (
    <Form className="rsvp-form-container" onSubmit={handleSubmit(onSubmit)}>
      <h2>Other details</h2>
      <Controller
        name="details.requiresTransport"
        control={control}
        rules={{
          validate: (value) => value !== undefined || "Please choose",
        }}
        render={({ field }) => {
          return (
            <Form.Group className="mb-3">
              <Form.Label>Do you need transport from the venue?</Form.Label>
              <Form.Check
                required
                type="radio"
                label="Yes"
                value="Yes"
                checked={field.value}
                onChange={() => field.onChange(true)}
              />
              <Form.Check
                required
                type="radio"
                label="No"
                value="No"
                checked={field.value === undefined ? undefined : !field.value}
                onChange={() => field.onChange(false)}
              />
              <Form.Text>
                {formState.errors.details?.requiresTransport?.message}
              </Form.Text>
            </Form.Group>
          );
        }}
      />
      {state.details.fromAbroad ? (
        <Controller
          name="details.requiresAccommodation"
          control={control}
          rules={{
            validate: (value) => value !== undefined || "Please choose",
          }}
          render={({ field }) => {
            return (
              <Form.Group className="mb-3">
                <Form.Label>
                  Do you require accommodation? We can offer a 2-nights stay at
                  a hotel in Katowice.
                </Form.Label>
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
                <Form.Text>
                  {formState.errors.details?.requiresAccommodation?.message}
                </Form.Text>
              </Form.Group>
            );
          }}
        />
      ) : null}
      <FormButtons previousPage={pages.guests} />
    </Form>
  );
};
