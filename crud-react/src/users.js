import React,{ useState, useEffect  } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import { ButtonGroup } from '@mui/material';




export default function User() {
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    UserGet()
  }, [])
  const UserGet = () => {
    fetch("http://localhost:8080/users")
    .then(res => res.json())
    .then(
      (result) => {
        setItems(result);
      }
    )
  }
  
const UserUpdate = ID =>{
  window.location.href ="users/update/"+ID
}

const UserDelete = ID =>{
  var requestOptions = {
    method: 'DELETE',
    redirect: 'follow'
  };
  
  fetch("http://localhost:8080/users/delete/"+ID, requestOptions)
    .then(response => response.json())
    .then(result => {
      alert(result['message'])
       if (result['status'] === 'ok'){
           UserGet()
       }
    })
    .catch(error => console.log('error', error));
}
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg"sx={{p:2}}>
        <Paper sx={{p:2}}>
          <Box display="flex">
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom component={"div"}>
                Users
              </Typography>
            </Box>
            <Box>
              <Link href="create">
                <Button variant="contained">Create</Button>
              </Link>
            </Box>
          
          </Box>
          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="center">Avtar</TableCell>
            <TableCell align="center">Frist Name</TableCell>
            <TableCell align="center">Last Name</TableCell>
            <TableCell align="center">Username</TableCell>
           
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.ID}
              </TableCell>
              <TableCell align="center">
                <Box display="flex" justifyContent={"center"}>
                 <Avatar alt={row.Username} src={row.Avatar} />
                </Box>
                
              </TableCell>
              <TableCell align="center">{row.Fname}</TableCell>
              <TableCell align="center">{row.Lname}</TableCell>
              <TableCell align="center">{row.Username}</TableCell>
              <TableCell align="center">
                <ButtonGroup variant="outlined" aria-label="outlined button group">
                  <Button onClick={()=>UserUpdate(row.ID)}>Edit</Button>
                  <Button onClick={() => UserDelete(row.ID)}>Del</Button>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </Paper>
  </Container>
    </React.Fragment>
  );
}
