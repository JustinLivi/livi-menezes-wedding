import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import MUIPlacesAutocomplete from 'mui-places-autocomplete';
import * as React from 'react';

import { loadMapApi } from '../Util/loadMapsApi';

const styles = createStyles({
  root: {}
});

export interface AddressInputProps extends WithStyles<typeof styles> {}

export interface AddressInputState {
  loaded: boolean;
  address: string;
}

const inputComponent: React.SFC<{
  inputRef:
    | string
    | ((instance: HTMLDivElement | null) => void)
    | React.RefObject<HTMLDivElement>
    | null
    | undefined;
}> = ({ inputRef, ...props }) => <div ref={inputRef} {...props} />;

export class UnstyledAddressInput extends React.Component<
  AddressInputProps,
  AddressInputState
> {
  public menuAnchor?: HTMLElement | null;

  constructor(props: AddressInputProps) {
    super(props);
    this.state = {
      address: '',
      loaded: false
    };
  }

  public componentDidMount() {
    loadMapApi(this.onScriptLoad);
  }

  public handleSelect = (address: string) => {
    this.setState({ address });
  };

  public render() {
    const { loaded, address } = this.state;
    return loaded ? (
      <MUIPlacesAutocomplete
        onSuggestionSelected={this.handleSelect}
        // tslint:disable-next-line:jsx-no-lambda
        renderTarget={() => (
          <div
            style={{
              maxWidth: '100%'
            }}
          />
        )}
        textFieldProps={{
          autoFocus: false,
          fullWidth: true,
          label: 'Enter your home address',
          placeholder: 'Your home address'
        }}
      />
    ) : (
      <React.Fragment />
    );
  }

  private onScriptLoad = () => {
    this.setState({ loaded: true });
  };
}

export const AddressInput = withStyles(styles)(UnstyledAddressInput);
