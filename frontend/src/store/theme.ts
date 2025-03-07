import { createTheme } from '@mui/material/styles';
import type { Components, Theme, BreakpointsOptions } from '@mui/material/styles';
// import { orange, red, purple, grey, green } from '@mui/material/colors';

const breakpointOverrides: BreakpointsOptions = {
    // default values
    // values: {
    //     xs: 0,
    //     sm: 600,
    //     md: 900,
    //     lg: 1200,
    //     xl: 1536,
    // },
};

const componentOverrides: Components = {
    // MuiButton: {
    //     styleOverrides: {
    //         containedPrimary: {
    //             backgroundColor: colors.primary.dark,
    //         },
    //         outlinedPrimary: {
    //             color: colors.primary.dark,
    //             borderColor: colors.primary.dark,
    //         },
    //     },
    // },
    // MuiTextField: {
    //     styleOverrides: {
    //         root: {
    //             marginTop: "8px",
    //             marginBottom: "8px",
    //         },
    //     },
    // },
    // MuiFormHelperText: {
    //     styleOverrides: {
    //         root: {
    //             position: "absolute",
    //             bottom: "-17px"
    //         },
    //     },
    // },
    // MuiDrawer: {
        
    // },
};

// if custom Theme properties are needed:
// 
// declare module '@mui/material/styles' {
//     interface Theme {
//         status: {
//             danger: string;
//         };
//     }
//     // allow configuration using `createTheme`
//     interface ThemeOptions {
//         status?: {
//             danger?: string;
//         };
//     }
// }

export const LightTheme: Theme = createTheme({
    breakpoints: breakpointOverrides,
    components: componentOverrides,
    palette: {
        mode: "light",
        text: {
            secondary: "#74808a",
        },
        // primary: {
        //     main: "#0288d1", // the original blue color
        // },
        // secondary: {
        //     main: colors.error,
        // },
        // background: {
        //     default: colors.gray.lighter,
        //     paper: colors.white,
        // },
    },
    typography: {
        button: {
            textTransform: 'none',
        },
        // fontFamily: 'Raleway',
        // fontFamily: [
        //     'Raleway',
        //     '-apple-system',
        //     'Roboto',
        //     'sans-serif',
        // ].join(','),
    },
    // mixins: {
    //     toolbar: {
    //         height: "64px",
    //     },
    // },
});