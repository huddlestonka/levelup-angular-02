import { Artist } from '@bba/api-interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as ArtistsActions from './artists.actions';

export const ARTISTS_FEATURE_KEY = 'artists';

export interface ArtistsState extends EntityState<Artist> {
  selectedId?: string | number; // which Artists record has been selected
  loaded: boolean; // has the Artists list been loaded
  error?: string | null; // last known error (if any)
}

export interface ArtistsPartialState {
  readonly [ARTISTS_FEATURE_KEY]: ArtistsState;
}

export const artistsAdapter: EntityAdapter<Artist> = createEntityAdapter<Artist>();

export const initialArtistsState: ArtistsState = artistsAdapter.getInitialState(
  {
    // set initial required properties
    loaded: false,
  }
);

const onFailure = (state, { error }) => ({ ...state, error });

const _artistsReducer = createReducer(
  initialArtistsState,
  on(ArtistsActions.selectArtist, (state, { selectedId }) =>
    Object.assign({}, state, { selectedId })
  ),
  on(ArtistsActions.resetSelectedArtist, (state) =>
    Object.assign({}, state, { selectedId: null })
  ),
  on(ArtistsActions.resetArtists, (state) => artistsAdapter.removeAll(state)),
  // Load artists
  on(ArtistsActions.loadArtists, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ArtistsActions.loadArtistsSuccess, (state, { artists }) =>
    artistsAdapter.setAll(artists, { ...state, loaded: true })
  ),
  on(ArtistsActions.loadArtistsFailure, onFailure),
  // Load artist
  on(ArtistsActions.loadArtist, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ArtistsActions.loadArtistSuccess, (state, { artist }) =>
    artistsAdapter.upsertOne(artist, { ...state, loaded: true })
  ),
  on(ArtistsActions.loadArtistFailure, onFailure),
  // Add artist
  on(ArtistsActions.createArtistSuccess, (state, { artist }) =>
    artistsAdapter.addOne(artist, state)
  ),
  on(ArtistsActions.createArtistFailure, onFailure),
  // Update artist
  on(ArtistsActions.updateArtistSuccess, (state, { artist }) =>
    artistsAdapter.updateOne({ id: artist.id, changes: artist }, state)
  ),
  on(ArtistsActions.updateArtistFailure, onFailure),
  // Delete artist
  on(ArtistsActions.deleteArtistSuccess, (state, { artist }) =>
    artistsAdapter.removeOne(artist.id, state)
  ),
  on(ArtistsActions.deleteArtistFailure, onFailure)
);

export function artistsReducer(
  state: ArtistsState | undefined,
  action: Action
) {
  return _artistsReducer(state, action);
}
