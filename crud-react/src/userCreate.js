import  React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { Grid, Typography, Button } from '@mui/material';

export default function UserCreate() {
const handleSubmit = event =>{
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "fname": fname,
      "lname": lname,
      "username": username,
      "avatar": avatar
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("http://localhost:8080/users/create", requestOptions)
      .then(response => response.json())
      .then(result => {
        alert(result['message'])
         if (result['status']=== 'ok'){
             window.location.href ='/'
         }
      })
      .catch(error => console.log('error', error));
}

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
    return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" sx={{p:2}}>
        <Typography variant="h6" gutterBottom component={"div"}>
            Create User
        </Typography>
        <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}  >
                <TextField id="fname" label="Frist Name" variant="standard" fullWidth required onChange={(e) => setFname(e.target.value)} />
            </Grid>

            <Grid item xs={12} sm={6}  >
                <TextField id="lname" label="Last Name" variant="standard" fullWidth required  onChange={(e) => setLname(e.target.value)} />
            </Grid>

            <Grid item xs={12} sm={12}  >
                <TextField id="Username" label="Username" variant="standard" fullWidth required onChange={(e) => setUsername(e.target.value)} />
            </Grid>

            <Grid item xs={12} sm={12}  >
                <TextField id="Avatar" label="Avatar" variant="standard" fullWidth required onChange={(e) => setAvatar(e.target.value)} />
            </Grid>

            <Grid item xs={12} sm={12}  >
                <Button variant="outlined" fullWidth type="submit" >Create</Button>
            </Grid>
            
        </Grid>
        </form>

      </Container>
    </React.Fragment>
  );
}
