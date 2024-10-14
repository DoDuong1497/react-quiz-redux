import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../types/root";
import { resetScore } from "../../redux/question.action";

const FinalScore = () => {
  const navigate = useNavigate();
  const score = useSelector((state: IRootState) => state.question.score);
  const dispatch = useDispatch();

  const handleResetScore = () => {
    dispatch(resetScore());
    navigate("/");
  };

  return (
    <Container maxWidth='md'>
      <Box sx={{ width: "100%", mb: "30px" }}>
        <Typography variant='h3'>Final Score: {score}</Typography>
      </Box>

      <Box sx={{ mb: "30px" }}>
        <Button variant='outlined' onClick={handleResetScore}>
          Back to Home
        </Button>
      </Box>
    </Container>
  );
};

export default FinalScore;
