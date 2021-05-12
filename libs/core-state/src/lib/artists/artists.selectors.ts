import { Artist } from '@bba/api-interfaces';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  ARTISTS_FEATURE_KEY,
  ArtistsState,
  artistsAdapter,
} from './artists.reducer';

// Lookup the 'Artists' feature state managed by NgRx
export const getArtistsState = createFeatureSelector<ArtistsState>(
  ARTISTS_FEATURE_KEY
);

const { selectAll, selectEntities } = artistsAdapter.getSelectors();

export const getArtistsLoaded = createSelector(
  getArtistsState,
  (state: ArtistsState) => state.loaded
);

export const getArtistsError = createSelector(
  getArtistsState,
  (state: ArtistsState) => state.error
);

export const getAllArtists = createSelector(
  getArtistsState,
  (state: ArtistsState) => selectAll(state)
);

export const getArtistsEntities = createSelector(
  getArtistsState,
  (state: ArtistsState) => selectEntities(state)
);

export const getSelectedArtistId = createSelector(
  getArtistsState,
  (state: ArtistsState) => state.selectedId
);

export const getSelectedArtist = createSelector(
  getArtistsEntities,
  getSelectedArtistId,
  (entities, selectedId) => {
    const emptyArtist: Artist = {
      id: '',
      title: '',
      genre: '',
      yearsActive: '',
      albums: [null],
      labels: [null],
      members: [null],
      singles: [null],
    };

    return selectedId ? entities[selectedId] : emptyArtist;
  }
);
