import { createStore, useStateMachine } from "little-state-machine";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { pages } from "../../constants";
import { defaultWeddingRsvp, updateRsvp } from "../../utils/weddingRsvp";

createStore(defaultWeddingRsvp());

export const GuestForm = () => {
  const { actions } = useStateMachine({
    actions: { updateAction: updateRsvp },
  });
  const navigate = useNavigate();

  return (
    <>
      <div>Tekst o formularzu</div>
      <Button
        onClick={() => {
          actions.updateAction(defaultWeddingRsvp());
          navigate(pages.email);
        }}
      >
        Next
      </Button>
    </>
  );
};
