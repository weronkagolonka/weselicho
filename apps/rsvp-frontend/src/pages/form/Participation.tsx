import { useStateMachine } from "little-state-machine";
import { Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { pages } from "../../constants";
import { updateRsvp } from "../../utils/weddingRsvp";
import { FormButtons } from "../../components/FormButtons";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const ParticipationSchema = z.object({
  participating: z.boolean()
})

type ParticipationForm = z.infer<typeof ParticipationSchema>

export const Participation = () => {
  const { state, actions } = useStateMachine({
    actions: { updateAction: updateRsvp },
  });
  const { control, handleSubmit, formState } = useForm<ParticipationForm>({
    defaultValues: { participating: state.participating },
    resolver: zodResolver(ParticipationSchema)
  });
  const navigate = useNavigate();

  const onSubmit = (data: ParticipationForm) => {
    actions.updateAction({
      ...state,
      participating: data.participating
    });
    if (data.participating) {
      navigate(pages.guestLocation);
    } else {
      navigate(pages.completion);
    }
  };

  console.log(formState.errors.participating)

  return (
    <Form className="rsvp-form-container" onSubmit={handleSubmit(onSubmit)}>
      <h2>Confirm your participation</h2>
      <Form.Group
        title="Confirm participation"
        className="mb-3"
      >
        <Form.Label>Will you attend the wedding?</Form.Label>
        <Controller
          name="participating"
          control={control}
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
        <Form.Text>{formState.errors.participating?.message}</Form.Text>
      </Form.Group>
      <FormButtons previousPage={pages.confirmationDetails} />
    </Form>
  );
};
