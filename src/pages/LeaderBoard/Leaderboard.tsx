import React from 'react';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DescriptionIcon from "@mui/icons-material/Description";
import { CSVLink, CSVDownload } from "react-csv";

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
import TableFooter from "@mui/material/TableFooter/TableFooter";
import TablePagination from "@mui/material/TablePagination/TablePagination";
import TextField from '@mui/material/TextField/TextField';
import { useDebounce } from '../../hooks/useDebounce';
import { getRandomNameCSV } from '../../utils/getRandomNameCSV';

// let leaderboards = [];

// for (let i = 0; i < 20; i++) {
//   leaderboards.push({
//     id: i + 1,
//     firstname: Math.random().toString(36).slice(2, 7),
//     lastname:'last name' + i,
//     email: 'firstname' + i + '@gmail.com',
//     score: Math.floor(Math.random() * i)
//   })
// }

const csvHeader = ["id", "firstname", "lastname", "email", "score"];

const Leaderboard = () => {
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [name, setName] = React.useState('');
  const debouncedValue = useDebounce(name);
  const leaderboards = useSelector(
    (state: IRootLeaderBoardState) => state.leaderboards.leaderboards
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleResetScore = () => {
    dispatch(resetScore());
    navigate("/");
  };

  function handleChangePage(_: React.MouseEvent | null, page: number) {
    setPage(page);
  }
  
  function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  const dataSource = React.useMemo(() => {
    return leaderboards.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter(item => item.firstname.includes(debouncedValue));
  }, [page, rowsPerPage, debouncedValue]);

  const csvRows = dataSource.map(item => {
    return [item.id, item.firstname, item.lastname, item.email, item.score];
  })
  const csvData = [csvHeader, ...csvRows];

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
          <CSVLink data={csvData} filename={getRandomNameCSV('leaderboard') + ".csv"}>
            <Button variant='contained' startIcon={<DescriptionIcon />}>
              EXPORT CSV
            </Button>
          </CSVLink>
          <Button variant='outlined' onClick={handleResetScore}>
            GO HOME
          </Button>
        </Stack>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography sx={{ mr: 2 }}>Search:</Typography>
          <TextField 
            size='small' 
            id="outlined-basic" 
            variant="outlined" 
            placeholder='Input first name' 
            onChange={e => setName(e.target.value)}
          />
        </Box>

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
              {dataSource.map((row) => (
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
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: leaderboards.length }]}
                  count={leaderboards.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  // ActionsComponent={<></>}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>

      <br />
      <br />
      <br />
    </Container>
  );
};

export default Leaderboard;
