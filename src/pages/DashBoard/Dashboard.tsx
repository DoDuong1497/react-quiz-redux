import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setParamsQuestion } from "../../redux/question.action";
import { IParamsQuestion } from "../../types/question";

// https://opentdb.com/api.php?amount=2&category=15&difficulty=easy&type=multiple

interface ICategory {
  id: number;
  name: string;
}

interface IFormInput {
  category: string;
  difficulty: string;
  type: string;
  amount: number | null;
}

const Dashboard = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: "",
      difficulty: "",
      type: "",
      amount: 0,
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const item: IParamsQuestion = {
      category: data.category,
      type: data.type,
      difficulty: data.difficulty,
      amount: data.amount || 0,
      score: 0,
    };

    dispatch(setParamsQuestion(item));

    navigate("/question");
  };

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php").then((res) =>
      res.json().then((data) => setCategories(data.trivia_categories || []))
    );
  }, []);

  return (
    <Container maxWidth='md'>
      <Box sx={{ width: "100%" }}>
        <Typography variant='h3' align='center' gutterBottom>
          Quiz App
        </Typography>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ marginBottom: "30px" }}>
          <Controller
            name='category'
            control={control}
            rules={{ required: "Please enter category!!!" }}
            render={({ field }) => (
              <FormControl
                fullWidth
                sx={{ marginBottom: "30px" }}
                error={Object.keys(errors?.category || {}).length > 0}
              >
                <InputLabel id='category-label'>Category</InputLabel>
                <Select
                  labelId='category-label'
                  id='category'
                  label='Category'
                  {...field}
                >
                  {categories &&
                    categories.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
                {errors?.category && (
                  <FormHelperText>{errors?.category?.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />

          <Controller
            name='difficulty'
            control={control}
            rules={{ required: "Please enter difficulty!!!" }}
            render={({ field }) => (
              <FormControl
                fullWidth
                sx={{ marginBottom: "30px" }}
                error={Object.keys(errors?.difficulty || {}).length > 0}
              >
                <InputLabel id='difficulty-label'>Difficulty</InputLabel>
                <Select
                  labelId='difficulty-label'
                  id='difficulty'
                  label='Difficulty'
                  {...field}
                >
                  <MenuItem value='easy'>Easy</MenuItem>
                  <MenuItem value='medium'>Medium</MenuItem>
                  <MenuItem value='hard'>Hard</MenuItem>
                </Select>

                {errors?.difficulty && (
                  <FormHelperText>{errors?.difficulty?.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />

          <Controller
            name='type'
            control={control}
            rules={{ required: "Please enter type!!!" }}
            render={({ field }) => (
              <FormControl
                fullWidth
                sx={{ marginBottom: "30px" }}
                error={Object.keys(errors?.type || {}).length > 0}
              >
                <InputLabel id='type-label'>Type</InputLabel>
                <Select labelId='type-label' id='type' label='Type' {...field}>
                  <MenuItem value='multiple'>Multiple Choice</MenuItem>
                  <MenuItem value='boolean'>True/False</MenuItem>
                </Select>
                {errors?.type && (
                  <FormHelperText>{errors?.type?.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />

          <Controller
            name='amount'
            control={control}
            rules={{ required: "Please enter amount!!!" }}
            render={({ field }) => (
              <TextField
                fullWidth
                id='amount'
                type='number'
                label='Amount of Question'
                variant='outlined'
                error={Object.keys(errors?.amount || {}).length > 0}
                {...field}
                helperText={errors?.amount?.message}
              />
            )}
          />
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Button variant='contained' type='submit'>
            GET STARTED
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default Dashboard;
