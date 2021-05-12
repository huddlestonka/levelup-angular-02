import { Artist } from '@bba/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const resetSelectedArtist = createAction(
  '[Artists] Reset Selected Artist'
);
export const resetArtists = createAction('[Artists] Reset Artists');

// Select Artist
export const selectArtist = createAction(
  '[Artists] Select Artist',
  props<{ selectedId: string }>()
);

// Load Artists
export const loadArtists = createAction('[Artists] Load Artists');

export const loadArtistsSuccess = createAction(
  '[Artists] Load Artists Success',
  props<{ artists: Artist[] }>()
);

export const loadArtistsFailure = createAction(
  '[Artists] Load Artists Failure',
  props<{ error: any }>()
);

// Load Artist
export const loadArtist = createAction(
  '[Artists] Load Artist',
  props<{ artistId: string }>()
);

export const loadArtistSuccess = createAction(
  '[Artists] Load Artist Success',
  props<{ artist: Artist }>()
);

export const loadArtistFailure = createAction(
  '[Artists] Load Artist Failure',
  props<{ error: any }>()
);

// Create Artist
export const createArtist = createAction(
  '[Artists] Create Artist',
  props<{ artist: Artist }>()
);

export const createArtistSuccess = createAction(
  '[Artists] Create Artist Success',
  props<{ artist: Artist }>()
);

export const createArtistFailure = createAction(
  '[Artists] Create Artist Failure',
  props<{ error: any }>()
);

// Update Artist
export const updateArtist = createAction(
  '[Artists] Update Artist',
  props<{ artist: Artist }>()
);

export const updateArtistSuccess = createAction(
  '[Artists] Update Artist Success',
  props<{ artist: Artist }>()
);

export const updateArtistFailure = createAction(
  '[Artists] Update Artist Failure',
  props<{ error: any }>()
);

// Delete Artist
export const deleteArtist = createAction(
  '[Artists] Delete Artist',
  props<{ artist: Artist }>()
);

export const deleteArtistCancelled = createAction(
  '[Artists] Delete Artist Cancelled'
);

export const deleteArtistSuccess = createAction(
  '[Artists] Delete Artist Success',
  props<{ artist: Artist }>()
);

export const deleteArtistFailure = createAction(
  '[Artists] Delete Artist Failure',
  props<{ error: any }>()
);
