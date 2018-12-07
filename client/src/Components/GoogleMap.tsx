import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

const styles = createStyles({
  root: {
    height: 360,
    maxWidth: '100%',
    maxHeight: 'calc(100vh - 308px)'
  }
});

export interface MapProps extends WithStyles<typeof styles> {
  id: string;
  options: google.maps.MapOptions;
  marker?: google.maps.MarkerOptions;
}

export class UnstyledMap extends React.Component<MapProps> {
  constructor(props: MapProps) {
    super(props);
    this.onScriptLoad = this.onScriptLoad.bind(this);
  }

  map?: google.maps.Map;
  marker?: google.maps.Marker;

  onScriptLoad() {
    const { id, options, marker } = this.props;
    this.map = new window.google.maps.Map(document.getElementById(id), options);
    if (marker) {
      this.marker = new window.google.maps.Marker({
        ...marker,
        map: this.map
      });
    }
  }

  componentDidMount() {
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

  componentWillUnmount() {
    this.map && this.map.unbindAll();
  }

  render() {
    const {
      id,
      classes: { root }
    } = this.props;
    return <div className={root} id={id} />;
  }
}

export const GoogleMap = withStyles(styles)(UnstyledMap);
