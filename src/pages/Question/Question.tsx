import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";
import { IRootState } from "../../types/root";
import { useNavigate } from "react-router-dom";
import { decode } from "html-entities";

// https://opentdb.com/api.php?amount=2&category=15&difficulty=easy&type=multiple

const Question = () => {
  const navigate = useNavigate();
  const paramsQuestion = useSelector((state: IRootState) => state.question);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [score, setScore] = useState(0);

  // initial question
  useEffect(() => {
    const { category, type, difficulty, amount } = paramsQuestion;
    if (!category || !type || !difficulty || !amount) {
      navigate("/");
      return;
    }

    fetch(
      `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
    )
      .then((res) => res.json())
      .then((data) => {
        const questions = data.results[questionIndex];
        let answers = [...questions.incorrect_answers];

        answers.splice(
          Math.floor(Math.random() * 4),
          0,
          questions.correct_answer
        );
        setOptions(answers);
        setDataSource(data.results);
      });
  }, [paramsQuestion]);

  // next question
  useEffect(() => {
    if (questionIndex > 0) {
      const questions = dataSource[questionIndex];
      let answers = [...(questions?.incorrect_answers || [])];

      answers.splice(
        Math.floor(Math.random() * 4),
        0,
        questions.correct_answer
      );
      setOptions(answers);
    }
  }, [questionIndex]);

  const handleAnswer = (content: string) => {
    const question = dataSource[questionIndex];

    if (content === question.correct_answer)
      setScore((prevState) => prevState + 1);

    if (questionIndex + 1 === dataSource.length) {
      navigate("/final-score");
      return;
    } else {
      setQuestionIndex((prevState) => prevState + 1);
    }
  };

  return (
    <Container maxWidth='md'>
      <Box sx={{ width: "100%", mb: "30px" }}>
        <Typography variant='h4' align='center' gutterBottom>
          Question {questionIndex + 1}
        </Typography>
      </Box>

      <Box sx={{ mb: "30px" }}>
        <Typography variant='body1'>
          {decode(dataSource[questionIndex]?.question || "")}
        </Typography>
      </Box>

      <Box sx={{ mb: "30px" }}>
        {options.map((option) => (
          <Button
            key={option}
            fullWidth
            variant='contained'
            sx={{ mb: "15px" }}
            onClick={() => handleAnswer(option)}
          >
            {decode(option)}
          </Button>
        ))}
      </Box>

      <Box sx={{ width: "100%" }}>
        <Stack
          direction='row'
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Typography variant='body1'>
            Score: {score}/{dataSource.length}
          </Typography>
          <Typography variant='body1'>Timer: 0:10</Typography>
        </Stack>
      </Box>
    </Container>
  );
};

export default Question;
