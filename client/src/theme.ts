import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

declare module '@material-ui/core/styles/createMuiTheme' {
  // tslint:disable-next-line:interface-name
  interface Theme {
    cantMakeIt: {
      color: React.CSSProperties['color'];
    };
    imGoing: {
      color: React.CSSProperties['color'];
    };
    details: {
      color: React.CSSProperties['color'];
    };
  }
  // tslint:disable-next-line:interface-name
  interface ThemeOptions {
    cantMakeIt?: {
      color?: React.CSSProperties['color'];
    };
    imGoing?: {
      color?: React.CSSProperties['color'];
    };
    details?: {
      color?: React.CSSProperties['color'];
    };
  }
}

export const theme = createMuiTheme({
  cantMakeIt: {
    color: '#ff6662'
  },
  details: {
    color: '#1889fe'
  },
  imGoing: {
    color: '#45cd91'
  },
  mixins: {
    toolbar: {
      minHeight: 74
    }
  },
  palette: {
    primary: {
      contrastText: '#fe5168',
      dark: '#ebebeb',
      light: '#fff',
      main: '#fe5168'
    },
    secondary: {
      dark: '#3A4145',
      main: '#66696D'
    }
  },
  typography: {
    h5: {
      fontSize: '1.3rem'
    },
    useNextVariants: true
  }
});
