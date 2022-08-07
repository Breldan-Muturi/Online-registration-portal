import { makeStyles } from "@material-ui/core";

export default makeStyles ((theme) =>({
    submit: {
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        width: '100%',
        '&:hover' : {
            color: '#333',
            backgroundColor: theme.palette.primary.light,
        }
    },
}));