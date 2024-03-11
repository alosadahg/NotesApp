import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { AppBar, Box, Toolbar, Typography, Button, IconButton, TextField, } from "@mui/material";

import axios from "axios";

export default function ButtonAppBar() {
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef(null);
  const [ufirstname, setFName] = useState(
    localStorage.getItem("firstname") || ""
  );
  const [ulastname, setLName] = useState(
    localStorage.getItem("lastname") || ""
  );
  const [userID, setUID] = useState(localStorage.getItem("userID") || "");

  const registerUser = () => {
    console.log("firstname: " + ufirstname + " lastname: " + ulastname);
    axios
      .post(
        "http://hyeumine.com/newuser.php",
        {
          firstname: ufirstname,
          lastname: ulastname,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then(function (response) {
        setUID(response.data.id);
        localStorage.setItem("userID", response.data.id);
        setShowForm(false);
      });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowForm(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleRegisterClick = () => {
    setShowForm(!showForm);
  };

  const handleTxtChange = (e, nameType) => {
    const value = e.target.value;
    if (nameType === "firstname") {
      setFName(value);
      localStorage.setItem("firstname", value);
    } else if (nameType === "lastname") {
      setLName(value);
      localStorage.setItem("lastname", value);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, position: "relative" }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="medium"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            Notes App
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
          <Button size="large" color="inherit" onClick={handleRegisterClick}>
            Register User
          </Button>
        </Toolbar>
      </AppBar>
      {showForm && (
        <Box
          ref={formRef}
          sx={{
            position: "absolute",
            right: 0,
            width: "300px",
            bgcolor: "background.paper",
            padding: "16px",
          }}
        >
          <form>
            <TextField
              id="firstname"
              label="First Name"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              onChange={(e) => handleTxtChange(e, "firstname")}
              value={ufirstname}
            />
            <TextField
              id="lastname"
              label="Last Name"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              onChange={(e) => handleTxtChange(e, "lastname")}
              value={ulastname}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => {
                registerUser();
              }}
            >
              Submit
            </Button>
          </form>
        </Box>
      )}
    </Box>
  );
}
