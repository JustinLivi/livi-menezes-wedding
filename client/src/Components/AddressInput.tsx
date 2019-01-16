import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import MUIPlacesAutocomplete, { Suggestion } from 'mui-places-autocomplete';
import * as React from 'react';

import { loadMapApi } from '../Util/loadMapsApi';

const styles = createStyles({
  root: {}
});

export interface AddressInputProps extends WithStyles<typeof styles> {
  handleSelect: (address: string) => void;
  value?: string;
}

export interface AddressInputState {
  loaded: boolean;
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
      loaded: false
    };
  }

  public componentDidMount() {
    loadMapApi(this.onScriptLoad);
  }

  public target = () => (
    <div
      style={{
        maxWidth: '100%'
      }}
    />
  );

  public handleSelect = (suggestion: Suggestion) => {
    const { handleSelect } = this.props;
    handleSelect(suggestion.description);
  };

  public render() {
    const { value } = this.props;
    const { loaded } = this.state;
    return loaded ? (
      <MUIPlacesAutocomplete
        onSuggestionSelected={this.handleSelect}
        renderTarget={this.target}
        textFieldProps={{
          autoFocus: false,
          fullWidth: true,
          label: 'Enter your home address (for thank yous!)',
          placeholder: 'Your home address',
          value
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
