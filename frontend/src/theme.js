import variables  from './styling/theme.module.scss';
import createTheme from '@mui/material/styles/createTheme';
// A custom theme for this app
const theme = createTheme({
    palette: {
        primary: {
            main: variables.primary,
        },
        secondary: {
            main: variables.light,
        },
        background: {
            default: variables.whiteLight,
        },
        yellow: {
            main: variables.secondary,
            dark: variables.secondaryDark,
            contrastText: variables.primary
        },
        white: {
            main: '#fff',
            dark: variables.lightBackground,
            contrastText: variables.primary
        },
        violet: {
            main: variables.violet,
            dark: variables.violetDark,
            contrastText: variables.primary
        },
        spotify: {
            main: variables.spotify,
            dark: variables.spotifyDark,
            contrastText: '#fff'
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'unset',
                    fontFamily: variables.RobotoRegular,
                    letterSpacing: '-0.5px',
                    borderRadius: '5px',
                    boxShadow: 'unset',
                    maxWidth: '100%',
                    padding: '5px 15px',
                    overflow: 'hidden',
                    '&:hover': {
                        boxShadow: 'none',
                    },
                    '&:active': {
                        boxShadow: 'none',
                    },
                    '&:focus': {
                        // boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
                    },
                    '&.btn-slim':{
                        padding: '5px 0',
                        minWidth: '40px'
                    },
                    '&.btn-rounded':{
                        borderRadius: '26.5px'
                    },
                    '&.btn-100':{
                        width: '100%'
                    },
                    '&.btn-rounded-bottom':{
                        borderRadius: '26.5px',
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0
                    },
                },
                containedPrimary: {
                    '&.highlighted':{
                        color: variables.secondary,
                        boxShadow: '0 0 0 4px '+variables.secondary,
                    },
                },
                outlined: {
                    borderRadius: '5px'
                },
                contained: {
                    borderRadius: '5px'
                },
                sizeExtraSmall:{
                    fontSize: '0.725rem',
                    fontFamily: variables.RobotoRegular,
                    padding: '3px 10px'
                },
                sizeSmall:{
                    fontSize: '0.875rem',
                },
                sizeMedium:{
                    fontSize: '1rem',
                },
                sizeLarge:{
                    fontSize: '1.25rem',
                },
                sizeExtraLarge: {
                    fontSize: '1.5rem',
                    padding: '20px'
                },
            }
        }
    },
});

export default theme;