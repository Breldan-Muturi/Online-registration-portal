import { makeStyles } from "@material-ui/core";

export default makeStyles ((theme) =>({
    card: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '350px',
    },
    title: {
        color: theme.palette.primary.main,
        fontSize: '1.25rem',
        fontWeight: theme.typography.fontWeightMedium,
    },
    course: {
        fontWeight: theme.typography.fontWeightBold,
        marginBottom: theme.spacing(2)
    },
    button: {
        width: '100%',
        marginTop: 'auto',
        backgroundColor: theme.palette.primary.main,
        alignItems: 'stretch',
        transition: theme.transitions.duration.standard,
        '& > *': {
            transition: theme.transitions.duration.standard,
            color: theme.palette.common.white,
            textTransform: 'uppercase'
        },
        '& :hover': {
            backgroundColor: theme.palette.primary.light,
            '& > *': {
                color: '#333',
            },
        }
    },
    actions: {
        width: '100%',
        justifyContent: 'space-between',
    }, 
}));