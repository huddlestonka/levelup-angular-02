import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as ArtistsActions from './artists.actions';
import { ArtistsEntity } from './artists.models';

export const ARTISTS_FEATURE_KEY = 'artists';

export interface State extends EntityState<ArtistsEntity> {
  selectedId?: string | number; // which Artists record has been selected
  loaded: boolean; // has the Artists list been loaded
  error?: string | null; // last known error (if any)
}

export interface ArtistsPartialState {
  readonly [ARTISTS_FEATURE_KEY]: State;
}

export const artistsAdapter: EntityAdapter<ArtistsEntity> = createEntityAdapter<ArtistsEntity>();

export const initialState: State = artistsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const artistsReducer = createReducer(
  initialState,
  on(ArtistsActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ArtistsActions.loadArtistsSuccess, (state, { artists }) =>
    artistsAdapter.setAll(artists, { ...state, loaded: true })
  ),
  on(ArtistsActions.loadArtistsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return artistsReducer(state, action);
}
