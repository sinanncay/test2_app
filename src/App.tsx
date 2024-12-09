import React from 'react';
import './App.css';
import  Page  from './Page/Page';
import { styled } from '@mui/joy/styles';
import { Sheet, Grid } from '@mui/joy/';

const Item = styled(Sheet)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography['body-sm'],
  padding: theme.spacing(1),
  textAlign: 'center',
  borderRadius: 4,
  color: theme.vars.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: theme.palette.background.level1,
  }),
}));

function App() {

  return (
    <div className="App">
      <Grid container spacing={1} sx={{ flexGrow: 1 }}>
        <Grid xs={12} sm={12} md={1} lg={1} xl={1}>
        </Grid>
        <Grid xs={12} sm={12} md={10} lg={10} xl={10}>
          <Item><Page/></Item>
        </Grid>
        <Grid xs={12} sm={12} md={1} lg={1} xl={1}>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
