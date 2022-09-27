import  React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';

import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { Grid, Typography, Button } from '@mui/material';



export default function UserUpdate() {
  var { id  }  = useParams();
  var a = parseInt(id)
 
  useEffect(() =>{
    

    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("http://localhost:8080/users/"+id, requestOptions)
      .then(response => response.json())
      .then(result => {
            if (result['status'] === 'ok'){
              
              setUsername(result['users']['Username'])
              setFname(result['users']['Fname'])
              setLname(result['users']['Lname'])
              setAvatar(result['users']['Avatar'])
            }
      })
      .catch(error => console.log('error', error));

  }, [id])
const handleSubmit = event =>{
    event.preventDefault();
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
   "id":a,
  "fname": fname,
  "lname": lname,
  "username": username,
  "avatar": avatar
});

var requestOptions = {
  method: 'PUT',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:8080/users/update/", requestOptions)
  .then(response => response.json())
  .then(result => {
        alert(result['message'])
         if (result['status'] === 'ok'){
             window.location.href ='/'
         }
      })
  .catch(error => console.log('error', error));

    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    
    // var raw = JSON.stringify({
    //   "id":id,
    //   "fname": fname,
    //   "lname": lname,
    //   "username": username,
    //   "avatar": avatar
    // });
    
    // var requestOptions = {
    //   method: 'PUT',
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: 'follow'
    // };
    
    // fetch("http://localhost:8080/users/update", requestOptions)
    //   .then(response => response.json())
    //   .then(result => {
    //     alert(result['message'])
    //      if (result['status'] === 'ok'){
    //          window.location.href ='/'
    //      }
    //   })
    //   .catch(error => console.log('error', error,));
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
            Update User
        </Typography>
        <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}  >
                <TextField id="fname" label="Frist Name" variant="standard" fullWidth required onChange={(e) => setFname(e.target.value)} value={fname} />
            </Grid>

            <Grid item xs={12} sm={6}  >
                <TextField id="lname" label="Last Name" variant="standard" fullWidth required  onChange={(e) => setLname(e.target.value)} value={lname}/>
            </Grid>

            <Grid item xs={12} sm={12}  >
                <TextField id="Username" label="Username" variant="standard" fullWidth required onChange={(e) => setUsername(e.target.value)}value={username} />
            </Grid>

            <Grid item xs={12} sm={12}  >
                <TextField id="Avatar" label="Avatar" variant="standard" fullWidth required onChange={(e) => setAvatar(e.target.value)} value={avatar}/>
            </Grid>

            <Grid item xs={12} sm={12}  >
                <Button variant="outlined" fullWidth type="submit" >Update</Button>
            </Grid>
            
        </Grid>
        </form>

      </Container>
    </React.Fragment>
  );
}
