import { Button, Container, Image } from "react-bootstrap";
import { useNavigate } from "react-router";
import { pages } from "../constants";
import homePic from "../assets/home-pic.png";
import { useStateMachine } from "little-state-machine";
import { defaultWeddingRsvp, updateRsvp } from "../utils/weddingRsvp";

export const Home = () => {
  const { actions } = useStateMachine({
    actions: { updateAction: updateRsvp },
  });
  const navigate = useNavigate();

  return (
    <Container className="min-vh-100 d-flex flex-column align-items-center justify-content-start gap-3">
      <Image src={homePic} fluid style={{ maxHeight: "400px" }} />
      <Button
        onClick={() => {
          // Reset the form state
          actions.updateAction(defaultWeddingRsvp());
          navigate(pages.email);
        }}
      >
        Add your RSVP
      </Button>
    </Container>
  );
};
