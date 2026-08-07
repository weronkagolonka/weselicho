import { Form } from "react-bootstrap";
import { pages } from "../../constants";
import { useStateMachine } from "little-state-machine";
import { Controller, useForm } from "react-hook-form";
import { updateRsvp } from "../../utils/weddingRsvp";
import { useNavigate } from "react-router";
import { FormButtons } from "../../components/FormButtons";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const LocationSchema = z.object({
  fromAbroad: z.boolean()
})

type LocationForm = z.infer<typeof LocationSchema>

export const GuestLocation = () => {
  const { state, actions } = useStateMachine({
    actions: { updateAction: updateRsvp },
  });
  const { control, handleSubmit, formState } = useForm<LocationForm>({
    defaultValues: state.details,
    resolver: zodResolver(LocationSchema)
  });
  const navigate = useNavigate();

  const onSubmit = (data: LocationForm) => {
    actions.updateAction({
      ...state,
      details: {
        ...state.details,
        fromAbroad: data.fromAbroad
      }
    });
    navigate(pages.guests);
  };

  return (
    <Form className="rsvp-form-container" onSubmit={handleSubmit(onSubmit)}>
      <h2>Location</h2>
      <Form.Group
        title="Confirm participation"
        className="mb-3"
      >
        <Form.Label>Are you coming from abroad?</Form.Label>
        <Controller
          name="fromAbroad"
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
        <Form.Text>{formState.errors?.fromAbroad?.message}</Form.Text>
      </Form.Group>
      <FormButtons previousPage={pages.confirmationDetails} />
    </Form>
  );
};
