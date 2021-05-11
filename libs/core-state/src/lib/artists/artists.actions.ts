import { createAction, props } from '@ngrx/store';
import { ArtistsEntity } from './artists.models';

export const init = createAction('[Artists Page] Init');

export const loadArtistsSuccess = createAction(
  '[Artists/API] Load Artists Success',
  props<{ artists: ArtistsEntity[] }>()
);

export const loadArtistsFailure = createAction(
  '[Artists/API] Load Artists Failure',
  props<{ error: any }>()
);
