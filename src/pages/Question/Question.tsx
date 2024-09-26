import React from "react";
import { useNavigate } from "react-router-dom";
import { decode } from "html-entities";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import { useSelector } from "react-redux";
import { IRootState } from "../../types/root";

// https://opentdb.com/api.php?amount=2&category=16&difficulty=medium&type=multiple

const Question = () => {
  const navigate = useNavigate();
  const paramsQuestion = useSelector((state: IRootState) => state.question);
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [options, setOptions] = React.useState<string[]>([]);
  const [dataSource, setDataSource] = React.useState<any[]>([]);
  const [score, setScore] = React.useState(0);

  // initial question
  React.useEffect(() => {
    const { category, difficulty, type, amount } = paramsQuestion;
    if(!category || !difficulty || !type || !amount) {
      navigate('/');
      return;
    }

    fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`)
      .then(res => res.json())
      .then(data => {
        const questions = data.results[questionIndex];
        let anwsers = [...questions.incorrect_answers];
        anwsers.splice(Math.floor(Math.random() * 4), 0, questions.correct_answer);
        setOptions(anwsers);
        setDataSource(data.results);
      })

  }, [paramsQuestion]);

  // next question
  React.useEffect(() => {
    if(questionIndex > 0) {
      // go to next question
      const questions = dataSource[questionIndex];
      let anwsers = [...questions?.incorrect_answers || []];
      anwsers.splice(Math.floor(Math.random() * 4), 0, questions.correct_answer);
      setOptions(anwsers);
    }
  }, [questionIndex]);

  function handleAnswer(content: string) {
    const question = dataSource[questionIndex];

    if(content === question.correct_answer) {
      // increase score
      setScore(prevState => prevState + 1);
    }

    if(questionIndex + 1 === dataSource.length) {
      console.log("navigate to result page");
      // redirect to result page
    } else {
      setQuestionIndex(prevState => prevState + 1);
    }
  }

  return (
    <>
      <Container maxWidth='md'>
        <Box sx={{ width: "100%" }}>
          <Typography variant='h3' align='center' gutterBottom>
            Question {questionIndex + 1}
          </Typography>
        </Box>

        <Box sx={{ width: "100%" }}>
          <Typography variant='subtitle1' component="div" align='center' gutterBottom textAlign="left">
            {decode(dataSource[questionIndex]?.question || '')}  
          </Typography>
        </Box>

        <Box sx={{ width: "100%" }}>
          {options.map(option => (
            <Button 
              key={option} 
              fullWidth 
              variant="contained" 
              sx={{ mb: 2 }}
              onClick={() => handleAnswer(option)}
            >
              {decode(option)}
            </Button>
          ))}
        </Box>

        <Box sx={{ width: "100%" }}>
          <Typography variant='subtitle1' component="div" align='center' gutterBottom textAlign="left">
            Score {score} / {dataSource.length}
          </Typography>
        </Box>


      </Container>
    </>
  );
};

export default Question;
