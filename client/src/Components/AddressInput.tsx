import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import MUIPlacesAutocomplete, { Suggestion } from 'mui-places-autocomplete';
import * as React from 'react';

import { Loading } from '../Pages/Rsvp/Loading';
import { loadMapApi } from '../Util/loadMapsApi';

const styles = createStyles({
  root: {}
});

export interface AddressInputProps extends WithStyles<typeof styles> {
  onChange: React.ChangeEventHandler;
  onSelect: (address: string) => void;
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
  public script?: HTMLScriptElement;

  constructor(props: AddressInputProps) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  public componentDidMount() {
    this.script = loadMapApi(this.onScriptLoad);
  }

  public componentWillUnmount() {
    if (this.script) {
      this.script.removeEventListener('load', this.onScriptLoad);
    }
  }

  public target = () => (
    <div
      style={{
        maxWidth: '100%'
      }}
    />
  );

  public handleSelect = (suggestion: Suggestion) => {
    const { onSelect: handleSelect } = this.props;
    handleSelect(suggestion.description);
  };

  public render() {
    const { value, onChange } = this.props;
    const { loaded } = this.state;
    return loaded ? (
      <MUIPlacesAutocomplete
        onSuggestionSelected={this.handleSelect}
        renderTarget={this.target}
        textFieldProps={{
          autoFocus: false,
          fullWidth: true,
          label: 'Home address (for thank yous!)',
          onChange,
          placeholder: 'Home address',
          value: value || ''
        }}
      />
    ) : (
      <Loading />
    );
  }

  private onScriptLoad = () => {
    this.setState({ loaded: true });
  };
}

export const AddressInput = withStyles(styles)(UnstyledAddressInput);
