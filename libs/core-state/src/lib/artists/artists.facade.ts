import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as ArtistsActions from './artists.actions';
import * as ArtistsFeature from './artists.reducer';
import * as ArtistsSelectors from './artists.selectors';
import { Artist } from '@bba/api-interfaces';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

const artists: Artist[] = [
  {
    id: '56789f40-b0fb-4aa6-8e88-376b4edfm8he',
    title: 'Twenty One Pilots',
    genre: 'Alternative hip hop',
    yearsActive: '2009-present',
    albums: [
      {
        id: '56789f40-b0fb-4aa6-4e88-376b4edfm8he',
        title: 'Twenty One Pilots',
        year: '2009',
        awards: ['Nope'],
        songs: ['Fall Away', 'Taxi Cab', 'Implicit Demand for Proof'],
      },
      {
        id: '56789f30-b0fb-4aa6-8e88-376b4edfm8he',
        title: 'Regional at Best',
        year: '2011',
        awards: ['Not enough...'],
        songs: ['All the best'],
      },
      {
        id: '56789f210-b0fb-4aa6-8e88-376b4edfm8he',
        title: 'Vessel',
        year: '2013',
        awards: ['So many...'],
        songs: ['Holding on to You', 'Migraine', 'Car Radio', 'Trees'],
      },
      {
        id: '56789f40-b0fb-4aa6-8e88-376b4edfm6hj',
        title: 'Blurryface',
        year: '2015',
        awards: ['Alt Press Album Of The Year', 'Top Rock Album'],
        songs: ['Heavydirtysoul', 'Stressed Out', 'Ride'],
      },
      {
        id: '56789f40-b0fb-4aa6-8e88-376b4edf8j23',
        title: 'Trench',
        year: '2018',
        awards: [
          'Alt Press - 50 Best Albums of 2018',
          'Billboard - The 50 Best Albums of 2018',
        ],
        songs: ['Jumpsuit', 'Levitate', 'Morph'],
      },
      {
        id: '56789f40-b0fb-4gg6-8e88-37fb4edfm8he',
        title: 'Scaled and Icy',
        year: '2021',
        awards: [''],
        songs: ['Good Day', 'Choker', 'Shy Away'],
      },
    ],
    singles: [
      {
        id: '56789f40-b0fb-4akj-8e88-376b4edfm8he',
        title: 'Stressed Out',
        bpm: '86',
        duration: '3:22',
        key: 'C',
        signature: '4/4',
      },
      {
        id: '56789f40-b3fb-4aa6-8e88-37iu4edfm8he',
        title: 'Ride',
        bpm: '152',
        duration: '3:34',
        key: 'F',
        signature: '4/4',
      },
    ],
    labels: [
      {
        id: '56789f40-b0fb-4aa6-8e88-37324edfm8he',
        title: 'Fueled by Ramen',
      },
    ],
    members: ['Tyler Joseph', 'Josh Dun'],
  },
  {
    id: '56789f40-b0db-4aa6-8e88-376kjhdfm8he',
    title: 'The Lumineers',
    genre: 'Indie Folk',
    yearsActive: '2005-present',
  },
  {
    id: '53k89f40-b0db-4aa6-8e88-376kjhdfm8he',
    title: 'American Football',
    genre: 'Math Rock',
    yearsActive: '1997-2000 * 2014-present',
  },
];

@Injectable()
export class ArtistsFacade {
  private artistsSubject: BehaviorSubject<Artist[]> = new BehaviorSubject(
    artists
  );
  currentArtists$ = this.artistsSubject.asObservable();
  private selectedArtistSubject: BehaviorSubject<Artist> = new BehaviorSubject(
    null
  );
  selectedArtist$ = this.selectedArtistSubject.asObservable();
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(ArtistsSelectors.getArtistsLoaded));
  allArtists$ = this.store.pipe(select(ArtistsSelectors.getAllArtists));
  selectedArtists$ = this.store.pipe(select(ArtistsSelectors.getSelected));

  constructor(private store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(ArtistsActions.init());
  }

  selectArtist(selectedArtist: Artist) {
    this.selectedArtistSubject.next(selectedArtist);
  }

  createArtist(artist: Artist) {
    const artists: Artist[] = this.artistsSubject.value;
    const newArtist = Object.assign({}, artist, { id: uuidv4() });
    const updatedArtists: Artist[] = [...artists, newArtist];
    this.update(updatedArtists);
  }

  updateArtist(artist: Artist) {
    const artists: Artist[] = this.artistsSubject.value;
    const updatedArtists: Artist[] = artists.map((u) => {
      return u.id === artist.id ? Object.assign({}, artist) : u;
    });
    this.update(updatedArtists);
  }

  deleteArtist(artist: Artist) {
    const artists: Artist[] = this.artistsSubject.value;
    const updatedArtists: Artist[] = artists.filter((c) => c.id !== artist.id);
    this.update(updatedArtists);
  }

  update(artists: Artist[]) {
    this.artistsSubject.next(artists);
  }
}
