import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

declare module '@material-ui/core/styles/createMuiTheme' {
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
  palette: {
    primary: {
      light: '#fff',
      main: '#fff',
      dark: '#ebebeb',
      contrastText: '#fe5168'
    }
  },
  typography: {
    useNextVariants: true,
    h5: {
      fontSize: '1.3rem'
    }
  },
  mixins: {
    toolbar: {
      minHeight: 74
    }
  },
  cantMakeIt: {
    color: '#ff6662'
  },
  imGoing: {
    color: '#45cd91'
  },
  details: {
    color: '#1889fe'
  }
});
