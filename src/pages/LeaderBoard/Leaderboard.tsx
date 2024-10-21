import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DescriptionIcon from "@mui/icons-material/Description";

// Table
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { IRootLeaderBoardState } from "../../types/root";
import { resetScore } from "../../redux/question.action";
import { useNavigate } from "react-router-dom";

// function createData(
//   id: number,
//   firstname: string,
//   lastname: string,
//   email: string,
//   score: number
// ) {
//   return { id, firstname, lastname, email, score };
// }

// const rows = infoList.map(item => {
//   createData
// });

// const rows = [
//   createData(1, "Frozen yoghurt", "Frozen yoghurt", "a@gmail.com", 4),
// ];

const Leaderboard = () => {
  const infoList = useSelector(
    (state: IRootLeaderBoardState) => state.leaderboards.leaderboards
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleResetScore = () => {
    dispatch(resetScore());
    navigate("/");
  };

  return (
    <Container maxWidth='md'>
      <Box sx={{ width: "100%", marginBottom: "50px" }}>
        <Typography variant='h3' align='center' sx={{ fontWeight: 700 }}>
          Leaderboard
        </Typography>
      </Box>

      <Box sx={{ width: "100%" }}>
        <Stack
          spacing={2}
          direction='row'
          sx={{ justifyContent: "flex-end", marginBottom: "25px" }}
        >
          <Button variant='contained' startIcon={<DescriptionIcon />}>
            EXPORT CSV
          </Button>
          <Button variant='outlined' onClick={handleResetScore}>
            GO HOME
          </Button>
        </Stack>

        <TableContainer component={Paper}>
          <Table sx={{ width: "100%" }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Score</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {infoList.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {row.firstname}
                  </TableCell>
                  <TableCell>{row.lastname}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default Leaderboard;
