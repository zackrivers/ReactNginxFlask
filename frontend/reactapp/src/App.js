import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#3f51b5',
      },
      secondary: {
        main: '#f44336',
      },
    },
  });

  useEffect(() => {
    fetch('/api/')
      .then(response => response.text())
      .then(text => {
        console.log('Response text:', text);
        try {
          return JSON.parse(text);
        } catch (error) {
          throw new Error('Invalid JSON in server response');
        }
      })
      .then(data => {
        setData(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setError(error);
        setIsLoading(false);
      });

    fetch('https://api.thecatapi.com/v1/images/search')
      .then(response => response.json())
      .then(data => setImage(data[0].url))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My React App
          </Typography>
          <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
        </Toolbar>
      </AppBar>
      <Grid container justifyContent="center" style={{ marginTop: '50px' }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card sx={{ minWidth: 275, marginBottom: '20px' }}>
            <CardContent>
              <TextField
                label="Enter your name"
                variant="outlined"
                value={name}
                onChange={(event) => setName(event.target.value)}
                style={{ marginBottom: '20px' }}
              />
              <Typography variant="h5" component="div" color="primary">
                Welcome to my React app, {name}!
              </Typography>
              {isLoading ? (
                <Typography variant="body2" color="text.secondary">
                  Loading...
                </Typography>
              ) : error ? (
                <Typography variant="body2" color="secondary">
                  Error: {error.message}
                </Typography>
              ) : (
                <Typography variant="h3" component="div" color="primary">
                  Random number: {data.random_number}
                </Typography>
              )}
              {image && <img src={image} alt="Random Cat" style={{ width: '100%', marginTop: '20px' }} />}
            </CardContent>
          </Card>
          <Typography variant="h3" component="div">
            Count: {count}
          </Typography>
          <Button variant="contained" color="primary" onClick={increment} style={{ margin: '20px' }}>
            Increment
          </Button>
          <Button variant="contained" color="secondary" onClick={decrement}>
            Decrement
          </Button>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
