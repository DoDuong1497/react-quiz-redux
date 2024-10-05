import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const FinalScore = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth='md'>
      <Box sx={{ width: "100%", mb: "30px" }}>
        <Typography variant='h3'>Final Score: 3</Typography>
      </Box>

      <Box sx={{ mb: "30px" }}>
        <Button variant='outlined' onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </Box>
    </Container>
  );
};

export default FinalScore;
