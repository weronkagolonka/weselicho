import { Controller, useForm } from "react-hook-form";
import { Form } from "react-bootstrap";
import { useStateMachine } from "little-state-machine";
import { updateRsvp } from "../../utils/weddingRsvp";
import { FormButtons } from "../../components/FormButtons";
import { pages } from "../../constants";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const OtherDetailsSchema = z.object({
  requiresTransport: z.boolean(),
  requiresAccommodation: z.boolean()
})

type OtherDetailsForm = z.infer<typeof OtherDetailsSchema>

export const OtherDetails = () => {
  const navigate = useNavigate();
  const { actions, state } = useStateMachine({
    actions: { updateAction: updateRsvp },
  });
  const { control, handleSubmit, formState } = useForm<OtherDetailsForm>({
    defaultValues: {
      requiresTransport: state.details.requiresTransport,
      requiresAccommodation: state.details.requiresAccommodation
    },
    resolver: zodResolver(OtherDetailsSchema)
  });

  const onSubmit = (data: OtherDetailsForm) => {
    actions.updateAction({
      ...state,
      details: {
        ...state.details,
        requiresTransport: data.requiresTransport,
        requiresAccommodation: data.requiresAccommodation
      }
    });
    navigate(pages.summary);
  };

  return (
    <Form className="rsvp-form-container" onSubmit={handleSubmit(onSubmit)}>
      <h2>Other details</h2>
      <Controller
        name="requiresTransport"
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
                {formState.errors.requiresTransport?.message}
              </Form.Text>
            </Form.Group>
          );
        }}
      />
      {state.details.fromAbroad ? (
        <Controller
          name="requiresAccommodation"
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
                  {formState.errors.requiresAccommodation?.message}
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
