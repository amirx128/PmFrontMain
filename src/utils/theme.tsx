import {createTheme} from "@mui/material/styles";
import {faIR} from "@mui/x-data-grid";

const theme = createTheme({
    direction: 'rtl',
    typography: {
        "fontFamily": "IRANSans",
    },
    palette: {
        primary: {
            dark: "#1c1d2e",
            main: "#282a42",
            light: "#535467"
        },
        secondary: {
            dark: "#2b4875",
            main: "#3e68a8",
            light: "#6486b9"
        },
        info: {
            dark: "#474bb2",
            main: "#666cff",
            light: "#8489ff"
        },
        background: {
            default: '#f5f5f5',
            paper: '#fff',
        },
        text:{
          primary:'#000',
          // main:'#000'
              
        }
    },
    components: {
        MuiButton: {
            defaultProps: {
                disableElevation: true
            }
        }
    }
}, faIR);

export default theme;