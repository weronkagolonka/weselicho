import { Container, Image } from "react-bootstrap";
import { Outlet } from "react-router";
import sosnowitz from "./assets/sosnowitz.png";
import lenguiny from "./assets/lenguiny.png";
import "./scss/image.scss";

// TODO: add localization

function App() {
  return (
    <Container className="min-vh-100 d-flex flex-column mt-3">
      <div className="d-flex align-items-center justify-content-between">
        <Image src={sosnowitz} className="rsvp-header-image" />

        <h1 className="mb-0">Weselicho</h1>

        <Image src={lenguiny} className="rsvp-header-image" />
      </div>
      <div className="flex-grow-1 d-flex align-items-start justify-content-center">
        <Outlet />
      </div>
    </Container>
  );
}

export default App;
