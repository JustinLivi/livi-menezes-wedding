import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

const styles = createStyles({
  root: {
    height: 360,
    maxHeight: 'calc(100vh - 308px)',
    maxWidth: '100%'
  }
});

export interface GoogleMapProps extends WithStyles<typeof styles> {
  id: string;
  options: google.maps.MapOptions;
  marker?: google.maps.MarkerOptions;
  url?: string;
}

export class UnstyledGoogleMap extends React.Component<GoogleMapProps> {
  private map?: google.maps.Map;
  private marker?: google.maps.Marker;

  constructor(props: GoogleMapProps) {
    super(props);
  }

  public componentDidMount() {
    if (!window.google) {
      const s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = `https://maps.google.com/maps/api/js?key=AIzaSyAcc6j8YatihuK6CU5xwscroqVriVhqIZQ`;
      const x = document.getElementsByTagName('script')[0];
      if (!x.parentNode) {
        throw new Error('No parent node found');
      }
      x.parentNode.insertBefore(s, x);
      s.addEventListener('load', this.onScriptLoad);
    } else {
      this.onScriptLoad();
    }
  }

  public componentWillUnmount() {
    if (this.map) {
      this.map.unbindAll();
    }
  }

  public render() {
    const {
      id,
      classes: { root }
    } = this.props;
    return <div className={root} id={id} />;
  }

  private openUrl = () => {
    const { url } = this.props;
    const win = window.open(url, '_blank');
    if (win) {
      win.focus();
    }
  };

  private onScriptLoad = () => {
    const { id, options, marker, url } = this.props;
    this.map = new window.google.maps.Map(document.getElementById(id), options);
    if (marker) {
      this.marker = new window.google.maps.Marker({
        ...marker,
        map: this.map
      });
      if (url) {
        this.marker.addListener('click', this.openUrl);
      }
    }
  };
}

export const GoogleMap = withStyles(styles)(UnstyledGoogleMap);
