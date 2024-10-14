import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../types/root";
import { resetScore } from "../../redux/question.action";
import TextField from "@mui/material/TextField/TextField";
import { useForm, Controller, SubmitHandler } from "react-hook-form"

interface IFormInput {
  first_name: string
  last_name: string
  email: string
}

const FinalScore = () => {
  const navigate = useNavigate();
  const score = useSelector((state: IRootState) => state.question.score);
  const dispatch = useDispatch();

  const { 
    register,
    formState: { errors },
    control, 
    handleSubmit 
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
    },
  })

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    // TODO: save data to leaderboard
    
    // TODO: navigate to leader board
  }

  // const handleSubmit = () => {
  //   dispatch(resetScore());
  //   // navigate("/leader-board");
  // };

  return (
    <Container maxWidth='md'>
      <Box sx={{ width: "100%", mb: "30px" }}>
        <Typography variant='h3'>Final Score: {score}</Typography>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <Controller
            name="first_name"
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  autoFocus
                  margin="dense"
                  id="first_name"
                  label="First Name"
                  type="text"
                  fullWidth
                  variant="standard"
                  error={errors.first_name ? true : false}
                  {...register("first_name", { required: true })}
                  {...field}
                />
              )
            }}
          />
          <br /><br />
          <Controller
            name="last_name"
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  autoFocus
                  margin="dense"
                  id="last_name"
                  label="Last Name"
                  type="text"
                  fullWidth
                  variant="standard"
                  error={errors.last_name ? true : false}
                  {...register("last_name", { required: true })}
                  {...field}
                />
              )
            }}
          />
          <br /><br />
          <Controller
            name="email"
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Email Address"
                  type="email"
                  fullWidth
                  variant="standard"
                  error={errors.email ? true : false}
                  {...register("email", { required: true })}
                  {...field}
                />
              )
            }}
          />
        </Box>

        <Box sx={{ my: "30px", textAlign: 'right' }}>
          <Button variant='contained' type="submit">
            Submit
          </Button>
        </Box>
      </form>

      
    </Container>
  );
};

export default FinalScore;
