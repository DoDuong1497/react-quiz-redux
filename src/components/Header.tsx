import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1, marginBottom: "50px" }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={goToHome}
          >
            Quiz App
          </Typography>
          <Button color='inherit'>LEADER BOARD</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
