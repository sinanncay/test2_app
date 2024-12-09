import React,{useEffect} from 'react'
import './Details.css'
import { useParams } from "react-router-dom";
import { ApiFunction } from '../helpers/ApiFunction';
import { MovieModel } from '../model/MovieModel';
import { Box, Tab, Typography } from '@mui/material';
import { Grid } from '@mui/joy';
import StarIcon from '@mui/icons-material/Star';
import {TabContext, TabList, TabPanel} from '@mui/lab';

function Details() {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = React.useState<MovieModel>();
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    callData(id);
   });

  async function callData(id: any) {
    const response = await ApiFunction(`i=${id}`, {}, "get");
        if(response?.status === 200){
            setMovieDetail(response.data);
        }
   }

  return (
    <div className='Details'>
         <Grid container spacing={2}>
            <Grid  xs={12} sm={12} md={12} lg={12} xl={12} style={{ backgroundColor: '#b4326b', height: '100vh', padding: '10%' }}>
               <Grid container spacing={2} style={{ paddingTop: 10, backgroundColor: 'black', border: '2px', borderRadius: 25 }}>
                   <Grid  xs={12} sm={12} md={12} lg={12} xl={12} style={{ padding: '2rem', color: 'white' }}>
                          <Grid container spacing={2}>
                               <Grid  xs={4} sm={4} md={4} lg={4} xl={4} >
                                  <img src={movieDetail?.Poster} alt="" width={'100%'} />
                               </Grid>
                               <Grid  xs={8} sm={8} md={8} lg={8} xl={8} >
                                  <h2>
                                    {movieDetail?.Title}
                                      <Typography variant="caption" gutterBottom sx={{ display: 'block', opacity:0.4 }}>
                                         {movieDetail?.Released} | {movieDetail?.Runtime} | {movieDetail?.Genre}
                                       </Typography>
                                  </h2>
                                   <Typography variant="caption" gutterBottom sx={{ display: 'block', opacity:1 }}>
                                         Plot : {movieDetail?.Plot}
                                    </Typography><br/>
                                    <Typography variant="h5" gutterBottom sx={{ display: 'block'}}>
                                         IMDB Score {movieDetail?.imdbRating} <StarIcon style={{ color: '#faaf00' }} fontSize="medium"/><Typography variant="caption" gutterBottom sx={{ display: 'block', opacity:0.4 }}>Votes : {movieDetail?.imdbVotes}</Typography>
                                  </Typography>
                                    <Box sx={{ width: '100%', typography: 'body1' }}>
                                     <TabContext value={value}>
                                       <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                         <TabList onChange={handleChange} aria-label="lab API tabs example" textColor="secondary" indicatorColor="secondary">
                                           <Tab className='TabPanel' label="OVERVIEW" value="1" />
                                           <Tab className='TabPanel' label="RATES" value="2" />
                                           <Tab className='TabPanel' label="DETAILS" value="3" />
                                         </TabList>
                                       </Box>
                                       <TabPanel value="1" style={{ paddingLeft: 0 }}>
                                             *  Language : {movieDetail?.Language} <br/>
                                             *  Actors : {movieDetail?.Actors} <br/>
                                             *  Country : {movieDetail?.Country} <br/>
                                             *  Type : {movieDetail?.Type} <br/>
                                             *  Writer : {movieDetail?.Writer} <br/>
                                             *  Directed By : {movieDetail?.Director} <br/>
                                       </TabPanel>
                                       <TabPanel style={{ paddingLeft: 0 }} value="2">
                                             { movieDetail ? movieDetail?.Ratings.map( x => { return(<div>{`* ${x.Source} : ${x.Value}`}</div>) })  : null} 
                                        </TabPanel>
                                       <TabPanel style={{ paddingLeft: 0 }}  value="3">
                                             *  Production : {movieDetail?.Production} <br/>
                                             *  Website : {movieDetail?.Website} <br/>
                                             *  DVD : {movieDetail?.DVD} <br/>
                                             *  Box Office : {movieDetail?.BoxOffice}
                                       </TabPanel>
                                     </TabContext>
                                   </Box>
                                  
                               </Grid>
                           </Grid>
                   </Grid>
               </Grid>
            </Grid>
         </Grid>
    </div>
  )
}

export default Details;