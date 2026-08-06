import { Button, ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router";
import { pages } from "../constants";
import { useStateMachine } from "little-state-machine";
import { defaultWeddingRsvp, updateRsvp } from "../utils/weddingRsvp";

type FormButtonsProps = {
  previousPage?: string;
  submitButtonText?: string;
};

export const FormButtons = (props: FormButtonsProps) => {
  const { previousPage, submitButtonText } = props;
  const { actions } = useStateMachine({
    actions: { updateAction: updateRsvp },
  });
  const navigate = useNavigate();

  return (
    <ButtonGroup>
      <Button
        onClick={() => {
          actions.updateAction(defaultWeddingRsvp());
          navigate(pages.form);
        }}
        variant="light"
      >
        Start over
      </Button>
      {previousPage ? (
        <Button variant="light" onClick={() => navigate(previousPage)}>
          Go back
        </Button>
      ) : null}
      <Button type="submit">{submitButtonText ?? "Next"}</Button>
    </ButtonGroup>
  );
};
