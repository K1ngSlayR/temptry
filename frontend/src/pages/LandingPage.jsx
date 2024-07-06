import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import "./LandingPage.css";
import { handleSuccess, handleError } from "../utils";

import Topbar from "../components/Topbar";

function LandingPage() {
  const navigate = useNavigate();

  const [loggedInUser, setLoggedInUser] = useState("");

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  return (
    <>
      <Topbar />

      <Container fluid className="d-flex p-0" style={{ height: "100vh" }}>
        {/*//* LEFTBAR */}
        <div style={{ flex: 0.5, backgroundColor: "#383f4a" }}>
          <div className="leftbar">
            <img src="" alt="" />
            <h4>{loggedInUser}</h4>
            <hr />
            <div className="leftbar-items">
              <p>Saved</p>
              <p>Friends</p>
              <p>Videos</p>
              <p>Screenshots</p>
            </div>
            <hr />
            <Button variant="dark " onClick={() => navigate("/lol")}>
              Find Creators
            </Button>
          </div>
        </div>

        {/*//* FEED */}
        <div style={{ flex: 2, backgroundColor: "#cbd0d6" }}>
          <div className="feed">
            <div>Feed</div>;
          </div>
        </div>

        {/*//* RIGHTBAR */}
        <div style={{ flex: 0.75, backgroundColor: "#383f4a" }}>
          <div className="rightbar">
            <Button variant="success" onClick={() => navigate("/my-games")}>
              My Games List
            </Button>
          </div>
        </div>
      </Container>
      <ToastContainer />
    </>
  );
}

export default LandingPage;
