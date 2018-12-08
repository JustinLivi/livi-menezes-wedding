import { Card, CardContent, createStyles, WithStyles, withStyles } from '@material-ui/core';
import cheerio from 'cheerio';
import fetchJsonp from 'fetch-jsonp';
import * as React from 'react';

export enum CacheState {
  BEHIND = 'BEHIND',
  FETCHING = 'FETCHING',
  UP_TO_DATE = 'UP_TO_DATE'
}

const styles = createStyles({
  iframe: {
    border: 0
  }
});

export interface WikiPayload {
  parse: {
    title: string;
    pageid: number;
    text: {
      '*': string;
    };
  };
}

export interface WikiCardProps extends WithStyles<typeof styles> {
  section: number;
  page: string;
}

export interface WikiCardState {
  cacheState: CacheState;
  content?: string;
}

export class UnstyledWikiCard extends React.Component<
  WikiCardProps,
  WikiCardState
> {
  constructor(props: WikiCardProps) {
    super(props);
    this.state = {
      cacheState: CacheState.BEHIND
    };
  }

  componentDidMount() {
    const { section, page } = this.props;
    if (this.state.cacheState === CacheState.BEHIND) {
      this.setState(prev => ({
        ...prev,
        cacheState: CacheState.FETCHING
      }));
      fetchJsonp(
        `https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=${section}&page=${page}&callback=?`
      )
        .then(res => res.json())
        .then(body => {
          const $ = cheerio.load((body as WikiPayload).parse.text['*']);
          const $p = cheerio.load($('p').html() || '');
          $p('a').attr(
            'href',
            (index: number, attr: string) => `https://en.wikipedia.org${attr}`
          );
          this.setState(prev => ({
            ...prev,
            content: $p.html() || '',
            cacheState: CacheState.UP_TO_DATE
          }));
        });
    }
  }

  render() {
    const {
      classes: { iframe }
    } = this.props;
    return (
      <Card>
        <CardContent>
          {this.state.content && (
            <div dangerouslySetInnerHTML={{ __html: this.state.content }} />
          )}
        </CardContent>
      </Card>
    );
  }
}

export const WikiCard = withStyles(styles)(UnstyledWikiCard);
