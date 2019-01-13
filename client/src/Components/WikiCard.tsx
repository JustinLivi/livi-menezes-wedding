import { Card, CardContent, createStyles, WithStyles, withStyles } from '@material-ui/core';
import cheerio from 'cheerio';
import fetchJsonp from 'fetch-jsonp';
import * as React from 'react';

import { CacheStatus } from '../store/stateDefinition';
import { theme } from '../theme';

const styles = createStyles({
  card: {
    '& a': {
      color: theme.palette.secondary.main,
      transition: 'color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    },
    '& a:hover': {
      color: theme.palette.secondary.dark
    },
    '& sup': {
      lineHeight: 1
    },
    color: theme.palette.secondary.main,
    lineHeight: 1.6
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
  cacheStatus: CacheStatus;
  content?: string;
}

export class UnstyledWikiCard extends React.Component<
  WikiCardProps,
  WikiCardState
> {
  constructor(props: WikiCardProps) {
    super(props);
    this.state = {
      cacheStatus: CacheStatus.BEHIND
    };
  }

  public componentDidMount() {
    const { section, page } = this.props;
    if (this.state.cacheStatus === CacheStatus.BEHIND) {
      this.setState(prev => ({
        ...prev,
        cacheStatus: CacheStatus.FETCHING
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
            cacheStatus: CacheStatus.UP_TO_DATE,
            content: $p.html() || ''
          }));
        });
    }
  }

  public render() {
    const {
      classes: { card }
    } = this.props;
    return (
      <Card className={card}>
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
