import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Header = () => {
  const navigate = useNavigate();

  function gotoHome() {
    navigate('/')
  }

  return (
    <Box sx={{ flexGrow: 1, marginBottom: "50px" }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography 
            variant='h6' 
            component='div' sx={{ flexGrow: 1, cursor: 'pointer' }} 
            onClick={gotoHome}
          >
            Quiz App
          </Typography>
          <Button color='inherit'>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
