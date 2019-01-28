import { CardContent, Link, Typography } from '@material-ui/core';
import * as React from 'react';

import { ChevronIcons } from '../../ButtonBar/ChevronIcon';
import { NextBar } from '../../ButtonBar/NextBar';
import { StandardCard } from '../../Components/StandardCard';
import { ColumnLayout } from '../../Layouts/ColumnLayout';

export const ThingsToDoDetails: React.SFC = () => (
  <ColumnLayout>
    <StandardCard>
      <CardContent>
        <Typography variant='h4' component='h1'>
          Things to do
        </Typography>
        <hr />
        <Typography variant='h6' component='h2'>
          Activities:
        </Typography>
        <Typography variant='body1'>
          <Link target='_blank' href='http://aqua.org/'>
            The National Aquarium in Baltimore
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link target='_blank' href='https://www.marylandzoo.org/'>
            The Maryland Zoo in Baltimore
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link target='_blank' href='http://www.flaghouse.org/'>
            Star Spangled Banner Flag House
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link target='_blank' href='https://www.nps.gov/fomc/index.htm'>
            Fort McHenry National Monument and Historic Shrine
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link target='_blank' href='http://www.historicships.org/'>
            Tour Historic Ships
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link target='_blank' href='http://mvpconservancy.org/'>
            The Washington Monument in Baltimore
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link
            target='_blank'
            href='http://www.urbanpirates.com/baltimore_home.html'
          >
            Pirate cruise (family friendly and adult only)
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link target='_blank' href='http://www.baltimorepaddleboats.org/'>
            Rent an electric pirate ship or a “Chessie” paddle boat
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link target='_blank' href='https://www.charmcityclueroom.com/'>
            Escape Room
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link target='_blank' href='https://www.bromoseltzertower.com/'>
            Bromo Seltzer Arts Tower
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link target='_blank' href='https://www.mdsci.org/'>
            Maryland Science Center
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link target='_blank' href='https://www.portdiscovery.org/'>
            Port Discovery Children’s Museum
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link target='_blank' href='https://thewalters.org/'>
            Walters Art Museum
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link target='_blank' href='http://www.avam.org/'>
            Baltimore Museum of Art
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link target='_blank' href='http://www.thebmi.org/'>
            American Visionary Art Museum
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link target='_blank' href='http://www.borail.org/'>
            B&O Railroad Museum
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link target='_blank' href='https://lewismuseum.org/'>
            Reginald F. Lewis Museum
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link target='_blank' href='https://baberuthmuseum.org/'>
            Babe Ruth Birthplace and Museum
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link target='_blank' href='http://www.poeinbaltimore.org/'>
            Edgar Allen Poe House and Museum
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link target='_blank' href='http://cylburn.org/'>
            Cylborne Arboretum
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link
            target='_blank'
            href='https://www.facebook.com/mobtownballroom/'
          >
            Swing Dancing at Mobtown Ballroom
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link target='_blank' href='https://www.ripleys.com/baltimore/'>
            Ripley’s Believe or Not
          </Link>
        </Typography>
        <Typography variant='body1' gutterBottom>
          <Link target='_blank' href='https://www.baltimoretattoomuseum.com/'>
            The Baltimore Tattoo Museum
          </Link>
        </Typography>
        <Typography variant='h6' component='h2'>
          See a show:
        </Typography>
        <Typography variant='body1'>
          <Link target='_blank' href='https://www.bsomusic.org/'>
            Baltimore Symphony Orchestra
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link target='_blank' href='https://modell-lyric.com/'>
            The Lyric
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link
            target='_blank'
            href='http://www.france-merrickpac.com/index.php/'
          >
            The Hippodrome
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link target='_blank' href='https://www.centerstage.org/'>
            Center Stage
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link target='_blank' href='http://www.royalfarmsarena.com/'>
            Royal Farms Arena
          </Link>
        </Typography>
        <Typography variant='body1' gutterBottom>
          <Link target='_blank' href='https://www.powerplantlive.com/'>
            Power Plant Live!
          </Link>
        </Typography>
        <Typography variant='h6' component='h2'>
          See a sporting event:
        </Typography>
        <Typography variant='body1'>
          <Link target='_blank' href='https://www.mlb.com/orioles/ballpark'>
            The Orioles at Camden Yards
          </Link>
        </Typography>
        <Typography variant='body1' gutterBottom>
          <Link target='_blank' href='https://www.baltimoreravens.com/'>
            The Ravens at M&T Bank Stadium
          </Link>
        </Typography>
        <Typography variant='h6' component='h2'>
          Restaurants/Bars:
        </Typography>
        <Typography variant='body1'>
          <Link target='_blank' href='http://mtvernonmarketplace.com/'>
            Mt. Vernon Marketplace
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link
            target='_blank'
            href='https://www.facebook.com/BmoreFarmersMarket/'
          >
            Mt. Vernon Farmer’s Market (lots of good food options!)
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link target='_blank' href='http://barclavel.com/'>
            Clavel Mezcaleria
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link target='_blank' href='https://www.facebook.com/wcharlan'>
            WC Harlan (Speakeasy)
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link target='_blank' href='https://www.sandlotbaltimore.com/'>
            The Sandlot
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link target='_blank' href='http://bottega1729.com/'>
            Bottega
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link target='_blank' href='http://www.citycafebaltimore.com/'>
            City Cafe
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link target='_blank' href='https://www.doobys.com/'>
            Dooby’s
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link target='_blank' href='https://www.theowlbar.com/'>
            The Owl Bar (Former 1920s Speakeasy)
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link target='_blank' href='http://www.cazbar.pro/'>
            Cazbar
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link target='_blank' href='http://www.helmand.com/'>
            The Helmand
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link target='_blank' href='https://www.berthas.com/'>
            Bertha’s Mussels
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link target='_blank' href='http://thamesstreetoysterhouse.com/'>
            Thames Street Oyster House
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link target='_blank' href='http://www.goldenwestcafe.com/'>
            Golden West
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link target='_blank' href='http://www.thecharmery.com/'>
            The Charmery
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link target='_blank' href='https://www.thaiarroy-bt.com/'>
            Thai Arroy
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link target='_blank' href='http://www.kumarirestaurant.net/'>
            Kumari
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link target='_blank' href='https://www.thebrewersart.com/'>
            The Brewer’s Art
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link
            target='_blank'
            href='https://www.jdvhotels.com/hotels/maryland/baltimore/hotel-revival-baltimore/dining/topside?utm_source=google-local&utm_medium=organic&utm_campaign=gmb'
          >
            Topside
          </Link>
        </Typography>
        <Typography variant='body1' gutterBottom>
          <Link target='_blank' href='http://sugarvalebmore.com/'>
            Sugarvale Cocktail Bar
          </Link>
        </Typography>
        <Typography variant='h6' component='h2'>
          Cool Neighborhoods:
        </Typography>
        <Typography variant='body1'>
          <Link
            target='_blank'
            href='https://baltimore.org/neighborhoods/mount-vernon'
          >
            Mt. Vernon
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link
            target='_blank'
            href='https://baltimore.org/neighborhoods/hampden'
          >
            Hampden
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link
            target='_blank'
            href='https://baltimore.org/neighborhoods/fells-point'
          >
            Historic Fells Point
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link
            target='_blank'
            href='https://baltimore.org/neighborhoods/federal-hill'
          >
            Federal Hill
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link
            target='_blank'
            href='https://baltimore.org/neighborhoods/canton'
          >
            Canton
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link target='_blank' href='http://www.littleitalymd.org/'>
            Little Italy
          </Link>
        </Typography>
        <Typography variant='body1' gutterBottom>
          <Link
            target='_blank'
            href='https://baltimore.org/article/baltimore-inner-harbor'
          >
            Inner Harbor
          </Link>
        </Typography>
      </CardContent>
    </StandardCard>
    <NextBar to='/things-to-do' help='back' iconType={ChevronIcons.backArrow} />
  </ColumnLayout>
);
