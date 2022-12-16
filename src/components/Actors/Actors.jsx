import React from 'react';
import { Typography, Box, CircularProgress, Grid, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useParams, useHistory } from 'react-router-dom';

import { useGetActorsDetailsQuery, useGetMoviesByActorIdQuery } from '../../services/TMDB';
import useStyles from './styles';
import { MovieList } from '..';

const Actors = () => {
  const { id } = useParams();
  const history = useHistory();
  const classes = useStyles();
  const page = 1;

  const { data, isFetching, error } = useGetActorsDetailsQuery(id);
  const { data: movies, isFetching: actorFetching } = useGetMoviesByActorIdQuery({ id, page });

  if (isFetching) {
    return (
      <Box dusplay="flex" justifyContent="center" align="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }
  if (actorFetching) {
    return (
      <Box dusplay="flex" justifyContent="center" align="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button startIcon={<arrowBack />} onClick={() => history.goBack()} color="primary">
          Go back
        </Button>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      <Grid item lg={5} xl={4}>
        <img
          className={classes.image}
          src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
          alt={data.name}
        />
      </Grid>
      <Grid item lg={7} xl={8} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        <Typography variant="h2" gutterBottom>
          {data?.name}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Born: {new Date(data?.birthday).toDateString()}
        </Typography>
        <Typography variant="body1" align="justify" paragraph>
          {data?.biography || 'Sorry, no biography yet ...' }
        </Typography>
        <Box marginTop="2rem" display="flex" justifyContent="space-around">
          <Button
            variant="contained"
            color="primary"
            target="_blank"
            href={`https://www.imdb.com/name/${data?.imdb_id}`}
          >
            IMDB
          </Button>
          <Button startIcon={<ArrowBack />} onClick={() => history.goBack()} color="primary">
            BACK
          </Button>
        </Box>
      </Grid>
      <Box margin="2rem 0" width="100%">
        <Typography variant="h2" gutterBottom align="center">
          Movies
        </Typography>
        { movies
          ? <MovieList movies={movies} numberOfMovies={12} />
          : <Box>Sorry nothing was found.</Box>}
      </Box>
    </Grid>
  );
};

export default Actors;

// {/* <Grid container className={classes.conatianerSpaceAround}>
//       <Grid item sm={12} lg={4}>
//         <img
//           className={classes.poster}
//           src={`https://image.tmdb.org/t/p/w500/${data?.profile_path}`}
//           alt={data.name}
//         />
//       </Grid>
//       <Grid item container direction="column" lg={7} style={{ marginTop: '5rem' }}>
//         <Grid align={!isMobile ? 'left' : 'center'}>

//           <Typography variant="h5" gutterBotttom style={{ marginBottom: '1rem' }}>
//             Born: {data?.birthday}
//           </Typography>
//           <Typography>
//             {data?.biography}
//           </Typography>
//         </Grid>
//         <Grid item conatianer className={classes.buttonContainer} style={{ marginTop: '3rem' }}>
//           <Grid item>
//             <Button color="primary" variant="contained" target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/actor/${data?.imdb_id}`}>IMDB</Button>
//           </Grid>
//           <Grid item>
//             <Button endIcon={<ArrowBack />} sx={{ borderColor: 'primary.main' }}>
//               <Typography component={Link} to="/" color="inherit" variant="subtitle1" style={{ textDecoration: 'none' }}>Back</Typography>
//             </Button>
//           </Grid>
//         </Grid>
//       </Grid>
//       <Box marginTop="5rem" width="100%">
//         <Typography variant="h3" align="center">
//           Movies
//         </Typography>
//         {/* {actorMovies?.cast
//           ? <MovieList movies={actorMovies} numberOfMovies={12} />
//           : <Box>Sorry nothing was found.</Box>}
//         } */}
//       </Box>
//     </Grid> */}
