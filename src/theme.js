import { unstable_createMuiStrictModeTheme, responsiveFontSizes } from "@material-ui/core";
import CabinTTF from './fonts/Cabin-Regular.ttf'

// fonts
const cabin = {
  fontFamily: 'Cabin',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Cabin'),
    local('Cabin-Regular'),
    url(${CabinTTF})
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};


// colors
const primary = "#33475B";
const secondary = "#00CC88";
const black = "#343a40";
const darkBlack = "rgb(36, 40, 44)";
const background = "#F7F7FF";
const alternative = '#e6ebfa'
const warningLight = "rgba(253, 200, 69, .3)";
const warningMain = "rgba(253, 200, 69, .5)";
const warningDark = "rgba(253, 200, 69, .7)";

// border
const borderWidth = 2;
const borderColor = "rgba(0, 0, 0, 0.13)";

// breakpoints
const xl = 1920;
const lg = 1280;
const md = 960;
const sm = 600;
const xs = 0;

// spacing
const spacing = 8;

const theme = unstable_createMuiStrictModeTheme({
  palette: {
    primary: { main: primary },
    secondary: { main: secondary },
    common: {
      background,
      black,
      darkBlack,
      alternative
    },
    warning: {
      light: warningLight,
      main: warningMain,
      dark: warningDark
    },
    text: {
      primary: black,
    },
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
    background: {
      default: background
    },
    spacing
  },
  breakpoints: {
    // Define custom breakpoint values.
    // These will apply to Material-UI components that use responsive
    // breakpoints, such as `Grid` and `Hidden`. You can also use the
    // theme breakpoint functions `up`, `down`, and `between` to create
    // media queries for these breakpoints
    values: {
      xl,
      lg,
      md,
      sm,
      xs
    }
  },
  border: {
    borderColor: borderColor,
    borderWidth: borderWidth
  },
  typography: {
    useNextVariants: true,
    fontSize: 12,
    fontFamily: ['Cabin','Roboto'].join(','),
  },
  overrides: {
    MuiAccordionSummary: {
      root: {
        backgroundColor: secondary,
        color: "white",
        opacity: 0.8
      }
    },
    MuiExpansionPanel: {
      root: {
        position: "static"
      }
    },
    MuiTableCell: {
      root: {
        paddingLeft: spacing * 2,
        paddingRight: spacing * 2,
        borderBottom: `${borderWidth}px solid ${borderColor}`,
        [`@media (max-width:  ${sm}px)`]: {
          paddingLeft: spacing,
          paddingRight: spacing
        }
      }
    },
    MuiDivider: {
      root: {
        backgroundColor: borderColor,
        height: borderWidth
      }
    },
    MuiPrivateNotchedOutline: {
      root: {
        borderWidth: borderWidth
      }
    },
    MuiListItem: {
      divider: {
        borderBottom: `${borderWidth}px solid ${borderColor}`
      }
    },
    MuiDialog: {
      paper: {
        width: "100%",
        maxWidth: 430,
        marginLeft: spacing,
        marginRight: spacing
      }
    },
    MuiTooltip: {
      tooltip: {
        backgroundColor: darkBlack
      }
    },
    MuiExpansionPanelDetails: {
      root: {
        [`@media (max-width:  ${sm}px)`]: {
          paddingLeft: spacing,
          paddingRight: spacing
        }
      }
    },
    MuiCssBaseline: {
      '@global': {
        '@font-face': [cabin],
      },
    },
    MuiFormControlLabel: {
      root: {
        marginLeft: 10,
        marginRight: 10
      }
    },
  },
});

export default responsiveFontSizes(theme);
