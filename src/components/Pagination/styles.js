import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    align: 'center',
    marginTop: '1rem',
  },
  button: {
    margin: '30px 2px',
  },
  pageNumber: {
    margin: '0 20px !important',
    color: theme.palette.text.primary,
  },
}));

