import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../types/root";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IFormInfo } from "../../types/leaderboard";
import { updateLeaderBoard } from "../../redux/leaderBoard.action";

const FinalScore = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
    },
  });

  const navigate = useNavigate();
  const score = useSelector((state: IRootState) => state.question.score);
  const dispatch = useDispatch();

  // const handleResetScore = () => {
  //   dispatch(resetScore());
  //   navigate("/");
  // };

  const onSubmit: SubmitHandler<IFormInfo> = (data) => {
    const itemInfo = {
      id: Date.now(),
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      score,
    };

    dispatch(updateLeaderBoard(itemInfo));
    navigate("/leader-board");
  };

  return (
    <Container maxWidth='md'>
      <Box sx={{ width: "100%", mb: "30px" }}>
        <Typography variant='h3'>Final Score: {score}</Typography>
      </Box>

      {/* <Box sx={{ mb: "30px" }}>
        <Button variant='outlined' onClick={handleResetScore}>
          Back to Home
        </Button>
      </Box> */}

      <Box sx={{ width: "100%" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='firstname'
            control={control}
            rules={{ required: "Please enter first name" }}
            render={({ field }) => (
              <TextField
                {...field}
                id='firstname'
                label='First Name'
                variant='standard'
                fullWidth
                error={Object.keys(errors || {}).length > 0}
                helperText={errors?.firstname?.message}
                sx={{ marginBottom: "20px" }}
              />
            )}
          />

          <Controller
            name='lastname'
            control={control}
            rules={{ required: "Please enter last name" }}
            render={({ field }) => (
              <TextField
                {...field}
                id='lastname'
                label='Last Name'
                variant='standard'
                fullWidth
                error={Object.keys(errors || {}).length > 0}
                helperText={errors?.lastname?.message}
                sx={{ marginBottom: "20px" }}
              />
            )}
          />

          <Controller
            name='email'
            control={control}
            rules={{
              required: "Please enter email",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                id='email'
                label='Email Address'
                variant='standard'
                fullWidth
                error={Object.keys(errors || {}).length > 0}
                helperText={errors?.email?.message}
                sx={{ marginBottom: "20px" }}
              />
            )}
          />

          <Stack direction='row' sx={{ justifyContent: "flex-end" }}>
            <Button variant='contained' type='submit'>
              SUBMIT
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};

export default FinalScore;
