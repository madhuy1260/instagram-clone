import React from "react";
import { useState } from "react";
import Instagram_Logo_2016 from "../../images/Instagram_Logo_2016.png";
import { Button, Modal, Box } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [passwordSeen, setpasswordSeen] = useState(false);
  const [signupDetails, setSignupDetails] = useState({
    userName: "",
    password: "",
    email: "",
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const updateSignupDetails = (e) => {
    const { name, value } = e.target;
    setSignupDetails((prev) => ({ ...prev, [name]: value }));
  };

  const signup = async (e) => {
    e.preventDefault();
    console.log(signupDetails);

    const { userName, email, password } = signupDetails;
    const resp = await fetch("http://localhost:8000/registerUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName, email, password }),
    });
    const respData = await resp.json();
    if (resp.status === 404 || !respData) {
      alert("error");
      console.log("error");
    } else {
      alert("User has been Created");
      setSignupDetails({
        userName: "",
        password: "",
        email: "",
      });
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img
            src={Instagram_Logo_2016}
            className="app__headerImage2"
            alt="signup Logo"
          />
          <form className="app__signup" onSubmit={(e) => signup(e)}>
            <input
              className="input"
              name="userName"
              onChange={updateSignupDetails}
              placeholder="UserName"
              value={signupDetails.userName}
            />
            <input
              placeholder="Email"
              className="input"
              name="email"
              onChange={updateSignupDetails}
              value={signupDetails.email}
            />
            <div className="passwordcontainer">
              <input
                placeholder="Password"
                className="input"
                name="password"
                type="password"
                onChange={(e) => updateSignupDetails(e)}
                value={signupDetails.password}
              />

              <VisibilityOffIcon />
            </div>
            <Button type="submit">Sign Up</Button>
          </form>
        </Box>
      </Modal>
      <div className="app__header navbar_container">
        <img
          src={Instagram_Logo_2016}
          alt="Instagram_logo"
          className="app__headerImage"
        />
        <div>
          <Button onClick={handleOpen}>Sign Up</Button>
          <Button>Login</Button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
