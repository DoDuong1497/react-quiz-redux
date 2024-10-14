import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../types/root";
import { useNavigate } from "react-router-dom";
import { decode } from "html-entities";
import { updateScore } from "../../redux/question.action";
import { DIFFICULTY_TIME } from "../../configs";
import { formatTimer } from "../../utils/formatTimer";

// https://opentdb.com/api.php?amount=2&category=15&difficulty=easy&type=multiple

const Question = () => {
  const navigate = useNavigate();
  const paramsQuestion = useSelector((state: IRootState) => state.question);
  const { category, type, difficulty, amount } = paramsQuestion;

  const [questionIndex, setQuestionIndex] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [dataSource, setDataSource] = useState<any[]>([]);
  // const [score, setScore] = useState(0);
  const [countTime, setCountTime] = React.useState(DIFFICULTY_TIME[difficulty]);
  const dispatch = useDispatch();
  const score = useSelector((state: IRootState) => state.question.score);

  // initial question
  useEffect(() => {
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

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCountTime((prevState) => {
        if(prevState > 0) {
          return  prevState - 1
        } else {
          const content = options[Math.floor(Math.random() * 4)];
          handleAnswer(content);
          return DIFFICULTY_TIME[difficulty];
        }
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    }
  }, [options])

  const handleAnswer = (content: string) => {
    const question = dataSource[questionIndex];

    if (content === question.correct_answer) {
      // setScore((prevState) => prevState + 1);
      dispatch(updateScore());
    }

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
          <Typography 
            variant='body1' 
            sx={{
              color: countTime < 10 ? "red" : "black"
            }}
          >
            Timer: {formatTimer(countTime)}
          </Typography>
        </Stack>
      </Box>
    </Container>
  );
};

export default Question;

// 30 -> 0:30
// 45: 0:45
// 60: 1:00