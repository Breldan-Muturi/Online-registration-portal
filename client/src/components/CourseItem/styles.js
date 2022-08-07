import { makeStyles } from "@material-ui/core";

export default makeStyles ((theme) =>({
    card: {
      display: 'flex',
      height: '130px',
      backgroundColor: 'white',
      cursor: 'pointer'
    },
    content: {
      width: '60%',
      flex: '1 0 auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
    },
    cover: {
      width: '40%',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    },
}));